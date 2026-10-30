#!/usr/bin/env python3
"""
PromptVault Pro - Interactive PDF User Guide Generator
Compiles a comprehensive, interactive, print-ready PDF manual complete with:
- Clickable Table of Contents
- Clickable Chapter Jumps
- Clickable Index & A-Z Glossary
- FAQ Section
- Complete feature walkthrough including latest updates
"""

import os
import subprocess
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HTML_OUT = os.path.join(BASE_DIR, "docs", "user_guide_source.html")
PDF_OUT = os.path.join(BASE_DIR, "assets", "PromptVault-Pro-User-Guide.pdf")

HTML_CONTENT = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PromptVault Pro — Interactive User Guide & Architecture Handbook</title>
  <style>
    @page {
      size: A4;
      margin: 18mm 16mm 20mm 16mm;
      @bottom-right {
        content: "Page " counter(page);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 8pt;
        color: #64748b;
      }
      @bottom-left {
        content: "PromptVault Pro User Guide • 2026 Edition";
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 8pt;
        color: #64748b;
      }
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 10pt;
      line-height: 1.55;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
    }

    /* Page Breaks */
    .page-break {
      page-break-before: always;
      break-before: page;
    }

    .avoid-break {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* Cover Page */
    .cover-container {
      min-height: 240mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 25mm 10mm 15mm;
      background: linear-gradient(145deg, #0f172a 0%, #1e1b4b 60%, #31104b 100%);
      color: #ffffff;
      border-radius: 12px;
      page-break-after: always;
    }

    .cover-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .cover-badge {
      display: inline-block;
      padding: 4px 14px;
      background: rgba(99, 102, 241, 0.25);
      border: 1px solid rgba(165, 180, 252, 0.4);
      color: #c7d2fe;
      border-radius: 999px;
      font-size: 9pt;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .cover-title {
      font-size: 32pt;
      font-weight: 900;
      line-height: 1.15;
      margin: 25px 0 10px;
      letter-spacing: -0.02em;
      color: #ffffff;
    }

    .cover-title span {
      background: linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .cover-subtitle {
      font-size: 13pt;
      line-height: 1.5;
      color: #cbd5e1;
      max-width: 90%;
      margin-bottom: 25px;
    }

    .cover-pillars-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin: 25px 0;
    }

    .cover-pillar-pill {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 8.5pt;
      color: #f1f5f9;
      font-weight: 600;
    }

    .cover-footer {
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      padding-top: 15px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 8.5pt;
      color: #94a3b8;
    }

    /* Headings */
    h1, h2, h3, h4 {
      color: #0f172a;
      letter-spacing: -0.015em;
    }

    h1 {
      font-size: 20pt;
      font-weight: 800;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 8px;
      margin-top: 25px;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    h2 {
      font-size: 13pt;
      font-weight: 700;
      color: #1e293b;
      margin-top: 20px;
      margin-bottom: 8px;
      border-left: 3.5px solid #4f46e5;
      padding-left: 8px;
    }

    h3 {
      font-size: 11pt;
      font-weight: 700;
      color: #334155;
      margin-top: 14px;
      margin-bottom: 6px;
    }

    /* Links */
    a {
      color: #4f46e5;
      text-decoration: none;
      font-weight: 600;
    }

    a:hover {
      text-decoration: underline;
    }

    /* Table of Contents */
    .toc-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 16px 20px;
      margin: 15px 0 25px;
    }

    .toc-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .toc-item {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 9.5pt;
    }

    .toc-link {
      font-weight: 600;
      color: #1e293b;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .toc-link:hover {
      color: #4f46e5;
    }

    .toc-dots {
      flex: 1;
      border-bottom: 1px dotted #cbd5e1;
      margin: 0 8px;
    }

    .toc-tag {
      font-size: 8pt;
      color: #64748b;
      font-family: monospace;
    }

    /* Cards & Boxes */
    .info-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 16px;
      margin: 12px 0;
    }

    .highlight-card {
      background: #eef2ff;
      border: 1px solid #c7d2fe;
      border-left: 4px solid #4f46e5;
      border-radius: 6px;
      padding: 10px 14px;
      margin: 12px 0;
      font-size: 9.5pt;
    }

    .highlight-card strong {
      color: #3730a3;
    }

    .tip-card {
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      border-left: 4px solid #10b981;
      border-radius: 6px;
      padding: 10px 14px;
      margin: 12px 0;
      font-size: 9.5pt;
    }

    .tip-card strong {
      color: #065f46;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 9pt;
      margin: 12px 0 18px;
    }

    th {
      background: #f1f5f9;
      color: #1e293b;
      font-weight: 700;
      text-align: left;
      padding: 8px 10px;
      border: 1px solid #cbd5e1;
      font-size: 8.5pt;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    td {
      padding: 8px 10px;
      border: 1px solid #e2e8f0;
      vertical-align: top;
      line-height: 1.45;
    }

    tr:nth-child(even) td {
      background: #f8fafc;
    }

    /* Code & Badges */
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 8.5pt;
      background: #f1f5f9;
      color: #0f172a;
      padding: 2px 5px;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
    }

    pre {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 8pt;
      background: #0f172a;
      color: #f8fafc;
      padding: 12px 14px;
      border-radius: 8px;
      overflow-x: auto;
      line-height: 1.45;
      margin: 10px 0;
      white-space: pre-wrap;
    }

    .badge-chip {
      display: inline-block;
      font-size: 7.5pt;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 4px;
      margin-right: 4px;
    }

    .badge-indigo { background: #e0e7ff; color: #3730a3; border: 1px solid #c7d2fe; }
    .badge-cyan { background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; }
    .badge-emerald { background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0; }
    .badge-amber { background: #fef3c7; color: #92400e; border: 1px solid #fcd34d; }
    .badge-rose { background: #ffe4e6; color: #9f1239; border: 1px solid #fecdd3; }

    /* FAQ accordion simulation */
    .faq-item {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 14px;
      margin-bottom: 10px;
      background: #ffffff;
      page-break-inside: avoid;
    }

    .faq-q {
      font-weight: 700;
      font-size: 9.5pt;
      color: #1e293b;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .faq-q span {
      color: #4f46e5;
    }

    .faq-a {
      font-size: 9pt;
      color: #475569;
      line-height: 1.5;
    }

    /* Glossary grid */
    .glossary-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 8px;
      margin-top: 10px;
    }

    .glossary-item {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 9pt;
      page-break-inside: avoid;
    }

    .glossary-term {
      font-weight: 700;
      color: #1e293b;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .glossary-def {
      color: #475569;
      font-size: 8.5pt;
      margin-top: 3px;
    }

    .back-to-toc {
      font-size: 8pt;
      float: right;
      color: #64748b;
      font-weight: normal;
    }
  </style>
</head>
<body>

  <!-- ====================================================================
       COVER PAGE
       ==================================================================== -->
  <div class="cover-container">
    <div>
      <div class="cover-header">
        <span class="cover-badge">Official Architecture & User Guide</span>
        <span style="font-size: 8.5pt; color: #94a3b8;">v2.5 Production Edition</span>
      </div>

      <div class="cover-title">
        PromptVault <span>Pro</span>
      </div>
      <div class="cover-subtitle">
        The Comprehensive Interactive Guide & Technical Reference for Managing, Parameterizing, and Executing Production-Grade AI Prompts & Blueprints.
      </div>

      <div class="cover-pillars-grid">
        <div class="cover-pillar-pill">⚙️ Automation & Systems</div>
        <div class="cover-pillar-pill">💻 Coding & Software Architecture</div>
        <div class="cover-pillar-pill">💼 Business & Product Strategy</div>
        <div class="cover-pillar-pill">📈 Marketing, Content & SEO</div>
        <div class="cover-pillar-pill">🎨 Image & Multimedia Generation</div>
        <div class="cover-pillar-pill">✨ Design, UI/UX & Web Dev</div>
        <div class="cover-pillar-pill" style="grid-column: span 2;">🎓 Education & Skill Building</div>
      </div>
    </div>

    <div class="cover-footer">
      <div>
        <strong>Author & Systems Architect:</strong> Rocky Swartz<br>
        <strong>Repository:</strong> <span style="color: #cbd5e1;">github.com/rockyswartz/PromptLibrary</span><br>
        <strong>Web App:</strong> <span style="color: #cbd5e1;">rockyswartz.github.io/PromptLibrary</span>
      </div>
      <div style="text-align: right;">
        <strong>Format:</strong> Fully Interactive PDF<br>
        <strong>Features:</strong> Clickable Index, Live Runner, Deduplication Shield
      </div>
    </div>
  </div>

  <!-- ====================================================================
       TABLE OF CONTENTS & JUMP INDEX
       ==================================================================== -->
  <div class="page-break" id="table-of-contents"></div>
  <h1>📑 Interactive Table of Contents</h1>
  <p style="color: #64748b; font-size: 9pt;">Click any chapter or section title below to jump directly to its content. Every section includes a "Back to Top" link.</p>

  <div class="toc-card">
    <ul class="toc-list">
      <li class="toc-item">
        <a href="#ch1-overview" class="toc-link"><span>1. System Architecture & Workspace Tour</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch1-overview</span>
      </li>
      <li class="toc-item" style="padding-left: 18px;">
        <a href="#ch1-pillars" class="toc-link"><span>• The 7 Core Domain Pillars</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch1-pillars</span>
      </li>
      <li class="toc-item" style="padding-left: 18px;">
        <a href="#ch1-card-anatomy" class="toc-link"><span>• Prompt Card Anatomy & Telemetry</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch1-card-anatomy</span>
      </li>
      <li class="toc-item" style="padding-left: 18px;">
        <a href="#ch1-appearance" class="toc-link"><span>• Appearance & High-Contrast Light/Dark Modes</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch1-appearance</span>
      </li>

      <li class="toc-item" style="margin-top: 6px;">
        <a href="#ch2-taxonomy" class="toc-link"><span>2. The 3-Tier Taxonomy & Deduplication Shield</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch2-taxonomy</span>
      </li>
      <li class="toc-item" style="padding-left: 18px;">
        <a href="#ch2-modes" class="toc-link"><span>• Mode Switcher: Edit Category vs New Category</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch2-modes</span>
      </li>
      <li class="toc-item" style="padding-left: 18px;">
        <a href="#ch2-subcats" class="toc-link"><span>• 1-Click Master Subcategory Pool & Active Highlights</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch2-subcats</span>
      </li>
      <li class="toc-item" style="padding-left: 18px;">
        <a href="#ch2-renaming" class="toc-link"><span>• Category Renaming & Safe Deletion Cascade</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch2-renaming</span>
      </li>

      <li class="toc-item" style="margin-top: 6px;">
        <a href="#ch3-authoring" class="toc-link"><span>3. Authoring, Tagging & Blueprint Engineering</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch3-authoring</span>
      </li>
      <li class="toc-item" style="padding-left: 18px;">
        <a href="#ch3-anatomy" class="toc-link"><span>• Quick Templates vs 5-Section Enterprise Blueprints</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch3-anatomy</span>
      </li>
      <li class="toc-item" style="padding-left: 18px;">
        <a href="#ch3-tags" class="toc-link"><span>• Character-by-Character Tag Autocomplete</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch3-tags</span>
      </li>
      <li class="toc-item" style="padding-left: 18px;">
        <a href="#ch3-author-credits" class="toc-link"><span>• Originator Attribution & Safe Prompt Deletion</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch3-author-credits</span>
      </li>

      <li class="toc-item" style="margin-top: 6px;">
        <a href="#ch4-variables" class="toc-link"><span>4. Dynamic Variable Syntax & The Live LLM Runner</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch4-variables</span>
      </li>
      <li class="toc-item" style="padding-left: 18px;">
        <a href="#ch4-syntax" class="toc-link"><span>• Syntax Rules: Free-Text vs Multiple-Choice Pills</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch4-syntax</span>
      </li>
      <li class="toc-item" style="padding-left: 18px;">
        <a href="#ch4-prefill" class="toc-link"><span>• Upfront Variable Pre-fill Runner & Token Telemetry</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch4-prefill</span>
      </li>
      <li class="toc-item" style="padding-left: 18px;">
        <a href="#ch4-launcher" class="toc-link"><span>• 1-Click Multi-LLM Launcher (ChatGPT, Claude, Gemini, etc.)</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch4-launcher</span>
      </li>

      <li class="toc-item" style="margin-top: 6px;">
        <a href="#ch5-data" class="toc-link"><span>5. Data Management, Smart Ingest & Backups</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch5-data</span>
      </li>
      <li class="toc-item" style="padding-left: 18px;">
        <a href="#ch5-data-menu" class="toc-link"><span>• The ⇅ Data Menu & Canvas Presets</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch5-data-menu</span>
      </li>
      <li class="toc-item" style="padding-left: 18px;">
        <a href="#ch5-smart-ingest" class="toc-link"><span>• Smart Text Ingestion & Bracket Conversion</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch5-smart-ingest</span>
      </li>
      <li class="toc-item" style="padding-left: 18px;">
        <a href="#ch5-llm-enrichment" class="toc-link"><span>• Turnkey LLM Parameterization Prompt (0-Var Enrichment)</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch5-llm-enrichment</span>
      </li>

      <li class="toc-item" style="margin-top: 6px;">
        <a href="#ch6-faq" class="toc-link"><span>6. Frequently Asked Questions (FAQ)</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch6-faq</span>
      </li>

      <li class="toc-item" style="margin-top: 6px;">
        <a href="#ch7-glossary" class="toc-link"><span>7. Interactive A-Z Prompting Glossary & Index</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch7-glossary</span>
      </li>
    </ul>
  </div>

  <!-- ====================================================================
       CHAPTER 1: SYSTEM ARCHITECTURE & WORKSPACE TOUR
       ==================================================================== -->
  <div class="page-break" id="ch1-overview"></div>
  <h1>
    <span>1. System Architecture & Workspace Tour</span>
    <a href="#table-of-contents" class="back-to-toc">↑ Back to Contents</a>
  </h1>

  <p>
    <strong>PromptVault Pro</strong> is an offline-ready, zero-dependency, open-source web application designed for knowledge workers, AI engineers, product strategists, and creators. Unlike basic "copy-paste" prompt directories that require tedious search-and-replace for placeholders, PromptVault Pro parameterizes prompts into <em>interactive software utilities</em>.
  </p>

  <div class="highlight-card">
    <strong>Key Architectural Principles:</strong>
    <br>• <strong>100% Client-Side Privacy:</strong> Prompts are stored in browser IndexedDB (with optional local SQLite backend). No personal data or private prompts ever leave your machine.
    <br>• <strong>Zero Complex Build Steps:</strong> Pure semantic HTML5, Vanilla JavaScript (ES6+), and CSS variables. No Node.js build steps or npm packages required for deployment.
    <br>• <strong>Live Compilation Engine:</strong> Dynamic input parsing converts parameters into typed inputs with instant token counting before clipboard copying.
  </div>

  <h2 id="ch1-pillars">The 7 Architectural Domain Pillars</h2>
  <p>To prevent chaotic sprawl, every prompt belongs to exactly one top-level Domain Pillar:</p>

  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Domain Pillar</th>
        <th style="width: 45%;">Core Focus & Scope</th>
        <th style="width: 30%;">Sample Categories</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>⚙️ Automation & Systems</strong></td>
        <td>Workflow automation, API webhooks, CLI scripts, Excel VBA, and database ETL pipelines.</td>
        <td>CLI Automation, Zapier & Make, Excel Formulas</td>
      </tr>
      <tr>
        <td><strong>💻 Coding & Software</strong></td>
        <td>Full-stack development, code review, unit testing, architecture design, and refactoring.</td>
        <td>API Design, Clean Code, Database & Backend</td>
      </tr>
      <tr>
        <td><strong>💼 Business & Strategy</strong></td>
        <td>Executive decision memos, PRDs, competitive analysis, fundraising decks, and roadmaps.</td>
        <td>Executive Presentations, Product Management</td>
      </tr>
      <tr>
        <td><strong>📈 Marketing, Content & SEO</strong></td>
        <td>Direct response copywriting, email marketing, SEO audits, audience research, and social growth.</td>
        <td>Content Writing, SEO & Metadata, Ad Copy</td>
      </tr>
      <tr>
        <td><strong>🎨 Image & Multimedia</strong></td>
        <td>Generative imagery (Midjourney, Stable Diffusion), video scriptwriting, and cinematic lighting.</td>
        <td>Concept Art, Cinematic Lighting, Video Scripts</td>
      </tr>
      <tr>
        <td><strong>✨ Design & UI/UX</strong></td>
        <td>Component blueprints, wireframes, design systems, design patterns, and micro-interactions.</td>
        <td>Component Blueprint, Dark Mode Patterns</td>
      </tr>
      <tr>
        <td><strong>🎓 Education & Skills</strong></td>
        <td>Technical concept breakdown, mental models, curriculum design, and interview coaching.</td>
        <td>Concept Explanations, Learning Roadmaps</td>
      </tr>
    </tbody>
  </table>

  <h2 id="ch1-card-anatomy">Prompt Card Anatomy & Live Telemetry</h2>
  <p>Each card in the grid provides instant telemetry and rapid interactive controls:</p>
  <ul>
    <li><strong>❶ Domain Badge & Blueprint Tag:</strong> Visually denotes the parent discipline and indicates whether the prompt is a standard template or an enterprise 5-section blueprint.</li>
    <li><strong>❷ Category & Difficulty Level:</strong> Displays the primary functional grouping alongside skill rating (<span class="badge-chip badge-emerald">Beginner</span>, <span class="badge-chip badge-amber">Intermediate</span>, <span class="badge-chip badge-rose">Advanced</span>).</li>
    <li><strong>❸ Interactive Variable Badges:</strong> Visual pills showing extracted parameters (e.g., <code>{{topic}}</code>, <code>{{tone}}</code>).</li>
    <li><strong>❹ Clickable Tags (#Hashtags):</strong> Click any tag to instantly filter the entire vault by that specific taxonomy thread.</li>
    <li><strong>❺ Originator & Author Credit:</strong> Standardized attribution (e.g., <code>👤 Randy Austin</code>, <code>👤 Anthropic</code>) with direct external links to creator resources.</li>
    <li><strong>❻ Live Action Hub:</strong>
      <br>• <strong>Run / Use Blueprint:</strong> Opens the live parameter pre-fill dialog with token calculation.
      <br>• <strong>Copy:</strong> Copies compiled or template text directly with toast confirmation.
      <br>• <strong>Favorite (★):</strong> Toggles prompt into your curated personal favorites list.
      <br>• <strong>Edit (✏️):</strong> Opens full authoring editor to revise text, parameters, or tags.
    </li>
  </ul>

  <h2 id="ch1-appearance">Appearance Customizer & Theme Presets</h2>
  <p>
    Accessible via the palette button in the top navigation bar, PromptVault Pro includes 5 curated visual presets (Deep Void Dark, Midnight Obsidian, Cyberpunk Neon, Electric Slate, and Clean Studio Light) with customized accent color wheels. High-contrast tokens ensure WCAG AA compliance across both dark and light modes.
  </p>

  <!-- ====================================================================
       CHAPTER 2: TAXONOMY & DEDUPLICATION SHIELD
       ==================================================================== -->
  <div class="page-break" id="ch2-taxonomy"></div>
  <h1>
    <span>2. The 3-Tier Taxonomy & Deduplication Shield</span>
    <a href="#table-of-contents" class="back-to-toc">↑ Back to Contents</a>
  </h1>

  <p>
    As personal and enterprise prompt collections grow from 10 prompts to 1,000+, unstructured tag systems quickly degrade into chaotic duplicates (e.g., "SEO", "seo", "Seo-Audits", "search-engine"). PromptVault Pro prevents this sprawl through a strict <strong>3-tier taxonomy engine</strong> paired with an active deduplication shield.
  </p>

  <div class="info-card">
    <strong>Hierarchy Architecture:</strong>
    <br><strong>Tier 1 — Domain Pillars (7 Fixed Disciplines):</strong> Top-level domain anchors.
    <br><strong>Tier 2 — Categories (44 Standard Categories):</strong> Functional functional groupings (e.g., <em>Executive Presentations</em>, <em>Product Management</em>, <em>SEO & Metadata</em>).
    <br><strong>Tier 3 — Subcategories (Reusable Deliverable Operations):</strong> Granular operational deliverables (e.g., <em>Pitch Decks</em>, <em>Board Summaries</em>, <em>PRD Specs</em>).
  </div>

  <h2 id="ch2-modes">The Mode Switcher: Edit Existing vs. Create New</h2>
  <p>
    In the <strong>Taxonomy & Deduplication Manager</strong>, the top control box features a prominent 2-state mode switcher that eliminates UI ambiguity:
  </p>

  <div class="avoid-break">
    <table>
      <thead>
        <tr>
          <th style="width: 50%;">Mode: ✏️ Edit Category</th>
          <th style="width: 50%;">Mode: ➕ New Category</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            • <strong>1. Domain Pillar:</strong> Select the parent domain.<br>
            • <strong>2. Category to Edit:</strong> A clean dropdown lists all existing categories with prompt and subcategory counts (e.g., <code>Executive Presentations (9 prompts · 4 subcats)</code>).<br>
            • <strong>Automatic Subcategory Pull-Through:</strong> Selecting any category immediately populates its currently linked subcategories into the chip list.<br>
            • <strong>Optional Inline Rename:</strong> Click <code>✏️ Rename Category</code> to change its title across the entire vault.<br>
            • <strong>Action:</strong> <code>Update "[Category Name]" Subcategories</code>.
          </td>
          <td>
            • <strong>1. Domain Pillar:</strong> Select the parent domain.<br>
            • <strong>2. New Category Name:</strong> A dedicated text field (auto-focused) for typing the brand-new category name.<br>
            • <strong>Clean Canvas:</strong> Linked subcategories starts clean, ready for linking operations.<br>
            • <strong>Action:</strong> <code>Save New Category & Subcategories</code>.<br>
            • <strong>Auto-Switch:</strong> On save, the manager automatically switches into Edit Mode for that new category.
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2 id="ch2-subcats">1-Click Master Subcategory Pool & Active Highlights</h2>
  <p>
    Directly below the linked subcategories list is the <strong>Shared Master Subcategory Pool</strong> containing 100+ standardized deliverable operations.
  </p>
  <div class="tip-card">
    <strong>Vibrant Visual Highlights on Active Chips:</strong>
    <br>• Any subcategory that is currently linked to the active category is rendered with a <strong>prominent solid accent background</strong> (<code style="background:#4f46e5; color:#fff;">✓ Roadmaps</code>, <code style="background:#4f46e5; color:#fff;">✓ PRD Specs</code>) with bold white text.
    <br>• Unlinked subcategories remain neutral with a <code>+ Name</code> prefix.
    <br>• <strong>1-Click Linking:</strong> Click any <code>+ Name</code> chip to instantly attach it. Click any <code>✓ Name</code> chip to detach it.
  </div>

  <h2 id="ch2-renaming">Category Renaming & Safe Deletion Cascade</h2>
  <ul>
    <li><strong>Automated Prompt Record Cascade:</strong> When you rename a category (e.g., from "Slide Decks" to "Executive Presentations"), PromptVault Pro scans every prompt in the database. Any prompt referencing the old category is automatically updated and saved.</li>
    <li><strong>Safe Deletion Protection:</strong> If you delete a category, PromptVault Pro never deletes the underlying prompts. Assigned prompts are moved safely to the <code>General</code> fallback category to guarantee zero data loss.</li>
    <li><strong>1-Click Hierarchy Tree Editing:</strong> In the Active Taxonomy Hierarchy accordion below, every category card has a direct <code>✏️ Edit</code> button. Clicking it instantly jumps to Edit Mode with that category's subcategories loaded.</li>
  </ul>

  <!-- ====================================================================
       CHAPTER 3: AUTHORING, TAGGING & BLUEPRINTS
       ==================================================================== -->
  <div class="page-break" id="ch3-authoring"></div>
  <h1>
    <span>3. Authoring, Tagging & Blueprint Engineering</span>
    <a href="#table-of-contents" class="back-to-toc">↑ Back to Contents</a>
  </h1>

  <p>
    PromptVault Pro offers two distinct authoring workflows depending on the complexity of your task: <strong>Quick Template Mode</strong> and the <strong>5-Section Enterprise Blueprint Engine</strong>.
  </p>

  <h2 id="ch3-anatomy">Quick Templates vs. 5-Section Enterprise Blueprints</h2>

  <div class="avoid-break">
    <table>
      <thead>
        <tr>
          <th style="width: 45%;">Option A: Quick Template</th>
          <th style="width: 55%;">Option B: 5-Section Enterprise Blueprint</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>Best For:</strong> Routine emails, quick summaries, conversational Q&A, and simple tasks.<br><br>
            <strong>Structure:</strong> Single text area embedding inline <code>{{variables}}</code>.<br><br>
            <strong>Example:</strong><br>
            <code>Draft a polite follow-up to {{client}} regarding {{proposal}} sent on {{date}}.</code>
          </td>
          <td>
            <strong>Best For:</strong> Production code, financial audits, executive strategy memos, and zero-hallucination pipelines.<br><br>
            <strong>5-Section Standard Anatomy:</strong><br>
            • <strong>1. Role & Persona:</strong> Technical alignment (e.g. Principal Systems Architect).<br>
            • <strong>2. Primary Objective:</strong> Precise mission statement and scope boundary.<br>
            • <strong>3. Dynamic Inputs:</strong> Strict schema bindings (<code>{{input}}</code>).<br>
            • <strong>4. Negative Guardrails:</strong> Explicit anti-patterns (no fluff, no unverified facts).<br>
            • <strong>5. Output Rubric:</strong> Required structure (JSON schema, Markdown table).
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2 id="ch3-tags">Character-by-Character Tag Autocomplete</h2>
  <p>
    In the Add/Edit Prompt dialog, the <strong>Tags</strong> field provides interactive WordPress-style character sensitivity:
  </p>
  <ul>
    <li><strong>Real-Time Refiltering:</strong> Typing <code>s</code> immediately displays all library tags starting with or containing <code>s</code> (e.g. <code>#seo (12 prompts)</code>, <code>#strategy (8 prompts)</code>). Typing a second letter <code>o</code> refilters live to <code>#so...</code> tags.</li>
    <li><strong>Keyboard Navigation:</strong> Use <kbd>↓</kbd> and <kbd>↑</kbd> to traverse suggestions, then press <kbd>Enter</kbd>, <kbd>,</kbd>, or <kbd>Tab</kbd> to select.</li>
    <li><strong>Instant Custom Tag Creation:</strong> If you enter a tag that has never been used before in your library, an intuitive prompt appears: <code>✨ + Add new tag: "your-tag"</code>.</li>
    <li><strong>Consistent Tag Chips:</strong> Tags are stored cleanly without duplicate whitespace or hash symbols, preventing fragmentation.</li>
  </ul>

  <h2 id="ch3-author-credits">Originator Attribution & Safe Prompt Deletion</h2>
  <ul>
    <li><strong>Standardized Author Credits:</strong> Give credit where credit is due. Enter an <code>Author Name</code> (e.g., <em>Anthropic</em>, <em>Randy Austin</em>, <em>HubSpot</em>) and optional <code>Author URL</code>. Cards display a verified creator badge that users can click to visit original sources.</li>
    <li><strong>Dedicated Delete Prompt Action:</strong> When viewing or editing an existing prompt, click the red <strong>🗑️ Delete Prompt</strong> button. PromptVault Pro presents a safety confirmation modal to prevent accidental removal.</li>
  </ul>

  <!-- ====================================================================
       CHAPTER 4: DYNAMIC VARIABLES & THE LIVE RUNNER
       ==================================================================== -->
  <div class="page-break" id="ch4-variables"></div>
  <h1>
    <span>4. Dynamic Variable Syntax & The Live LLM Runner</span>
    <a href="#table-of-contents" class="back-to-toc">↑ Back to Contents</a>
  </h1>

  <p>
    Dynamic variables turn static prompt text into reusable, parameterized tools. PromptVault Pro recognizes three distinct formats during drafting and compilation.
  </p>

  <h2 id="ch4-syntax">Variable Syntax Rules</h2>

  <div class="avoid-break">
    <table>
      <thead>
        <tr>
          <th style="width: 28%;">Variable Type</th>
          <th style="width: 42%;">Syntax Example</th>
          <th style="width: 30%;">Rendered UI Control</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Free-Form Text</strong><br><span class="badge-chip badge-indigo">Standard</span></td>
          <td><code>{{company_name}}</code><br><code>{{target_audience}}</code></td>
          <td>Text input field with real-time value injection.</td>
        </tr>
        <tr>
          <td><strong>Multiple-Choice Pills</strong><br><span class="badge-chip badge-emerald">Choice</span></td>
          <td><code>{{tone: Professional | Direct | Casual}}</code><br><code>{{format: Table | Bullets | JSON}}</code></td>
          <td>Clickable toggle pills with automatic custom write-in fallback.</td>
        </tr>
        <tr>
          <td><strong>Natural Writing Placeholders</strong><br><span class="badge-chip badge-cyan">Auto-Detected</span></td>
          <td><code>[Project Goal]</code><br><code>&lt;Audience Segment&gt;</code><br><code>{Topic}</code></td>
          <td>Automatically detected and parsed into interactive fields during Smart Ingest.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2 id="ch4-prefill">Upfront Variable Pre-fill Runner & Token Telemetry</h2>
  <p>
    When you click <strong>"Run"</strong> or <strong>"Use Blueprint"</strong> on any prompt card, PromptVault Pro launches the <strong>Live Variable Runner Modal</strong>:
  </p>
  <div class="highlight-card">
    <strong>The Birds-Eye Pre-Fill Workflow:</strong>
    <br>1. <strong>Holistic Parameter View:</strong> View all required variables at once before running, preventing detached question-and-answer cycles with the LLM.
    <br>2. <strong>Live Compiled Stream:</strong> As you type or click choice pills, the preview window updates dynamically in real time.
    <br>3. <strong>Precise Telemetry:</strong> Live word count, character count, and estimated LLM tokens (<code>Math.ceil(characters / 4)</code>) update continuously.
    <br>4. <strong>Flexible Copy Controls:</strong>
    <br>• <strong>Copy with Variables:</strong> Copies the fully compiled, production-ready prompt text.
    <br>• <strong>Copy Template Only:</strong> Copies the raw template with double curly braces for documentation or programmatic use.
  </div>

  <h2 id="ch4-launcher">1-Click Multi-LLM Launcher</h2>
  <p>
    After copying your compiled prompt, you can launch your preferred AI model directly from PromptVault Pro with one click:
  </p>
  <ul>
    <li>🤖 <strong>ChatGPT (chatgpt.com)</strong> — Opens OpenAI's interface with clipboard contents ready to paste.</li>
    <li>🧠 <strong>Claude (claude.ai)</strong> — Opens Anthropic's Claude interface.</li>
    <li>✨ <strong>Google Gemini (gemini.google.com)</strong> — Launches Gemini Advanced.</li>
    <li>🔍 <strong>Perplexity AI (perplexity.ai)</strong> — Launches Perplexity search.</li>
    <li>💻 <strong>Cursor / VS Code (cursor.com)</strong> — Fast jump for programming blueprints.</li>
    <li>🔒 <strong>LibreChat / Local LLMs</strong> — Open-source local inference interface.</li>
  </ul>

  <!-- ====================================================================
       CHAPTER 5: DATA MANAGEMENT, SMART INGEST & BACKUPS
       ==================================================================== -->
  <div class="page-break" id="ch5-data"></div>
  <h1>
    <span>5. Data Management, Smart Ingest & Backups</span>
    <a href="#table-of-contents" class="back-to-toc">↑ Back to Contents</a>
  </h1>

  <p>
    Accessible via the <strong>⇅ Data</strong> button in the main navigation bar, PromptVault Pro provides enterprise-grade data sovereignty, bulk ingestion, and portability.
  </p>

  <h2 id="ch5-data-menu">The ⇅ Data Menu & Canvas Presets</h2>
  <ul>
    <li>🗑️ <strong>Start from Scratch (Blank Canvas):</strong> Clears all prompts so you can build your own bespoke private library. All 44 categories and 7 domain pillars remain intact and ready for your new prompts.</li>
    <li>⚡ <strong>Load Starter Pack (7 Flagships):</strong> Restores the pristine 7-blueprint showcase demonstrating each domain pillar.</li>
    <li>📥 <strong>Import JSON Backup:</strong> Restore any previously exported vault with merge or overwrite options.</li>
  </ul>

  <h2 id="ch5-smart-ingest">Smart Text Ingestion & Bracket Conversion</h2>
  <p>
    Have legacy prompts drafted in text files, Google Docs, or Notion with brackets? Open <strong>⇅ Data -> Smart Ingest</strong>:
  </p>
  <pre>Paste any raw prompt below. Placeholders like [Topic], &lt;Audience&gt;, or {Tone} 
will be auto-converted into interactive {{variables}}.</pre>
  <p>
    PromptVault Pro heuristically parses the title, infers the best domain pillar and category, converts brackets into interactive parameters, and saves the prompt with 1 click. You can also drag-and-drop multiple <code>.txt</code> or <code>.md</code> files for bulk directory ingestion.
  </p>

  <h2 id="ch5-llm-enrichment">Turnkey LLM Parameterization Prompt (0-Var Enrichment)</h2>
  <p>
    Have existing prompts that lack dynamic variables? You can batch-enrich them in seconds using ChatGPT, Claude, or Gemini:
  </p>
  <div class="info-card">
    <strong>3-Step Batch Parameterization Workflow:</strong>
    <br><strong>Step 1:</strong> In <strong>⇅ Data</strong>, click <strong>"Export JSON"</strong> to download your current library.
    <br><strong>Step 2:</strong> Copy the Turnkey LLM Prompt below, attach or paste your exported JSON, and run it in your LLM:
  </div>

  <pre>You are an expert Prompt Engineer for PromptVault Pro.
I will provide a JSON array of prompts exported from my library that currently lack dynamic interactive variables.

YOUR TASK:
Analyze each prompt's `template` text and insert dynamic interactive variables so the prompt becomes highly reusable, structured, and customizable.

VARIABLE RULES:
1. Free-form text inputs: Replace static placeholders, company names, targets, goals, or topics with double curly braces: `{{variable_name}}`. Example: `{{company_name}}`, `{{industry}}`, `{{target_audience}}`.
2. Multiple-choice dropdowns: When a parameter has standard or logical choices (such as Tone, Format, Style, Level, or Urgency), format it with choices separated by vertical pipes:
   `{{name: Option 1 | Option 2 | Option 3}}`
   Example: `{{tone: Professional | Conversational | Technical | Persuasive}}`
   Example: `{{format: Markdown Table | Bulleted Hierarchy | Executive Summary}}`
3. Convert any existing brackets: Convert existing `[brackets]`, `{single_braces}`, or `&lt;angles&gt;` into `{{variable_name}}`.

JSON REQUIREMENTS:
1. Preserve all existing object fields intact (`id`, `title`, `categories`, `category`, `subcategories`, `subcategory`, `model`, `difficulty`, `author`, `notes`, `source`, `createdAt`, `featured`, `tags`).
2. Update the `template` string with the newly inserted variables.
3. In the `variables` array, list the extracted variable objects:
   `{"name": "variable_name", "label": "Descriptive Label", "type": "text" or "choice", "options": ["Option 1", "Option 2"], "default": ""}`
4. Return ONLY the raw valid JSON array `[...]` with no conversational markdown preambles or explanations so it can be imported directly.

Here is the JSON data to process:
[PASTE YOUR EXPORTED JSON HERE]</pre>

  <p>
    <strong>Step 3:</strong> In PromptVault Pro, select <strong>"Merge (Update Existing & Add New)"</strong> and upload the enriched JSON file. All prompts are seamlessly updated with interactive runner fields!
  </p>

  <!-- ====================================================================
       CHAPTER 6: FREQUENTLY ASKED QUESTIONS (FAQ)
       ==================================================================== -->
  <div class="page-break" id="ch6-faq"></div>
  <h1>
    <span>6. Frequently Asked Questions (FAQ)</span>
    <a href="#table-of-contents" class="back-to-toc">↑ Back to Contents</a>
  </h1>

  <div class="faq-item">
    <div class="faq-q"><span>Q1:</span> Where are my prompts stored? Is my proprietary prompt data secure?</div>
    <div class="faq-a">Your prompt data is stored 100% locally on your computer inside your browser's persistent IndexedDB database. Nothing is transmitted to external cloud servers or analytics tracking. If you use the optional local Python backend (<code>server/server.py</code>), prompts are saved directly to an offline SQLite file (<code>promptlibrary.db</code>).</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q2:</span> What happens if I clear my browser's cache or history?</div>
    <div class="faq-a">IndexedDB persists across standard browser restarts. However, if you explicitly clear "Site Data and Cookies" for the site, browser storage may be wiped. We strongly recommend clicking <strong>⇅ Data -> Export JSON</strong> periodically to keep a backup file in your Documents or Google Drive folder.</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q3:</span> How do I create a multiple-choice dropdown variable in a prompt?</div>
    <div class="faq-a">Use vertical pipe delimiters inside double curly braces: <code>{{parameter_name: Option A | Option B | Option C}}</code>. For example: <code>{{tone: Executive | Concise | Persuasive}}</code>. The Live Runner will automatically render interactive toggle pills with a custom write-in fallback.</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q4:</span> How do I rename a category without breaking existing prompts?</div>
    <div class="faq-a">Open <strong>Taxonomy & Deduplication Manager</strong>, set the mode to <code>✏️ Edit Category</code>, select the category from the dropdown, and click <code>✏️ Rename Category</code>. Enter the new name and click Update. PromptVault Pro cascades the new category name across all associated prompt cards automatically.</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q5:</span> What happens to prompts if I delete their category?</div>
    <div class="faq-a">PromptVault Pro enforces a strict zero-data-loss policy. Deleting a category never deletes its prompts; they are safely reassigned to the <code>General</code> category so you can reclassify them at your convenience.</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q6:</span> Why do some subcategories have a checkmark (✓) while others have a plus (+)?</div>
    <div class="faq-a">In the Taxonomy Manager's Master Subcategory Pool, a checkmark with a solid vibrant background indicates that the subcategory is currently attached to the active category. A plus symbol (<code>+ Name</code>) indicates an available operation you can link with one click.</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q7:</span> How does the tag autocomplete system work?</div>
    <div class="faq-a">In the Add/Edit Prompt dialog, start typing any letter into the Tags field. PromptVault Pro searches your entire library character-by-character, displaying matching tags and how many prompts currently use them. Press <kbd>Enter</kbd> or <kbd>,</kbd> to select, or create a brand-new tag if no matches exist.</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q8:</span> How is the estimated token count calculated?</div>
    <div class="faq-a">Prompt telemetry uses the standard LLM byte-pair encoding heuristic: <code>Math.ceil(total_characters / 4)</code>. For English prose and code, 4 characters roughly equal 1 LLM token.</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q9:</span> Can a prompt belong to more than one category?</div>
    <div class="faq-a">Yes. In the Prompt Form modal, you can select multiple category checkboxes across any Domain Pillar. The prompt will appear whenever any of its assigned categories are filtered.</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q10:</span> Can I use PromptVault Pro on my iPhone, iPad, or Android phone?</div>
    <div class="faq-a">Yes. PromptVault Pro is fully responsive with fluid typography (CSS clamp tokens) that scale smoothly down to 360px portrait phones. You can open the live web app in Chrome or Safari, tap Share / Settings, and select "Add to Home Screen" to run it as a standalone app.</div>
  </div>

  <!-- ====================================================================
       CHAPTER 7: INTERACTIVE GLOSSARY & INDEX
       ==================================================================== -->
  <div class="page-break" id="ch7-glossary"></div>
  <h1>
    <span>7. Interactive A-Z Prompting Glossary & Index</span>
    <a href="#table-of-contents" class="back-to-toc">↑ Back to Contents</a>
  </h1>

  <p style="color: #64748b; font-size: 9pt;">An alphabetical reference of key AI prompt engineering, architecture, and PromptVault Pro terminology. Click any term's section link to jump to its detailed guide.</p>

  <div class="glossary-grid">
    <div class="glossary-item">
      <div class="glossary-term">
        <span>Anti-Hallucination Guardrails</span>
        <a href="#ch3-anatomy">Jump to Ch. 3 &rarr;</a>
      </div>
      <div class="glossary-def">Negative constraints explicitly instructing the LLM what NOT to assume, invent, or extrapolate. Essential for production reliability.</div>
    </div>

    <div class="glossary-item">
      <div class="glossary-term">
        <span>Blueprint (5-Section Modular Prompt)</span>
        <a href="#ch3-anatomy">Jump to Ch. 3 &rarr;</a>
      </div>
      <div class="glossary-def">An enterprise-grade prompt structure consisting of Role/Persona, Core Objective, Dynamic Context/Inputs, Negative Guardrails, and Output Rubric.</div>
    </div>

    <div class="glossary-item">
      <div class="glossary-term">
        <span>Character-by-Character Autocomplete</span>
        <a href="#ch3-tags">Jump to Ch. 3 &rarr;</a>
      </div>
      <div class="glossary-def">A responsive UI pattern that filters existing tags and categories on each keystroke, preventing redundant tag creation.</div>
    </div>

    <div class="glossary-item">
      <div class="glossary-term">
        <span>Compiled Prompt</span>
        <a href="#ch4-prefill">Jump to Ch. 4 &rarr;</a>
      </div>
      <div class="glossary-def">The final, production-ready prompt text where all dynamic <code>{{variables}}</code> have been replaced with the user's active inputs.</div>
    </div>

    <div class="glossary-item">
      <div class="glossary-term">
        <span>Deduplication Shield</span>
        <a href="#ch2-taxonomy">Jump to Ch. 2 &rarr;</a>
      </div>
      <div class="glossary-def">The PromptVault Pro subsystem that alerts users when attempting to create near-duplicate category or subcategory names.</div>
    </div>

    <div class="glossary-item">
      <div class="glossary-term">
        <span>Domain Pillar (Tier 1)</span>
        <a href="#ch1-pillars">Jump to Ch. 1 &rarr;</a>
      </div>
      <div class="glossary-def">One of the 7 foundational engineering disciplines (Automation, Coding, Business, Marketing, Multimedia, Design, Education) anchoring the taxonomy.</div>
    </div>

    <div class="glossary-item">
      <div class="glossary-term">
        <span>Few-Shot Prompting</span>
        <a href="#ch3-anatomy">Jump to Ch. 3 &rarr;</a>
      </div>
      <div class="glossary-def">Providing 1 to 3 concrete input/output exemplars within the prompt to steer formatting and quality expectations.</div>
    </div>

    <div class="glossary-item">
      <div class="glossary-term">
        <span>IndexedDB</span>
        <a href="#ch1-overview">Jump to Ch. 1 &rarr;</a>
      </div>
      <div class="glossary-def">The high-capacity client-side database built into modern web browsers, providing gigabyte-scale storage without 5MB localStorage limits.</div>
    </div>

    <div class="glossary-item">
      <div class="glossary-term">
        <span>Multiple-Choice Variable</span>
        <a href="#ch4-syntax">Jump to Ch. 4 &rarr;</a>
      </div>
      <div class="glossary-def">A parameter defined with pipe delimiters: <code>{{name: Option A | Option B}}</code>, rendering interactive toggle pills.</div>
    </div>

    <div class="glossary-item">
      <div class="glossary-term">
        <span>Originator Attribution</span>
        <a href="#ch3-author-credits">Jump to Ch. 3 &rarr;</a>
      </div>
      <div class="glossary-def">Standardized metadata crediting the author or organization who engineered the original prompt concept.</div>
    </div>

    <div class="glossary-item">
      <div class="glossary-term">
        <span>Output Rubric & Schema</span>
        <a href="#ch3-anatomy">Jump to Ch. 3 &rarr;</a>
      </div>
      <div class="glossary-def">Section 5 of an enterprise blueprint specifying exact structural syntax (e.g. JSON schema, Markdown tables) and scoring criteria.</div>
    </div>

    <div class="glossary-item">
      <div class="glossary-term">
        <span>Smart Text Ingestion</span>
        <a href="#ch5-smart-ingest">Jump to Ch. 5 &rarr;</a>
      </div>
      <div class="glossary-def">The built-in parser that auto-detects legacy bracket placeholders like <code>[Topic]</code> and converts them into interactive <code>{{variables}}</code>.</div>
    </div>

    <div class="glossary-item">
      <div class="glossary-term">
        <span>Subcategory (Tier 3)</span>
        <a href="#ch2-subcats">Jump to Ch. 2 &rarr;</a>
      </div>
      <div class="glossary-def">A granular operational deliverable (e.g., <em>Pitch Decks</em>, <em>PRD Specs</em>) attached to a parent category.</div>
    </div>

    <div class="glossary-item">
      <div class="glossary-term">
        <span>Token Telemetry</span>
        <a href="#ch4-prefill">Jump to Ch. 4 &rarr;</a>
      </div>
      <div class="glossary-def">Real-time estimation of LLM token consumption calculated as <code>Math.ceil(characters / 4)</code> to prevent context window overflow.</div>
    </div>

    <div class="glossary-item">
      <div class="glossary-term">
        <span>Zero-Shot Prompting</span>
        <a href="#ch3-anatomy">Jump to Ch. 3 &rarr;</a>
      </div>
      <div class="glossary-def">Directly instructing an LLM to perform a task without providing previous input/output demonstration pairs.</div>
    </div>
  </div>

  <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 8.5pt; color: #94a3b8;">
    PromptVault Pro Interactive User Guide • © 2026 Rocky Swartz • MIT License • <a href="https://github.com/rockyswartz/PromptLibrary">github.com/rockyswartz/PromptLibrary</a>
  </div>

</body>
</html>
"""

def main():
    print(f"Creating HTML source at {HTML_OUT}...")
    os.makedirs(os.path.dirname(HTML_OUT), exist_ok=True)
    with open(HTML_OUT, "w", encoding="utf-8") as f:
        f.write(HTML_CONTENT)

    chrome_bin = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    if not os.path.exists(chrome_bin):
        print(f"Error: Chrome binary not found at {chrome_bin}")
        sys.exit(1)

    print(f"Generating Interactive PDF via Chrome Headless at {PDF_OUT}...")
    cmd = [
        chrome_bin,
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={PDF_OUT}",
        f"file://{HTML_OUT}"
    ]

    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if os.path.exists(PDF_OUT) and os.path.getsize(PDF_OUT) > 1000:
        size_kb = os.path.getsize(PDF_OUT) / 1024
        print(f"SUCCESS: Interactive PDF User Guide created ({size_kb:.1f} KB) at {PDF_OUT}")
    else:
        print(f"Failed to generate PDF. Return code: {res.returncode}")
        print(res.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
