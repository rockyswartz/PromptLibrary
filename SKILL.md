---
name: ai-prompt-library-designer
description: "Build an interactive, production-ready AI prompt library with parameterized variable injection, multi-choice inputs, hierarchical category taxonomy, token estimation, and full lifecycle management. Use when designing maintainable prompt blueprints and web-based prompt libraries."
metadata:
  featured_rank: 0
  featured_collection: true
  display_name: "AI Prompt Library Designer"
  title: "AI Prompt Library Designer & Interactive Blueprint Architecture"
  author: Randy Austin - ExcelForFreelancers
  website: https://www.excelforfreelancers.com/
  version: "2.0.0"
  category: "AI & Automation"
  categories: ["Automation & Systems", "Coding & Architecture", "Executive Leadership"]
  subcategory: "Prompt & System Design"
  outcome: "Automate work, parameterize AI workflows, and maintain production-grade prompt repositories"
  best_for: "Use when creating structured, parameterized prompt blueprints, design tokens, and interactive prompt runner applications."
  difficulty: "Beginner to Advanced"
  estimated_time: "10–25 minutes"
  tools: [ChatGPT, Claude, Gemini, "Prompt Library Pro Web App"]
  required_inputs: [goal, audience, source_material, constraints, output_format, owner]
  optional_inputs: [categories, subcategory, difficulty, model, tags, template_parameters]
  tier: "Featured"
  related_skills: [ai-change-adoption-plan, ai-human-in-the-loop-planner, ai-knowledge-base-readiness-audit, ai-output-quality-rubric-builder]
  source: CuratedWorkflowCollection
  tags: [ai, prompt, library, designer, variable-injection, taxonomy, automation, blueprint]
  parameter_types:
    text: "Single-line or multi-line free text variable input (e.g., {{goal}})"
    choice: "Discrete selection pills with custom write-in fallback (e.g., {{output_format: Executive Working Blueprint | Technical Architecture Spec | Actionable 1-Page Summary}})"
  ui_specifications:
    category_bar: "Flex-wrap layout strictly capped at 3 rows maximum with dynamic '+ More Categories (N)' overflow pill"
    overflow_filter_modal: "Compact 2-column category cards displaying category name, prompt count badge, live search, and multi-selection"
    taxonomy_manager_modal: "Dedicated hierarchical category and subcategory manager with inline additions and removal safety"
    runner_modal: "Interactive split-pane variable injection runner with real-time prompt preview, live token/character/word counters, and one-click copy"
    prompt_editor_modal: "Multi-category checkbox selector, contextual subcategory chips, and syntax generator helpers"
---

# AI Prompt Library Designer & Interactive Blueprint Architecture

## 1. Purpose & Core Philosophy

The **AI Prompt Library Designer** bridges the gap between static, unstructured AI prompts and production-ready, interactive prompt systems.

Traditional prompt repositories suffer from serious UX flaws:
1. **Manual Find-and-Replace Friction**: Users must copy raw prompts into their chat box and hunt through brackets like `[INSERT TOPIC HERE]`, leading to missed parameters and errors.
2. **Category Clutter & Visual Bloat**: As categories grow, navigation bars wrap uncontrollably down the screen or force clumsy horizontal scrolling.
3. **Rigid Formatting**: Prompts lack discrete multiple-choice parameters (e.g., Tone, Deliverable Format, Target Model), causing inconsistent outputs.

This specification defines the architectural standards, parameter injection mechanics, taxonomy management, and UI component contracts for building and maintaining an interactive AI Prompt Library.

---

## 2. Interactive Parameter & Variable Injection System

### 2.1 Parameter Syntax Standards

Prompts in the library use double curly-bracket parameter delimiters:

1. **Free-Text Variables**:
   ```handlebars
   {{variable_name}}
   ```
   - Automatically parsed into a responsive text input or textarea.
   - Supports contextual placeholders and pre-filled defaults.

2. **Multiple-Choice Parameters**:
   ```handlebars
   {{variable_name: Option 1 | Option 2 | Option 3}}
   ```
   - Automatically parsed into an interactive choice pill group.
   - Allows users to select an option with 1 click.
   - Provides a "Custom write-in..." toggle so users can enter unlisted values when needed.

### 2.2 Instant Variable Injection Engine

