# 🚀 PromptVault Pro — Interactive AI Prompt Library & Blueprint System

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/rockyswartz/PromptLibrary)
[![User Guide PDF](https://img.shields.io/badge/User%20Guide-Interactive%20PDF-purple.svg)](assets/PromptVault-Pro-User-Guide.pdf)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-brightgreen)](https://rockyswartz.github.io/PromptLibrary/)

A beautiful, offline-ready, open-source web application for exploring, parameterizing, testing, and managing production-grade AI prompts and automation blueprints.

Built with modern semantic HTML5, Vanilla CSS, and lightweight Vanilla JavaScript. Zero npm dependencies, zero complex build steps, and ready for instant deployment to **GitHub Pages**.

> 📥 **Interactive PDF User Guide Available**:  
> Download the publication-grade manual directly from the repo: **[`assets/PromptVault-Pro-User-Guide.pdf`](assets/PromptVault-Pro-User-Guide.pdf)**. Features an interactive Table of Contents, 7 comprehensive chapters, full feature walkthroughs, FAQs, and an alphabetical A-Z Prompting Glossary with clickable internal jump links.

---

## ✨ Key Features & Architecture

### ⚡ 1. Live Prompt Runner & Upfront Variable Pre-fill
- **Upfront Parameter Pre-filling**: When executing a prompt, all dynamic variables are consolidated at the very top of the runner. Fill in values upfront before sending them to your LLM, avoiding detached mid-conversation interruptions and saving tokens.
- **Dynamic Compilation**: As you type in fields or click choice pills, values are dynamically compiled into the prompt in real time.
- **Live Token Telemetry**: View word count, character count, and estimated LLM tokens (`Math.ceil(characters / 4)`) live as you adjust inputs.
- **Compile vs. Template Copy**:
  - **Compile**: 1-click copy with all filled variable values interpolated.
  - **Template**: 1-click copy of the raw template with placeholders intact for prompt sharing.
- **1-Click Multi-LLM Launcher**: Launch target AI models directly with your compiled prompt:
  - 🤖 **ChatGPT** (`chatgpt.com/?q=...`)
  - 🧠 **Claude** (`claude.ai/new?q=...`)
  - 💎 **Google Gemini** (`gemini.google.com/app?prompt=...`)
  - 🔍 **Perplexity AI** (`perplexity.ai/search?q=...`)
  - 💻 **Cursor Editor** & 🌐 **LibreChat** / Local AI endpoints.

### 🎯 2. Multiple-Choice Parameter Inputs & Syntax
- **Syntax**: `{{variable_name: Option 1 | Option 2 | Option 3}}`
- **Interactive Choice Pills**: Multiple-choice variables render as clickable toggle pills for rapid selection.
- **Custom Write-In Fallback**: Includes a built-in "Custom write-in..." toggle so users can enter bespoke values whenever needed.
- **Triple-Format Drafting Support**: Supports native `{{variables}}`, natural writing `[square brackets]`, and auto-detected `{single braces}`.

### 🗂️ 3. Intelligent Category Navigation & 3-Row Limit
- **Strict 3-Row Flex Limit**: Capped at 3 rows maximum to avoid navigation bars wrapping down the screen as categories scale.
- **Dynamic Overflow Pill**: Categories that exceed 3 rows are neatly bundled into a reactive `+ More Categories (N)` pill button.
- **Compact Category Filter Modal**:
  - Clean **2-column grid** (`minmax(280px, 1fr)`) showing category title, selection checkbox, and prompt count badge.
  - Subcategory tags are omitted from filter cards to keep cards tidy, uniform (~42px height), and easily scannable without truncation.
  - Real-time search filter matching category names and subcategories.
  - Quick "Select All" and "Clear All" actions.
  - Inline "+ Create Custom Category" creator.

### ⚙️ 4. 3-Tier Taxonomy & Deduplication Manager
- Accessible via the header (**"Manage Categories"**) or directly from the overflow filter modal.
- **Dual-Mode Switcher**:
  - **`[ ✏️ Edit Category ]` Mode**: Select any existing category from a clean dropdown displaying live prompt and subcategory counts (e.g. `Executive Presentations (3 prompts, 9 subcats)`). All linked subcategories automatically pull through into the active chip list.
  - **`[ ➕ New Category ]` Mode**: Provides a clean, auto-focused input field to name a new category under any Domain Pillar without dropdown clutter.
- **100+ Master Subcategory Pool with Vibrant Highlights**:
  - Currently linked subcategories are highlighted with **solid vibrant accent backgrounds and contrast checks (`✓ Roadmaps`, `✓ Pitch Decks`)** for instant visual recognition.
  - Unlinked subcategories appear neutral (`+ Name`). Click any unlinked chip to link it instantly; click any highlighted chip to unlink it.
- **Inline Category Rename with Database Cascade**: Rename any category directly; PromptVault Pro automatically cascades the new name across all matching prompts in the database to guarantee zero orphaned cards.
- **Direct Hierarchy Card Editing**: In the Active Taxonomy Hierarchy accordion, every category card has a direct **✏️ Edit** button that jumps straight to top editing mode with subcategories loaded.
- **Safe Deletion Protection**: Deleting a category automatically moves assigned prompts to `"General"` to prevent orphaned data.

### 🏷️ 5. Character-by-Character Tag Autocomplete & Prompt Deletion
- **WordPress-Style Live Tag Suggestions**: As you type into the Tags input field (e.g. typing `s` then `o`), a live dropdown instantly filters existing tags character-by-character, displaying real-time frequency counts (e.g. `🏷️ seo (12)`).
- **Keyboard Navigation**: Use <kbd>↑</kbd> and <kbd>↓</kbd> arrow keys to navigate suggestions, <kbd>Enter</kbd> to select, or press <kbd>Enter</kbd>/comma to create a new tag.
- **Multi-Category Assignment**: Prompts can belong to multiple categories simultaneously.
- **Safe Prompt Deletion**: Built-in deletion action with a safety confirmation modal to prevent accidental data loss.

### 👤 6. Standardized Originator Attribution & Author Credits
- **Dedicated Originator Field**: Every prompt includes a standardized `author` and optional `authorUrl` field.
- **Card Footer Display**: Originator credits appear prominently on the bottom-left of each prompt card with a dedicated author badge (e.g. `👤 Randy Austin - ExcelForFreelancers`, `👤 Anthropic`, `👤 HubSpot`).
- **Editable in Form**: Set bespoke author credits and links directly in the Create / Edit Prompt modal.

### ⇅ 7. Data Management Menu, Smart Ingest & Backups
- **Consolidated `⇅ Data` Menu**: High-contrast icon button replacing the ambiguous backup button, clearly communicating both upload/import and download/export capabilities.
- **1-Click Canvas Presets**:
  - 🗑️ **Start from Scratch (Blank Canvas)**: Clears all prompts so you can build your own bespoke library while preserving all 44 categories and 7 domain pillars.
  - ⚡ **Load Starter Pack (7 Flagships)**: Restores the clean 7-blueprint flagship showcase.
  - 📥 **Import JSON Backup**: Load any custom prompt collection with merge or overwrite options.
- **In-App Smart Text Ingester**: Paste raw text or markdown prompts. Automatically converts bracketed placeholders like `[Topic]`, `<Audience>`, or `{Tone}` into interactive `{{variables}}`.
- **Bulk Folder Ingestion**: Select multiple `.txt` or `.md` files at once to convert and import whole directories into your library.
- **Turnkey LLM Parameterization Prompt**: A copyable system prompt included in the Data modal and User Guide to batch-enrich static 0-variable prompts using ChatGPT, Claude, or Gemini.
- **Python CLI Converter (`scripts/text_to_prompt_json.py`)**: Standalone tool for power users to convert folders of notes into valid PromptVault JSON.

### 📐 8. Modular Blueprint Engine & Tri-Mode Runner
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

### 💾 9. Dual-Tier Storage Architecture (Browser-First + Optional SQLite)
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

### 📱 10. Mobile Responsiveness & Fluid Tokens
- **Fluid CSS `clamp()` Design Tokens**: Typography (`--text-2xs` to `--text-hero`) and spacing (`--space-2xs` to `--space-xl`) adapt continuously to any viewport width from 360px portrait phones to 4K displays.
- **Adaptive Single-Row Mobile Header**: Compacts secondary button labels on screens `<600px` into high-contrast icon buttons.
- **Mobile-Responsive Tri-Mode Runner**: Split layout automatically stacks into a seamless 1-column scrollable workspace on screens `≤860px`.
- **Mutual-Exclusion Taxonomy Accordion**: In the Taxonomy Manager, expanding any Domain Pillar automatically collapses all other open tabs while enforcing `flex-shrink: 0`.
- **Floating "To the Top" Button**: Smooth-scrolling pill button with passive scroll-threshold detection (>300px).

### ❓ 11. Interactive Help Center, FAQs & Guided Spotlight Tour
- **Dedicated Help & Tour Modal**: Accessible via the header (**"Help & Tour"**) or shortcut <kbd>?</kbd>.
- **📥 1-Click PDF Download Button**: Directly download the full interactive PDF user guide (`PromptVault-Pro-User-Guide.pdf`) from the modal header or FAQ tab.
- **6 Comprehensive Visual Learning Tabs**:
  1. 🖥️ **Interface & Architecture Tour**: Visual blueprint breakdown of the 7 Domain Pillars, search bar, and card anatomy.
  2. 🗂️ **Categories & Subcategories Walkthrough**: Step-by-step guide explaining the 2-mode switcher, master pool highlights, inline renaming, and safe deletion.
  3. 📐 **Modular Blueprints vs. Simple Prompts**: Direct comparison of lightweight templates vs. 5-section enterprise prompts, plus tag autocomplete and safe deletion.
  4. ⚡ **Variable Syntax & Live Runner**: Interactive playground with token replacement, upfront variable pre-fill, and multi-LLM launcher.
  5. 📥 **Ingestion & Backups**: Instructions for in-app Smart Ingestion, Python CLI batch processing, and JSON/SQLite restore.
  6. ❓ **FAQs & User Guide**: In-depth answers to 10 common questions on storage security, variable formatting, taxonomy, and PDF manual access.
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
- **Backup Recommendation**: Because data is stored in your browser's storage, use the **⇅ Data** button in the header to export a `.json` backup file periodically. This ensures your data remains safe even if you clear your browser history or switch devices.

---

### Option 2: 💻 Full Local Installation (With Offline SQLite Database)
If you want a dedicated offline copy on your computer with a real SQLite database file (`promptlibrary.db`) saved directly to your hard drive:

#### Step 1: Download the Repository
- Click the green **`<> Code`** button at the top of the GitHub page and select **Download ZIP** (or run `git clone https://github.com/rockyswartz/PromptLibrary.git`).
- Extract the ZIP folder into any directory on your computer (e.g. `~/Documents/PromptVault` or `C:\PromptVault`).

#### Step 2: Launch the Local Server
PromptVault Pro includes a lightweight local backend powered exclusively by Python's built-in standard library (`sqlite3`, `http.server`, `json`, `urllib`).

> [!NOTE]
> **Zero `pip install` Dependencies Required**:
> You do **NOT** need to run any `pip install` commands to use PromptVault Pro! Everything runs using standard Python. If your system has Python installed, it works immediately out of the box.

<details open>
<summary><b>🔍 Where to Open the Terminal & Run Commands (Windows, macOS, Linux, Android)</b></summary>
<br>

If you are unfamiliar with command line tools or aren't sure where to type commands:

#### 🪟 Windows (10 / 11)
1. **Open the extracted folder** where you unzipped PromptVault (e.g. `C:\PromptVault` or `Downloads\PromptLibrary`).
2. Click in the File Explorer address bar at the very top, type **`cmd`**, and press <kbd>Enter</kbd>.
   *(Alternative: hold <kbd>Shift</kbd> and right-click any empty space inside the folder, then select **"Open in Terminal"** or **"Open PowerShell window here"**).*
3. In the black Command Prompt window that opens, type the command and press <kbd>Enter</kbd>:
   ```cmd
   python server\server.py
   ```
   *(If `python` is not recognized, try `py server\server.py`. Note: if you ever need to run a `pip install` command in Python projects, this exact Command Prompt window is where you type it).*

#### 🍎 macOS (Apple Mac)
1. **Open Terminal**: Press <kbd>Cmd</kbd> + <kbd>Space</kbd> to open Spotlight, type **`Terminal`**, and press <kbd>Enter</kbd>.
2. **Navigate to your folder**: Type `cd ` (with a trailing space), then drag and drop the extracted `PromptLibrary` folder directly from Finder into the Terminal window. The path will fill in automatically:
   ```bash
   cd "/path/to/extracted/PromptLibrary"
   ```
   Press <kbd>Enter</kbd>.
3. Start the server:
   ```bash
   python3 server/server.py
   ```
   *(This Terminal window is also where you would run any standard `pip3 install <package>` commands if ever needed).*

#### 🐧 Linux (Ubuntu, Debian, Fedora, Arch)
1. **Open Terminal**: Press <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>T</kbd> (or right-click anywhere inside the project folder and choose **"Open in Terminal"**).
2. If opened from your home directory, navigate to the folder:
   ```bash
   cd ~/Downloads/PromptLibrary
   ```
3. Run the server:
   ```bash
   python3 server/server.py
   ```
   *(Any standard `pip install` or `pip3 install` commands are also executed in this terminal).*

#### 🤖 Android (Phone or Tablet)
On Android devices, you have two flexible choices:
- **Option A (Simplest & Recommended — Zero Terminal)**: You don't need a terminal at all! Simply open your published URL (or your computer's Wi-Fi address `http://<YOUR_COMPUTER_IP>:8080`) in **Chrome** or **Firefox**, tap the **three dots menu (⋮)**, and select **"Add to Home screen"** or **"Install app"**. It functions as a complete offline app.
- **Option B (Run Python Directly on Android with Termux)**:
  1. Install **[Termux](https://f-droid.org/packages/com.termux/)** from F-Droid (or GitHub Releases).
  2. Open the Termux app and install Python:
     ```bash
     pkg update && pkg install python git
     ```
  3. Clone or copy your project folder:
     ```bash
     git clone https://github.com/rockyswartz/PromptLibrary.git
     cd PromptLibrary
     python server/server.py
     ```
  4. Open Chrome on Android and visit: `http://localhost:8080`.
     *(In Termux, any standard `pip install` command can also be run directly).*

</details>

*(If port 8080 is already occupied by another program on your computer, the server automatically detects the collision and steps to port 8081 without errors).*

#### Step 3: Open in Browser
Visit the local server in your browser:
👉 **[http://localhost:8080](http://localhost:8080)**

All prompts and custom additions are now synchronized with your local `server/promptlibrary.db` database file!

---

## 🖥️ 1-Click Desktop & Mobile Applet Walkthroughs (macOS | Windows | Linux | iOS | Android)

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

### 🤖 5. Android (Samsung, Google Pixel, Xiaomi, OnePlus)

#### Option A: 1-Tap Home Screen App (PWA)
1. Open **Google Chrome**, **Edge**, or **Samsung Internet** on your Android device.
2. Navigate to your PromptVault instance (e.g. `https://rockyswartz.github.io/PromptLibrary/` or `http://<YOUR_COMPUTER_IP>:8080`).
3. Tap the **three-dots menu icon (⋮)** in the top right.
4. Select **Add to Home screen** (or **Install app**).
5. Name the app **PromptVault Pro** and tap **Add**.
6. The app now lives in your app drawer and home screen as a standalone, distraction-free app that loads instantly.

#### Option B: Offline Local Python Server with Termux Widget
If you want to run the SQLite Python server directly on your Android phone without needing a computer:
1. Install **Termux** and **Termux:Widget** from F-Droid.
2. In Termux, create a one-tap shortcut:
   ```bash
   mkdir -p ~/.shortcuts
   echo "cd ~/PromptLibrary && python server/server.py" > ~/.shortcuts/PromptVault
   chmod +x ~/.shortcuts/PromptVault
   ```
3. Add a **Termux Widget** to your Android home screen and select **PromptVault** to launch the server with a single tap.

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
├── assets/
│   ├── PromptVault-Pro-User-Guide.pdf # Publication-grade interactive PDF manual
│   └── PromptLibrary_pro_Favicon.png  # Brand identity favicon & touch icon
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
├── scripts/
│   ├── build_user_guide_pdf.py # Standalone Chrome headless PDF manual generator
│   ├── auto-sync.sh            # Git commit and auto-push utility
│   ├── watch-and-sync.sh       # Continuous file watcher & auto-sync
│   └── text_to_prompt_json.py  # Bulk folder text & markdown to JSON converter
├── templates/                  # Blueprint templates
├── SKILL.md                    # AI Prompt Library Designer skill specification & JSON schema
└── README.md                   # Complete documentation & user guide
```

---

## 📚 Acknowledgments & References

- **[Fatih Kadir Akın](https://prompts.chat/)**: Creator of [prompts.chat](https://prompts.chat/) (Awesome ChatGPT Prompts) and author of *The Prompting Book*. His structural philosophy—separating static instructions from dynamic context payloads, role-based priming, and negative guardrails—forms the architectural basis of PromptVault Pro's 5-section blueprints and Prompting Wiki.
- **DeepWiki Architectural Documentation**: Inspired by the deep repository breakdown on [DeepWiki (prompts.chat Overview)](https://deepwiki.com/f/prompts.chat/1-overview). Inspect PromptVault Pro's architecture on DeepWiki at: [https://deepwiki.com/rockyswartz/PromptLibrary](https://deepwiki.com/rockyswartz/PromptLibrary).
- **Randy Austin ([ExcelForFreelancers](https://www.youtube.com/@ExcelForFreelancers))**: Pioneering enterprise Excel, VBA, and workflow automation blueprints.

