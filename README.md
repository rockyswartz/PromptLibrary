# 🚀 PromptVault Pro — Interactive AI Prompt Library & Blueprint System

A beautiful, offline-ready, open-source web application for exploring, parameterizing, testing, and managing production-grade AI prompts and automation blueprints.

Built with modern semantic HTML5, Vanilla CSS, and lightweight Vanilla JavaScript. Zero npm dependencies, zero complex build steps, and ready for instant deployment to **GitHub Pages**.

---

## ✨ Key Features & Architecture

### ⚡ 1. Instant Variable Injection & Live Prompt Runner
- **No More Hunt-and-Replace**: Traditional prompt libraries force you to copy a prompt, paste it into an AI chat, and hunt through bracketed placeholders like `[INSERT TOPIC HERE]`.
- **Reactive Variable Parser**: Automatically converts placeholders like `{{goal}}`, `{{audience}}`, or `{{tone}}` into interactive form fields.
- **Dynamic Compilation**: As you type or toggle choice pills, values are dynamically compiled into the prompt in real time.
- **Live Telemetry & Token Estimator**: View word count, character count, and estimated LLM tokens (`Math.ceil(characters / 4)`) live as you edit.
- **1-Click Copy**: Instant clipboard copy with toast feedback, plus <kbd>⌘+Enter</kbd> / <kbd>Ctrl+Enter</kbd> shortcut.

### 🎯 2. Multiple-Choice Parameter Inputs
- **Syntax**: `{{variable_name: Option 1 | Option 2 | Option 3}}`
- **Interactive Choice Pills**: Multiple-choice variables render as clickable toggle pills for rapid selection.
- **Custom Write-In Fallback**: Includes a built-in "Custom write-in..." toggle so users can enter bespoke values whenever needed.

### 🗂️ 3. Intelligent Category Navigation & 3-Row Limit
- **Strict 3-Row Flex Limit**: Capped at 3 rows maximum to avoid navigation bars wrapping down the screen as categories scale.
- **Dynamic Overflow Pill**: Categories that exceed 3 rows are neatly bundled into a reactive `+ More Categories (N)` pill button.
- **Compact Category Filter Modal**:
  - Clean **2-column grid** (`minmax(280px, 1fr)`) showing category title, selection checkbox, and prompt count badge.
  - Subcategory tags are omitted from filter cards to keep cards tidy, uniform (~42px height), and easily scannable without truncation.
  - Real-time search filter matching category names and subcategories.
  - Quick "Select All" and "Clear All" actions.
  - Inline "+ Create Custom Category" creator.

### ⚙️ 4. Dedicated Category & Taxonomy Manager
- Accessible via the header (**"Manage Categories"**) or directly from the overflow filter modal (**"⚙️ Open Full Category Manager"**).
- **Hierarchical Management**: View each category along with its nested subcategories across 45+ domains.
- **Inline Subcategory Addition**: Add new subcategories to any category with zero page reloads.
- **Removable Tags**: Delete individual subcategories with one click.
- **Safe Deletion**: Deleting a category automatically moves assigned prompts to `"General"` to prevent orphaned data.

### 🏷️ 5. Multi-Category Prompt Tagging
- Prompts can belong to **multiple categories simultaneously** (e.g., both `Automation & Systems` and `Coding & Architecture`).
- The prompt creation/editing modal features multi-select category checkboxes with real-time selection counts and contextual subcategory chips.
- Syntax generation helpers (`+ Add Choice Variable` and `+ Add Text Variable`) automatically insert valid syntax at the cursor position.

### ⭐ 6. Complete Curated Catalog (333+ Prompts, 45+ Categories)
Bakes in the entire collection from **Prompcat** along with production blueprints:
- **Automation & Systems**: Excel & VBA formula automation, Make/Zapier workflow blueprints, AI Prompt Library Designer (by *Randy Austin - ExcelForFreelancers*).
- **Coding & Architecture**: Full-stack code reviews, System design RFCs, SQL query optimization, RESTful OpenAPI specs, unit test suites.
- **Prompt Engineering**: Meta-prompt optimizers, few-shot demonstration generators, AI persona & system guardrails.
- **Claude Tools & Gemini CLI**: System prompts, bash tools, glob tools, edit tools.
- **TypeUI**: UI component blueprints, hero sections, navbar designs.
- **ChatPRD**: Competitive analysis, PRDs, user stories, product roadmaps.
- **CreativeActTech**: Content strategy, blog post expansion, technical writing.
- **Nano Banana & Images**: High-fidelity visual prompts, composition rules, aspect ratio resizers.
- **HubSpot, Business & Strategy, Marketing, Education, Data Analysis, and more**.

### 📐 6. Modular Blueprint Engine & Tri-Mode Runner (Phase 3)
- **5-Section Enterprise Prompt Anatomy**:
  - 👤 **Role / Persona**: Expert alignment and cognitive frame.
  - 🎯 **Core Task / Objective**: Clear, unambiguous primary deliverable.
  - 📥 **Context & Dynamic Inputs**: Strict data contracts and variable bindings (`{{var}}` or `{{var: Option A | Option B}}`).
  - 🛡️ **Negative Guardrails & Reliability**: Anti-hallucination rules, failure fallbacks, and negative constraints.
  - 📑 **Output Specification & Rubric**: Structural schema and quality verification criteria.
- **Tri-Mode Runner Modal**:
  - **Modular Blueprint View**: 5 visual cards highlighting each section with color-coded badges.
  - **Compiled Prompt View**: Formatted raw prompt with live character, word, and token counters.
  - **Side-by-Side Split View**: Left-hand blueprint and variable controls paired with real-time reactive right-hand output stream.
