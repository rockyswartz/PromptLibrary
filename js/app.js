// Main Application Controller for Prompt Library
document.addEventListener("DOMContentLoaded", () => {
  // Application State
  const state = {
    prompts: [],
    favorites: [],
    stats: {},
    selectedCategories: new Set(), // Empty means all categories
    tempSelectedCategories: new Set(), // Used inside More Categories modal
    formSelectedCategories: new Set(), // Used inside Add / Edit Prompt modal
    formSelectedSubcategories: new Set(), // Used inside Add / Edit Prompt modal
    navMode: window.PromptStorage ? window.PromptStorage.getNavViewMode() : "domain",
    selectedDomain: null,
    selectedSources: new Set(),
    selectedSubcatsForNewCategory: new Set(),
    searchQuery: "",
    modelFilter: "all",
    difficultyFilter: "all",
    sortBy: "featured",
    favoritesOnly: false,
    selectedPrompt: null,
    variableValues: {},
    editingPromptId: null,
    runnerViewMode: "blueprint",
    formAuthoringMode: "quick"
  };

  // DOM Elements
  const elements = {
    // Theme & Appearance
    themeToggleBtn: document.getElementById("themeToggleBtn"),
    themeIcon: document.getElementById("themeIcon"),
    openThemeModalBtn: document.getElementById("openThemeModalBtn"),
    themeModal: document.getElementById("themeModal"),
    closeThemeModalBtn: document.getElementById("closeThemeModalBtn"),
    closeThemeModalDoneBtn: document.getElementById("closeThemeModalDoneBtn"),
    themePresetsGrid: document.getElementById("themePresetsGrid"),
    themeAccentsRow: document.getElementById("themeAccentsRow"),

    // Search & Filters
    searchInput: document.getElementById("searchInput"),
    searchClearBtn: document.getElementById("searchClearBtn"),
    viewModeDomainBtn: document.getElementById("viewModeDomainBtn"),
    viewModeSourceBtn: document.getElementById("viewModeSourceBtn"),
    categoryNav: document.getElementById("categoryNav"),
    scopedCategoryBar: document.getElementById("scopedCategoryBar"),
    categorySelectionInfo: document.getElementById("categorySelectionInfo"),
    selectedCategoriesCount: document.getElementById("selectedCategoriesCount"),
    clearCategoryFiltersBtn: document.getElementById("clearCategoryFiltersBtn"),
    navManageCatBtn: document.getElementById("navManageCatBtn"),
    openCategoryManagerBtn: document.getElementById("openCategoryManagerBtn"),
    modelFilter: document.getElementById("modelFilter"),
    difficultyFilter: document.getElementById("difficultyFilter"),
    sortBy: document.getElementById("sortBy"),
    favoritesToggleBtn: document.getElementById("favoritesToggleBtn"),

    // Stats
    totalPromptsCount: document.getElementById("totalPromptsCount"),
    totalCategoriesCount: document.getElementById("totalCategoriesCount"),
    totalFavoritesCount: document.getElementById("totalFavoritesCount"),
    statsCategoriesBtn: document.getElementById("statsCategoriesBtn"),

    // Grid
    promptsGrid: document.getElementById("promptsGrid"),

    // Runner Modal
    runnerModal: document.getElementById("runnerModal"),
    runnerTitle: document.getElementById("runnerTitle"),
    runnerCategory: document.getElementById("runnerCategory"),
    runnerModel: document.getElementById("runnerModel"),
    runnerDifficulty: document.getElementById("runnerDifficulty"),
    runnerAuthor: document.getElementById("runnerAuthor"),
    runnerDescription: document.getElementById("runnerDescription"),
    runnerVariablesContainer: document.getElementById("runnerVariablesContainer"),
    runnerOutput: document.getElementById("runnerOutput"),
    runnerCharCount: document.getElementById("runnerCharCount"),
    runnerTokenCount: document.getElementById("runnerTokenCount"),
    runnerCopyBtn: document.getElementById("runnerCopyBtn"),
    runnerEditBtn: document.getElementById("runnerEditBtn"),
    runnerDuplicateBtn: document.getElementById("runnerDuplicateBtn"),
    runnerDeleteBtn: document.getElementById("runnerDeleteBtn"),
    runnerNotes: document.getElementById("runnerNotes"),
    closeRunnerBtn: document.getElementById("closeRunnerBtn"),

    // Phase 3: Runner Tabs & Containers
    runnerTabBlueprint: document.getElementById("runnerTabBlueprint"),
    runnerTabCompiled: document.getElementById("runnerTabCompiled"),
    runnerTabSplit: document.getElementById("runnerTabSplit"),
    runnerContentWrapper: document.getElementById("runnerContentWrapper"),
    runnerBlueprintContainer: document.getElementById("runnerBlueprintContainer"),
    runnerPreviewContainer: document.getElementById("runnerPreviewContainer"),

    // Add / Edit Modal
    promptFormModal: document.getElementById("promptFormModal"),
    formModalTitle: document.getElementById("formModalTitle"),
    promptForm: document.getElementById("promptForm"),
    formPromptId: document.getElementById("formPromptId"),
    formTitle: document.getElementById("formTitle"),
    formCategoryChips: document.getElementById("formCategoryChips"),
    formCategorySelectionHelper: document.getElementById("formCategorySelectionHelper"),
    formInlineNewCatInput: document.getElementById("formInlineNewCatInput"),
    formInlineAddCatBtn: document.getElementById("formInlineAddCatBtn"),
    formSubcategoryChips: document.getElementById("formSubcategoryChips"),
    formSubcatHelper: document.getElementById("formSubcatHelper"),
    formSubcatCountNotice: document.getElementById("formSubcatCountNotice"),
    formCustomSubcategory: document.getElementById("formCustomSubcategory"),
    formAddCustomSubBtn: document.getElementById("formAddCustomSubBtn"),
    promptFormManageCatsBtn: document.getElementById("promptFormManageCatsBtn"),
    formModel: document.getElementById("formModel"),
    formDifficulty: document.getElementById("formDifficulty"),
    formAuthor: document.getElementById("formAuthor"),
    formAuthorUrl: document.getElementById("formAuthorUrl"),
    formTags: document.getElementById("formTags"),
    formDescription: document.getElementById("formDescription"),
    formTemplate: document.getElementById("formTemplate"),
    formNotes: document.getElementById("formNotes"),
    detectedVarsNotice: document.getElementById("detectedVarsNotice"),
    insertChoiceVarBtn: document.getElementById("insertChoiceVarBtn"),
    insertTextVarBtn: document.getElementById("insertTextVarBtn"),
    closeFormModalBtn: document.getElementById("closeFormModalBtn"),
    cancelFormBtn: document.getElementById("cancelFormBtn"),
    openAddPromptBtn: document.getElementById("openAddPromptBtn"),

    // Phase 3: Modular Blueprint Builder in Add/Edit Modal
    formModeQuickBtn: document.getElementById("formModeQuickBtn"),
    formModeModularBtn: document.getElementById("formModeModularBtn"),
    formDeconstructBtn: document.getElementById("formDeconstructBtn"),
    formQuickContainer: document.getElementById("formQuickContainer"),
    formModularContainer: document.getElementById("formModularContainer"),
    formSectionPersona: document.getElementById("formSectionPersona"),
    formSectionObjective: document.getElementById("formSectionObjective"),
    formSectionContext: document.getElementById("formSectionContext"),
    formSectionGuardrails: document.getElementById("formSectionGuardrails"),
    formSectionOutput: document.getElementById("formSectionOutput"),

    // Dedicated Category & Subcategory Manager Modal
    categoryManagerModal: document.getElementById("categoryManagerModal"),
    closeCatManagerBtn: document.getElementById("closeCatManagerBtn"),
    doneCatManagerBtn: document.getElementById("doneCatManagerBtn"),
    catManagerDomainSelect: document.getElementById("catManagerDomainSelect"),
    newCategoryInput: document.getElementById("newCategoryInput"),
    selectedSubcatsContainer: document.getElementById("selectedSubcatsContainer"),
    newSubcatInput: document.getElementById("newSubcatInput"),
    addCustomSubcatBtn: document.getElementById("addCustomSubcatBtn"),
    availableSubcatsPool: document.getElementById("availableSubcatsPool"),
    createCategoryBtn: document.getElementById("createCategoryBtn"),
    taxonomyHierarchyTree: document.getElementById("taxonomyHierarchyTree"),
    taxonomyList: document.getElementById("taxonomyList"),

    // More Categories / Filter Modal
    moreCategoriesModal: document.getElementById("moreCategoriesModal"),
    closeMoreCatModalBtn: document.getElementById("closeMoreCatModalBtn"),
    catSearchInput: document.getElementById("catSearchInput"),
    selectAllCatBtn: document.getElementById("selectAllCatBtn"),
    clearAllCatBtn: document.getElementById("clearAllCatBtn"),
    moreCatGrid: document.getElementById("moreCatGrid"),
    newCatNameInput: document.getElementById("newCatNameInput"),
    addNewCatBtn: document.getElementById("addNewCatBtn"),
    cancelMoreCatBtn: document.getElementById("cancelMoreCatBtn"),
    applyMoreCatBtn: document.getElementById("applyMoreCatBtn"),
    moreCatSelectedSummary: document.getElementById("moreCatSelectedSummary"),

    // Data / Backup Modal
    dataModal: document.getElementById("dataModal"),
    openDataModalBtn: document.getElementById("openDataModalBtn"),
    closeDataModalBtn: document.getElementById("closeDataModalBtn"),
    exportJsonBtn: document.getElementById("exportJsonBtn"),
    exportMdBtn: document.getElementById("exportMdBtn"),
    exportSqliteBtn: document.getElementById("exportSqliteBtn"),
    importFile: document.getElementById("importFile"),
    importModeSelect: document.getElementById("importModeSelect"),
    resetDefaultsBtn: document.getElementById("resetDefaultsBtn"),
    clearAllPromptsBtn: document.getElementById("clearAllPromptsBtn"),
    loadStarterPackBtn: document.getElementById("loadStarterPackBtn"),
    ingestTitle: document.getElementById("ingestTitle"),
    ingestAuthor: document.getElementById("ingestAuthor"),
    ingestRawText: document.getElementById("ingestRawText"),
    ingestAutoVars: document.getElementById("ingestAutoVars"),
    ingestConvertBtn: document.getElementById("ingestConvertBtn"),
    ingestBulkFiles: document.getElementById("ingestBulkFiles"),
    // Help Center, Interactive Tour & Wiki
    openWikiBtn: document.getElementById("openWikiBtn"),
    statsWikiBtn: document.getElementById("statsWikiBtn"),
    jumpToWikiFromHelpBtn: document.getElementById("jumpToWikiFromHelpBtn"),
    openHelpModalBtn: document.getElementById("openHelpModalBtn"),
    helpModal: document.getElementById("helpModal"),
    closeHelpModalBtn: document.getElementById("closeHelpModalBtn"),
    closeHelpModalDoneBtn: document.getElementById("closeHelpModalDoneBtn"),
    startSpotlightTourBtn: document.getElementById("startSpotlightTourBtn"),
    helpStartTourHeroBtn: document.getElementById("helpStartTourHeroBtn"),
    helpModalStartTourSecondaryBtn: document.getElementById("helpModalStartTourSecondaryBtn"),
    helpOpenCatManagerBtn: document.getElementById("helpOpenCatManagerBtn"),
    helpCreatePromptBtn: document.getElementById("helpCreatePromptBtn"),
    helpOpenDataModalBtn: document.getElementById("helpOpenDataModalBtn"),
    helpSandboxTemplate: document.getElementById("helpSandboxTemplate"),
    helpDemoProduct: document.getElementById("helpDemoProduct"),
    helpDemoAudience: document.getElementById("helpDemoAudience"),
    helpSandboxResult: document.getElementById("helpSandboxResult"),

    tourOverlay: document.getElementById("tourOverlay"),
    tourHighlightBox: document.getElementById("tourHighlightBox"),
    tourCard: document.getElementById("tourCard"),
    tourStepBadge: document.getElementById("tourStepBadge"),
    tourCloseBtn: document.getElementById("tourCloseBtn"),
    tourCardTitle: document.getElementById("tourCardTitle"),
    tourCardDesc: document.getElementById("tourCardDesc"),
    tourPrevBtn: document.getElementById("tourPrevBtn"),
    tourProgressDots: document.getElementById("tourProgressDots"),
    tourSkipBtn: document.getElementById("tourSkipBtn"),
    tourNextBtn: document.getElementById("tourNextBtn"),

    // Toast
    toastContainer: document.getElementById("toastContainer"),

    // Back to top
    backToTopBtn: document.getElementById("backToTopBtn")
  };

  // SVGs for clean iconography
  const ICONS = {
    copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    starFilled: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
    moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`
  };

  // ----------------------------------------------------
  // Initialization
  // ----------------------------------------------------
  function init() {
    loadTheme();
    refreshData();
    setupEventListeners();
    window.addEventListener("resize", debounce(enforceThreeRowsLimit, 200));
  }

  function refreshData() {
    state.prompts = window.PromptStorage.getPrompts();
    state.favorites = window.PromptStorage.getFavorites();
    state.stats = window.PromptStorage.getStats();
    updateStatsBar();
    renderCategories();
    renderGrid();
  }

  // ----------------------------------------------------
  // Global Appearance & Theme Management (Phase 1)
  // ----------------------------------------------------
  function loadTheme() {
    const savedPreset = window.PromptStorage.getThemePreset();
    const savedAccent = window.PromptStorage.getAccentColor();
    const isLight = savedPreset === "light";
    const mode = isLight ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", mode);
    document.documentElement.setAttribute("data-theme-preset", savedPreset);
    document.documentElement.setAttribute("data-accent", savedAccent);

    updateThemeIcon(mode);
    syncThemeModalUI(savedPreset, savedAccent);
  }

  function applyThemePreset(preset) {
    window.PromptStorage.setThemePreset(preset);
    const isLight = preset === "light";
    const mode = isLight ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", mode);
    document.documentElement.setAttribute("data-theme-preset", preset);
    updateThemeIcon(mode);
    syncThemeModalUI(preset, window.PromptStorage.getAccentColor());
    showToast(`Atmosphere set to ${formatPresetName(preset)}`, "info");
  }

  function applyAccentColor(accent) {
    window.PromptStorage.setAccentColor(accent);
    document.documentElement.setAttribute("data-accent", accent);
    syncThemeModalUI(window.PromptStorage.getThemePreset(), accent);
    showToast(`Accent color updated to ${formatAccentName(accent)}`, "info");
  }

  function toggleTheme() {
    const currentPreset = window.PromptStorage.getThemePreset();
    let nextPreset;
    if (currentPreset === "light") {
      nextPreset = localStorage.getItem("prompt_library_last_dark_preset") || "cyber";
    } else {
      localStorage.setItem("prompt_library_last_dark_preset", currentPreset);
      nextPreset = "light";
    }
    applyThemePreset(nextPreset);
  }

  function formatPresetName(preset) {
    const names = {
      cyber: "Deep Space Cyber",
      oled: "Midnight OLED",
      dracula: "Dracula Charcoal",
      nordic: "Nordic Slate",
      light: "Clean Studio Light"
    };
    return names[preset] || preset;
  }

  function formatAccentName(accent) {
    const names = {
      indigo: "Electric Indigo",
      cyan: "Cyber Cyan",
      emerald: "Emerald Forest",
      amber: "Sunset Amber",
      rose: "Neon Rose",
      purple: "Royal Violet"
    };
    return names[accent] || accent;
  }

  function syncThemeModalUI(activePreset, activeAccent) {
    // Preset cards
    if (elements.themePresetsGrid) {
      const cards = elements.themePresetsGrid.querySelectorAll(".theme-preset-card");
      cards.forEach(card => {
        const p = card.getAttribute("data-preset");
        const isActive = p === activePreset;
        card.classList.toggle("active", isActive);
        card.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
    }

    // Accent buttons
    if (elements.themeAccentsRow) {
      const buttons = elements.themeAccentsRow.querySelectorAll(".accent-swatch-btn");
      buttons.forEach(btn => {
        const a = btn.getAttribute("data-accent");
        btn.classList.toggle("active", a === activeAccent);
      });
    }
  }

  function openThemeModal() {
    if (!elements.themeModal) return;
    syncThemeModalUI(window.PromptStorage.getThemePreset(), window.PromptStorage.getAccentColor());
    if (typeof elements.themeModal.showModal === "function") {
      elements.themeModal.showModal();
    } else {
      elements.themeModal.setAttribute("open", "");
    }
  }

  function closeThemeModal() {
    if (!elements.themeModal) return;
    if (typeof elements.themeModal.close === "function") {
      elements.themeModal.close();
    } else {
      elements.themeModal.removeAttribute("open");
    }
  }

  function updateThemeIcon(theme) {
    if (elements.themeIcon) {
      elements.themeIcon.innerHTML = theme === "dark" ? ICONS.sun : ICONS.moon;
    }
  }

  // ----------------------------------------------------
  // Statistics Bar
  // ----------------------------------------------------
  function updateStatsBar() {
    if (elements.totalPromptsCount) elements.totalPromptsCount.textContent = state.prompts.length;
    
    const categories = window.PromptStorage.getAllCategories();
    if (elements.totalCategoriesCount) elements.totalCategoriesCount.textContent = categories.length;
    
    if (elements.totalFavoritesCount) elements.totalFavoritesCount.textContent = state.favorites.length;
  }

  // ----------------------------------------------------
  // Phase 2: Navigation Bar (Dual-Faceted: Domains vs Collection Packs)
  // ----------------------------------------------------
  function renderCategories() {
    if (!elements.categoryNav) return;

    // Synchronize Nav Mode Toggle Buttons
    if (elements.viewModeDomainBtn && elements.viewModeSourceBtn) {
      const isDomain = state.navMode === "domain";
      elements.viewModeDomainBtn.classList.toggle("active", isDomain);
      elements.viewModeDomainBtn.setAttribute("aria-selected", isDomain ? "true" : "false");
      elements.viewModeSourceBtn.classList.toggle("active", !isDomain);
      elements.viewModeSourceBtn.setAttribute("aria-selected", !isDomain ? "true" : "false");
    }

    if (state.navMode === "domain") {
      renderDomainNav();
    } else {
      renderSourceNav();
    }
  }

  function renderDomainNav() {
    const domains = window.PromptStorage.getDomains();
    const totalPrompts = state.prompts.length;
    const isAllActive = state.selectedDomain === null && state.selectedCategories.size === 0;

    let html = `
      <button class="category-pill ${isAllActive ? 'active' : ''}" data-domain="all">
        🌐 All Domains
        <span class="category-count">${totalPrompts}</span>
      </button>
    `;

    domains.forEach(d => {
      const isSelected = state.selectedDomain === d.name;
      html += `
        <button class="category-pill ${isSelected ? 'active' : ''}" data-domain="${escapeHTML(d.name)}" title="${d.categories.length} subcategories">
          <span>${d.icon || '📁'}</span>
          <span>${escapeHTML(d.name)}</span>
          <span class="category-count">${d.count}</span>
        </button>
      `;
    });

    elements.categoryNav.innerHTML = html;

    // Attach click listeners to domain pills
    elements.categoryNav.querySelectorAll(".category-pill[data-domain]").forEach(btn => {
      btn.addEventListener("click", () => {
        const dom = btn.getAttribute("data-domain");
        if (dom === "all") {
          state.selectedDomain = null;
          state.selectedCategories.clear();
        } else {
          // Toggle domain
          if (state.selectedDomain === dom) {
            state.selectedDomain = null;
            state.selectedCategories.clear();
          } else {
            state.selectedDomain = dom;
            state.selectedCategories.clear();
          }
        }
        renderCategories();
        renderGrid();
      });
    });

    // Render Contextual Scoped Category Bar
    renderScopedCategories();

    // Update selection count info
    updateCategorySelectionInfo();
  }

  function renderScopedCategories() {
    if (!elements.scopedCategoryBar) return;

    if (!state.selectedDomain) {
      elements.scopedCategoryBar.style.display = "none";
      elements.scopedCategoryBar.innerHTML = "";
      return;
    }

    const domainCats = window.PromptStorage.getCategoriesForDomain(state.selectedDomain);
    const domainPromptsCount = state.prompts.filter(p => p.domain === state.selectedDomain).length;
    const isAllInDomainActive = state.selectedCategories.size === 0;

    let html = `
      <span class="scoped-category-label">📂 Sub-Categories:</span>
      <button class="scoped-category-chip ${isAllInDomainActive ? 'active' : ''}" data-scoped-category="all">
        All in ${escapeHTML(state.selectedDomain.split(',')[0].split('&')[0].trim())} (${domainPromptsCount})
      </button>
    `;

    domainCats.forEach(c => {
      const isSelected = state.selectedCategories.has(c.name);
      html += `
        <button class="scoped-category-chip ${isSelected ? 'active' : ''}" data-scoped-category="${escapeHTML(c.name)}">
          ${escapeHTML(c.name)}
          <span class="category-count" style="margin-left: 0.25rem;">${c.count}</span>
        </button>
      `;
    });

    elements.scopedCategoryBar.innerHTML = html;
    elements.scopedCategoryBar.style.display = "flex";

    // Attach listeners to scoped category chips
    elements.scopedCategoryBar.querySelectorAll(".scoped-category-chip[data-scoped-category]").forEach(chip => {
      chip.addEventListener("click", () => {
        const cat = chip.getAttribute("data-scoped-category");
        if (cat === "all") {
          state.selectedCategories.clear();
        } else {
          if (state.selectedCategories.has(cat)) {
            state.selectedCategories.delete(cat);
          } else {
            state.selectedCategories.add(cat);
          }
        }
        renderScopedCategories();
        renderGrid();
        updateCategorySelectionInfo();
      });
    });
  }

  function renderSourceNav() {
    if (elements.scopedCategoryBar) {
      elements.scopedCategoryBar.style.display = "none";
      elements.scopedCategoryBar.innerHTML = "";
    }

    const sources = window.PromptStorage.getSources();
    const totalPrompts = state.prompts.length;
    const isAllActive = state.selectedSources.size === 0;

    let html = `
      <button class="category-pill ${isAllActive ? 'active' : ''}" data-source="all">
        📦 All Collections
        <span class="category-count">${totalPrompts}</span>
      </button>
    `;

    sources.forEach(s => {
      const isSelected = state.selectedSources.has(s.name);
      html += `
        <button class="category-pill ${isSelected ? 'active' : ''}" data-source="${escapeHTML(s.name)}">
          <span>📦</span>
          <span>${escapeHTML(s.name)}</span>
          <span class="category-count">${s.count}</span>
        </button>
      `;
    });

    elements.categoryNav.innerHTML = html;

    // Attach click listeners to source pills
    elements.categoryNav.querySelectorAll(".category-pill[data-source]").forEach(btn => {
      btn.addEventListener("click", () => {
        const src = btn.getAttribute("data-source");
        if (src === "all") {
          state.selectedSources.clear();
        } else {
          if (state.selectedSources.has(src)) {
            state.selectedSources.delete(src);
          } else {
            state.selectedSources.add(src);
          }
        }
        renderCategories();
        renderGrid();
        updateCategorySelectionInfo();
      });
    });

    updateCategorySelectionInfo();
  }

  function updateCategorySelectionInfo() {
    if (!elements.categorySelectionInfo || !elements.selectedCategoriesCount) return;

    if (state.navMode === "domain") {
      let text = "";
      if (state.selectedDomain && state.selectedCategories.size > 0) {
        const count = state.selectedCategories.size;
        text = `${state.selectedDomain} > ${count} subcategor${count > 1 ? 'ies' : 'y'} active`;
      } else if (state.selectedDomain) {
        text = `Domain: ${state.selectedDomain} active`;
      } else if (state.selectedCategories.size > 0) {
        const count = state.selectedCategories.size;
        text = `${count} categor${count > 1 ? 'ies' : 'y'} active`;
      }

      if (text) {
        elements.categorySelectionInfo.style.display = "flex";
        elements.selectedCategoriesCount.textContent = text;
      } else {
        elements.categorySelectionInfo.style.display = "none";
      }
    } else {
      if (state.selectedSources.size > 0) {
        const count = state.selectedSources.size;
        elements.categorySelectionInfo.style.display = "flex";
        elements.selectedCategoriesCount.textContent = `${count} collection pack${count > 1 ? 's' : ''} active`;
      } else {
        elements.categorySelectionInfo.style.display = "none";
      }
    }
  }

  function enforceThreeRowsLimit() {
    const nav = elements.categoryNav;
    if (!nav) return;
    // Keep flex wrap clean for pills
  }

  // ----------------------------------------------------
  // Phase 2: Dedicated Hierarchical Taxonomy & Deduplication Manager Modal
  // ----------------------------------------------------
  function openCategoryManagerModal() {
    state.selectedSubcatsForNewCategory.clear();
    if (elements.newCategoryInput) elements.newCategoryInput.value = "";
    if (elements.newSubcatInput) elements.newSubcatInput.value = "";

    renderTaxonomyManager();

    if (elements.categoryManagerModal && typeof elements.categoryManagerModal.showModal === "function") {
      elements.categoryManagerModal.showModal();
    }
  }

  function renderTaxonomyManager() {
    populateCatManagerDomainSelect();
    renderSubcatDedupPool();
    renderTaxonomyHierarchyTree();
  }

  function populateCatManagerDomainSelect() {
    if (!elements.catManagerDomainSelect) return;
    const domains = window.PromptStorage.getDomains();
    elements.catManagerDomainSelect.innerHTML = domains.map(d => `
      <option value="${escapeHTML(d.name)}" ${state.selectedDomain === d.name ? 'selected' : ''}>
        ${d.icon || '📁'} ${escapeHTML(d.name)}
      </option>
    `).join("");
  }

  function renderSubcatDedupPool() {
    // 1. Render Selected Subcategories Container
    if (elements.selectedSubcatsContainer) {
      if (state.selectedSubcatsForNewCategory.size === 0) {
        elements.selectedSubcatsContainer.innerHTML = "";
      } else {
        elements.selectedSubcatsContainer.innerHTML = Array.from(state.selectedSubcatsForNewCategory).map(sub => `
          <span class="subcat-pill-selected">
            <span>${escapeHTML(sub)}</span>
            <button type="button" class="subcat-remove-btn" data-sub="${escapeHTML(sub)}" title="Remove subcategory">✕</button>
          </span>
        `).join("");

        // Attach remove listeners
        elements.selectedSubcatsContainer.querySelectorAll(".subcat-remove-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const sub = btn.getAttribute("data-sub");
            state.selectedSubcatsForNewCategory.delete(sub);
            renderSubcatDedupPool();
          });
        });
      }
    }

    // 2. Render Shared Master Pool of All Existing Subcategories
    if (elements.availableSubcatsPool) {
      const allRegisteredSubs = window.PromptStorage.getAllRegisteredSubcategories();
      
      elements.availableSubcatsPool.innerHTML = allRegisteredSubs.map(sub => {
        const isSelected = state.selectedSubcatsForNewCategory.has(sub);
        return `
          <button type="button" class="subcat-pool-chip ${isSelected ? 'active' : ''}" data-sub="${escapeHTML(sub)}" title="Click to ${isSelected ? 'remove' : 'link'}">
            <span>${isSelected ? '✓' : '+'}</span>
            <span>${escapeHTML(sub)}</span>
          </button>
        `;
      }).join("");

      // Attach click listeners to pool chips
      elements.availableSubcatsPool.querySelectorAll(".subcat-pool-chip").forEach(chip => {
        chip.addEventListener("click", () => {
          const sub = chip.getAttribute("data-sub");
          if (state.selectedSubcatsForNewCategory.has(sub)) {
            state.selectedSubcatsForNewCategory.delete(sub);
          } else {
            state.selectedSubcatsForNewCategory.add(sub);
          }
          renderSubcatDedupPool();
        });
      });
    }
  }

  function renderTaxonomyHierarchyTree() {
    if (!elements.taxonomyHierarchyTree) return;

    const tree = window.PromptStorage.getTaxonomyTree();
    const prompts = state.prompts;

    elements.taxonomyHierarchyTree.innerHTML = Object.entries(tree).map(([domainName, domainData]) => {
      const catsObj = domainData.categories || {};
      const catNames = Object.keys(catsObj).sort();
      const domainPromptCount = prompts.filter(p => p.domain === domainName).length;

      return `
        <div class="taxonomy-domain-group" data-domain="${escapeHTML(domainName)}">
          <div class="taxonomy-domain-header" tabindex="0" role="button">
            <div class="taxonomy-domain-title">
              <span style="font-size: 1.15rem;">${domainData.icon || '📁'}</span>
              <span>${escapeHTML(domainName)}</span>
              <span class="taxonomy-domain-badge">${catNames.length} categories · ${domainPromptCount} prompts</span>
            </div>
            <span class="domain-toggle-icon" style="font-size: 0.8rem; color: var(--text-muted); transition: transform 0.2s ease;">▸</span>
          </div>

          <div class="taxonomy-domain-content" style="display: none;">
            <div class="taxonomy-cats-grid">
              ${catNames.length > 0 ? catNames.map(catName => {
                const subcats = Array.isArray(catsObj[catName]) ? catsObj[catName] : [];
                const catPrompts = prompts.filter(p => p.domain === domainName && (p.categories || [p.category]).includes(catName));

                return `
                  <div class="taxonomy-cat-card" data-category="${escapeHTML(catName)}">
                    <div class="taxonomy-cat-header">
                      <div class="taxonomy-cat-name">
                        <span>${escapeHTML(catName)}</span>
                        <span class="category-count">${catPrompts.length}</span>
                      </div>
                      <button type="button" class="btn btn-ghost btn-delete-cat-domain" data-domain="${escapeHTML(domainName)}" data-category="${escapeHTML(catName)}" title="Delete category" style="color: var(--accent-rose); padding: 0.2rem 0.5rem; font-size: 0.725rem;">
                        ✕ Delete
                      </button>
                    </div>

                    <div class="taxonomy-subcats-strip">
                      ${subcats.length > 0 ? subcats.map(sub => `
                        <span class="subcat-chip-tag">
                          <span>${escapeHTML(sub)}</span>
                          <button type="button" class="btn-unlink-sub" data-domain="${escapeHTML(domainName)}" data-category="${escapeHTML(catName)}" data-subcategory="${escapeHTML(sub)}" title="Unlink subcategory">✕</button>
                        </span>
                      `).join("") : `<span style="font-size: 0.725rem; color: var(--text-muted); font-style: italic;">No subcategories linked</span>`}
                    </div>
                  </div>
                `;
              }).join("") : `<p style="grid-column: 1 / -1; font-size: 0.8rem; color: var(--text-muted); font-style: italic; padding: 0.5rem;">No categories in this domain yet. Create one above!</p>`}
            </div>
          </div>
        </div>
      `;
    }).join("");

    // Attach mutual-exclusion accordion toggling to domain headers
    elements.taxonomyHierarchyTree.querySelectorAll(".taxonomy-domain-header").forEach(header => {
      header.addEventListener("click", () => {
        const group = header.closest(".taxonomy-domain-group");
        const content = group.querySelector(".taxonomy-domain-content");
        const isCurrentlyHidden = content.style.display === "none";

        // Auto-close all other open tabs in hierarchy tree to prevent squishing
        elements.taxonomyHierarchyTree.querySelectorAll(".taxonomy-domain-group").forEach(otherGroup => {
          const otherContent = otherGroup.querySelector(".taxonomy-domain-content");
          const otherIcon = otherGroup.querySelector(".domain-toggle-icon");
          if (otherContent) otherContent.style.display = "none";
          if (otherIcon) otherIcon.textContent = "▸";
          otherGroup.classList.remove("expanded");
        });

        // Open selected tab if it was closed
        if (isCurrentlyHidden) {
          content.style.display = "grid";
          const icon = header.querySelector(".domain-toggle-icon");
          if (icon) icon.textContent = "▾";
          group.classList.add("expanded");
          setTimeout(() => {
            group.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }, 50);
        }
      });
    });

    // Attach Delete Category Listener
    elements.taxonomyHierarchyTree.querySelectorAll(".btn-delete-cat-domain").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const dom = btn.getAttribute("data-domain");
        const cat = btn.getAttribute("data-category");
        if (confirm(`Delete category "${cat}" from domain "${dom}"?`)) {
          window.PromptStorage.deleteCategoryFromDomain(dom, cat);
          renderTaxonomyHierarchyTree();
          renderCategories();
          renderGrid();
          showToast(`Deleted category "${cat}"`, "info");
        }
      });
    });

    // Attach Unlink Subcategory Listener
    elements.taxonomyHierarchyTree.querySelectorAll(".btn-unlink-sub").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const dom = btn.getAttribute("data-domain");
        const cat = btn.getAttribute("data-category");
        const sub = btn.getAttribute("data-subcategory");
        window.PromptStorage.unlinkSubcategory(dom, cat, sub);
        renderTaxonomyHierarchyTree();
        renderSubcatDedupPool();
        showToast(`Unlinked "${sub}" from ${cat}`, "info");
      });
    });
  }

  // ----------------------------------------------------
  // "More Categories" Filter Modal
  // ----------------------------------------------------
  function openMoreCategoriesModal() {
    state.tempSelectedCategories = new Set(state.selectedCategories);
    if (elements.catSearchInput) elements.catSearchInput.value = "";
    renderMoreCategoriesGrid();
    updateMoreCatSummary();

    if (elements.moreCategoriesModal && typeof elements.moreCategoriesModal.showModal === "function") {
      elements.moreCategoriesModal.showModal();
    }
  }

  function renderMoreCategoriesGrid(filterQuery = "") {
    if (!elements.moreCatGrid) return;

    const allCategories = window.PromptStorage.getAllCategories();
    const query = filterQuery.toLowerCase().trim();

    const catCounts = {};
    state.prompts.forEach(p => {
      const cats = Array.isArray(p.categories) && p.categories.length > 0 ? p.categories : [p.category || "General"];
      cats.forEach(c => {
        catCounts[c] = (catCounts[c] || 0) + 1;
      });
    });

    const filtered = allCategories.filter(cat => {
      if (!query) return true;
      const subcats = window.PromptStorage.getSubcategoriesForCategory(cat);
      return cat.toLowerCase().includes(query) || subcats.some(s => s.toLowerCase().includes(query));
    });

    if (filtered.length === 0) {
      elements.moreCatGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-muted);">
          No categories found matching "${escapeHTML(filterQuery)}". You can create it below!
        </div>
      `;
      return;
    }

    elements.moreCatGrid.innerHTML = filtered.map(cat => {
      const isSelected = state.tempSelectedCategories.has(cat);
      const count = catCounts[cat] || 0;

      return `
        <div class="cat-card-item ${isSelected ? 'selected' : ''}" data-cat="${escapeHTML(cat)}" title="${escapeHTML(cat)}">
          <span class="cat-card-name">
            <input type="checkbox" class="cat-card-checkbox" ${isSelected ? 'checked' : ''} />
            <span class="cat-card-title">${escapeHTML(cat)}</span>
          </span>
          <span class="cat-card-count">${count} prompt${count === 1 ? '' : 's'}</span>
        </div>
      `;
    }).join("");

    elements.moreCatGrid.querySelectorAll(".cat-card-item").forEach(card => {
      card.addEventListener("click", (e) => {
        const cat = card.getAttribute("data-cat");
        const checkbox = card.querySelector(".cat-card-checkbox");
        
        if (e.target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }

        if (checkbox.checked) {
          state.tempSelectedCategories.add(cat);
          card.classList.add("selected");
        } else {
          state.tempSelectedCategories.delete(cat);
          card.classList.remove("selected");
        }
        updateMoreCatSummary();
      });
    });
  }

  function updateMoreCatSummary() {
    if (elements.moreCatSelectedSummary) {
      const count = state.tempSelectedCategories.size;
      elements.moreCatSelectedSummary.textContent = count === 0
        ? "No category filters active (All prompts visible)"
        : `${count} categor${count > 1 ? 'ies' : 'y'} selected`;
    }
  }

  // ----------------------------------------------------
  // Filtering & Sorting Logic
  // ----------------------------------------------------
  function getFilteredPrompts() {
    let result = [...state.prompts];

    // Favorites Only filter
    if (state.favoritesOnly) {
      result = result.filter(p => state.favorites.includes(p.id));
    }

    // Navigation View Mode Filtering
    if (state.navMode === "domain") {
      // 1. Domain Filter
      if (state.selectedDomain) {
        result = result.filter(p => p.domain === state.selectedDomain);
      }
      // 2. Scoped Category Filter
      if (state.selectedCategories.size > 0) {
        result = result.filter(p => {
          const promptCats = Array.isArray(p.categories) && p.categories.length > 0
            ? p.categories
            : [p.category || "General"];
          return promptCats.some(c => state.selectedCategories.has(c));
        });
      }
    } else if (state.navMode === "source") {
      // Source / Collection Pack Filter
      if (state.selectedSources.size > 0) {
        result = result.filter(p => state.selectedSources.has(p.source || "PromptVault Core"));
      }
    }

    // Model filter
    if (state.modelFilter && state.modelFilter !== "all") {
      const mf = state.modelFilter.toLowerCase();
      result = result.filter(p => (p.model || "").toLowerCase().includes(mf));
    }

    // Difficulty filter
    if (state.difficultyFilter && state.difficultyFilter !== "all") {
      result = result.filter(p => (p.difficulty || "").toLowerCase() === state.difficultyFilter.toLowerCase());
    }

    // Search Query
    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase().trim();
      result = result.filter(p => {
        const titleMatch = (p.title || "").toLowerCase().includes(query);
        const descMatch = (p.description || "").toLowerCase().includes(query);
        const templateMatch = (p.template || "").toLowerCase().includes(query);
        const authorMatch = (p.author || "").toLowerCase().includes(query);
        const domainMatch = (p.domain || "").toLowerCase().includes(query);
        const sourceMatch = (p.source || "").toLowerCase().includes(query);
        const subcatMatch = (p.subcategory || "").toLowerCase().includes(query);
        const cats = Array.isArray(p.categories) ? p.categories : [p.category || ""];
        const catMatch = cats.some(c => c.toLowerCase().includes(query));
        const tagsMatch = (p.tags || []).some(t => t.toLowerCase().includes(query));
        return titleMatch || descMatch || templateMatch || authorMatch || domainMatch || sourceMatch || subcatMatch || catMatch || tagsMatch;
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (state.sortBy === "featured") {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (b.createdAt || "").localeCompare(a.createdAt || "");
      } else if (state.sortBy === "title") {
        return (a.title || "").localeCompare(b.title || "");
      } else if (state.sortBy === "popular") {
        const usesA = state.stats[a.id]?.copyCount || 0;
        const usesB = state.stats[b.id]?.copyCount || 0;
        return usesB - usesA;
      } else if (state.sortBy === "recent") {
        return (b.createdAt || "").localeCompare(a.createdAt || "");
      }
      return 0;
    });

    return result;
  }

  // ----------------------------------------------------
  // Grid Rendering (Displays Multi-Category & Provenance Badges)
  // ----------------------------------------------------
  function renderGrid() {
    if (!elements.promptsGrid) return;

    const filtered = getFilteredPrompts();

    if (filtered.length === 0) {
      elements.promptsGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <h3 class="empty-title">No prompts found</h3>
          <p class="empty-subtitle">We couldn't find any prompts matching your active filters. Try clearing some filters or searching for different keywords.</p>
          <button class="btn btn-secondary" id="clearAllFiltersBtn">Clear All Filters</button>
        </div>
      `;

      const clearBtn = document.getElementById("clearAllFiltersBtn");
      if (clearBtn) {
        clearBtn.addEventListener("click", () => {
          state.searchQuery = "";
          state.selectedDomain = null;
          state.selectedCategories.clear();
          state.selectedSources.clear();
          state.modelFilter = "all";
          state.difficultyFilter = "all";
          state.favoritesOnly = false;
          if (elements.searchInput) elements.searchInput.value = "";
          if (elements.modelFilter) elements.modelFilter.value = "all";
          if (elements.difficultyFilter) elements.difficultyFilter.value = "all";
          if (elements.favoritesToggleBtn) elements.favoritesToggleBtn.classList.remove("active");
          if (elements.searchClearBtn) elements.searchClearBtn.style.display = "none";
          renderCategories();
          renderGrid();
        });
      }
      return;
    }

    elements.promptsGrid.innerHTML = filtered.map(prompt => {
      const isFav = state.favorites.includes(prompt.id);
      const templateStr = prompt.template || "";
      const vars = extractVariableDefinitions(templateStr, prompt.variables);
      const choiceVarsCount = vars.filter(v => v.isChoice).length;
      const previewText = templateStr.replace(/\{\{[^}]+\}\}/g, "[...]").substring(0, 140) + "...";
      const sections = window.PromptStorage ? window.PromptStorage.parsePromptSections(prompt) : { isModular: false };

      const promptCats = Array.isArray(prompt.categories) && prompt.categories.length > 0
        ? prompt.categories
        : [prompt.category || "General"];

      return `
        <article class="prompt-card" data-id="${prompt.id}">
          <div class="card-header">
            <div class="card-meta-top">
              ${sections.isModular ? `<span class="badge-blueprint" title="Enterprise Modular Blueprint Structure">📐 Blueprint</span>` : ""}
              ${promptCats.map(cat => `<span class="badge-category">${escapeHTML(cat)}</span>`).join(" ")}
              ${prompt.subcategory ? `<span class="badge-difficulty" style="background: rgba(6, 182, 212, 0.1); color: #67e8f9; border: 1px solid rgba(6, 182, 212, 0.25); font-weight: 600;">${escapeHTML(prompt.subcategory)}</span>` : ""}
              ${prompt.source && prompt.source !== "PromptVault Core" ? `<span class="badge-source" style="font-size: 0.72rem; padding: 0.2rem 0.5rem; border-radius: var(--radius-full); background: rgba(99, 102, 241, 0.12); color: var(--accent-indigo); border: 1px solid rgba(99, 102, 241, 0.25); font-weight: 600;">📦 ${escapeHTML(prompt.source)}</span>` : ""}
              ${prompt.featured ? `<span class="badge-featured">⭐ Featured</span>` : ""}
              ${prompt.difficulty ? `<span class="badge-difficulty">${escapeHTML(prompt.difficulty)}</span>` : ""}
            </div>
            <div class="card-actions-top">
              <button class="btn-star ${isFav ? 'active' : ''}" data-id="${prompt.id}" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
                ${isFav ? ICONS.starFilled : ICONS.star}
              </button>
            </div>
          </div>

          <div class="card-body">
            <h3 class="card-title" data-action="run">${escapeHTML(prompt.title)}</h3>
            <p class="card-description">${escapeHTML(prompt.description || "")}</p>
            
            <div class="card-code-preview" data-action="run" title="Click to open prompt runner">
              ${escapeHTML(previewText)}
            </div>

            ${prompt.tags && prompt.tags.length ? `
              <div class="card-tags">
                ${prompt.tags.map(t => `<span class="tag-badge" data-tag="${escapeHTML(t)}">#${escapeHTML(t)}</span>`).join("")}
              </div>
            ` : ""}
          </div>

          <div class="card-footer">
            <div class="card-footer-meta">
              <div class="card-author" title="Originator: ${escapeHTML(prompt.author || 'Curated')}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0; opacity: 0.7;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                ${prompt.author ? `
                  ${prompt.authorUrl ? `
                    <a href="${escapeHTML(prompt.authorUrl)}" target="_blank" rel="noopener noreferrer" class="card-author-link">
                      ${escapeHTML(prompt.author)}
                    </a>
                  ` : `<span>${escapeHTML(prompt.author)}</span>`}
                ` : `<span>Curated</span>`}
              </div>
            </div>

            <div class="card-cta-group">
              <button class="btn btn-secondary btn-copy-card" data-id="${prompt.id}" title="Quick Copy Raw Template">
                ${ICONS.copy}
                <span>Copy</span>
              </button>
              <button class="btn btn-primary btn-copy-card" data-action="run" data-id="${prompt.id}">
                <span>Use Prompt</span>
                ${vars.length > 0 ? `
                  <span class="category-count" title="${choiceVarsCount} choice variables">${vars.length} vars${choiceVarsCount > 0 ? ` (${choiceVarsCount} choice)` : ''}</span>
                ` : ""}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");

    attachCardListeners();
  }

  function attachCardListeners() {
    elements.promptsGrid.querySelectorAll(".prompt-card").forEach(card => {
      const id = card.getAttribute("data-id");

      // Star favorite button
      const starBtn = card.querySelector(".btn-star");
      if (starBtn) {
        starBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const isNowFav = window.PromptStorage.toggleFavorite(id);
          state.favorites = window.PromptStorage.getFavorites();
          starBtn.classList.toggle("active", isNowFav);
          starBtn.innerHTML = isNowFav ? ICONS.starFilled : ICONS.star;
          updateStatsBar();
          showToast(isNowFav ? "Added to favorites ⭐" : "Removed from favorites", "info");
          if (state.favoritesOnly) renderGrid();
        });
      }

      // Quick Copy raw template
      const quickCopyBtn = card.querySelector(".btn-copy-card[data-id]");
      if (quickCopyBtn) {
        quickCopyBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const prompt = window.PromptStorage.getPromptById(id);
          if (prompt) {
            copyToClipboard(prompt.template);
            window.PromptStorage.recordUsage(id);
            updateStatsBar();
            quickCopyBtn.innerHTML = `${ICONS.check} <span>Copied!</span>`;
            setTimeout(() => {
              quickCopyBtn.innerHTML = `${ICONS.copy} <span>Copy</span>`;
            }, 2000);
            showToast("Copied raw prompt to clipboard!", "success");
          }
        });
      }

      // Tag filter click with visual feedback & tour safety
      card.querySelectorAll(".tag-badge").forEach(tagBadge => {
        tagBadge.addEventListener("click", (e) => {
          e.stopPropagation();
          if (isTourActive) {
            showToast("Tour Active: In the live library, clicking #tags instantly filters by that tag!", "info");
            return;
          }
          const tag = tagBadge.getAttribute("data-tag");
          state.searchQuery = tag;
          if (elements.searchInput) {
            elements.searchInput.value = tag;
            if (elements.searchClearBtn) elements.searchClearBtn.style.display = "block";
          }
          renderGrid();
          showToast(`Filtered library by #${tag}`, "info");
          const grid = document.getElementById("promptsGrid");
          if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });

      // Click card title or "Use Prompt" or code preview to open runner
      card.querySelectorAll('[data-action="run"]').forEach(el => {
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          if (isTourActive) {
            showToast("Tour Active: Click 'Next →' on the tour card to proceed with the walkthrough.", "info");
            return;
          }
          openRunnerModal(id);
        });
      });
    });
  }

  // ----------------------------------------------------
  // Dynamic Variable Extraction & Compilation (With Choices)
  // ----------------------------------------------------
  function extractVariableDefinitions(template, promptVariables = []) {
    if (!template) return [];
    const regex = /\{\{([^}]+)\}\}/g;
    const varMap = new Map();
    let m;

    const metaMap = new Map((promptVariables || []).map(v => [v.name, v]));

    while ((m = regex.exec(template)) !== null) {
      const raw = m[1].trim();
      let varName = raw;
      let inlineOptions = null;

      if (raw.includes(":")) {
        const parts = raw.split(":");
        varName = parts[0].trim();
        const optionsStr = parts.slice(1).join(":");
        if (optionsStr.includes("|")) {
          inlineOptions = optionsStr.split("|").map(s => s.trim()).filter(Boolean);
        }
      }

      if (!varMap.has(varName)) {
        const meta = metaMap.get(varName) || {};
        const options = inlineOptions || meta.options || null;
        const isChoice = Array.isArray(options) && options.length > 0;
        const defaultValue = meta.default || (isChoice ? options[0] : "");

        varMap.set(varName, {
          name: varName,
          options: options,
          isChoice: isChoice,
          label: meta.label || formatVarLabel(varName),
          default: defaultValue,
          placeholder: meta.placeholder || `Enter value for ${varName}...`
        });
      }
    }

    return Array.from(varMap.values());
  }

  function compilePrompt(template, varValues) {
    if (!template) return "";
    return template.replace(/\{\{([^}]+)\}\}/g, (match, rawContent) => {
      let key = rawContent.trim();
      if (key.includes(":")) {
        key = key.split(":")[0].trim();
      }
      return varValues[key] !== undefined && varValues[key] !== "" ? varValues[key] : match;
    });
  }

  function updateOutputMetrics(text) {
    const charCount = text.length;
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const estimatedTokens = Math.round(charCount / 4);

    if (elements.runnerCharCount) {
      elements.runnerCharCount.textContent = `${charCount.toLocaleString()} chars • ${wordCount.toLocaleString()} words`;
    }
    if (elements.runnerTokenCount) {
      elements.runnerTokenCount.textContent = `~${estimatedTokens.toLocaleString()} tokens`;
    }
  }

  function formatVarLabel(name) {
    if (!name) return "";
    return name
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase())
      .trim();
  }

  function updateRunnerPreview() {
    if (!state.selectedPrompt || !elements.runnerOutput) return;
    const compiled = compilePrompt(state.selectedPrompt.template || "", state.variableValues);
    elements.runnerOutput.textContent = compiled;
    updateOutputMetrics(compiled);
  }

  // ----------------------------------------------------
  // Phase 3: Modular Blueprint & Runner View Controller
  // ----------------------------------------------------
  function applyRunnerViewMode(mode) {
    state.runnerViewMode = mode;

    if (elements.runnerTabBlueprint) {
      elements.runnerTabBlueprint.classList.toggle("active", mode === "blueprint");
      elements.runnerTabBlueprint.setAttribute("aria-selected", mode === "blueprint");
    }
    if (elements.runnerTabCompiled) {
      elements.runnerTabCompiled.classList.toggle("active", mode === "compiled");
      elements.runnerTabCompiled.setAttribute("aria-selected", mode === "compiled");
    }
    if (elements.runnerTabSplit) {
      elements.runnerTabSplit.classList.toggle("active", mode === "split");
      elements.runnerTabSplit.setAttribute("aria-selected", mode === "split");
    }

    if (!elements.runnerContentWrapper) return;

    if (mode === "blueprint") {
      elements.runnerContentWrapper.classList.remove("runner-split-layout");
      if (elements.runnerBlueprintContainer) elements.runnerBlueprintContainer.style.display = "flex";
      if (elements.runnerPreviewContainer) elements.runnerPreviewContainer.style.display = "none";
    } else if (mode === "compiled") {
      elements.runnerContentWrapper.classList.remove("runner-split-layout");
      if (elements.runnerBlueprintContainer) elements.runnerBlueprintContainer.style.display = "none";
      if (elements.runnerPreviewContainer) elements.runnerPreviewContainer.style.display = "flex";
    } else if (mode === "split") {
      elements.runnerContentWrapper.classList.add("runner-split-layout");
      if (elements.runnerBlueprintContainer) elements.runnerBlueprintContainer.style.display = "flex";
      if (elements.runnerPreviewContainer) elements.runnerPreviewContainer.style.display = "flex";
    }
  }

  function renderRunnerBlueprintSections(sections, prompt) {
    if (!elements.runnerBlueprintContainer) return;
    const varDefs = extractVariableDefinitions(prompt.template || "", prompt.variables);

    elements.runnerBlueprintContainer.innerHTML = `
      <div class="blueprint-section-card accent-persona">
        <div class="blueprint-section-header">
          <span class="blueprint-section-title">👤 Role / Persona</span>
          <span class="blueprint-section-badge">Expert Alignment</span>
        </div>
        <div class="blueprint-section-content">${escapeHTML(sections.persona || "Expert AI Specialist")}</div>
      </div>

      <div class="blueprint-section-card accent-objective">
        <div class="blueprint-section-header">
          <span class="blueprint-section-title">🎯 Core Task / Objective</span>
          <span class="blueprint-section-badge">Deliverable Goal</span>
        </div>
        <div class="blueprint-section-content">${escapeHTML(sections.objective || "Execute the defined task with precision and clarity.")}</div>
      </div>

      <div class="blueprint-section-card accent-inputs">
        <div class="blueprint-section-header">
          <span class="blueprint-section-title">📥 Context & Dynamic Inputs</span>
          <span class="blueprint-section-badge">${varDefs.length > 0 ? `${varDefs.length} Variables` : "Parameters"}</span>
        </div>
        <div class="blueprint-section-content">${escapeHTML(sections.context || "Standard context parameters.")}</div>
      </div>

      <div class="blueprint-section-card accent-guardrails">
        <div class="blueprint-section-header">
          <span class="blueprint-section-title">🛡️ Negative Guardrails & Reliability</span>
          <span class="blueprint-section-badge">Anti-Hallucination</span>
        </div>
        <div class="blueprint-section-content">${escapeHTML(sections.guardrails || "Adhere strictly to verified facts, mitigate hallucinations, and avoid extraneous filler.")}</div>
      </div>

      <div class="blueprint-section-card accent-rubric">
        <div class="blueprint-section-header">
          <span class="blueprint-section-title">📑 Output Specification & Rubric</span>
          <span class="blueprint-section-badge">Quality Rubric</span>
        </div>
        <div class="blueprint-section-content">${escapeHTML(sections.outputRubric || "Structured Markdown format with clear headings.")}</div>
      </div>
    `;
  }

  // ----------------------------------------------------
  // Runner / Detail Modal with Multiple-Choice Variable Fields
  // ----------------------------------------------------
  function openRunnerModal(promptId) {
    const prompt = window.PromptStorage.getPromptById(promptId);
    if (!prompt) return;

    state.selectedPrompt = prompt;
    state.variableValues = {};

    const promptCats = Array.isArray(prompt.categories) && prompt.categories.length > 0
      ? prompt.categories
      : [prompt.category || "General"];

    // Header & Meta
    if (elements.runnerTitle) elements.runnerTitle.textContent = prompt.title;
    if (elements.runnerCategory) elements.runnerCategory.textContent = promptCats.join(", ");
    if (elements.runnerModel) elements.runnerModel.textContent = prompt.model || "Any Model";
    if (elements.runnerDifficulty) elements.runnerDifficulty.textContent = prompt.difficulty || "All Levels";
    if (elements.runnerAuthor) {
      if (prompt.author) {
        elements.runnerAuthor.textContent = `By ${prompt.author}`;
        elements.runnerAuthor.style.display = "inline-flex";
      } else {
        elements.runnerAuthor.style.display = "none";
      }
    }
    if (elements.runnerDescription) elements.runnerDescription.textContent = prompt.description || "";
    if (elements.runnerNotes) {
      if (prompt.notes) {
        elements.runnerNotes.innerHTML = `<strong>💡 Pro Tip:</strong> ${escapeHTML(prompt.notes)}`;
        elements.runnerNotes.style.display = "block";
      } else {
        elements.runnerNotes.style.display = "none";
      }
    }

    // Render Modular Blueprint 5-Card Breakdown
    const sections = window.PromptStorage.parsePromptSections(prompt);
    renderRunnerBlueprintSections(sections, prompt);

    // Extract variables (including multiple choice options)
    const varDefs = extractVariableDefinitions(prompt.template, prompt.variables);

    if (varDefs.length > 0) {
      elements.runnerVariablesContainer.style.display = "flex";
      elements.runnerVariablesContainer.innerHTML = `
        <div class="section-label">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          Customize Prompt Variables (${varDefs.length})
        </div>
        ${varDefs.map(v => {
          const defaultValue = v.default || "";
          state.variableValues[v.name] = defaultValue;

          if (v.isChoice) {
            return `
              <div class="variable-row variable-choice-container" id="row-${v.name}">
                <label class="variable-label" for="var-${v.name}">
                  <span>${escapeHTML(v.label)}</span>
                  <span class="variable-name-tag">{{${escapeHTML(v.name)}}}</span>
                </label>
                <div class="choice-pills-group" data-var="${escapeHTML(v.name)}">
                  ${v.options.map(opt => `
                    <button type="button" class="choice-pill-btn ${opt === defaultValue ? 'active' : ''}" data-value="${escapeHTML(opt)}">
                      ${escapeHTML(opt)}
                    </button>
                  `).join("")}
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <button type="button" class="choice-custom-toggle" data-var="${escapeHTML(v.name)}">+ Type custom value</button>
                  <span style="font-size: 0.725rem; color: var(--accent-cyan); font-weight: 500;">✓ Multiple Choice</span>
                </div>
                <input type="text" id="var-${v.name}" class="input-field custom-text-input" data-var="${escapeHTML(v.name)}" value="${escapeHTML(defaultValue)}" placeholder="Type custom value for ${v.name}..." style="display: none; margin-top: 0.35rem;" />
              </div>
            `;
          } else {
            const isMultiline = defaultValue.length > 60 || defaultValue.includes("\n");
            return `
              <div class="variable-row" id="row-${v.name}">
                <label class="variable-label" for="var-${v.name}">
                  <span>${escapeHTML(v.label)}</span>
                  <span class="variable-name-tag">{{${escapeHTML(v.name)}}}</span>
                </label>
                ${isMultiline ? `
                  <textarea id="var-${v.name}" class="input-field" data-var="${escapeHTML(v.name)}" placeholder="${escapeHTML(v.placeholder)}">${escapeHTML(defaultValue)}</textarea>
                ` : `
                  <input type="text" id="var-${v.name}" class="input-field" data-var="${escapeHTML(v.name)}" value="${escapeHTML(defaultValue)}" placeholder="${escapeHTML(v.placeholder)}" />
                `}
              </div>
            `;
          }
        }).join("")}
      `;

      // Choice buttons
      elements.runnerVariablesContainer.querySelectorAll(".choice-pills-group").forEach(group => {
        const varName = group.getAttribute("data-var");
        const customInput = elements.runnerVariablesContainer.querySelector(`.custom-text-input[data-var="${varName}"]`);

        group.querySelectorAll(".choice-pill-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const val = btn.getAttribute("data-value");
            group.querySelectorAll(".choice-pill-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            state.variableValues[varName] = val;
            if (customInput) customInput.value = val;
            updateRunnerPreview();
          });
        });
      });

      // Custom toggles
      elements.runnerVariablesContainer.querySelectorAll(".choice-custom-toggle").forEach(toggle => {
        toggle.addEventListener("click", () => {
          const varName = toggle.getAttribute("data-var");
          const customInput = elements.runnerVariablesContainer.querySelector(`.custom-text-input[data-var="${varName}"]`);
          if (customInput) {
            const isHidden = customInput.style.display === "none";
            customInput.style.display = isHidden ? "block" : "none";
            if (isHidden) {
              customInput.focus();
              customInput.select();
            }
          }
        });
      });

      // Text/textarea inputs
      elements.runnerVariablesContainer.querySelectorAll("input.input-field, textarea.input-field").forEach(input => {
        input.addEventListener("input", () => {
          const varName = input.getAttribute("data-var");
          state.variableValues[varName] = input.value;
          const group = elements.runnerVariablesContainer.querySelector(`.choice-pills-group[data-var="${varName}"]`);
          if (group) {
            group.querySelectorAll(".choice-pill-btn").forEach(btn => {
              btn.classList.toggle("active", btn.getAttribute("data-value") === input.value);
            });
          }
          updateRunnerPreview();
        });
      });
    } else {
      elements.runnerVariablesContainer.style.display = "none";
      elements.runnerVariablesContainer.innerHTML = "";
    }

    updateRunnerPreview();

    // Apply Active View Mode (Blueprint vs Compiled vs Split)
    applyRunnerViewMode(state.runnerViewMode || "blueprint");

    if (elements.runnerCopyBtn) {
      elements.runnerCopyBtn.innerHTML = `${ICONS.copy} <span>Copy Prompt</span>`;
    }

    if (elements.runnerModal && typeof elements.runnerModal.showModal === "function") {
      elements.runnerModal.showModal();
    }
  }

  // ----------------------------------------------------
  // Phase 3: Modular Blueprint Authoring Controller
  // ----------------------------------------------------
  function setFormAuthoringMode(mode) {
    state.formAuthoringMode = mode;
    if (elements.formModeQuickBtn) {
      elements.formModeQuickBtn.classList.toggle("active", mode === "quick");
      elements.formModeQuickBtn.setAttribute("aria-selected", mode === "quick");
    }
    if (elements.formModeModularBtn) {
      elements.formModeModularBtn.classList.toggle("active", mode === "modular");
      elements.formModeModularBtn.setAttribute("aria-selected", mode === "modular");
    }
    if (elements.formQuickContainer) {
      elements.formQuickContainer.style.display = mode === "quick" ? "block" : "none";
    }
    if (elements.formModularContainer) {
      elements.formModularContainer.style.display = mode === "modular" ? "flex" : "none";
    }
  }

  function syncModularToQuick() {
    if (state.formAuthoringMode !== "modular") return;
    if (!window.PromptStorage) return;

    const compiled = window.PromptStorage.compileBlueprintToTemplate({
      persona: elements.formSectionPersona ? elements.formSectionPersona.value : "",
      objective: elements.formSectionObjective ? elements.formSectionObjective.value : "",
      context: elements.formSectionContext ? elements.formSectionContext.value : "",
      guardrails: elements.formSectionGuardrails ? elements.formSectionGuardrails.value : "",
      outputRubric: elements.formSectionOutput ? elements.formSectionOutput.value : ""
    });

    if (elements.formTemplate) {
      elements.formTemplate.value = compiled;
      detectTemplateVars();
    }
  }

  // ----------------------------------------------------
  // Add / Edit Modal with Multi-Category Selector
  // ----------------------------------------------------
  function openAddEditModal(promptId = null) {
    state.editingPromptId = promptId;
    state.formSelectedCategories = new Set();
    state.formSelectedSubcategories = new Set();

    if (promptId) {
      const prompt = window.PromptStorage.getPromptById(promptId);
      if (!prompt) return;

      elements.formModalTitle.textContent = "Edit Prompt";
      elements.formPromptId.value = prompt.id;
      elements.formTitle.value = prompt.title || "";

      // Load multi-categories
      const cats = Array.isArray(prompt.categories) && prompt.categories.length > 0
        ? prompt.categories
        : [prompt.category || "General"];
      cats.forEach(c => state.formSelectedCategories.add(c));

      // Load subcategories
      const subs = Array.isArray(prompt.subcategories) && prompt.subcategories.length > 0
        ? prompt.subcategories
        : (prompt.subcategory ? prompt.subcategory.split(",").map(s => s.trim()).filter(Boolean) : []);
      subs.forEach(s => state.formSelectedSubcategories.add(s));

      if (elements.formCustomSubcategory) {
        elements.formCustomSubcategory.value = "";
      }
      if (elements.formInlineNewCatInput) {
        elements.formInlineNewCatInput.value = "";
      }

      elements.formModel.value = prompt.model || "ChatGPT / Claude / Gemini";
      elements.formDifficulty.value = prompt.difficulty || "Intermediate";
      if (elements.formAuthor) elements.formAuthor.value = prompt.author || "";
      if (elements.formAuthorUrl) elements.formAuthorUrl.value = prompt.authorUrl || "";
      elements.formTags.value = (prompt.tags || []).join(", ");
      elements.formDescription.value = prompt.description || "";
      elements.formTemplate.value = prompt.template || "";
      elements.formNotes.value = prompt.notes || "";

      // Populate Phase 3 Modular Blueprint Builder fields
      const parsedSections = window.PromptStorage.parsePromptSections(prompt);
      if (elements.formSectionPersona) elements.formSectionPersona.value = parsedSections.persona || "";
      if (elements.formSectionObjective) elements.formSectionObjective.value = parsedSections.objective || "";
      if (elements.formSectionContext) elements.formSectionContext.value = parsedSections.context || "";
      if (elements.formSectionGuardrails) elements.formSectionGuardrails.value = parsedSections.guardrails || "";
      if (elements.formSectionOutput) elements.formSectionOutput.value = parsedSections.outputRubric || "";
    } else {
      elements.formModalTitle.textContent = "Create New Prompt";
      elements.promptForm.reset();
      elements.formPromptId.value = "";
      
      // On new prompt: if user was filtering by specific categories, select them;
      // otherwise, start with NONE checked so user can freely choose any category/categories!
      if (state.selectedCategories.size > 0) {
        state.selectedCategories.forEach(c => state.formSelectedCategories.add(c));
      } else {
        state.formSelectedCategories.clear();
      }

      state.formSelectedSubcategories.clear();

      if (elements.formCustomSubcategory) {
        elements.formCustomSubcategory.value = "";
      }
      if (elements.formInlineNewCatInput) {
        elements.formInlineNewCatInput.value = "";
      }

      elements.formModel.value = "ChatGPT / Claude / Gemini";
      elements.formDifficulty.value = "Intermediate";

      // Clear Phase 3 Modular Blueprint Builder fields
      if (elements.formSectionPersona) elements.formSectionPersona.value = "";
      if (elements.formSectionObjective) elements.formSectionObjective.value = "";
      if (elements.formSectionContext) elements.formSectionContext.value = "";
      if (elements.formSectionGuardrails) elements.formSectionGuardrails.value = "";
      if (elements.formSectionOutput) elements.formSectionOutput.value = "";
    }

    setFormAuthoringMode("quick");
    renderFormCategoryChips();
    renderFormSubcategoryChips();
    detectTemplateVars();

    if (elements.promptFormModal && typeof elements.promptFormModal.showModal === "function") {
      elements.promptFormModal.showModal();
    }
  }

  function renderFormCategoryChips() {
    if (!elements.formCategoryChips) return;
    const allCategories = window.PromptStorage.getAllCategories();
    
    const count = state.formSelectedCategories.size;
    if (elements.formCategorySelectionHelper) {
      elements.formCategorySelectionHelper.textContent = count === 0
        ? "(Check all categories that apply)"
        : `(${count} categor${count > 1 ? 'ies' : 'y'} selected)`;
    }

    if (allCategories.length === 0) {
      elements.formCategoryChips.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 0.5rem; color: var(--text-muted); font-size: 0.8rem; font-style: italic;">
          No categories found. Type a new category name below to create one!
        </div>
      `;
      return;
    }

    elements.formCategoryChips.innerHTML = allCategories.map(cat => {
      const isSelected = state.formSelectedCategories.has(cat);
      return `
        <label class="cat-checkbox-card ${isSelected ? 'checked' : ''}" data-cat="${escapeHTML(cat)}">
          <input type="checkbox" value="${escapeHTML(cat)}" ${isSelected ? 'checked' : ''} />
          <span class="cat-label-text">${escapeHTML(cat)}</span>
        </label>
      `;
    }).join("");

    elements.formCategoryChips.querySelectorAll("input[type='checkbox']").forEach(cb => {
      cb.addEventListener("change", (e) => {
        const cat = e.target.value;
        if (e.target.checked) {
          state.formSelectedCategories.add(cat);
        } else {
          state.formSelectedCategories.delete(cat);
        }
        renderFormCategoryChips();
        renderFormSubcategoryChips();
      });
    });
  }

  function renderFormSubcategoryChips() {
    if (!elements.formSubcategoryChips) return;
    
    const relevantSubs = new Set();
    state.formSelectedCategories.forEach(cat => {
      const subs = window.PromptStorage.getSubcategoriesForCategory(cat);
      subs.forEach(s => relevantSubs.add(s));
    });

    // Also include any active subcategories that the user already checked
    state.formSelectedSubcategories.forEach(s => relevantSubs.add(s));

    if (elements.formSubcatCountNotice) {
      const count = state.formSelectedSubcategories.size;
      elements.formSubcatCountNotice.textContent = `${count} selected`;
    }

    if (relevantSubs.size === 0) {
      elements.formSubcategoryChips.innerHTML = `
        <span style="font-size: 0.775rem; color: var(--text-muted); font-style: italic; align-self: center; padding: 0.25rem 0;">
          ${state.formSelectedCategories.size === 0 
            ? "👈 Select one or more categories above to display subcategories" 
            : "No predefined subcategories for selected categories. Add one below!"}
        </span>
      `;
      return;
    }

    elements.formSubcategoryChips.innerHTML = Array.from(relevantSubs).sort().map(sub => {
      const isSelected = state.formSelectedSubcategories.has(sub);
      return `
        <label class="subcat-checkbox-pill ${isSelected ? 'checked' : ''}">
          <input type="checkbox" value="${escapeHTML(sub)}" ${isSelected ? 'checked' : ''} />
          <span>${escapeHTML(sub)}</span>
        </label>
      `;
    }).join("");

    elements.formSubcategoryChips.querySelectorAll("input[type='checkbox']").forEach(cb => {
      cb.addEventListener("change", (e) => {
        const sub = e.target.value;
        if (e.target.checked) {
          state.formSelectedSubcategories.add(sub);
        } else {
          state.formSelectedSubcategories.delete(sub);
        }
        renderFormSubcategoryChips();
      });
    });
  }

  function detectTemplateVars() {
    if (!elements.formTemplate || !elements.detectedVarsNotice) return;
    const vars = extractVariableDefinitions(elements.formTemplate.value);
    if (vars.length > 0) {
      const choiceCount = vars.filter(v => v.isChoice).length;
      elements.detectedVarsNotice.innerHTML = `
        <strong>Detected ${vars.length} variable${vars.length > 1 ? 's' : ''} (${choiceCount} multiple-choice):</strong> 
        ${vars.map(v => `
          <span class="variable-name-tag">
            {{${escapeHTML(v.name)}}}${v.isChoice ? ` [${v.options.length} choices]` : ''}
          </span>
        `).join(" ")}
      `;
      elements.detectedVarsNotice.style.display = "block";
    } else {
      elements.detectedVarsNotice.style.display = "none";
    }
  }

  function insertVariableSnippet(snippet) {
    const textarea = elements.formTemplate;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    textarea.value = text.substring(0, start) + snippet + text.substring(end);
    textarea.selectionStart = textarea.selectionEnd = start + snippet.length;
    textarea.focus();
    detectTemplateVars();
  }

  function handlePromptFormSubmit(e) {
    e.preventDefault();

    if (state.formAuthoringMode === "modular") {
      syncModularToQuick();
    }

    const title = elements.formTitle.value.trim();
    const template = elements.formTemplate.value.trim();

    if (!title || !template) {
      showToast("Please provide both a title and prompt template", "error");
      return;
    }

    if (state.formSelectedCategories.size === 0) {
      showToast("Please select at least one category for this prompt", "error");
      return;
    }

    const categoriesArray = Array.from(state.formSelectedCategories);

    // Collect all subcategories from checked pills plus custom input
    const subcategoriesArray = Array.from(state.formSelectedSubcategories);
    const customSub = elements.formCustomSubcategory ? elements.formCustomSubcategory.value.trim() : "";
    if (customSub && !subcategoriesArray.includes(customSub)) {
      subcategoriesArray.push(customSub);
      categoriesArray.forEach(cat => window.PromptStorage.addSubcategory(cat, customSub));
    }
    const subcategory = subcategoriesArray.join(", ");

    const tagsArray = elements.formTags.value
      .split(",")
      .map(t => t.trim().toLowerCase())
      .filter(t => t.length > 0);

    const promptData = {
      id: elements.formPromptId.value || undefined,
      title: title,
      categories: categoriesArray,
      category: categoriesArray[0] || "General",
      subcategories: subcategoriesArray,
      subcategory: subcategory,
      model: elements.formModel.value.trim(),
      difficulty: elements.formDifficulty.value,
      author: elements.formAuthor ? elements.formAuthor.value.trim() : "",
      authorUrl: elements.formAuthorUrl ? elements.formAuthorUrl.value.trim() : "",
      tags: tagsArray,
      description: elements.formDescription.value.trim(),
      template: template,
      notes: elements.formNotes.value.trim(),
      sections: {
        persona: elements.formSectionPersona ? elements.formSectionPersona.value.trim() : "",
        objective: elements.formSectionObjective ? elements.formSectionObjective.value.trim() : "",
        context: elements.formSectionContext ? elements.formSectionContext.value.trim() : "",
        guardrails: elements.formSectionGuardrails ? elements.formSectionGuardrails.value.trim() : "",
        outputRubric: elements.formSectionOutput ? elements.formSectionOutput.value.trim() : ""
      }
    };

    const saved = window.PromptStorage.savePrompt(promptData);
    if (saved) {
      elements.promptFormModal.close();
      refreshData();
      showToast(promptData.id ? "Prompt updated successfully!" : "New prompt created!", "success");
      
      if (state.selectedPrompt && state.selectedPrompt.id === saved.id) {
        openRunnerModal(saved.id);
      }
    } else {
      showToast("Failed to save prompt", "error");
    }
  }

  // ----------------------------------------------------
  // Event Listeners Setup
  // ----------------------------------------------------
  function setupEventListeners() {
    // Theme & Appearance Setup
    if (elements.themeToggleBtn) {
      elements.themeToggleBtn.addEventListener("click", toggleTheme);
    }
    if (elements.openThemeModalBtn) {
      elements.openThemeModalBtn.addEventListener("click", openThemeModal);
    }
    if (elements.closeThemeModalBtn) {
      elements.closeThemeModalBtn.addEventListener("click", closeThemeModal);
    }
    if (elements.closeThemeModalDoneBtn) {
      elements.closeThemeModalDoneBtn.addEventListener("click", closeThemeModal);
    }

    // Theme Preset Card Selection
    if (elements.themePresetsGrid) {
      elements.themePresetsGrid.addEventListener("click", (e) => {
        const card = e.target.closest(".theme-preset-card");
        if (card) {
          const preset = card.getAttribute("data-preset");
          if (preset) applyThemePreset(preset);
        }
      });
      elements.themePresetsGrid.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          const card = e.target.closest(".theme-preset-card");
          if (card) {
            e.preventDefault();
            const preset = card.getAttribute("data-preset");
            if (preset) applyThemePreset(preset);
          }
        }
      });
    }

    // Theme Accent Swatch Selection
    if (elements.themeAccentsRow) {
      elements.themeAccentsRow.addEventListener("click", (e) => {
        const btn = e.target.closest(".accent-swatch-btn");
        if (btn) {
          const accent = btn.getAttribute("data-accent");
          if (accent) applyAccentColor(accent);
        }
      });
    }

    // Search input
    if (elements.searchInput) {
      elements.searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value;
        if (elements.searchClearBtn) {
          elements.searchClearBtn.style.display = state.searchQuery ? "block" : "none";
        }
        renderGrid();
      });
    }

    // Clear search
    if (elements.searchClearBtn) {
      elements.searchClearBtn.addEventListener("click", () => {
        state.searchQuery = "";
        elements.searchInput.value = "";
        elements.searchClearBtn.style.display = "none";
        elements.searchInput.focus();
        renderGrid();
      });
    }

    // Nav Mode Toggles (Functional Domain vs Collection Pack)
    if (elements.viewModeDomainBtn) {
      elements.viewModeDomainBtn.addEventListener("click", () => {
        state.navMode = "domain";
        window.PromptStorage.setNavViewMode("domain");
        state.selectedSources.clear();
        renderCategories();
        renderGrid();
      });
    }
    if (elements.viewModeSourceBtn) {
      elements.viewModeSourceBtn.addEventListener("click", () => {
        state.navMode = "source";
        window.PromptStorage.setNavViewMode("source");
        state.selectedDomain = null;
        state.selectedCategories.clear();
        renderCategories();
        renderGrid();
      });
    }

    // Clear category selection
    if (elements.clearCategoryFiltersBtn) {
      elements.clearCategoryFiltersBtn.addEventListener("click", () => {
        state.selectedDomain = null;
        state.selectedCategories.clear();
        state.selectedSources.clear();
        renderCategories();
        renderGrid();
        showToast("Category filters cleared", "info");
      });
    }

    // Dedicated Category Manager Button in Header
    if (elements.openCategoryManagerBtn) {
      elements.openCategoryManagerBtn.addEventListener("click", openCategoryManagerModal);
    }

    // Dedicated Category Manager Button in Nav Header
    if (elements.navManageCatBtn) {
      elements.navManageCatBtn.addEventListener("click", openCategoryManagerModal);
    }

    // Dedicated Category Manager trigger in Stats
    if (elements.statsCategoriesBtn) {
      elements.statsCategoriesBtn.addEventListener("click", openCategoryManagerModal);
    }

    // Link in Add/Edit Prompt Modal to open manager
    if (elements.promptFormManageCatsBtn) {
      elements.promptFormManageCatsBtn.addEventListener("click", openCategoryManagerModal);
    }

    // Quick inline Category Add button inside Add/Edit Prompt Modal
    if (elements.formInlineAddCatBtn && elements.formInlineNewCatInput) {
      elements.formInlineAddCatBtn.addEventListener("click", () => {
        const val = elements.formInlineNewCatInput.value.trim();
        if (!val) {
          showToast("Please enter a category name", "error");
          return;
        }
        window.PromptStorage.addCategory(val);
        state.formSelectedCategories.add(val);
        elements.formInlineNewCatInput.value = "";
        renderFormCategoryChips();
        renderFormSubcategoryChips();
        renderCategories();
        showToast(`Created & selected category "${val}"`, "success");
      });

      elements.formInlineNewCatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          elements.formInlineAddCatBtn.click();
        }
      });
    }

    // Quick inline Subcategory Add button inside Add/Edit Prompt Modal
    if (elements.formAddCustomSubBtn && elements.formCustomSubcategory) {
      elements.formAddCustomSubBtn.addEventListener("click", () => {
        const val = elements.formCustomSubcategory.value.trim();
        if (!val) {
          showToast("Please enter a subcategory name", "error");
          return;
        }
        state.formSelectedCategories.forEach(cat => {
          window.PromptStorage.addSubcategory(cat, val);
        });
        state.formSelectedSubcategories.add(val);
        elements.formCustomSubcategory.value = "";
        renderFormSubcategoryChips();
        showToast(`Added subcategory "${val}"`, "success");
      });

      elements.formCustomSubcategory.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          elements.formAddCustomSubBtn.click();
        }
      });
    }

    // Quick-add custom subcategory in Taxonomy Deduplication Manager
    if (elements.addCustomSubcatBtn && elements.newSubcatInput) {
      elements.addCustomSubcatBtn.addEventListener("click", () => {
        const val = elements.newSubcatInput.value.trim();
        if (!val) {
          showToast("Please enter a subcategory name", "error");
          return;
        }
        state.selectedSubcatsForNewCategory.add(val);
        elements.newSubcatInput.value = "";
        renderSubcatDedupPool();
        showToast(`Added "${val}" to selected subcategories`, "success");
      });

      elements.newSubcatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          elements.addCustomSubcatBtn.click();
        }
      });
    }

    // Category Manager Modal Events
    if (elements.closeCatManagerBtn) {
      elements.closeCatManagerBtn.addEventListener("click", () => {
        elements.categoryManagerModal.close();
        renderCategories();
        renderGrid();
        if (elements.formCategoryChips) renderFormCategoryChips();
      });
    }
    if (elements.doneCatManagerBtn) {
      elements.doneCatManagerBtn.addEventListener("click", () => {
        elements.categoryManagerModal.close();
        renderCategories();
        renderGrid();
        if (elements.formCategoryChips) renderFormCategoryChips();
      });
    }
    if (elements.createCategoryBtn && elements.newCategoryInput && elements.catManagerDomainSelect) {
      elements.createCategoryBtn.addEventListener("click", () => {
        const catName = elements.newCategoryInput.value.trim();
        const domainName = elements.catManagerDomainSelect.value;
        if (!catName) {
          showToast("Please enter a category name", "error");
          elements.newCategoryInput.focus();
          return;
        }
        const subcats = Array.from(state.selectedSubcatsForNewCategory);
        window.PromptStorage.addCategoryWithSubcategories(domainName, catName, subcats);
        elements.newCategoryInput.value = "";
        state.selectedSubcatsForNewCategory.clear();
        renderTaxonomyManager();
        renderCategories();
        renderGrid();
        if (elements.formCategoryChips) renderFormCategoryChips();
        showToast(`Saved category "${catName}" under ${domainName}`, "success");
      });

      elements.newCategoryInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          elements.createCategoryBtn.click();
        }
      });
    }

    // Model filter
    if (elements.modelFilter) {
      elements.modelFilter.addEventListener("change", (e) => {
        state.modelFilter = e.target.value;
        renderGrid();
      });
    }

    // Difficulty filter
    if (elements.difficultyFilter) {
      elements.difficultyFilter.addEventListener("change", (e) => {
        state.difficultyFilter = e.target.value;
        renderGrid();
      });
    }

    // Sort by
    if (elements.sortBy) {
      elements.sortBy.addEventListener("change", (e) => {
        state.sortBy = e.target.value;
        renderGrid();
      });
    }

    // Favorites filter button
    if (elements.favoritesToggleBtn) {
      elements.favoritesToggleBtn.addEventListener("click", () => {
        state.favoritesOnly = !state.favoritesOnly;
        elements.favoritesToggleBtn.classList.toggle("active", state.favoritesOnly);
        renderGrid();
      });
    }

    // Open Add Prompt modal
    if (elements.openAddPromptBtn) {
      elements.openAddPromptBtn.addEventListener("click", () => openAddEditModal());
    }

    // Runner View Mode Tab Switching (Modular Blueprint vs Compiled vs Split)
    if (elements.runnerTabBlueprint) {
      elements.runnerTabBlueprint.addEventListener("click", () => applyRunnerViewMode("blueprint"));
    }
    if (elements.runnerTabCompiled) {
      elements.runnerTabCompiled.addEventListener("click", () => applyRunnerViewMode("compiled"));
    }
    if (elements.runnerTabSplit) {
      elements.runnerTabSplit.addEventListener("click", () => applyRunnerViewMode("split"));
    }

    // Close Runner modal
    if (elements.closeRunnerBtn) {
      elements.closeRunnerBtn.addEventListener("click", () => elements.runnerModal.close());
    }

    // Runner Modal Actions
    if (elements.runnerCopyBtn) {
      elements.runnerCopyBtn.addEventListener("click", () => {
        if (!state.selectedPrompt) return;
        const compiled = compilePrompt(state.selectedPrompt.template, state.variableValues);
        copyToClipboard(compiled);
        window.PromptStorage.recordUsage(state.selectedPrompt.id);
        updateStatsBar();

        elements.runnerCopyBtn.innerHTML = `${ICONS.check} <span>Copied to Clipboard!</span>`;
        setTimeout(() => {
          elements.runnerCopyBtn.innerHTML = `${ICONS.copy} <span>Copy Prompt</span>`;
        }, 2200);

        showToast("Compiled prompt copied to clipboard!", "success");
      });
    }

    if (elements.runnerEditBtn) {
      elements.runnerEditBtn.addEventListener("click", () => {
        if (!state.selectedPrompt) return;
        const id = state.selectedPrompt.id;
        elements.runnerModal.close();
        openAddEditModal(id);
      });
    }

    if (elements.runnerDuplicateBtn) {
      elements.runnerDuplicateBtn.addEventListener("click", () => {
        if (!state.selectedPrompt) return;
        const dup = window.PromptStorage.duplicatePrompt(state.selectedPrompt.id);
        if (dup) {
          elements.runnerModal.close();
          refreshData();
          showToast("Created a duplicate prompt!", "success");
          openRunnerModal(dup.id);
        }
      });
    }

    if (elements.runnerDeleteBtn) {
      elements.runnerDeleteBtn.addEventListener("click", () => {
        if (!state.selectedPrompt) return;
        if (confirm(`Are you sure you want to delete "${state.selectedPrompt.title}"?`)) {
          window.PromptStorage.deletePrompt(state.selectedPrompt.id);
          elements.runnerModal.close();
          refreshData();
          showToast("Prompt deleted", "info");
        }
      });
    }

    // Form Modal Events
    if (elements.promptForm) {
      elements.promptForm.addEventListener("submit", handlePromptFormSubmit);
    }
    if (elements.closeFormModalBtn) {
      elements.closeFormModalBtn.addEventListener("click", () => elements.promptFormModal.close());
    }
    if (elements.cancelFormBtn) {
      elements.cancelFormBtn.addEventListener("click", () => elements.promptFormModal.close());
    }
    if (elements.formTemplate) {
      elements.formTemplate.addEventListener("input", detectTemplateVars);
    }

    // Phase 3: Form Authoring Mode Switchers
    if (elements.formModeQuickBtn) {
      elements.formModeQuickBtn.addEventListener("click", () => setFormAuthoringMode("quick"));
    }
    if (elements.formModeModularBtn) {
      elements.formModeModularBtn.addEventListener("click", () => {
        const isModularEmpty = !elements.formSectionPersona.value && !elements.formSectionObjective.value;
        if (isModularEmpty && elements.formTemplate.value.trim()) {
          const parsed = window.PromptStorage.parsePromptSections(elements.formTemplate.value);
          elements.formSectionPersona.value = parsed.persona;
          elements.formSectionObjective.value = parsed.objective;
          elements.formSectionContext.value = parsed.context;
          elements.formSectionGuardrails.value = parsed.guardrails;
          elements.formSectionOutput.value = parsed.outputRubric;
        }
        setFormAuthoringMode("modular");
      });
    }

    if (elements.formDeconstructBtn) {
      elements.formDeconstructBtn.addEventListener("click", () => {
        const template = elements.formTemplate ? elements.formTemplate.value : "";
        if (!template.trim()) {
          showToast("Please enter a prompt template to deconstruct", "info");
          return;
        }
        const parsed = window.PromptStorage.parsePromptSections(template);
        if (elements.formSectionPersona) elements.formSectionPersona.value = parsed.persona;
        if (elements.formSectionObjective) elements.formSectionObjective.value = parsed.objective;
        if (elements.formSectionContext) elements.formSectionContext.value = parsed.context;
        if (elements.formSectionGuardrails) elements.formSectionGuardrails.value = parsed.guardrails;
        if (elements.formSectionOutput) elements.formSectionOutput.value = parsed.outputRubric;

        setFormAuthoringMode("modular");
        showToast("Prompt successfully deconstructed into 5 Blueprint sections ✨", "success");
      });
    }

    // Modular fields live sync to template
    [
      elements.formSectionPersona,
      elements.formSectionObjective,
      elements.formSectionContext,
      elements.formSectionGuardrails,
      elements.formSectionOutput
    ].forEach(el => {
      if (el) {
        el.addEventListener("input", syncModularToQuick);
      }
    });

    // Guardrail quick-add chips
    const guardrailRules = {
      "zero-hallucination": "- Strict Factuality: Never fabricate facts, citations, numbers, or sources. If uncertain or ungrounded, explicitly decline to answer.",
      "no-fluff": "- Direct Delivery: Zero conversational filler, pleasantries, or preface. Deliver actionable results immediately.",
      "json-only": "- Strict JSON Output: Respond ONLY with valid, unescaped JSON matching schema. Do not enclose in markdown blocks.",
      "citation": "- Verification & Source Grounding: Anchor all claims to provided context or verified authoritative references with inline citations."
    };

    document.querySelectorAll(".guardrail-chip-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const type = btn.getAttribute("data-guardrail");
        const snippet = guardrailRules[type];
        if (snippet && elements.formSectionGuardrails) {
          const cur = elements.formSectionGuardrails.value.trim();
          elements.formSectionGuardrails.value = cur ? `${cur}\n${snippet}` : snippet;
          syncModularToQuick();
          showToast(`Added ${btn.textContent.trim()} rule 🛡️`, "info");
        }
      });
    });

    // Variable Helper buttons
    if (elements.insertChoiceVarBtn) {
      elements.insertChoiceVarBtn.addEventListener("click", () => {
        insertVariableSnippet("{{tone: Professional | Conversational | Technical | Direct}}");
      });
    }
    if (elements.insertTextVarBtn) {
      elements.insertTextVarBtn.addEventListener("click", () => {
        insertVariableSnippet("{{task_goal}}");
      });
    }

    // More Categories Modal Events
    const moreCatOpenMgrBtn = document.getElementById("moreCatOpenManagerBtn");
    if (moreCatOpenMgrBtn) {
      moreCatOpenMgrBtn.addEventListener("click", () => {
        elements.moreCategoriesModal.close();
        openCategoryManagerModal();
      });
    }
    if (elements.closeMoreCatModalBtn) {
      elements.closeMoreCatModalBtn.addEventListener("click", () => elements.moreCategoriesModal.close());
    }
    if (elements.cancelMoreCatBtn) {
      elements.cancelMoreCatBtn.addEventListener("click", () => elements.moreCategoriesModal.close());
    }
    if (elements.catSearchInput) {
      elements.catSearchInput.addEventListener("input", (e) => {
        renderMoreCategoriesGrid(e.target.value);
      });
    }
    if (elements.selectAllCatBtn) {
      elements.selectAllCatBtn.addEventListener("click", () => {
        const all = window.PromptStorage.getAllCategories();
        all.forEach(c => state.tempSelectedCategories.add(c));
        renderMoreCategoriesGrid(elements.catSearchInput ? elements.catSearchInput.value : "");
        updateMoreCatSummary();
      });
    }
    if (elements.clearAllCatBtn) {
      elements.clearAllCatBtn.addEventListener("click", () => {
        state.tempSelectedCategories.clear();
        renderMoreCategoriesGrid(elements.catSearchInput ? elements.catSearchInput.value : "");
        updateMoreCatSummary();
      });
    }
    if (elements.addNewCatBtn && elements.newCatNameInput) {
      elements.addNewCatBtn.addEventListener("click", () => {
        const name = elements.newCatNameInput.value.trim();
        if (!name) {
          showToast("Please enter a category name", "error");
          return;
        }
        window.PromptStorage.addCategory(name);
        state.tempSelectedCategories.add(name);
        elements.newCatNameInput.value = "";
        renderMoreCategoriesGrid(elements.catSearchInput ? elements.catSearchInput.value : "");
        updateMoreCatSummary();
        renderCategories();
        if (elements.formCategoryChips) renderFormCategoryChips();
        showToast(`Category "${name}" created!`, "success");
      });
    }
    if (elements.applyMoreCatBtn) {
      elements.applyMoreCatBtn.addEventListener("click", () => {
        state.selectedCategories = new Set(state.tempSelectedCategories);
        elements.moreCategoriesModal.close();
        renderCategories();
        renderGrid();
        showToast(`Applied ${state.selectedCategories.size} category filters`, "info");
      });
    }

    // Backup & Data Modal
    if (elements.openDataModalBtn) {
      elements.openDataModalBtn.addEventListener("click", () => {
        if (elements.dataModal && typeof elements.dataModal.showModal === "function") {
          elements.dataModal.showModal();
        }
      });
    }
    if (elements.closeDataModalBtn) {
      elements.closeDataModalBtn.addEventListener("click", () => elements.dataModal.close());
    }
    if (elements.exportJsonBtn) {
      elements.exportJsonBtn.addEventListener("click", () => {
        window.PromptStorage.exportToJSON();
        showToast("Exported JSON backup!", "success");
      });
    }
    if (elements.exportMdBtn) {
      elements.exportMdBtn.addEventListener("click", () => {
        window.PromptStorage.exportToMarkdown();
        showToast("Exported Markdown catalog!", "success");
      });
    }
    if (elements.exportSqliteBtn) {
      elements.exportSqliteBtn.addEventListener("click", () => {
        // Direct download of SQLite file from server directory
        const a = document.createElement("a");
        a.href = "server/promptlibrary.db";
        a.download = "promptlibrary.db";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
        }, 200);
        showToast("Downloaded promptlibrary.db SQLite database!", "success");
      });
    }
    if (elements.importFile) {
      elements.importFile.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          const mode = elements.importModeSelect ? elements.importModeSelect.value : "merge";
          const res = window.PromptStorage.importFromJSON(event.target.result, mode);
          if (res.success) {
            elements.dataModal.close();
            refreshData();
            const sourceMsg = res.source === "prompcat" ? " (Converted from Prompcat backup)" : "";
            showToast(`Imported ${res.count} prompts successfully!${sourceMsg}`, "success");
          } else {
            showToast(`Import failed: ${res.error}`, "error");
          }
        };
        reader.readAsText(file);
      });
    }
    if (elements.resetDefaultsBtn) {
      elements.resetDefaultsBtn.addEventListener("click", () => {
        if (confirm("Reset library to factory defaults? Your custom prompts will be replaced by the default library.")) {
          window.PromptStorage.resetToDefaults();
          elements.dataModal.close();
          refreshData();
          showToast("Reset to default prompt library", "info");
        }
      });
    }

    // Canvas Presets: Start from Scratch (Blank Canvas)
    if (elements.clearAllPromptsBtn) {
      elements.clearAllPromptsBtn.addEventListener("click", () => {
        if (confirm("Start from scratch with a blank canvas? All prompts will be cleared, but all 44 categories and 7 domain pillars remain ready for your new prompts.")) {
          window.PromptStorage.clearAllPrompts();
          elements.dataModal.close();
          refreshData();
          showToast("Library cleared! Ready for your custom prompts.", "info");
        }
      });
    }

    // Canvas Presets: Load Starter Pack
    if (elements.loadStarterPackBtn) {
      elements.loadStarterPackBtn.addEventListener("click", () => {
        const count = window.PromptStorage.loadStarterPack();
        elements.dataModal.close();
        refreshData();
        showToast(`Loaded clean Starter Pack (${count} flagship blueprints)!`, "success");
      });
    }


    // Smart Ingest: Single Text Prompt Converter
    if (elements.ingestConvertBtn) {
      elements.ingestConvertBtn.addEventListener("click", () => {
        const raw = elements.ingestRawText ? elements.ingestRawText.value.trim() : "";
        if (!raw) {
          showToast("Please paste a text prompt to ingest", "error");
          return;
        }

        let processed = raw;
        if (elements.ingestAutoVars && elements.ingestAutoVars.checked) {
          // Convert [variable], <variable> to {{variable}}
          processed = processed.replace(/\[([A-Za-z0-9_\-\s]{2,40})\]/g, (m, g) => `{{${g.toLowerCase().trim().replace(/\s+/g, '_')}}}`);
          processed = processed.replace(/<([A-Za-z0-9_\-\s]{2,40})>/g, (m, g) => `{{${g.toLowerCase().trim().replace(/\s+/g, '_')}}}`);
        }

        let title = elements.ingestTitle ? elements.ingestTitle.value.trim() : "";
        if (!title) {
          const firstLine = raw.split("\n")[0].replace(/^#+\s*/, "").trim();
          title = firstLine.length > 60 ? firstLine.slice(0, 57) + "..." : (firstLine || "Ingested Prompt");
        }

        const author = elements.ingestAuthor ? elements.ingestAuthor.value.trim() : "Custom";

        const newPrompt = {
          id: "ingest-" + Date.now(),
          title: title,
          author: author || "Custom",
          authorUrl: "",
          category: "General",
          categories: ["General"],
          difficulty: "Intermediate",
          model: "ChatGPT / Claude / Gemini",
          tags: ["ingested"],
          description: "Ingested via smart text converter",
          template: processed,
          isCustom: true
        };

        window.PromptStorage.savePrompt(newPrompt);
        elements.ingestRawText.value = "";
        if (elements.ingestTitle) elements.ingestTitle.value = "";
        elements.dataModal.close();
        refreshData();
        showToast(`Ingested prompt: "${title}"!`, "success");
      });
    }

    // Smart Ingest: Bulk Folder / Multi-File Ingest (.txt / .md)
    if (elements.ingestBulkFiles) {
      elements.ingestBulkFiles.addEventListener("change", async (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        let count = 0;
        for (const file of files) {
          try {
            const text = await file.text();
            if (!text.trim()) continue;
            let processed = text.trim();
            if (elements.ingestAutoVars && elements.ingestAutoVars.checked) {
              processed = processed.replace(/\[([A-Za-z0-9_\-\s]{2,40})\]/g, (m, g) => `{{${g.toLowerCase().trim().replace(/\s+/g, '_')}}}`);
              processed = processed.replace(/<([A-Za-z0-9_\-\s]{2,40})>/g, (m, g) => `{{${g.toLowerCase().trim().replace(/\s+/g, '_')}}}`);
            }
            const title = file.name.replace(/\.(txt|md)$/i, "").replace(/[-_]/g, " ");
            const newPrompt = {
              id: "bulk-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
              title: title,
              author: "Imported File",
              authorUrl: "",
              category: "General",
              categories: ["General"],
              difficulty: "Intermediate",
              model: "ChatGPT / Claude / Gemini",
              tags: ["bulk-imported"],
              description: `Bulk imported from ${file.name}`,
              template: processed,
              isCustom: true
            };
            window.PromptStorage.savePrompt(newPrompt);
            count++;
          } catch (err) {}
        }
        elements.dataModal.close();
        refreshData();
        showToast(`Bulk ingested ${count} prompt files!`, "success");
      });
    }

    // Keyboard Shortcuts
    document.addEventListener("keydown", (e) => {
      // Cmd/Ctrl + K: Focus search
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (elements.searchInput) {
          elements.searchInput.focus();
          elements.searchInput.select();
        }
      }

      // 'N': New Prompt (only if not focused on input)
      if (e.key === "n" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
        e.preventDefault();
        openAddEditModal();
      }

      // '?' : Open Help Center & Interactive Tour
      if (e.key === "?" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
        e.preventDefault();
        openHelpModal();
      }

      // Tour navigation keyboard shortcuts
      if (isTourActive) {
        if (e.key === "Escape") {
          e.preventDefault();
          exitTour();
        } else if (e.key === "ArrowRight" || e.key === "Enter") {
          e.preventDefault();
          renderTourStep(currentTourStep + 1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          renderTourStep(currentTourStep - 1);
        }
      }

      // Cmd/Ctrl + Enter in runner modal: Copy prompt
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && elements.runnerModal.open) {
        e.preventDefault();
        if (elements.runnerCopyBtn) elements.runnerCopyBtn.click();
      }
    });

    // Close modals on clicking backdrop
    [elements.runnerModal, elements.promptFormModal, elements.dataModal, elements.moreCategoriesModal, elements.categoryManagerModal, elements.helpModal].forEach(modal => {
      if (modal) {
        modal.addEventListener("click", (e) => {
          if (e.target !== modal) return;
          const rect = modal.getBoundingClientRect();
          const isDialogContent = (
            rect.top <= e.clientY &&
            e.clientY <= rect.top + rect.height &&
            rect.left <= e.clientX &&
            e.clientX <= rect.left + rect.width
          );
          if (!isDialogContent) {
            modal.close();
          }
        });
      }
    });

    // Initialize Help Center & Tour Controllers
    setupHelpCenter();
    setupTourListeners();

    // Back to Top Button
    if (elements.backToTopBtn) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
          elements.backToTopBtn.classList.add("visible");
        } else {
          elements.backToTopBtn.classList.remove("visible");
        }
      }, { passive: true });

      elements.backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  // ----------------------------------------------------
  // Interactive Help Center Controller
  // ----------------------------------------------------
  function openHelpModal(tabId = "interface") {
    if (!elements.helpModal) return;
    switchHelpTab(tabId);
    elements.helpModal.showModal();
  }

  function closeHelpModal() {
    if (elements.helpModal && elements.helpModal.open) {
      elements.helpModal.close();
    }
  }

  function switchHelpTab(tabId) {
    const tabBtns = document.querySelectorAll(".help-tab-btn");
    const tabPanes = document.querySelectorAll(".help-tab-pane");

    tabBtns.forEach(btn => {
      const isMatch = btn.dataset.helpTab === tabId;
      btn.classList.toggle("active", isMatch);
      btn.setAttribute("aria-selected", isMatch ? "true" : "false");
    });

    tabPanes.forEach(pane => {
      pane.classList.remove("active");
    });

    const targetPaneId = "paneHelp" + tabId.charAt(0).toUpperCase() + tabId.slice(1);
    const targetPane = document.getElementById(targetPaneId);
    if (targetPane) {
      targetPane.classList.add("active");
    }
  }

  function setupHelpCenter() {
    if (elements.openHelpModalBtn) {
      elements.openHelpModalBtn.addEventListener("click", () => openHelpModal("interface"));
    }
    if (elements.openWikiBtn) {
      elements.openWikiBtn.addEventListener("click", () => openHelpModal("wiki"));
    }
    if (elements.statsWikiBtn) {
      elements.statsWikiBtn.addEventListener("click", () => openHelpModal("wiki"));
    }
    if (elements.jumpToWikiFromHelpBtn) {
      elements.jumpToWikiFromHelpBtn.addEventListener("click", () => switchHelpTab("wiki"));
    }
    if (elements.closeHelpModalBtn) {
      elements.closeHelpModalBtn.addEventListener("click", closeHelpModal);
    }
    if (elements.closeHelpModalDoneBtn) {
      elements.closeHelpModalDoneBtn.addEventListener("click", closeHelpModal);
    }

    // Help navigation tab clicks
    document.querySelectorAll(".help-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        switchHelpTab(btn.dataset.helpTab);
      });
    });

    // Copy code snippet buttons in Help tabs
    document.querySelectorAll(".help-btn-copy-code").forEach(btn => {
      btn.addEventListener("click", () => {
        const text = btn.dataset.copyText;
        if (text) {
          copyToClipboard(text);
          const originalText = btn.innerHTML;
          btn.innerHTML = `✓ Copied!`;
          btn.style.borderColor = "var(--accent-emerald)";
          btn.style.color = "var(--accent-emerald)";
          showToast(`Copied snippet: ${text}`, "success");
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.borderColor = "";
            btn.style.color = "";
          }, 1800);
        }
      });
    });

    // Interactive Sandbox in Tab 4
    function updateHelpSandbox() {
      if (!elements.helpSandboxResult || !elements.helpSandboxTemplate) return;
      let text = elements.helpSandboxTemplate.value || "";
      const prod = elements.helpDemoProduct ? elements.helpDemoProduct.value : "PromptVault Pro";
      const aud = elements.helpDemoAudience ? elements.helpDemoAudience.value : "AI Engineers";

      text = text.replace(/\{\{\s*product_name\s*\}\}/gi, prod);
      text = text.replace(/\{\{\s*audience\s*\}\}/gi, aud);
      text = text.replace(/\{\{\s*tone:\s*([^}|]+)[^}]*\}\}/gi, "$1".trim());
      elements.helpSandboxResult.textContent = text;
    }

    if (elements.helpSandboxTemplate) elements.helpSandboxTemplate.addEventListener("input", updateHelpSandbox);
    if (elements.helpDemoProduct) elements.helpDemoProduct.addEventListener("input", updateHelpSandbox);
    if (elements.helpDemoAudience) elements.helpDemoAudience.addEventListener("input", updateHelpSandbox);

    // Deep links inside Help Modal
    if (elements.helpOpenCatManagerBtn) {
      elements.helpOpenCatManagerBtn.addEventListener("click", () => {
        closeHelpModal();
        openCategoryManagerModal();
      });
    }
    if (elements.helpCreatePromptBtn) {
      elements.helpCreatePromptBtn.addEventListener("click", () => {
        closeHelpModal();
        openAddEditModal();
      });
    }
    if (elements.helpOpenDataModalBtn) {
      elements.helpOpenDataModalBtn.addEventListener("click", () => {
        closeHelpModal();
        openDataModal();
      });
    }

    // Interactive Card Anatomy Inspector
    const HOTSPOT_DATA = {
      1: {
        badge: "HOTSPOT 1",
        title: "Domain Pillar & Blueprint Badge",
        what: "The top-level architectural discipline (Automation & Systems). The 'Blueprint' badge indicates an enterprise 5-section prompt structured with Persona, Objective, Inputs, Guardrails, and Rubric.",
        ai: "Maps to the cognitive domain anchor. It primes the AI's internal attention mechanisms for technical rigor and domain vocabulary rather than surface-level consumer answers.",
        best: "Categorization enables rapid discovery by function. If omitted, prompts blend into an unstructured list with no clear professional context."
      },
      2: {
        badge: "HOTSPOT 2",
        title: "Category, Subcategory & Difficulty Badges",
        what: "Granular taxonomy tags (e.g., Spreadsheet Automation, VBA Macros) and skill rating (Beginner / Intermediate / Advanced).",
        ai: "Helps users calibrate prompt complexity and informs the AI of the expected depth and audience skill level.",
        best: "Subcategories prevent sprawling duplicate lists. All subcategories in PromptVault Pro pull from a unified, deduplicated master pool."
      },
      3: {
        badge: "HOTSPOT 3",
        title: "Prompt Preview & Dynamic Variables ({{var}})",
        what: "The actual prompt text showing reactive variable parameter slots like {{platform: Excel 365 | Sheets}} and {{task_description}}.",
        ai: "THE CORE ENGINE OF PROMPT ENGINEERING. As Akın notes in 'The Prompting Book', separating instructions from context allows 1 single blueprint to serve hundreds of different situations without rewriting.",
        best: "Always parameterize values that change between runs (topic, platform, audience). Never hardcode names or dates directly into reusable blueprints."
      },
      4: {
        badge: "HOTSPOT 4",
        title: "Clickable Hashtags (#tags)",
        what: "Keyword metadata for instant discovery (e.g., #excel, #vba, #formulas).",
        ai: "Used by PromptVault Pro's instant fuzzy search engine. In the active library, clicking any hashtag immediately filters the grid to all related prompts.",
        best: "Use standardized hashtags to link complementary prompts across different domain pillars."
      },
      5: {
        badge: "HOTSPOT 5",
        title: "Originator / Author Credit",
        what: "Dedicated author attribution recognizing original creators and thought leaders (e.g., Randy Austin - ExcelForFreelancers, HubSpot, Anthropic Lab).",
        ai: "Identifies prompt lineage and allows users to browse specialized author collection packs.",
        best: "PromptVault Pro ensures creators are properly attributed on every card and export."
      },
      6: {
        badge: "HOTSPOT 6",
        title: "Action Buttons: Copy vs. Use Blueprint",
        what: "Two distinct execution modes: 'Copy' places the raw template into your clipboard; 'Use Blueprint' opens the interactive prompt runner.",
        ai: "The Runner parses all {{variables}} and choice pills into interactive UI fields with real-time token estimation, live compilation, and model switching.",
        best: "Use 'Copy' for quick pasting into external automation pipelines; use 'Use Blueprint' for interactive parameterized workflows."
      }
    };

    function selectHotspot(hotspotId) {
      const pins = document.querySelectorAll(".inspector-hotspot-pin");
      pins.forEach(pin => {
        pin.classList.toggle("active", pin.dataset.hotspot === String(hotspotId));
      });
      const buttons = document.querySelectorAll(".hotspot-btn");
      buttons.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.hotspot === String(hotspotId));
      });
      const data = HOTSPOT_DATA[hotspotId];
      if (!data) return;
      const b = document.getElementById("inspectorDetailBadge");
      const t = document.getElementById("inspectorDetailTitle");
      const w = document.getElementById("inspectorDetailWhat");
      const a = document.getElementById("inspectorDetailAi");
      const best = document.getElementById("inspectorDetailBest");
      if (b) b.textContent = data.badge;
      if (t) t.textContent = data.title;
      if (w) w.textContent = data.what;
      if (a) a.textContent = data.ai;
      if (best) best.textContent = data.best;
    }

    document.querySelectorAll(".inspector-hotspot-pin").forEach(pin => {
      pin.addEventListener("mouseenter", () => selectHotspot(pin.dataset.hotspot));
      pin.addEventListener("click", () => selectHotspot(pin.dataset.hotspot));
    });

    document.querySelectorAll(".hotspot-btn").forEach(btn => {
      btn.addEventListener("mouseenter", () => selectHotspot(btn.dataset.hotspot));
      btn.addEventListener("click", () => selectHotspot(btn.dataset.hotspot));
    });

    // Wiki Chapter Navigation
    const wikiNavBtns = document.querySelectorAll(".wiki-nav-item");
    const wikiArticles = document.querySelectorAll(".wiki-article-chapter");

    wikiNavBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.wikiTarget;
        wikiNavBtns.forEach(b => b.classList.toggle("active", b === btn));
        wikiArticles.forEach(art => {
          art.style.display = art.id === `wikiArticle-${target}` ? "block" : "none";
        });
        const articleView = document.getElementById("wikiArticleView");
        if (articleView) articleView.scrollTop = 0;
      });
    });

    // Tour launch buttons
    if (elements.startSpotlightTourBtn) {
      elements.startSpotlightTourBtn.addEventListener("click", () => startTour(0));
    }
    if (elements.helpStartTourHeroBtn) {
      elements.helpStartTourHeroBtn.addEventListener("click", () => startTour(0));
    }
    if (elements.helpModalStartTourSecondaryBtn) {
      elements.helpModalStartTourSecondaryBtn.addEventListener("click", () => startTour(0));
    }
  }

  // ----------------------------------------------------
  // Spotlight Interactive Guided Tour Engine
  // ----------------------------------------------------
  const TOUR_STEPS = [
    {
      targetSelector: ".nav-mode-bar",
      title: "7 Domain Pillars & Dual View Modes",
      topic: "Architecture",
      desc: "• 🏷️ By Functional Domain: Groups prompts by job-to-be-done (Automation, Software Engineering, Business, Marketing, etc.).\n• 📦 By Collection Pack: Groups prompts by creator or source (e.g. Randy Austin Pack, HubSpot Pack, Anthropic Lab). Toggle between them anytime!"
    },
    {
      targetSelector: "#categoryNav",
      title: "Category & Subcategory Taxonomy",
      topic: "Taxonomy",
      desc: "Browse categories under each domain pillar. Subcategories represent specific granular operations (like VBA Macros or API Integration). Click 'More...' to view the complete 44-category taxonomy tree."
    },
    {
      targetSelector: ".search-container",
      title: "Instant Fuzzy Search (⌘K)",
      topic: "Navigation",
      desc: "Press ⌘K to instantly search across titles, descriptions, blueprint sections, {{variables}}, authors, and hashtags in real-time. Zero server latency!"
    },
    {
      targetSelector: ".prompt-card",
      title: "Smart Blueprint Cards & Anatomy",
      topic: "Execution",
      desc: "Each card displays its domain, author attribution (e.g. 👤 Randy Austin), and variable count. Click 'Use Blueprint' to fill dynamic variables in real-time, or 'Copy' for instant clipboard access. In the library, clicking any #hashtag filters by that tag!"
    },
    {
      targetSelector: "#openCategoryManagerBtn",
      title: "Taxonomy & Deduplication Manager",
      topic: "Organization",
      desc: "Create custom categories, assign subcategories from the 100+ master pool, and eliminate duplicate tags with the built-in deduplication shield."
    },
    {
      targetSelector: "#openDataModalBtn",
      title: "Backup, Ingest & Vault Portability",
      topic: "Data Portability",
      desc: "Export your library to JSON, SQLite, or Markdown. Paste raw text into Smart Ingest to auto-convert [brackets] into {{variables}}, or reset to the clean 7-pillar Starter Pack."
    },
    {
      targetSelector: "#openAddPromptBtn",
      title: "Create New Blueprint (N)",
      topic: "Authoring",
      desc: "Press 'N' or click here to craft either a Simple Text Template or a full 5-Section Modular AI Blueprint with dynamic {{variable}} parameter slots."
    }
  ];

  let currentTourStep = 0;
  let isTourActive = false;

  function startTour(stepIndex = 0) {
    closeHelpModal();
    currentTourStep = stepIndex;
    isTourActive = true;

    if (!elements.tourOverlay) return;
    elements.tourOverlay.classList.remove("hidden");
    elements.tourOverlay.setAttribute("aria-hidden", "false");

    renderTourStep(currentTourStep);
    window.addEventListener("resize", repositionTourOverlay);
    window.addEventListener("scroll", repositionTourOverlay, { passive: true });
  }

  function exitTour() {
    isTourActive = false;
    if (elements.tourOverlay) {
      elements.tourOverlay.classList.add("hidden");
      elements.tourOverlay.setAttribute("aria-hidden", "true");
    }
    window.removeEventListener("resize", repositionTourOverlay);
    window.removeEventListener("scroll", repositionTourOverlay);
  }

  function renderTourStep(index) {
    if (index < 0) index = 0;
    if (index >= TOUR_STEPS.length) {
      exitTour();
      showToast("Tour completed! You are ready to build.", "success");
      return;
    }

    currentTourStep = index;
    const step = TOUR_STEPS[index];
    let targetEl = document.querySelector(step.targetSelector);

    // Fallback if target element isn't currently visible
    if (!targetEl) {
      targetEl = document.querySelector(".header") || document.body;
    }

    // Scroll element smoothly into center view
    targetEl.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });

    // Update text
    if (elements.tourStepBadge) {
      elements.tourStepBadge.textContent = `Step ${index + 1} of ${TOUR_STEPS.length}`;
    }
    const topicBadge = elements.tourCard ? elements.tourCard.querySelector(".tour-topic-badge") : null;
    if (topicBadge) topicBadge.textContent = step.topic;
    if (elements.tourCardTitle) elements.tourCardTitle.textContent = step.title;
    if (elements.tourCardDesc) elements.tourCardDesc.textContent = step.desc;

    // Prev / Next buttons
    if (elements.tourPrevBtn) {
      elements.tourPrevBtn.disabled = index === 0;
    }
    if (elements.tourNextBtn) {
      elements.tourNextBtn.textContent = index === TOUR_STEPS.length - 1 ? "Finish ✓" : "Next →";
    }

    // Progress dots
    if (elements.tourProgressDots) {
      elements.tourProgressDots.innerHTML = "";
      TOUR_STEPS.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.className = `tour-dot ${i === index ? "active" : ""}`;
        dot.style.cursor = "pointer";
        dot.addEventListener("click", () => renderTourStep(i));
        elements.tourProgressDots.appendChild(dot);
      });
    }

    // Reposition highlight box & tooltip card after a slight delay for smooth scroll
    setTimeout(() => {
      repositionTourOverlay();
    }, 180);
  }

  function repositionTourOverlay() {
    if (!isTourActive) return;
    const step = TOUR_STEPS[currentTourStep];
    if (!step) return;

    let targetEl = document.querySelector(step.targetSelector);
    if (!targetEl) targetEl = document.querySelector(".header") || document.body;

    const rect = targetEl.getBoundingClientRect();
    const pad = 8;

    // Highlight box
    if (elements.tourHighlightBox) {
      elements.tourHighlightBox.style.top = Math.max(0, rect.top - pad) + "px";
      elements.tourHighlightBox.style.left = Math.max(0, rect.left - pad) + "px";
      elements.tourHighlightBox.style.width = (rect.width + pad * 2) + "px";
      elements.tourHighlightBox.style.height = (rect.height + pad * 2) + "px";
    }

    // Tooltip card positioning
    if (elements.tourCard) {
      const cardRect = elements.tourCard.getBoundingClientRect();
      const cardWidth = cardRect.width || 340;
      const cardHeight = cardRect.height || 180;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Prefer placing below target, fallback above
      let top = rect.bottom + 16;
      if (top + cardHeight > viewportHeight - 20) {
        top = Math.max(20, rect.top - cardHeight - 16);
      }

      // Horizontal center alignment relative to target
      let left = rect.left + (rect.width / 2) - (cardWidth / 2);
      if (left < 16) left = 16;
      if (left + cardWidth > viewportWidth - 16) {
        left = viewportWidth - cardWidth - 16;
      }

      elements.tourCard.style.top = top + "px";
      elements.tourCard.style.left = left + "px";
    }
  }

  function setupTourListeners() {
    if (elements.tourCloseBtn) {
      elements.tourCloseBtn.addEventListener("click", exitTour);
    }
    if (elements.tourSkipBtn) {
      elements.tourSkipBtn.addEventListener("click", exitTour);
    }
    if (elements.tourNextBtn) {
      elements.tourNextBtn.addEventListener("click", () => {
        renderTourStep(currentTourStep + 1);
      });
    }
    if (elements.tourPrevBtn) {
      elements.tourPrevBtn.addEventListener("click", () => {
        renderTourStep(currentTourStep - 1);
      });
    }
  }

  // ----------------------------------------------------
  // Utility Functions
  // ----------------------------------------------------
  function debounce(fn, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(err => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Fallback copy failed", err);
    }
    document.body.removeChild(textArea);
  }

  function showToast(message, type = "info") {
    if (!elements.toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    let iconSvg = ICONS.copy;
    if (type === "success") iconSvg = ICONS.check;
    else if (type === "error") iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="9" y2="15"/></svg>`;

    toast.innerHTML = `${iconSvg} <span>${escapeHTML(message)}</span>`;
    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "all 0.25s ease";
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 250);
    }, 3200);
  }

  function escapeHTML(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Boot
  init();
});
