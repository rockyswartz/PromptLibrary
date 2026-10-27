// Storage and State Management for Prompt Library
// Dual-Tier Engine: Native IndexedDB (Primary) + LocalStorage (Mirror) + Optional SQLite Sync
(function() {
  const STORAGE_KEY = "prompt_library_prompts_v1";
  const FAVORITES_KEY = "prompt_library_favorites_v1";
  const STATS_KEY = "prompt_library_stats_v1";
  const THEME_KEY = "prompt_library_theme_v1";
  const THEME_PRESET_KEY = "prompt_library_theme_preset_v1";
  const ACCENT_KEY = "prompt_library_accent_v1";
  const TAXONOMY_KEY = "prompt_library_taxonomy_v2";
  const TAXONOMY_TREE_KEY = "prompt_library_taxonomy_tree_v2";
  const NAV_MODE_KEY = "prompt_library_nav_mode_v2";

  const DB_NAME = "PromptLibraryDB";
  const DB_VERSION = 1;
  const STORE_PROMPTS = "prompts";
  const STORE_META = "meta";

  // IndexedDB asynchronous driver
  const idb = {
    db: null,
    async open() {
      if (this.db) return this.db;
      if (typeof window === "undefined" || !window.indexedDB) return null;
      return new Promise((resolve) => {
        try {
          const req = window.indexedDB.open(DB_NAME, DB_VERSION);
          req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_PROMPTS)) {
              const store = db.createObjectStore(STORE_PROMPTS, { keyPath: "id" });
              store.createIndex("category", "category", { unique: false });
              store.createIndex("createdAt", "createdAt", { unique: false });
            }
            if (!db.objectStoreNames.contains(STORE_META)) {
              db.createObjectStore(STORE_META, { keyPath: "key" });
            }
          };
          req.onsuccess = (e) => {
            this.db = e.target.result;
            resolve(this.db);
          };
          req.onerror = () => resolve(null);
        } catch (err) {
          resolve(null);
        }
      });
    },
    async getAllPrompts() {
      const db = await this.open();
      if (!db) return null;
      return new Promise((resolve) => {
        try {
          const tx = db.transaction(STORE_PROMPTS, "readonly");
          const req = tx.objectStore(STORE_PROMPTS).getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => resolve(null);
        } catch (e) {
          resolve(null);
        }
      });
    },
    async saveAllPrompts(prompts) {
      const db = await this.open();
      if (!db) return false;
      return new Promise((resolve) => {
        try {
          const tx = db.transaction(STORE_PROMPTS, "readwrite");
          const store = tx.objectStore(STORE_PROMPTS);
          store.clear();
          prompts.forEach(p => store.put(p));
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        } catch (e) {
          resolve(false);
        }
      });
    }
  };

  class PromptStorage {
    constructor() {
      this.cachedPrompts = [];
      this.isSqliteConnected = false;
      this.init();
    }

    _normalizeList(list) {
      if (!Array.isArray(list)) return [];
      
      const defaultList = window.DEFAULT_PROMPTS || [];
      const masterById = new Map();
      const masterByTitle = new Map();
      defaultList.forEach(dp => {
        if (dp.id) masterById.set(dp.id, dp);
        if (dp.title) masterByTitle.set(dp.title.toLowerCase().trim(), dp);
      });

      // Deduplicate by ID, keeping the latest / enriched item
      const seenIds = new Set();
      const deduplicated = [];

      list.forEach(p => {
        if (!p || !p.id) return;
        if (seenIds.has(p.id)) return;
        seenIds.add(p.id);

        const master = masterById.get(p.id) || (p.title ? masterByTitle.get(p.title.toLowerCase().trim()) : null);
        
        const domain = (master && master.domain) || p.domain || this._inferDomainFromCategory(p.categories || [p.category]);
        const source = (master && master.source) || p.source || (p.isCustom ? "Custom User Prompts" : "PromptVault Core");
        const cats = (master && master.categories) || (Array.isArray(p.categories) && p.categories.length > 0 ? p.categories : [p.category || "General"]);
        const subcat = (master && master.subcategory) || p.subcategory || "General";

        deduplicated.push({
          ...p,
          domain,
          source,
          categories: cats,
          category: cats[0] || "General",
          subcategories: Array.isArray(p.subcategories) && p.subcategories.length > 0 ? p.subcategories : [subcat],
          subcategory: subcat
        });
      });

      return deduplicated;
    }

    _inferDomainFromCategory(cats) {
      const catList = Array.isArray(cats) ? cats : [cats];
      const tree = this.getDefaultTaxonomyTree();
      for (const [domainName, domainData] of Object.entries(tree)) {
        const domainCats = Object.keys(domainData.categories || {});
        if (catList.some(c => domainCats.includes(c))) {
          return domainName;
        }
      }
      return "Business & Product Strategy";
    }

    init() {
      // 1. Initial hydration: Check localStorage or seed from window.DEFAULT_PROMPTS
      let initialList = [];
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          initialList = JSON.parse(raw);
        }
      } catch (e) {}

      const defaultList = window.DEFAULT_PROMPTS || [];
      const defTitles = new Set(defaultList.map(dp => (dp.title || "").toLowerCase().trim()));
      const defIds = new Set(defaultList.map(dp => dp.id));
      const needsMigration = Array.isArray(initialList) && initialList.length > 0 && (!initialList.some(p => p.domain) || initialList.length > 400);

      const isBlankMode = localStorage.getItem("prompt_library_blank_mode") === "true";
      if (isBlankMode && Array.isArray(initialList) && initialList.length === 0) {
        this.cachedPrompts = [];
        this._initIndexedDB();
        this._checkSQLiteBackend();
        return;
      }

      if (!Array.isArray(initialList) || initialList.length === 0 || needsMigration) {
        // Recover genuine custom prompts created by user (excluding duplicated imported copies of default prompts)
        const customPrompts = (Array.isArray(initialList) ? initialList : []).filter(p => {
          if (!p.isCustom) return false;
          if (defIds.has(p.id)) return false;
          if (p.title && defTitles.has(p.title.toLowerCase().trim())) return false;
          return true;
        });
        initialList = defaultList.concat(customPrompts);
      } else {
        // Prune deprecated starter prompts and inject newly registered flagship domain exemplars
        if (initialList.some(p => p.id === "prompt-designer-blueprint")) {
          initialList = initialList.filter(p => p.id !== "prompt-designer-blueprint");
          const newStarter = defaultList.find(p => p.id === "seo-geo-website-audit-scorer");
          if (newStarter && !initialList.some(p => p.id === newStarter.id)) {
            initialList.unshift(newStarter);
          }
        }
      }

      this.cachedPrompts = this._normalizeList(initialList);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cachedPrompts));
      } catch (e) {}

      // 2. Asynchronous IndexedDB initialization & sync
      this._initIndexedDB();

      // 3. Optional local SQLite server check
      this._checkSQLiteBackend();
    }

    async _initIndexedDB() {
      try {
        await idb.open();
        const stored = await idb.getAllPrompts();
        if (stored && stored.length > 0 && stored.some(p => p.domain) && stored.length <= 400) {
          this.cachedPrompts = this._normalizeList(stored);
        } else {
          // Persist clean enriched cache to IndexedDB
          await idb.saveAllPrompts(this.cachedPrompts);
        }
      } catch (e) {
        console.warn("IndexedDB sync note:", e);
      }
    }

    async _checkSQLiteBackend() {
      try {
        const resp = await fetch("/api/health", { method: "GET" });
        if (resp.ok) {
          const data = await resp.json();
          if (data && data.status === "ok") {
            this.isSqliteConnected = true;
            this._notifyBackendConnected(data);
          }
        }
      } catch (e) {
        this.isSqliteConnected = false;
      }
    }

    _notifyBackendConnected(data) {
      const brand = document.querySelector(".brand-text");
      if (brand && !document.getElementById("sqliteStatusIndicator")) {
        const badge = document.createElement("span");
        badge.id = "sqliteStatusIndicator";
        badge.title = "Connected to local SQLite database (promptlibrary.db)";
        badge.style.cssText = "font-size: 0.7rem; color: #10b981; margin-left: 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;";
        badge.innerHTML = `<span style="width: 7px; height: 7px; border-radius: 50%; background: #10b981; display: inline-block;"></span> SQLite Active`;
        brand.appendChild(badge);
      }
    }

    getPrompts() {
      if (!this.cachedPrompts || this.cachedPrompts.length === 0) {
        this.init();
      }
      return this.cachedPrompts;
    }

    savePrompts(prompts) {
      this.cachedPrompts = this._normalizeList(prompts);

      // 1. Asynchronously persist to IndexedDB (virtually unlimited capacity)
      idb.saveAllPrompts(this.cachedPrompts).catch(e => console.warn("IDB write warning:", e));

      // 2. Mirror to localStorage with quota protection
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cachedPrompts));
      } catch (e) {
        console.warn("LocalStorage full, continuing with IndexedDB primary storage.");
      }

      return true;
    }

    getPromptById(id) {
      return this.getPrompts().find(p => p.id === id);
    }

    savePrompt(promptData) {
      const list = this.getPrompts();
      const existingIndex = list.findIndex(p => p.id === promptData.id);

      let categories = [];
      if (Array.isArray(promptData.categories) && promptData.categories.length > 0) {
        categories = promptData.categories;
      } else if (promptData.category) {
        categories = [promptData.category];
      } else {
        categories = ["General"];
      }

      let subcategories = [];
      if (Array.isArray(promptData.subcategories)) {
        subcategories = promptData.subcategories;
      } else if (promptData.subcategory) {
        subcategories = [promptData.subcategory];
      }

      const promptToSave = {
        ...promptData,
        author: promptData.author || "Curated",
        authorUrl: promptData.authorUrl || "",
        categories: categories,
        category: categories[0] || "General",
        subcategories: subcategories,
        subcategory: subcategories[0] || "General",
        updatedAt: new Date().toISOString()
      };

      if (existingIndex >= 0) {
        list[existingIndex] = { ...list[existingIndex], ...promptToSave };
      } else {
        promptToSave.id = promptToSave.id || "prompt-" + Date.now();
        promptToSave.isCustom = true;
        promptToSave.createdAt = new Date().toISOString();
        list.unshift(promptToSave);
      }

      this.savePrompts(list);

      // Auto-register any new categories in taxonomy
      const curTax = this.getTaxonomy();
      let taxChanged = false;
      categories.forEach(c => {
        if (!curTax[c]) {
          curTax[c] = [];
          taxChanged = true;
        }
      });
      if (taxChanged) this.saveTaxonomy(curTax);

      // If SQLite is active, post update
      if (this.isSqliteConnected) {
        fetch("/api/prompts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(promptToSave)
        }).catch(() => {});
      }

      return promptToSave;
    }

    deletePrompt(id) {
      const list = this.getPrompts().filter(p => p.id !== id);
      this.savePrompts(list);
      this.removeFavorite(id);

      if (this.isSqliteConnected) {
        fetch(`/api/prompts/${id}`, { method: "DELETE" }).catch(() => {});
      }
      return true;
    }

    duplicatePrompt(id) {
      const orig = this.getPromptById(id);
      if (!orig) return null;

      const duplicated = {
        ...orig,
        id: "prompt-" + Date.now(),
        title: `${orig.title} (Copy)`,
        isCustom: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const list = this.getPrompts();
      list.unshift(duplicated);
      this.savePrompts(list);
      return duplicated;
    }

    // Favorites
    getFavorites() {
      try {
        const raw = localStorage.getItem(FAVORITES_KEY);
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    }

    isFavorite(id) {
      return this.getFavorites().includes(id);
    }

    toggleFavorite(id) {
      let favs = this.getFavorites();
      const idx = favs.indexOf(id);
      let isFav = false;
      if (idx >= 0) {
        favs.splice(idx, 1);
        isFav = false;
      } else {
        favs.push(id);
        isFav = true;
      }
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
      return isFav;
    }

    removeFavorite(id) {
      let favs = this.getFavorites().filter(f => f !== id);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
    }

    // Stats / Usage tracking
    recordUsage(id) {
      try {
        const stats = JSON.parse(localStorage.getItem(STATS_KEY) || "{}");
        stats[id] = stats[id] || { copyCount: 0, lastUsed: null };
        stats[id].copyCount += 1;
        stats[id].lastUsed = new Date().toISOString();
        localStorage.setItem(STATS_KEY, JSON.stringify(stats));
      } catch (e) {}
    }

    getStats() {
      try {
        return JSON.parse(localStorage.getItem(STATS_KEY) || "{}");
      } catch (e) {
        return {};
      }
    }

    // Theme Preference & Global Appearance Presets
    getTheme() {
      return localStorage.getItem(THEME_KEY) || "dark";
    }

    setTheme(theme) {
      localStorage.setItem(THEME_KEY, theme);
    }

    getThemePreset() {
      const preset = localStorage.getItem(THEME_PRESET_KEY);
      if (preset) return preset;
      return this.getTheme() === "light" ? "light" : "cyber";
    }

    setThemePreset(preset) {
      localStorage.setItem(THEME_PRESET_KEY, preset);
      this.setTheme(preset === "light" ? "light" : "dark");
    }

    getAccentColor() {
      return localStorage.getItem(ACCENT_KEY) || "indigo";
    }

    setAccentColor(accent) {
      localStorage.setItem(ACCENT_KEY, accent);
    }

    // Reset to Factory Defaults (Restores starter prompts)
    resetToDefaults() {
      return this.loadStarterPack();
    }

    // Clear all prompts to start with a blank canvas
    clearAllPrompts() {
      this.cachedPrompts = [];
      idb.saveAllPrompts([]).catch(() => {});
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        localStorage.setItem("prompt_library_blank_mode", "true");
        localStorage.removeItem(FAVORITES_KEY);
        localStorage.removeItem(STATS_KEY);
      } catch (e) {}
      if (this.isSqliteConnected) {
        fetch("/api/prompts/clear-all", { method: "POST" }).catch(() => {});
      }
      return true;
    }

    // Load clean Starter Pack
    loadStarterPack() {
      localStorage.removeItem("prompt_library_blank_mode");
      const starter = (window.DEFAULT_PROMPTS || []).map(p => ({
        ...p,
        categories: p.categories || [p.category || "General"],
        isCustom: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
      this.savePrompts(starter);
      return starter.length;
    }

    // Load complete master catalog (e.g. 333+ prompts)
    loadFullCatalog(catalogPrompts) {
      localStorage.removeItem("prompt_library_blank_mode");
      const list = (Array.isArray(catalogPrompts) ? catalogPrompts : []).map(p => ({
        ...p,
        categories: p.categories || [p.category || "General"],
        isCustom: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
      this.savePrompts(list);
      return list.length;
    }

    // Export to JSON
    exportToJSON() {
      const data = {
        version: "3.3.0",
        exportedAt: new Date().toISOString(),
        favorites: this.getFavorites(),
        stats: this.getStats(),
        taxonomyTree: this.getTaxonomyTree(),
        taxonomy: this.getTaxonomy(),
        prompts: this.getPrompts()
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const dateStr = new Date().toISOString().split("T")[0];
      a.href = url;
      a.download = `prompt-library-backup-${dateStr}.json`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 200);
    }

    // Export to Markdown
    exportToMarkdown() {
      const prompts = this.getPrompts();
      let md = `# AI Prompt Library Export\n`;
      md += `*Exported on ${new Date().toLocaleDateString()} with ${prompts.length} prompts*\n\n---\n\n`;

      prompts.forEach((p, idx) => {
        const cats = Array.isArray(p.categories) && p.categories.length > 0 ? p.categories.join(", ") : (p.category || "General");
        md += `## ${idx + 1}. ${p.title}\n`;
        md += `- **Categories:** ${cats} ${p.subcategory ? `> ${p.subcategory}` : ""}\n`;
        md += `- **Difficulty:** ${p.difficulty || "All Levels"}\n`;
        md += `- **Recommended Model:** ${p.model || "Any"}\n`;
        if (p.author) md += `- **Author / Originator:** ${p.author}\n`;
        if (p.authorUrl) md += `- **Author Link:** ${p.authorUrl}\n`;
        if (p.tags && p.tags.length) md += `- **Tags:** \`${p.tags.join("`, `")}\`\n`;
        md += `\n> ${p.description || ""}\n\n`;
        md += `### Prompt Template\n\`\`\`\n${p.template}\n\`\`\`\n\n`;
        if (p.notes) md += `**Notes:** ${p.notes}\n\n`;
        md += `---\n\n`;
      });

      const blob = new Blob([md], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const dateStr = new Date().toISOString().split("T")[0];
      a.href = url;
      a.download = `prompt-library-${dateStr}.md`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 200);
    }

    // Convert Prompcat legacy export to Prompt Library Pro schema
    convertPrompcatFormat(prompcatData) {
      const folders = prompcatData.folders || [];
      const folderMap = new Map();
      folders.forEach(f => folderMap.set(f.id, f.name));

      const taxonomy = {};
      folders.forEach(f => {
        if (f.name && !taxonomy[f.name]) taxonomy[f.name] = [];
      });

      const convertedPrompts = (prompcatData.prompts || []).map(p => {
        const folderName = folderMap.get(p.folderId) || "General";
        const subcategory = (Array.isArray(p.tags) && p.tags.length > 0) ? p.tags[0] : "General";

        if (!taxonomy[folderName]) taxonomy[folderName] = [];
        if (Array.isArray(p.tags)) {
          p.tags.forEach(tag => {
            if (tag && !taxonomy[folderName].includes(tag)) {
              taxonomy[folderName].push(tag);
            }
          });
        }

        let templateText = "";
        if (typeof p.body === "object" && p.body !== null) {
          templateText = JSON.stringify(p.body, null, 2);
        } else {
          templateText = String(p.body || "");
        }

        let description = (p.notes || "").trim();
        if (!description && templateText) {
          const lines = templateText.split("\n").map(l => l.trim()).filter(Boolean);
          description = (lines[0] || "").replace(/^[#*`\s]+/, "").substring(0, 160);
          if (description.length > 157) description += "...";
        }

        const model = folderName.toLowerCase().includes("claude") ? "Claude / Claude Code"
                    : folderName.toLowerCase().includes("gemini") ? "Gemini"
                    : folderName.toLowerCase().includes("image") || folderName.toLowerCase().includes("flux") ? "Midjourney / Flux / DALL-E"
                    : "ChatGPT / Claude / Gemini";

        return {
          id: "prompcat-" + p.id,
          title: String(p.title || "Untitled Prompt").trim(),
          category: folderName,
          categories: [folderName],
          subcategory: subcategory,
          subcategories: Array.isArray(p.tags) ? p.tags : [],
          tags: Array.isArray(p.tags) ? p.tags : [],
          description: description || "Imported from Prompcat",
          template: templateText,
          variables: [],
          notes: p.notes || "",
          isFavorite: Boolean(p.isFavorite),
          isCustom: true,
          difficulty: "All Levels",
          model: model,
          createdAt: p.dateCreated ? new Date(p.dateCreated).toISOString() : new Date().toISOString(),
          updatedAt: p.dateModified ? new Date(p.dateModified).toISOString() : new Date().toISOString()
        };
      });

      return {
        prompts: convertedPrompts,
        taxonomy: taxonomy,
        favorites: convertedPrompts.filter(p => p.isFavorite).map(p => p.id)
      };
    }

    // Import from JSON (Supports Prompt Library Pro v2 and Prompcat formats)
    importFromJSON(jsonText, mode = "merge") {
      try {
        const parsed = JSON.parse(jsonText);
        let importedPrompts = [];
        let importedTaxonomy = null;
        let importedFavorites = null;
        let detectedSource = "standard";

        // Auto-detect Prompcat format: { folders: [...], prompts: [...] } where prompts have body/folderId
        const isPrompcatFormat = parsed && Array.isArray(parsed.folders) && Array.isArray(parsed.prompts) &&
          parsed.prompts.some(p => p.body !== undefined || p.folderId !== undefined);

        if (isPrompcatFormat) {
          const converted = this.convertPrompcatFormat(parsed);
          importedPrompts = converted.prompts;
          importedTaxonomy = converted.taxonomy;
          importedFavorites = converted.favorites;
          detectedSource = "prompcat";
        } else if (Array.isArray(parsed)) {
          importedPrompts = parsed;
        } else if (parsed && Array.isArray(parsed.prompts)) {
          importedPrompts = parsed.prompts;
          importedTaxonomy = parsed.taxonomy || null;
          importedFavorites = parsed.favorites || null;
        } else {
          throw new Error("Invalid format. Expected an array of prompts or object with 'prompts' property.");
        }

        if (mode === "replace") {
          this.savePrompts(importedPrompts);
          if (importedFavorites) localStorage.setItem(FAVORITES_KEY, JSON.stringify(importedFavorites));
          if (importedTaxonomy) this.saveTaxonomy(importedTaxonomy);
        } else {
          const current = this.getPrompts();
          const map = new Map(current.map(p => [p.id, p]));
          importedPrompts.forEach(p => {
            if (!p.id) p.id = "prompt-" + Math.random().toString(36).substr(2, 9);
            map.set(p.id, p);
          });
          this.savePrompts(Array.from(map.values()));

          if (importedFavorites && Array.isArray(importedFavorites)) {
            const currentFavs = this.getFavorites();
            const set = new Set([...currentFavs, ...importedFavorites]);
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(set)));
          }

          if (importedTaxonomy) {
            const curTax = this.getTaxonomy();
            Object.keys(importedTaxonomy).forEach(cat => {
              if (!curTax[cat]) curTax[cat] = [];
              importedTaxonomy[cat].forEach(sub => {
                if (!curTax[cat].includes(sub)) curTax[cat].push(sub);
              });
            });
            this.saveTaxonomy(curTax);
          }
        }
        return { success: true, count: importedPrompts.length, source: detectedSource };
      } catch (e) {
        return { success: false, error: e.message };
      }
    }

    // ----------------------------------------------------
    // Phase 2: Dual-Faceted Taxonomy Hierarchy
    // (7 Domain Pillars -> Scoped Categories -> Deduplicated Subcategories + Source Collections)
    // ----------------------------------------------------
    getNavViewMode() {
      return localStorage.getItem(NAV_MODE_KEY) || "domain";
    }

    setNavViewMode(mode) {
      localStorage.setItem(NAV_MODE_KEY, mode);
    }

    getDefaultTaxonomyTree() {
      return {
        "Business & Product Strategy": {
          icon: "💼",
          categories: {
            "Product Management": ["PRD Specs", "Feature Scoping", "Roadmaps", "User Personas", "Product Strategy"],
            "Business Strategy": ["Competitive Analysis", "GTM Strategy", "Market Research", "Executive Summary"],
            "Executive Presentations": ["Pitch Decks", "Board Summaries", "Slide Decks", "Presentations"]
          }
        },
        "Engineering & Code Architecture": {
          icon: "💻",
          categories: {
            "Coding & Architecture": ["System Architecture", "API Design", "Refactoring", "Clean Code", "Design Patterns"],
            "Developer Tools": ["JSON Schemas", "Validation Scripts", "Regex & Parsers", "CLI Scripts", "Schema & Tools"],
            "Prompt Engineering": ["Few-Shot Design", "System Instructions", "Meta-Prompts", "Guardrails"]
          }
        },
        "Marketing, Content & SEO": {
          icon: "✍️",
          categories: {
            "Marketing Campaigns": ["Ad Copywriting", "Email Campaigns", "Funnel Strategy", "Marketing Campaign"],
            "Content Writing": ["Blog Posts", "Social Media", "Video Scripts", "Style Transformation", "Content & SEO"],
            "SEO & Metadata": ["Keyword Research", "Meta Descriptions", "On-Page SEO", "Search Intent"]
          }
        },
        "Image & Visual Generation": {
          icon: "🎨",
          categories: {
            "Midjourney & Diffusion": ["Hyper-Realistic", "Portraits & People", "Cinematic Lighting", "Visual Prompt"],
            "Photography Styles": ["Vintage Camera", "Studio Lighting", "Street Photography", "Macro Lens"],
            "Digital Art & 3D": ["Surrealism", "Concept Art", "Isometric 3D", "Cyberpunk"]
          }
        },
        "UI / UX & Component Design": {
          icon: "🖥️",
          categories: {
            "Web Components": ["Hero Sections", "Pricing Tables", "Feature Grids", "Navbars", "Component Blueprint"],
            "Design Systems": ["Color Palettes", "Typography Scales", "Spacing Rules", "Dark Mode Patterns"],
            "Interactive UX": ["Micro-interactions", "Onboarding Flows", "Modals & Drawers"]
          }
        },
        "Automation & Workflow Systems": {
          icon: "⚙️",
          categories: {
            "Spreadsheet Automation": ["Excel Formulas", "Google Sheets Scripts", "VBA & Macros", "CRUD Operations"],
            "Workflow Integrations": ["Zapier & Make", "Webhook Routing", "API Connectors", "Workflow Design"],
            "CLI & AI Tooling": ["CLI Automation", "AI Agents", "Python Scripts", "Tooling & CLI"]
          }
        },
        "Education & Productivity": {
          icon: "🎓",
          categories: {
            "Learning & Study": ["Concept Explanations", "Summaries", "Flashcard Builders", "Learning & Productivity"],
            "Writing & Brainstorming": ["Brainstorming", "Idea Validation", "Voice Transcription", "Writing Tools"],
            "Personal Operations": ["Task Planning", "Meeting Minutes", "Habit Tracking"]
          }
        }
      };
    }

    getTaxonomy() {
      const tree = this.getTaxonomyTree();
      const flat = {};
      Object.values(tree).forEach(domainData => {
        if (domainData && domainData.categories) {
          Object.entries(domainData.categories).forEach(([cat, subs]) => {
            flat[cat] = Array.isArray(subs) ? [...subs] : [];
          });
        }
      });
      return flat;
    }

    saveTaxonomy(tax) {
      if (!tax || typeof tax !== "object") return;
      const tree = this.getTaxonomyTree();
      Object.entries(tax).forEach(([cat, subs]) => {
        let found = false;
        for (const domain of Object.values(tree)) {
          if (domain.categories && domain.categories[cat]) {
            domain.categories[cat] = Array.isArray(subs) ? subs : [];
            found = true;
            break;
          }
        }
        if (!found) {
          const targetDomain = "Business & Product Strategy";
          if (!tree[targetDomain].categories) tree[targetDomain].categories = {};
          tree[targetDomain].categories[cat] = Array.isArray(subs) ? subs : [];
        }
      });
      this.saveTaxonomyTree(tree);
    }

    getTaxonomyTree() {
      try {
        const raw = localStorage.getItem(TAXONOMY_TREE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === "object" && Object.keys(parsed).length > 0) {
            return parsed;
          }
        }
      } catch (e) {}
      const def = this.getDefaultTaxonomyTree();
      this.saveTaxonomyTree(def);
      return def;
    }

    saveTaxonomyTree(tree) {
      try {
        localStorage.setItem(TAXONOMY_TREE_KEY, JSON.stringify(tree));
      } catch (e) {}
      if (this.isSqliteConnected) {
        fetch("/api/taxonomy-tree", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tree)
        }).catch(() => {});
      }
    }

    getDomains() {
      const tree = this.getTaxonomyTree();
      const prompts = this.getPrompts();
      return Object.entries(tree).map(([name, data]) => {
        const count = prompts.filter(p => p.domain === name).length;
        return {
          name,
          icon: data.icon || "📁",
          count,
          categories: Object.keys(data.categories || {})
        };
      });
    }

    getSources() {
      const prompts = this.getPrompts();
      const sourceCounts = {};
      prompts.forEach(p => {
        const src = p.source || "PromptVault Core";
        sourceCounts[src] = (sourceCounts[src] || 0) + 1;
      });
      return Object.entries(sourceCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
    }

    getCategoriesForDomain(domainName) {
      const tree = this.getTaxonomyTree();
      const domainData = tree[domainName];
      if (!domainData || !domainData.categories) return [];
      const prompts = this.getPrompts().filter(p => p.domain === domainName);
      return Object.keys(domainData.categories).map(catName => {
        const count = prompts.filter(p => (p.categories || [p.category]).includes(catName)).length;
        return {
          name: catName,
          count,
          subcategories: domainData.categories[catName] || []
        };
      });
    }

    getAllRegisteredSubcategories() {
      const subcats = new Set();
      const tree = this.getTaxonomyTree();
      Object.values(tree).forEach(domainData => {
        if (domainData && domainData.categories) {
          Object.values(domainData.categories).forEach(subList => {
            if (Array.isArray(subList)) subList.forEach(s => subcats.add(s));
          });
        }
      });
      this.getPrompts().forEach(p => {
        if (p.subcategory && p.subcategory !== "General") subcats.add(p.subcategory);
        if (Array.isArray(p.subcategories)) {
          p.subcategories.forEach(s => { if (s && s !== "General") subcats.add(s); });
        }
      });
      return Array.from(subcats).sort();
    }

    addCategoryWithSubcategories(domainName, categoryName, subcategoryList) {
      const tree = this.getTaxonomyTree();
      if (!tree[domainName]) {
        tree[domainName] = { icon: "📁", categories: {} };
      }
      if (!tree[domainName].categories) {
        tree[domainName].categories = {};
      }
      const cleanSubs = Array.from(new Set(subcategoryList || []));
      tree[domainName].categories[categoryName] = cleanSubs;
      this.saveTaxonomyTree(tree);
      return tree[domainName].categories[categoryName];
    }

    linkSubcategory(domainName, categoryName, subcategoryName) {
      const tree = this.getTaxonomyTree();
      if (tree[domainName] && tree[domainName].categories && tree[domainName].categories[categoryName]) {
        if (!tree[domainName].categories[categoryName].includes(subcategoryName)) {
          tree[domainName].categories[categoryName].push(subcategoryName);
          this.saveTaxonomyTree(tree);
        }
      }
    }

    unlinkSubcategory(domainName, categoryName, subcategoryName) {
      const tree = this.getTaxonomyTree();
      if (tree[domainName] && tree[domainName].categories && tree[domainName].categories[categoryName]) {
        tree[domainName].categories[categoryName] = tree[domainName].categories[categoryName].filter(s => s !== subcategoryName);
        this.saveTaxonomyTree(tree);
      }
    }

    deleteCategoryFromDomain(domainName, categoryName) {
      const tree = this.getTaxonomyTree();
      if (tree[domainName] && tree[domainName].categories && tree[domainName].categories[categoryName]) {
        delete tree[domainName].categories[categoryName];
        this.saveTaxonomyTree(tree);
      }
    }

    // ----------------------------------------------------
    // Phase 3: Modular Blueprint Parser & Compiler Engine
    // ----------------------------------------------------
    parsePromptSections(promptOrTemplate) {
      const template = typeof promptOrTemplate === "string" 
        ? promptOrTemplate 
        : (promptOrTemplate && promptOrTemplate.template) || "";
      
      if (!template.trim()) {
        return {
          persona: "",
          objective: "",
          context: "",
          guardrails: "",
          outputRubric: "",
          isModular: false
        };
      }

      // Check if explicit sections object exists
      if (typeof promptOrTemplate === "object" && promptOrTemplate.sections) {
        const s = promptOrTemplate.sections;
        return {
          persona: s.persona || "",
          objective: s.objective || "",
          context: s.context || "",
          guardrails: s.guardrails || "",
          outputRubric: s.outputRubric || s.outputFormat || "",
          isModular: true
        };
      }

      // Smart Heuristic & Markdown Section Extraction
      const lines = template.split("\n");
      let persona = "";
      let objective = "";
      const contextLines = [];
      const guardrailLines = [];
      const outputLines = [];

      let currentMode = "intro";

      lines.forEach(line => {
        const trimmed = line.trim();
        const lower = trimmed.toLowerCase();

        // 1. Persona detection
        if ((lower.startsWith("you are") || lower.startsWith("act as") || lower.startsWith("role:")) && !persona) {
          persona = trimmed.replace(/^role:\s*/i, "");
          return;
        }

        // 2. Objective detection
        if ((lower.startsWith("your task is") || lower.startsWith("task:") || lower.startsWith("objective:") || lower.startsWith("goal:")) && !objective) {
          objective = trimmed.replace(/^(your task is|task:|objective:|goal:)\s*/i, "");
          return;
        }

        // 3. Section Header switches
        if (/^(#+\s*guardrails|#+\s*constraints|reliability & guardrails|negative constraints)/i.test(trimmed)) {
          currentMode = "guardrails";
          return;
        }
        if (/^(#+\s*output|#+\s*deliverable|output specification|format:|deliverable format|response format)/i.test(trimmed)) {
          currentMode = "output";
          return;
        }
        if (/^(#+\s*inputs|#+\s*context|source material|parameters)/i.test(trimmed)) {
          currentMode = "context";
          return;
        }

        // 4. Collection based on active mode
        if (currentMode === "guardrails") {
          guardrailLines.push(line);
        } else if (currentMode === "output") {
          outputLines.push(line);
        } else if (currentMode === "context") {
          contextLines.push(line);
        } else {
          // Heuristic classification for un-headed templates
          if (trimmed.includes("{{") || trimmed.startsWith("**Goal") || trimmed.startsWith("**Target") || trimmed.startsWith("**Context") || trimmed.startsWith("**Deliverable")) {
            contextLines.push(line);
          } else if (/negative|must not|never|avoid|hallucination|fallback/i.test(trimmed) && trimmed.length > 10) {
            guardrailLines.push(line);
          } else if (/generate|sections|rubric|step|checklist/i.test(trimmed) && (trimmed.startsWith("1.") || trimmed.startsWith("-"))) {
            outputLines.push(line);
          } else if (!objective && trimmed.length > 10 && !trimmed.startsWith("#")) {
            objective = trimmed;
          }
        }
      });

      const context = contextLines.join("\n").trim();
      const guardrails = guardrailLines.join("\n").trim();
      const outputRubric = outputLines.join("\n").trim();

      const hasStructuredContent = Boolean(persona && (objective || guardrails || outputRubric));

      return {
        persona: persona || "Expert AI Specialist",
        objective: objective || "Execute the defined task with precision and clarity.",
        context: context || (template.includes("{{") ? "Parameterized dynamic template inputs." : template.slice(0, 160) + "..."),
        guardrails: guardrails || "Adhere strictly to verified facts, mitigate hallucinations, and avoid extraneous filler.",
        outputRubric: outputRubric || "Format output cleanly using structured Markdown with clear headings and bullet points.",
        isModular: hasStructuredContent
      };
    }

    compileBlueprintToTemplate(sections) {
      const parts = [];
      if (sections.persona && sections.persona.trim()) {
        parts.push(sections.persona.trim());
      }
      if (sections.objective && sections.objective.trim()) {
        parts.push(sections.objective.trim());
      }
      if (sections.context && sections.context.trim()) {
        parts.push(sections.context.trim());
      }
      if (sections.guardrails && sections.guardrails.trim()) {
        parts.push(`### Guardrails & Constraints:\n${sections.guardrails.trim()}`);
      }
      if (sections.outputRubric && sections.outputRubric.trim()) {
        parts.push(`### Output Specification & Deliverable:\n${sections.outputRubric.trim()}`);
      }
      return parts.join("\n\n");
    }

    // Backward compatibility helper
    getAllCategories() {
      const tree = this.getTaxonomyTree();
      const all = new Set();
      Object.values(tree).forEach(d => {
        if (d.categories) Object.keys(d.categories).forEach(c => all.add(c));
      });
      this.getPrompts().forEach(p => {
        const cList = p.categories || [p.category || "General"];
        cList.forEach(c => all.add(c));
      });
      return Array.from(all).sort();
    }

    getSubcategoriesForCategory(category) {
      const tree = this.getTaxonomyTree();
      for (const d of Object.values(tree)) {
        if (d.categories && d.categories[category]) {
          return d.categories[category];
        }
      }
      return [];
    }
  }

  window.PromptStorage = new PromptStorage();
})();
