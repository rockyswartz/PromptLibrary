# 🚀 PromptVault Pro — Interactive AI Prompt Library & Blueprint System

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/rockyswartz/PromptLibrary)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-brightgreen)](https://rockyswartz.github.io/PromptLibrary/)

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

### 👤 6. Standardized Originator Attribution & Author Credits
- **Dedicated Originator Field**: Every prompt includes a standardized `author` and optional `authorUrl` field.
- **Card Footer Display**: Originator credits appear prominently on the bottom-left of each prompt card with a dedicated author badge (e.g. `👤 Randy Austin - ExcelForFreelancers`, `👤 HubSpot`, `👤 Anthropic`, `👤 TypeUI`).
- **Editable in Form**: Set bespoke author credits and links directly in the Create / Edit Prompt modal.

### 📦 7. Production-Ready Architecture & Starter Pack
- **Flagship Starter Pack (`js/data.js`)**: Ships with 7 exemplar blueprints representing all 7 Domain Pillars (Automation, Engineering, Business, Marketing, Images, UI/UX, and Education). Keeps the initial install lightweight, fast, and immediately understandable.
- **Personal Vault Independence**: Users can import their own personal JSON backups or ingest text prompts without modifying the core codebase.
- **1-Click Canvas Presets**: In the Backup modal:
  - 🗑️ **Start from Scratch (Blank Canvas)**: Clears all prompts so you can build your own bespoke library. All 44 categories and 7 domain pillars remain ready for your new prompts.
  - ⚡ **Load Starter Pack (7 Flagships)**: Restores the clean 7-blueprint showcase.
  - 📥 **Import JSON Backup**: Load any custom prompt collection or private vault.

### 📥 8. Smart Ingest & Raw Text-to-Prompt Converter
- **In-App Smart Text Ingester**: Paste any raw text or markdown prompt.
- **Auto-Placeholder Conversion**: Converts legacy placeholders like `[Topic]`, `<Audience>`, or `{Tone}` into interactive PromptVault variables: `{{topic}}`, `{{audience}}`, `{{tone}}`.
- **Bulk Folder Ingestion**: Select multiple `.txt` or `.md` files at once to convert and import whole directories into your library.
- **Python CLI Converter (`scripts/text_to_prompt_json.py`)**: Standalone tool for power users to convert folders of notes into valid PromptVault JSON.

### 📐 9. Modular Blueprint Engine & Tri-Mode Runner (Phase 3)
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
  - Web app auto-detects if `server.py` is running on `localhost:8080` and syncs changes automatically.
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

### ❓ 9. Interactive Help Center & Guided Spotlight Tour
- **Dedicated Help & Tour Modal**: Accessible via the header (**"Help & Tour"**) or shortcut <kbd>?</kbd>.
- **5 Comprehensive Visual Learning Tabs**:
  1. 🖥️ **Interface & Architecture Tour**: Visual blueprint breakdown of the 7 Domain Pillars, search bar, and card anatomy.
  2. 🗂️ **Categories & Subcategories Walkthrough**: Step-by-step guide explaining how to create categories, link subcategories from the 100+ master pool, and eliminate tag duplicates.
  3. 📐 **Modular Blueprints vs. Simple Prompts**: Direct comparison of lightweight templates vs. 5-section enterprise prompts (Role, Objective, Inputs, Guardrails, Output Rubric).
  4. ⚡ **Variable Syntax Cheatsheet & Live Sandbox**: Interactive playground with instant token replacement testing and copyable syntax chips.
  5. 📥 **Ingestion & Vault Backups**: Complete instructions for in-app Smart Ingestion, Python CLI batch processing, and JSON/SQLite restore.
- **🎯 Live Spotlight Screen Tour**:
  - Non-modal interactive walkthrough with dark spotlight backdrop and tethered floating cards.
  - Step-by-step navigation highlighting 7 live screen elements with progress dots and keyboard shortcuts (<kbd>→</kbd>, <kbd>←</kbd>, <kbd>Enter</kbd>, <kbd>Esc</kbd>).

---

## 🚀 How to Run & Deploy

You can use PromptVault Pro in two simple ways, depending on your workflow:

---

### Option 1: 🌐 Instant Web App (No Installation Needed)
If you want to use the application immediately on your desktop, tablet, or phone without installing anything:

👉 **[Launch Live PromptVault Pro](https://rockyswartz.github.io/PromptLibrary/)**

- **How it works**: Runs instantly in any modern browser (Chrome, Safari, Edge, Firefox).
- **Data Privacy**: All prompts, custom modifications, and imported templates are saved **locally inside your browser's persistent IndexedDB storage**. Your private prompts are never uploaded to any external server.
- **Backup Recommendation**: Because data is stored in your browser's storage, use the **⚡ Backup** button in the header to export a `.json` backup file periodically. This ensures your data remains safe even if you clear your browser history or switch devices.

---

### Option 2: 💻 Full Local Installation (With Offline SQLite Database)
If you want a dedicated offline copy on your computer with a real SQLite database file (`promptlibrary.db`) saved directly to your hard drive:

#### Step 1: Download the Repository
- Click the green **`<> Code`** button at the top of the GitHub page and select **Download ZIP** (or run `git clone https://github.com/rockyswartz/PromptLibrary.git`).
- Extract the ZIP folder into any directory on your computer (e.g. `~/Documents/PromptVault` or `C:\PromptVault`).

#### Step 2: Launch the Local Server
PromptVault Pro includes a lightweight local backend powered by Python's built-in standard library (`sqlite3` and `http.server`—zero `pip install` dependencies required):

```bash
python3 server/server.py
```
*(If port 8080 is already occupied by another program on your computer, the server automatically detects the collision and steps to port 8081 without errors).*

#### Step 3: Open in Browser
Visit the local server in your browser:
👉 **[http://localhost:8080](http://localhost:8080)**

All prompts and custom additions are now synchronized with your local `server/promptlibrary.db` database file!

---

## 🖥️ 1-Click Desktop & Mobile Applet Walkthroughs (macOS | Windows | Linux | iOS)

To launch PromptVault Pro with a single click—without opening a terminal or remembering ports—follow the walkthrough below for your operating system:

---

### 🍎 1. macOS (Apple Mac)

#### Option A: Pre-packaged Command Launcher (Fastest)
1. In Finder, open the project's `scripts/` folder.
2. Drag `launch-macos.command` to your **Desktop** or **Dock**.
3. Double-clicking it automatically checks if the Python backend is active, starts it in the background if needed, and launches `http://localhost:8080` in your default browser.

#### Option B: Standalone Native macOS App (`PromptVault.app`)
To create a clean native `.app` bundle with the official PromptVault icon:
1. Press <kbd>Cmd</kbd> + <kbd>Space</kbd>, type **Script Editor**, and hit <kbd>Enter</kbd>.
2. Paste the following AppleScript:
   ```applescript
   -- Check if PromptVault backend is active; if not, launch in background
   set serverRunning to (do shell script "pgrep -f 'server.py' || true")
   if serverRunning is "" then
       do shell script "cd '/Volumes/Active/AI Builds/PromtLibrary' && python3 server/server.py --port 8080 > /dev/null 2>&1 &"
       delay 1
   end if

   -- Launch PromptVault Pro in default browser
   open location "http://localhost:8080"
   ```
3. Click **File > Export...**
   - **Save As**: `PromptVault Pro`
   - **Where**: Select `Applications` or `Desktop`
   - **File Format**: Select **Application** *(critical: do not save as Script)*
4. **Add Custom App Icon**:
   - In Finder, select your newly exported `PromptVault Pro.app` and press <kbd>Cmd</kbd> + <kbd>I</kbd> (Get Info).
   - In another Finder window, open `assets/` and drag `PromptLibrary_pro_Favicon.png` onto the small icon in the top-left of the Get Info window.
5. You now have a standalone Mac application accessible via Spotlight and Launchpad!

---

### 🪟 2. Windows 10 & 11

#### Option A: 1-Click Batch File (`scripts/launch-windows.bat`)
1. Create a Desktop shortcut to `scripts/launch-windows.bat`:
   - Right-click `scripts\launch-windows.bat` > **Send to > Desktop (create shortcut)**.
2. Double-clicking the shortcut automatically spins up the background Python backend and opens `http://localhost:8080`.

#### Option B: Completely Silent Launcher (No Black Console Window)
To launch silently in the background without leaving a CMD prompt window open:
1. In the repository root, create a file named `Launch_PromptVault.vbs` with the following:
   ```vbscript
   Set WshShell = CreateObject("WScript.Shell")
   ' Launch server silently without console window (0 = hidden)
   WshShell.Run "python server\server.py --port 8080", 0, False
   WScript.Sleep 1000
   ' Open default web browser to localhost
   WshShell.Run "http://localhost:8080"
   ```
2. Right-click `Launch_PromptVault.vbs` > **Send to > Desktop (create shortcut)**.
3. Right-click the desktop shortcut > **Properties > Change Icon...** and pick an icon.

#### Option C: Native PWA Desktop App (Edge or Chrome)
1. Open `http://localhost:8080` in **Microsoft Edge** or **Google Chrome**.
2. Click the browser menu (`...`) in the top-right corner.
3. Select **Apps > Install PromptVault Pro as an App** (or click the install icon in the URL address bar).
4. PromptVault will run in its own dedicated, frameless desktop application window with taskbar pinning.

---

### 🐧 3. Linux (Ubuntu, Debian, Fedora, Arch)

#### Option A: Native `.desktop` App Launcher (Appears in App Menu / Dash)
1. Create a desktop launcher file:
   ```bash
   nano ~/.local/share/applications/promptvault.desktop
   ```
2. Paste the following configuration (replace `/path/to/PromtLibrary` with your actual repo path):
   ```ini
   [Desktop Entry]
   Version=1.0
   Type=Application
   Name=PromptVault Pro
   Comment=Interactive AI Prompt Library & Blueprint System
   Exec=bash -c "cd '/path/to/PromtLibrary' && (pgrep -f 'server.py' || python3 server/server.py --port 8080 &) && sleep 1 && xdg-open http://localhost:8080"
   Icon=/path/to/PromtLibrary/assets/PromptLibrary_pro_Favicon.png
   Terminal=false
   Categories=Development;Utility;
   StartupNotify=true
   ```
3. Make it executable:
   ```bash
   chmod +x ~/.local/share/applications/promptvault.desktop
   ```
4. Search for **PromptVault Pro** in your application launcher or pin it to your dock.

#### Option B: 1-Click Shell Script
Run or link `scripts/launch-linux.sh`:
```bash
./scripts/launch-linux.sh
```

---

### 📱 4. iOS & iPadOS (iPhone / iPad)

#### Option A: Native "Add to Home Screen" Web App
PromptVault is fully responsive and features touch-optimized typography and drawer navigation:
1. Ensure your iPhone/iPad is connected to the same local Wi-Fi network as your host machine (or open your published GitHub Pages URL: `https://rockyswartz.github.io/PromptLibrary/`).
2. In **Safari**, visit `http://<YOUR_HOST_IP>:8080` or the GitHub Pages URL.
3. Tap the **Share** button (the square icon with the upward arrow).
4. Scroll down and tap **Add to Home Screen** (➕).
5. Label the app **PromptVault Pro** and tap **Add**.
6. PromptVault now lives on your iPhone/iPad Home Screen, opens without browser chrome, and operates with native app performance.

#### Option B: Apple Shortcuts App Recipe (Siri Voice & Home Screen Widget)
1. Open the **Shortcuts** app on your iPhone or iPad.
2. Tap **+** (New Shortcut) in the top-right corner.
3. Tap **Add Action** > Search for **Open URLs**.
4. In the URL parameter field, enter `http://<YOUR_HOST_IP>:8080` (or `https://rockyswartz.github.io/PromptLibrary/`).
5. Tap the shortcut name at the top, select **Rename**, and set it to **Open PromptVault**.
6. Tap the icon to customize the color and glyph (e.g. lightning bolt or book icon).
7. Tap **Add to Home Screen**. You can also trigger it hands-free via Siri: *"Hey Siri, Open PromptVault"*.

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
└── README.md                   # Complete documentation & user guide
```

---

## 📚 Acknowledgments & References

- **[Fatih Kadir Akın](https://prompts.chat/)**: Creator of [prompts.chat](https://prompts.chat/) (Awesome ChatGPT Prompts) and author of *The Prompting Book*. His structural philosophy—separating static instructions from dynamic context payloads, role-based priming, and negative guardrails—forms the architectural basis of PromptVault Pro's 5-section blueprints and Prompting Wiki.
- **DeepWiki Architectural Documentation**: Inspired by the deep repository breakdown on [DeepWiki (prompts.chat Overview)](https://deepwiki.com/f/prompts.chat/1-overview). Inspect PromptVault Pro's architecture on DeepWiki at: [https://deepwiki.com/rockyswartz/PromptLibrary](https://deepwiki.com/rockyswartz/PromptLibrary).
- **Randy Austin ([ExcelForFreelancers](https://www.youtube.com/@ExcelForFreelancers))**: Pioneering enterprise Excel, VBA, and workflow automation blueprints.