- **Intelligent 1-Click Deconstructor**:
  - Heuristically parses legacy unstructured prompts into structured 5-part blueprints.
- **1-Click Production Guardrails**:
  - Quick chips for Zero Hallucination, No Fluff / Direct Delivery, Strict JSON Schema, and Fact Verification.

### 💾 7. Dual-Tier Storage Architecture (Browser-First + Optional SQLite)
- **Primary Engine: In-Browser IndexedDB**:
  - Fully transactional client-side database with gigabyte storage capacity.
  - Completely bypasses browser 5MB `localStorage` limits.
  - Synchronous in-memory caching ensures instant 60fps search and filtering.
- **Optional Local SQLite Backend (`server/server.py`)**:
  - Python-powered local server connecting directly to `server/promptlibrary.db`.
  - Zero pip dependencies required (standard library `sqlite3` + `http.server`).
  - Web app auto-detects if `server.py` is running on `localhost:8000` and syncs changes automatically.
- **Triple-Format Backup & Portability**:
  - **JSON**: Full v2.0 JSON backup with taxonomy structure and merge/overwrite options.
  - **Markdown**: Beautifully formatted Markdown ready for Obsidian and Notion.
  - **SQLite (.db)**: Download the complete database directly for local analysis in SQLite tools.

### 📱 8. Mobile Phone Portrait Responsiveness & Fluid Clamp System
- **Fluid CSS `clamp()` Design Tokens**: Typography (`--text-2xs` to `--text-hero`) and spacing (`--space-2xs` to `--space-xl`) adapt continuously to any viewport width from 360px portrait phones to 4K displays.
- **Adaptive Single-Row Mobile Header**: Compacts secondary button labels on screens `<600px` into high-contrast icon buttons, preventing horizontal overflow or wrapping.
- **Mobile-Responsive Tri-Mode Runner**: Split layout automatically stacks into a seamless 1-column scrollable workspace on screens `≤860px`.
- **Mutual-Exclusion Taxonomy Accordion**: In the Taxonomy & Deduplication Manager, expanding any Domain Pillar automatically collapses all other open tabs while enforcing `flex-shrink: 0`, preventing vertical compression and allowing tree scrolling up to 58vh.
- **Brand Asset Integration**: Powered by `assets/PromptLibrary_pro_Favicon.png` in the header and browser tab favicon.
- **Quick "To the Top" Button**: Floating pill button with smooth scrolling and passive scroll-threshold detection (>300px).

---

## 🚀 How to Run

### Method 1: Instant Browser Launch (Zero Server Required)
Simply double-click `index.html` or run:

```bash
open "/Volumes/Active/AI Builds/PromtLibrary/index.html"
```

### Method 2: GitHub Repository & Automated GitHub Pages Deployment
The project is hosted on GitHub at:
🔗 **[https://github.com/rockyswartz/PromptLibrary](https://github.com/rockyswartz/PromptLibrary)**

- **Automated Continuous Deployment**: Includes a pre-configured GitHub Actions workflow (`.github/workflows/deploy.yml`). Any push to `main` automatically builds and updates the live site.
- **To Enable GitHub Pages**:
  1. On your repo page, go to **Settings > Pages**.
  2. Under **Build and deployment > Source**, select **GitHub Actions**.
  3. The live application will automatically publish to:
     🌐 `https://rockyswartz.github.io/PromptLibrary/`

### Method 3: Local SQLite Server (For Developers)
```bash
python3 server/server.py
```
Then visit: [http://localhost:8000](http://localhost:8000)

---

## 🔄 Automatic Change Syncing & Auto-Push

You can keep your GitHub repository updated automatically whenever you make changes:

### Option A: Background Auto-Watcher (Watches for any file save and auto-pushes)
Run this once in your terminal:
```bash
./scripts/watch-and-sync.sh
# or using npm:
npm run watch-sync
```
*Whenever you edit or save any file in the project, the watcher detects it, batches edits with a 3-second debounce, stages files, commits with a timestamp, and pushes straight to GitHub automatically.*

### Option B: 1-Click Instant Sync Command
```bash
./scripts/auto-sync.sh "Added new marketing blueprints"
# or simply:
npm run sync
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>⌘K</kbd> or <kbd>Ctrl+K</kbd> | Jump to search bar |
| <kbd>N</kbd> | Open "Create New Prompt" modal |
| <kbd>Esc</kbd> | Close any open modal |
| <kbd>⌘+Enter</kbd> or <kbd>Ctrl+Enter</kbd> | Copy compiled prompt inside the runner |

---

## 📁 Project Structure

```text
PromtLibrary/
├── index.html                  # Semantic HTML5 app, modals, responsive navigation
├── .nojekyll                   # Ensures clean GitHub Pages asset serving
├── css/
│   └── style.css               # Design system, glassmorphism, 3-row flex limit, compact cards
├── js/
│   ├── data.js                 # Complete 333-prompt master dataset (Curated + Prompcat)
│   ├── storage.js              # IndexedDB engine, 45-category taxonomy, SQLite sync
│   └── app.js                  # Reactive controller, variable injection engine, category observer
├── server/
│   ├── server.py               # Optional local Python SQLite server & REST API
│   ├── init_db.py              # Script to initialize / reseed promptlibrary.db
│   ├── promptlibrary.db        # Pre-seeded SQLite database file
│   └── README.md               # Backend guide & REST documentation
├── templates/                  # Blueprint templates
├── SKILL.md                    # AI Prompt Library Designer skill specification & JSON schema
├── prompcat_backup_converted.json # Standalone JSON backup of migrated Prompcat prompts
└── README.md                   # Complete documentation & user guide
```