When a prompt is launched via the **"Use Prompt"** action:
1. The engine scans the template string using regex: `/\{\{([^}]+)\}\}/g`.
2. Extracted variables are converted into dynamic input fields.
3. As the user types into text fields or clicks choice pills, the preview updates **reactively in real time**.
4. Live telemetry recalculates metrics on every keystroke:
   - **Word Count**: Accurate whitespace-separated word count.
   - **Character Count**: Total character length of compiled prompt.
   - **Estimated Tokens**: Calculated as `Math.ceil(charCount / 4)` (standard LLM tokenization heuristic).
5. A **"Copy Ready Prompt"** button copies the compiled, variable-injected output directly to the user's clipboard.

---

## 3. UI Component Specifications & Layout Architecture

### 3.1 Strict 3-Row Category Navigation Bar
To avoid layout shift and overwhelming vertical growth as the taxonomy scales:
- The category navigation bar uses a responsive flex-wrap layout.
- An observer measures the offset top of each category pill.
- Any pill that spills onto **Row 4 or beyond** is automatically hidden.
- An interactive **`+ More Categories (N)`** pill button dynamically appears at the end of Row 3, indicating the exact count of hidden categories.

### 3.2 Compact Category Filter Modal (`#moreCategoriesModal`)
Clicking `+ More Categories (N)` opens a modal specifically designed for rapid filtering:
- **Card Contents**: Compact selection card displaying **only** the selection checkbox, category name, and prompt count badge (e.g., `5 prompts`). Subcategory tags are excluded to eliminate visual clutter.
- **2-Column Layout**: A responsive `repeat(auto-fill, minmax(280px, 1fr))` grid ensuring category titles never truncate awkwardly.
- **Height & Spacing**: Standardized ~42px item height with comfortable padding (`0.55rem 0.85rem`).
- **Real-Time Search**: Instant filter input matching category names and associated subcategories.
- **Quick Actions**: "Select All", "Clear All", and an inline "+ Create Custom Category" input.
- **Active State**: Selected cards display a vibrant accent border (`#6366f1`), glowing highlight, and updated selection count in the footer.

### 3.3 Dedicated Category & Taxonomy Manager (`#categoryManagerModal`)
Accessible via the header ("Manage Categories") or from the filter modal ("⚙️ Open Full Category Manager"):
- Hierarchical tree structure displaying each category and its nested subcategories.
- Inline form on each card to add new subcategories instantly.
- One-click removal buttons for individual subcategory tags.
- Safe category deletion with prompt reassignment fallback to `"General"`.

### 3.4 Multi-Category Prompt Assignment
Prompts are not artificially constrained to a single category:
- The prompt creation/editing modal provides multi-select checkboxes for all available categories.
- Contextual subcategory chips dynamically filter based on selected categories.
- Helper syntax buttons (`+ Add Choice Variable` and `+ Add Text Variable`) insert valid template syntax directly into the template textarea at the cursor position.

---

## 4. Production Workflow & Implementation Contract

Follow this 5-stage workflow when adding or refining prompt blueprints:

1. **Specification & Scoping**:
   - Define the primary outcome, target user/agent, operational constraints, and decision owner.
   - Distinguish ground-truth source material from assumptions.
2. **Parameterization**:
   - Identify variable parameters (goals, tone, formats, platforms, schemas).
   - Convert binary or constrained parameters into multi-choice syntax (`{{format: Brief | Complete | RFC}}`).
   - Assign intuitive defaults that produce immediate value without user input.
3. **Taxonomy & Tagging**:
   - Assign primary and secondary categories (`categories: [...]`).
   - Assign granular subcategories (`subcategory: "..."`).
   - Tag with relevant operational labels (e.g., `["system-design", "few-shot", "guardrails"]`).
4. **Reliability & Guardrails**:
   - Include negative constraints (what the model must NOT do).
   - Include hallucination defense (flag unknowns; never invent metrics or credentials).
   - Include fallback instructions for missing context.
5. **Verification & Quality Gate**:
   - Test in the Prompt Library Pro runner: verify variable substitution, formatting, token count, and 1-click clipboard copy.

---

## 5. JSON Schema Contract

Prompt blueprints adhere to the following schema for storage, export, and cross-tool interoperability:

```json
{
  "id": "prompt-designer-blueprint",
  "title": "AI Prompt Library Designer & Blueprint",
  "category": "Automation & Systems",
  "categories": ["Automation & Systems", "Coding & Architecture"],
  "subcategory": "Prompt Architecture",
  "subcategories": ["Prompt Architecture", "System Design"],
  "author": "Randy Austin - ExcelForFreelancers",
  "authorUrl": "https://www.excelforfreelancers.com/",
  "difficulty": "Beginner",
  "model": "ChatGPT / Claude / Gemini",
  "featured": true,
  "tags": ["system-design", "prompt-engineering", "blueprint", "automation"],
  "description": "Design a decision-ready AI prompt working package with inputs, constraints, reliability rules, and audit trail.",
  "template": "You are an expert AI Prompt and System Architect...\nGoal: {{goal}}\nFormat: {{output_format: Executive Working Blueprint | Technical Architecture Spec | Actionable 1-Page Summary}}",
  "variables": [
    {
      "name": "goal",
      "label": "Goal / Outcome",
      "default": "Automate invoice verification and exception routing for freelance contractors",
      "placeholder": "e.g. Build an automated lead qualification assistant"
    },
    {
      "name": "output_format",
      "label": "Deliverable Format",
      "type": "choice",
      "options": ["Executive Working Blueprint", "Technical Architecture Spec", "Actionable 1-Page Summary"],
      "default": "Executive Working Blueprint"
    }
  ],
  "notes": "Based on the ExcelForFreelancers AI Prompt Library Designer framework."
}
```

---

## 6. Worked Example Prompt Blueprint

```markdown
You are an expert AI Prompt and System Architect. Your task is to design a robust, maintainable AI Prompt & Workflow Blueprint based on the following specifications:

**Goal / Outcome:** {{goal}}
**Target Audience / Users:** {{audience}}
**Source Material & Context:** {{source_material}}
**Operational Constraints & Platform Rules:** {{constraints}}
**Deliverable Format:** {{output_format: Executive Working Blueprint | Technical Architecture Spec | Actionable 1-Page Summary}}
**Decision Owner:** {{owner}}

Please generate a comprehensive working blueprint with the following sections:
1. **Executive Summary & Decision Scope**: Primary outcome, verified facts vs. labeled assumptions.
2. **System Architecture**:
   - Model selection rationale
   - Required system instructions and persona parameters
   - Dynamic input variables & schema validation
3. **Prompt Specification**:
   - Master System Prompt
   - User Prompt Template with placeholders
   - Few-shot edge case demonstrations
4. **Reliability & Guardrails**:
   - Explicit negative constraints (what the AI must NOT do)
   - Hallucination mitigation tactics
   - Fallback and graceful failure behavior
5. **Testing & Quality Rubric**:
   - 3 test input cases (nominal, edge case, adversarial)
   - Acceptance criteria and verification checklist
6. **Actionable Next Steps**:
   - Immediate implementation tasks assigned to {{owner}}
```

---

## 7. Global Appearance, Contrast Standards & Theme Presets (Phase 1)

### 7.1 High-Contrast Readability Standards
To guarantee accessibility across prolonged engineering sessions and varied ambient lighting conditions:
- **Primary Text (`--text-primary`)**: Pure white `#ffffff` in dark modes, deep ink `#090d16` in light modes.
- **Secondary Body Text (`--text-secondary`)**: Upgraded to slate-300 `#cbd5e1` (11.4:1 contrast ratio against dark backgrounds).
- **Subtle / Helper Text (`--text-muted`)**: Upgraded to slate-400 `#94a3b8` (6.8:1 contrast ratio, comfortably exceeding WCAG AA 4.5:1 minimums).
- **Syntax Preview Window (`.card-code-preview`)**: Dedicated IDE-style preview with clear `#f1f5f9` text, elevated borders, and hover accent transitions.
- **Metadata Badges (`.tag-badge`, `.badge-difficulty`)**: Crisp background shading with visible contrast borders.

### 7.2 Atmosphere Presets & Signature Accents
The global setup modal (`#themeModal`) allows users to lock in personalized templates:
1. **Atmosphere Presets (`data-theme-preset`)**:
   - `cyber`: Deep Space Cyber (Obsidian navy `#090d16`, neon glassmorphism)
   - `oled`: Midnight OLED (Pure pitch black `#000000`, zero glare, maximum battery efficiency)
   - `dracula`: Dracula Charcoal (Warm charcoal slate `#181825`, gentle on tired eyes)
   - `nordic`: Nordic Slate (Arctic deep blue `#0b1326`, icy clean high-contrast crispness)
   - `light`: Clean Studio (Porcelain ivory `#f8fafc`, deep slate ink typography)
2. **Signature Accent Colors (`data-accent`)**:
   - `indigo`: Electric Indigo (`#6366f1`)
   - `cyan`: Cyber Cyan (`#06b6d4`)
   - `emerald`: Emerald Forest (`#10b981`)
   - `amber`: Sunset Amber (`#f59e0b`)
   - `rose`: Neon Rose (`#f43f5e`)
   - `purple`: Royal Violet (`#a855f7`)

All preferences are auto-saved to browser storage (`prompt_library_theme_preset_v1` and `prompt_library_accent_v1`) and restored automatically across sessions.

---

## 8. Hierarchical Taxonomy & Deduplication Architecture (Phase 2)

### 8.1 Dual-Faceted Navigation System
To eliminate category chaos (which occurs when flat category lists exceed 40+ items), the library separates two distinct dimensions:
1. **Functional Domain Pillars (Workflow Focus)**:
   - 7 primary cognitive domains matching human memory limits (Miller's Law: 7 ± 2 chunks):
     - 💼 **Business & Product Strategy** (Product Management, Business Strategy, Executive Presentations)
     - 💻 **Engineering & Code Architecture** (Coding & Architecture, Developer Tools, Prompt Engineering)
     - ✍️ **Marketing, Content & SEO** (Marketing Campaigns, Content Writing, SEO & Metadata)
     - 🎨 **Image & Visual Generation** (Midjourney & Diffusion, Photography Styles, Digital Art & 3D)
     - 🖥️ **UI / UX & Component Design** (Web Components, Design Systems, Interactive UX)
     - ⚙️ **Automation & Workflow Systems** (Spreadsheet Automation, Workflow Integrations, CLI & AI Tooling)
     - 🎓 **Education & Productivity** (Learning & Study, Writing & Brainstorming, Personal Operations)
2. **Origin & Collection Pack Provenance**:
   - Distinct facet tracking original collections (`HubSpot AI Pack`, `ChatPRD Blueprints`, `Nano Banana Suite`, `CreativeActTech Pack`, `TypeUI Web Kit`, `Fluxrow Tooling`, `PromptVault Core`).
   - Keeps topic taxonomy pristine while preserving original pack identity.

### 8.2 Contextual Scoped Subcategory Bar
- When a user selects any Domain Pillar, an inline **Scoped Subcategory Bar** immediately reveals only the subcategories assigned to that specific domain.
- Allows progressive disclosure: users drill down into specific sub-topics with zero clutter or page jumping.

### 8.3 Taxonomy & Deduplication Manager (`#categoryManagerModal`)
A dedicated visual interface to prevent taxonomy drift and duplicate tags:
- **Parent Domain Selector**: Ensures every new category is anchored into a core pillar.
- **Shared Master Deduplication Pool**: An interactive chip cloud containing all 100+ registered subcategories across the system.
  - Users click existing subcategory chips with 1 click instead of retyping them.
  - Prevents spelling variations and duplicates (e.g., `SEO` vs `Search Engine Optimization` vs `seo-tools`).
- **7-Pillar Accordion Hierarchy Tree**: Live view of all domains, categories, prompt counts, and subcategories, with immediate deletion and unlinking safety.

---

## 9. Modular Blueprint Engine & Prompt Optimization Standards (Phase 3)

### 9.1 The 5-Section Enterprise Prompt Architecture
To transition from brittle, unstructured "wall-of-text" prompts to robust, repeatable system blueprints, all enterprise prompts adhere to a standard 5-part anatomy:

1. **👤 Role / Persona (`accent-persona`)**:
   - Explicitly aligns the AI with domain expertise, professional persona, and operational mindset.
   - Example: *"You are an expert AI Prompt and System Architect specializing in resilient workflow automation..."*
2. **🎯 Core Task / Objective (`accent-objective`)**:
   - Clear, unambiguous statement of the immediate deliverable and scope boundary.
   - Example: *"Your task is to design a decision-ready, production-grade AI prompt blueprint..."*
3. **📥 Context & Dynamic Parameter Inputs (`accent-inputs`)**:
   - Structured specification of source material, runtime parameters, and user inputs using `{{var}}` or `{{var: Option A | Option B}}`.
   - Enforces clear data contracts between user intent and LLM reasoning.
4. **🛡️ Negative Guardrails & Reliability Constraints (`accent-guardrails`)**:
   - Explicit negative instructions stating what the model **must NOT do**, hallucination mitigation tactics, and fallback actions.
   - Quick-add chip integrations:
     - `+ Zero Hallucination`: Strict factuality, no fabricated citations, numbers, or sources.
     - `+ No Fluff / Direct Delivery`: Immediate actionable execution, zero conversational filler.
     - `+ Strict JSON Schema`: Strict unescaped JSON output conforming to defined schemas.
     - `+ Fact Verification`: Grounding assertions with inline authoritative references.
5. **📑 Output Specification & Quality Rubric (`accent-rubric`)**:
   - Exhaustive formatting guidelines, required section headers, acceptance checklists, and criteria for success.

### 9.2 Bi-Directional Compilation & Intelligent Deconstruction
- **Deconstruct Engine (`PromptStorage.parsePromptSections`)**:
  - Automatically identifies role/persona, task objectives, parameterized inputs, guardrails, and output rubrics using regex patterns, markdown heading markers, and heuristic syntactic analysis.
  - Converts any legacy or unstructured prompt into a 5-card blueprint with 1 click (`✨ Deconstruct Prompt into Blueprint`).
- **Compiler Engine (`PromptStorage.compileBlueprintToTemplate`)**:
  - Live, reactive compilation of structured modular fields back into production markdown without latency.

### 9.3 Tri-Mode Interactive Prompt Runner
The runner modal (`#runnerModal`) supports three synchronized perspectives:
1. **📐 Modular Blueprint View**: Visual 5-card breakdown highlighting role, task, parameters, guardrails, and quality rubric.
2. **⚡ Compiled Prompt View**: Raw, ready-to-run prompt preview with live token estimations and single-click clipboard copy.
3. **👁️ Split View**: Side-by-side desktop productivity layout featuring blueprint cards and variable controls on the left, alongside a live, reactive compiled output stream on the right.

---

## 10. Success & Verification Checklist

- [x] **Zero Layout Breakage**: Category pills respect the 3-row limit; overflow items neatly tuck into `+ More Categories (N)`.
- [x] **Compact Modal Scanning**: Filter cards show category name and prompt count in a 2-column layout without awkward truncation.
- [x] **Taxonomy Independence**: Categories and subcategories can be organized, expanded, and edited in a dedicated management view.
- [x] **Instant Variable Replacement**: Dynamic inputs and choice pills immediately render in the runner and compile with live token estimation.
- [x] **High-Contrast Readability**: Eliminated low-contrast dark mode text; all text elements pass WCAG AA standards (6.8:1+ contrast).
- [x] **Global Theme Customization**: 5 atmosphere presets + 6 signature accents with interactive live UI preview sandbox.
- [x] **Dual-Faceted Taxonomy (Phase 2)**: 7 clear Functional Domain Pillars + Collection Pack provenance switcher.
- [x] **Scoped Subcategories Bar**: Contextual inline subcategory chips that progressively disclose only relevant sub-topics.
- [x] **Deduplication Pool Manager**: 1-click chip pool preventing duplicate subcategories when creating or managing categories.
- [x] **5-Section Modular Blueprint Architecture (Phase 3)**: Persona, Objective, Inputs, Guardrails, and Output Rubric.
- [x] **Intelligent Heuristic Deconstructor (Phase 3)**: Auto-parses legacy unstructured prompts into standard 5-part blueprints.
- [x] **Tri-Mode Runner Modal (Phase 3)**: Instant switching between Modular Blueprint, Compiled Prompt, and side-by-side Split View.
- [x] **1-Click Production Guardrails (Phase 3)**: Instant injection for Zero-Hallucination, No-Fluff, Strict-JSON, and Fact-Verification rules.
- [x] **Visual Blueprint Recognition (Phase 3)**: `📐 Blueprint` badge rendered on cards in the prompt grid.
- [x] **Persistence & Portability**: Theme presets, custom prompts, categories, favorites, and usage metadata persist in IndexedDB and localStorage, with JSON, Markdown, and SQLite export.
- [x] **Mutual-Exclusion Taxonomy Accordion**: Auto-collapsing accordion in Taxonomy Hierarchy with `flex-shrink: 0` to prevent tab compression and custom extended scrollbar.
- [x] **Mobile Phone Portrait Fluid Design**: Complete `clamp()` token system for spacing and typography, single-row mobile header, and responsive runner modal stacking.
- [x] **Brand Assets & Navigation**: Header brand logo and browser favicon from `assets/PromptLibrary_pro_Favicon.png`, plus floating smooth-scrolling "To the Top" button.

