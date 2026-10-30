#!/usr/bin/env python3
"""
PromptVault Pro - Interactive PDF User Guide Generator
Compiles a publication-grade, interactive, print-ready PDF manual complete with:
- Cover Page with PromptLibrary_pro_Favicon Logo matching the "PromptVault Pro" character width
- Interactive Table of Contents with Clickable Internal Jump Links
- Full End-to-End Workflow & Sub-processes Infographic Diagram
- Real High-Resolution UI Screenshots (Main Dashboard, Taxonomy Manager, Prompt Form, Live Runner, LLM Launcher, Data Modal)
- Element-by-Element Callout Explanations for all UI controls
- In-depth FAQ Section
- Alphabetical A-Z Prompting Glossary & Index with clickable back-links
"""

import os
import sys
import base64
import subprocess

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HTML_OUT = os.path.join(BASE_DIR, "docs", "user_guide_source.html")
PDF_OUT = os.path.join(BASE_DIR, "assets", "PromptVault-Pro-User-Guide.pdf")

def get_b64(rel_path):
    abs_path = os.path.join(BASE_DIR, rel_path)
    if os.path.exists(abs_path):
        with open(abs_path, "rb") as f:
            data = base64.b64encode(f.read()).decode("utf-8")
        ext = os.path.splitext(rel_path)[1].lower().replace(".", "")
        mime = "image/png" if ext == "png" else "image/jpeg"
        return f"data:{mime};base64,{data}"
    print(f"Warning: Missing image file at {abs_path}", file=sys.stderr)
    return ""

def build_pdf():
    print("⏳ Loading brand assets and UI screenshots...")
    favicon_b64 = get_b64("assets/PromptLibrary_pro_Favicon.png")
    ui_main_b64 = get_b64("assets/docs_screens/ui_main_dashboard.png")
    ui_taxonomy_b64 = get_b64("assets/docs_screens/ui_taxonomy_modal.png")
    ui_runner_b64 = get_b64("assets/docs_screens/ui_prompt_runner_modal.png")
    ui_llm_b64 = get_b64("assets/docs_screens/ui_llm_launcher_modal.png")
    ui_form_b64 = get_b64("assets/docs_screens/ui_prompt_form_modal.png")
    ui_data_b64 = get_b64("assets/docs_screens/ui_data_management_modal.png")

    print("📄 Assembling comprehensive user guide HTML source...")

    html_source = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PromptVault Pro — Interactive User Guide & Architecture Handbook</title>
  <style>
    @page {{
      size: A4;
      margin: 16mm 14mm 18mm 14mm;
      @bottom-right {{
        content: "Page " counter(page);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 8pt;
        color: #64748b;
      }}
      @bottom-left {{
        content: "PromptVault Pro User Guide • 2026 Edition";
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 8pt;
        color: #64748b;
      }}
    }}

    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }}

    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 9.5pt;
      line-height: 1.5;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
    }}

    /* Page Breaks */
    .page-break {{
      page-break-before: always;
      break-before: page;
    }}

    .avoid-break {{
      page-break-inside: avoid;
      break-inside: avoid;
    }}

    /* Cover Page */
    .cover-container {{
      min-height: 252mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 18mm 12mm 14mm;
      background: linear-gradient(145deg, #0f172a 0%, #1e1b4b 60%, #31104b 100%);
      color: #ffffff;
      border-radius: 12px;
      page-break-after: always;
    }}

    .cover-header {{
      display: flex;
      align-items: center;
      gap: 12px;
    }}

    .cover-badge {{
      display: inline-block;
      padding: 4px 14px;
      background: rgba(99, 102, 241, 0.25);
      border: 1px solid rgba(165, 180, 252, 0.4);
      color: #c7d2fe;
      border-radius: 999px;
      font-size: 8.5pt;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }}

    /* Front Page Logo matches exact rendered character width of "PromptVault Pro" lettering (328px) */
    .cover-logo-wrapper {{
      margin: 20px 0 14px 0;
      display: flex;
      align-items: center;
    }}

    .cover-logo {{
      width: 328px;
      height: 328px;
      border-radius: 36px;
      box-shadow: 0 18px 45px rgba(0, 0, 0, 0.55), 0 0 0 2px rgba(255, 255, 255, 0.2);
      display: block;
    }}

    .cover-title {{
      font-size: 32pt;
      font-weight: 900;
      line-height: 1.1;
      margin: 0 0 8px 0;
      letter-spacing: -0.02em;
      color: #ffffff;
      width: 328px;
      white-space: nowrap;
    }}

    .cover-title span {{
      background: linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }}

    .cover-subtitle {{
      font-size: 11pt;
      line-height: 1.45;
      color: #cbd5e1;
      max-width: 90%;
      margin: 4px 0 18px;
    }}

    .cover-pillars-grid {{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      margin: 15px 0;
    }}

    .cover-pillar-pill {{
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 6px 10px;
      border-radius: 6px;
      font-size: 8pt;
      color: #f1f5f9;
      font-weight: 600;
    }}

    .cover-footer {{
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      padding-top: 12px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 8pt;
      color: #94a3b8;
    }}

    /* Headings */
    h1, h2, h3, h4 {{
      color: #0f172a;
      letter-spacing: -0.015em;
    }}

    h1 {{
      font-size: 18pt;
      font-weight: 800;
      border-bottom: 2px solid #4f46e5;
      padding-bottom: 6px;
      margin: 0 0 12px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }}

    h1 a.back-top {{
      font-size: 8pt;
      font-weight: 600;
      color: #6366f1;
      text-decoration: none;
      border: 1px solid #c7d2fe;
      padding: 2px 8px;
      border-radius: 4px;
      background: #eef2ff;
    }}

    h2 {{
      font-size: 13pt;
      font-weight: 700;
      color: #1e1b4b;
      margin: 18px 0 8px;
      border-left: 4px solid #6366f1;
      padding-left: 8px;
    }}

    h3 {{
      font-size: 10.5pt;
      font-weight: 700;
      color: #334155;
      margin: 12px 0 6px;
    }}

    /* TOC Styles */
    .toc-card {{
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 16px;
      margin: 12px 0 16px;
    }}

    .toc-list {{
      list-style: none;
      padding: 0;
      margin: 0;
    }}

    .toc-item {{
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      padding: 4px 0;
      border-bottom: 1px dotted #cbd5e1;
      font-size: 9pt;
    }}

    .toc-item:last-child {{
      border-bottom: none;
    }}

    .toc-link {{
      color: #1e293b;
      text-decoration: none;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 6px;
    }}

    .toc-dots {{
      flex: 1;
      border-bottom: 1px dotted #94a3b8;
      margin: 0 8px;
      height: 1px;
    }}

    .toc-tag {{
      font-family: ui-monospace, monospace;
      font-size: 7.5pt;
      color: #6366f1;
      background: #eef2ff;
      padding: 1px 6px;
      border-radius: 4px;
      font-weight: 700;
    }}

    /* Screenshots & Figures */
    .ui-screenshot-card {{
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      margin: 12px 0 14px;
    }}

    .ui-screenshot-card img {{
      width: 100%;
      height: auto;
      display: block;
      border-bottom: 1px solid #e2e8f0;
    }}

    .ui-screenshot-caption {{
      background: #f8fafc;
      padding: 6px 12px;
      font-size: 8pt;
      color: #64748b;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 500;
    }}

    /* Element Reference Tables */
    .element-ref-table {{
      width: 100%;
      border-collapse: collapse;
      font-size: 8.5pt;
      margin: 8px 0 14px;
    }}

    .element-ref-table th {{
      background: #1e293b;
      color: #ffffff;
      padding: 6px 10px;
      text-align: left;
      font-size: 8pt;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }}

    .element-ref-table td {{
      padding: 6px 10px;
      border: 1px solid #e2e8f0;
      vertical-align: top;
      line-height: 1.45;
    }}

    .element-ref-table tr:nth-child(even) td {{
      background: #f8fafc;
    }}

    .element-num {{
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background: #4f46e5;
      color: #ffffff;
      font-weight: 800;
      border-radius: 999px;
      font-size: 7.5pt;
      margin-right: 4px;
    }}

    /* Cards & Highlights */
    .highlight-card {{
      background: #eef2ff;
      border: 1px solid #c7d2fe;
      border-left: 4px solid #4f46e5;
      border-radius: 6px;
      padding: 8px 12px;
      margin: 10px 0;
      font-size: 9pt;
    }}

    .tip-card {{
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      border-left: 4px solid #10b981;
      border-radius: 6px;
      padding: 8px 12px;
      margin: 10px 0;
      font-size: 9pt;
    }}

    code {{
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 8pt;
      background: #f1f5f9;
      color: #0f172a;
      padding: 1px 4px;
      border-radius: 3px;
      border: 1px solid #e2e8f0;
    }}

    pre {{
      background: #0f172a;
      color: #e2e8f0;
      padding: 10px 12px;
      border-radius: 6px;
      font-family: ui-monospace, monospace;
      font-size: 8pt;
      line-height: 1.4;
      overflow-x: hidden;
      white-space: pre-wrap;
      margin: 8px 0;
    }}

    /* FAQ accordion preview */
    .faq-item {{
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 8px 12px;
      margin-bottom: 8px;
    }}

    .faq-q {{
      font-weight: 700;
      color: #1e1b4b;
      font-size: 9pt;
      margin-bottom: 4px;
      display: flex;
      align-items: baseline;
      gap: 6px;
    }}

    .faq-q span.badge-q {{
      background: #4f46e5;
      color: #ffffff;
      font-size: 7.5pt;
      padding: 1px 6px;
      border-radius: 4px;
      font-weight: 800;
    }}

    .faq-a {{
      color: #334155;
      font-size: 8.5pt;
      line-height: 1.45;
    }}

    /* Glossary Term Cards */
    .glossary-card {{
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 8px 12px;
      margin-bottom: 6px;
    }}

    .glossary-term {{
      font-weight: 800;
      color: #0f172a;
      font-size: 9pt;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 3px;
    }}

    .glossary-jump {{
      font-size: 7.5pt;
      font-weight: 700;
      color: #6366f1;
      text-decoration: none;
      background: #eef2ff;
      border: 1px solid #c7d2fe;
      padding: 1px 6px;
      border-radius: 4px;
    }}
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

      <!-- Favicon logo rendered between intro pill and PromptVault Pro lettering -->
      <div class="cover-logo-wrapper">
        <img src="{favicon_b64}" class="cover-logo" alt="PromptVault Pro Favicon Logo">
      </div>

      <!-- Lettering matches exact logo width -->
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
        <strong>Format:</strong> Fully Interactive Print-Ready PDF<br>
        <strong>Includes:</strong> Process Infographic, UI Element Maps, FAQs & Clickable Index
      </div>
    </div>
  </div>

  <!-- ====================================================================
       TABLE OF CONTENTS
       ==================================================================== -->
  <div class="page-break" id="table-of-contents"></div>
  <h1>📑 Interactive Table of Contents</h1>
  <p style="color: #64748b; font-size: 8.5pt; margin-top: 0;">Click any chapter or section title below to jump directly to its content. Every section includes a "Back to Top" link.</p>

  <div class="toc-card">
    <ul class="toc-list">
      <li class="toc-item">
        <a href="#infographic-flow" class="toc-link"><span>📊 Architecture & End-to-End Workflow Infographic</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#infographic-flow</span>
      </li>
      <li class="toc-item" style="margin-top: 4px;">
        <a href="#ch1-overview" class="toc-link"><span>1. System Architecture & Main Workspace Tour</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch1-overview</span>
      </li>
      <li class="toc-item" style="padding-left: 16px;">
        <a href="#ch1-pillars" class="toc-link"><span>• The 7 Core Architectural Domain Pillars</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch1-pillars</span>
      </li>
      <li class="toc-item" style="padding-left: 16px;">
        <a href="#ch1-card-anatomy" class="toc-link"><span>• Prompt Card Anatomy & Live Telemetry</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch1-card-anatomy</span>
      </li>
      <li class="toc-item" style="margin-top: 4px;">
        <a href="#ch2-taxonomy" class="toc-link"><span>2. The 3-Tier Taxonomy & Deduplication Shield</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch2-taxonomy</span>
      </li>
      <li class="toc-item" style="padding-left: 16px;">
        <a href="#ch2-mode-switcher" class="toc-link"><span>• Mode Switcher: Edit Category vs. New Category</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch2-mode-switcher</span>
      </li>
      <li class="toc-item" style="padding-left: 16px;">
        <a href="#ch2-pool" class="toc-link"><span>• 100+ Master Subcategory Pool & Active Highlights</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch2-pool</span>
      </li>
      <li class="toc-item" style="padding-left: 16px;">
        <a href="#ch2-cascade" class="toc-link"><span>• Inline Category Renaming & Database Cascade</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch2-cascade</span>
      </li>
      <li class="toc-item" style="margin-top: 4px;">
        <a href="#ch3-authoring" class="toc-link"><span>3. Prompt Authoring, 5-Section Blueprints & Tag Autocomplete</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch3-authoring</span>
      </li>
      <li class="toc-item" style="padding-left: 16px;">
        <a href="#ch3-blueprint" class="toc-link"><span>• 5-Section Enterprise Prompt Anatomy</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch3-blueprint</span>
      </li>
      <li class="toc-item" style="padding-left: 16px;">
        <a href="#ch3-tags" class="toc-link"><span>• Character-by-Character Tag Autocomplete</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch3-tags</span>
      </li>
      <li class="toc-item" style="padding-left: 16px;">
        <a href="#ch3-delete" class="toc-link"><span>• Safe Deletion & Attribution</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch3-delete</span>
      </li>
      <li class="toc-item" style="margin-top: 4px;">
        <a href="#ch4-variables" class="toc-link"><span>4. Dynamic Variables & Live Multi-LLM Runner</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch4-variables</span>
      </li>
      <li class="toc-item" style="padding-left: 16px;">
        <a href="#ch4-syntax" class="toc-link"><span>• Syntax Rules: Free-Text vs Choice Pills</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch4-syntax</span>
      </li>
      <li class="toc-item" style="padding-left: 16px;">
        <a href="#ch4-runner" class="toc-link"><span>• Upfront Variable Pre-fill & Token Telemetry</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch4-runner</span>
      </li>
      <li class="toc-item" style="padding-left: 16px;">
        <a href="#ch4-llm" class="toc-link"><span>• 1-Click Multi-LLM Launchers & Code Exports</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch4-llm</span>
      </li>
      <li class="toc-item" style="margin-top: 4px;">
        <a href="#ch5-data" class="toc-link"><span>5. ⇅ Data Hub: Ingest, Backups & Turnkey Enrichment</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch5-data</span>
      </li>
      <li class="toc-item" style="padding-left: 16px;">
        <a href="#ch5-presets" class="toc-link"><span>• Blank Canvas vs Starter Pack Presets</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch5-presets</span>
      </li>
      <li class="toc-item" style="padding-left: 16px;">
        <a href="#ch5-ingest" class="toc-link"><span>• Smart Ingest & Auto-Bracket Conversion</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch5-ingest</span>
      </li>
      <li class="toc-item" style="padding-left: 16px;">
        <a href="#ch5-turnkey" class="toc-link"><span>• Turnkey LLM Parameterization Prompt</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch5-turnkey</span>
      </li>
      <li class="toc-item" style="margin-top: 4px;">
        <a href="#ch6-faq" class="toc-link"><span>6. Frequently Asked Questions (FAQ)</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch6-faq</span>
      </li>
      <li class="toc-item" style="margin-top: 4px;">
        <a href="#ch7-glossary" class="toc-link"><span>7. Interactive A-Z Prompting Glossary & Subject Index</span></a>
        <span class="toc-dots"></span>
        <span class="toc-tag">#ch7-glossary</span>
      </li>
    </ul>
  </div>

  <!-- ====================================================================
       INFOGRAPHIC PROCESS FLOW DIAGRAM
       ==================================================================== -->
  <div class="page-break" id="infographic-flow"></div>
  <h1>
    <span>📊 Architecture & End-to-End Workflow Infographic</span>
    <a href="#table-of-contents" class="back-top">↑ Top</a>
  </h1>
  <p style="color: #64748b; font-size: 8.5pt; margin-top: 0;">A comprehensive architectural diagram mapping user progression from taxonomy discovery through upfront parameterization, compilation, and 1-click cloud LLM execution.</p>

  <div class="avoid-break" style="margin: 12px 0 16px;">
    <!-- High-Resolution Vector SVG Infographic Diagram -->
    <svg viewBox="0 0 1000 370" width="100%" height="auto" style="border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.12); display: block;" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#1e1b4b" />
        </linearGradient>
        <linearGradient id="step1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" />
          <stop offset="100%" stop-color="#0284c7" />
        </linearGradient>
        <linearGradient id="step2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#818cf8" />
          <stop offset="100%" stop-color="#4f46e5" />
        </linearGradient>
        <linearGradient id="step3Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#34d399" />
          <stop offset="100%" stop-color="#059669" />
        </linearGradient>
        <linearGradient id="step4Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fbbf24" />
          <stop offset="100%" stop-color="#d97706" />
        </linearGradient>
        <linearGradient id="step5Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f472b6" />
          <stop offset="100%" stop-color="#db2777" />
        </linearGradient>
      </defs>

      <!-- Background Canvas -->
      <rect width="1000" height="370" rx="10" fill="url(#bgGrad)" />

      <!-- Top Title Bar -->
      <text x="30" y="32" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="800" fill="#ffffff" letter-spacing="0.5">PROMPTVAULT PRO • 5-STAGE PRODUCTION LIFECYCLE</text>
      <text x="970" y="32" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="10" font-weight="600" fill="#94a3b8" text-anchor="end">CLIENT-SIDE OFFLINE ENGINE ──▶ CLOUD LLM DISPATCH</text>
      <line x1="30" y1="44" x2="970" y2="44" stroke="rgba(255,255,255,0.15)" stroke-width="1" />

      <!-- STAGE 1: DISCOVER -->
      <g transform="translate(30, 58)">
        <rect width="170" height="250" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(56,189,248,0.4)" stroke-width="1" />
        <rect width="170" height="32" rx="8" fill="url(#step1Grad)" />
        <text x="85" y="21" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">1. DISCOVER & FILTER</text>
        
        <text x="14" y="58" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="9" font-weight="700" fill="#38bdf8">SUB-PROCESSES:</text>
        <text x="14" y="78" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">• 7 Domain Pillars</text>
        <text x="14" y="96" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">• 45+ Categories (3-row flex)</text>
        <text x="14" y="114" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">• Instant ⌘K Fuzzy Search</text>
        <text x="14" y="132" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">• Tag Multi-Filtering</text>
        <text x="14" y="150" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">• Starred Favorites</text>
        
        <rect x="14" y="180" width="142" height="54" rx="6" fill="rgba(56,189,248,0.12)" stroke="rgba(56,189,248,0.25)" stroke-width="1" />
        <text x="85" y="200" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8" font-weight="700" fill="#38bdf8" text-anchor="middle">STORAGE ENGINE</text>
        <text x="85" y="218" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="7.5" fill="#94a3b8" text-anchor="middle">IndexedDB / SQLite Sync</text>
      </g>

      <!-- Connecting Arrow 1 -> 2 -->
      <path d="M 205 180 L 225 180 M 220 175 L 225 180 L 220 185" stroke="#38bdf8" stroke-width="2" fill="none" stroke-linecap="round" />

      <!-- STAGE 2: BLUEPRINT ARCHITECTURE -->
      <g transform="translate(230, 58)">
        <rect width="170" height="250" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(129,140,248,0.4)" stroke-width="1" />
        <rect width="170" height="32" rx="8" fill="url(#step2Grad)" />
        <text x="85" y="21" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">2. BLUEPRINT ENGINE</text>
        
        <text x="14" y="58" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="9" font-weight="700" fill="#818cf8">5-SECTION SCHEMA:</text>
        <text x="14" y="78" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">1. Role & Persona Priming</text>
        <text x="14" y="96" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">2. Primary Objective</text>
        <text x="14" y="114" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">3. Dynamic Context Inputs</text>
        <text x="14" y="132" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">4. Negative Guardrails</text>
        <text x="14" y="150" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">5. Output Schema & Rubric</text>
        
        <rect x="14" y="180" width="142" height="54" rx="6" fill="rgba(129,140,248,0.12)" stroke="rgba(129,140,248,0.25)" stroke-width="1" />
        <text x="85" y="200" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8" font-weight="700" fill="#818cf8" text-anchor="middle">TAG AUTOCOMPLETE</text>
        <text x="85" y="218" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="7.5" fill="#94a3b8" text-anchor="middle">Character-by-Character</text>
      </g>

      <!-- Connecting Arrow 2 -> 3 -->
      <path d="M 405 180 L 425 180 M 420 175 L 425 180 L 420 185" stroke="#818cf8" stroke-width="2" fill="none" stroke-linecap="round" />

      <!-- STAGE 3: UPFRONT PRE-FILL -->
      <g transform="translate(430, 58)">
        <rect width="170" height="250" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(52,211,153,0.4)" stroke-width="1" />
        <rect width="170" height="32" rx="8" fill="url(#step3Grad)" />
        <text x="85" y="21" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">3. VARIABLE RUNNER</text>
        
        <text x="14" y="58" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="9" font-weight="700" fill="#34d399">UPFRONT FORM:</text>
        <text x="14" y="78" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">• Single & Multi-line Text</text>
        <text x="14" y="96" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">• Choice Toggle Pills</text>
        <text x="14" y="114" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">• Custom Write-In Option</text>
        <text x="14" y="132" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">• Bird's-Eye Project Scope</text>
        <text x="14" y="150" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">• Zero Interruptions</text>
        
        <rect x="14" y="180" width="142" height="54" rx="6" fill="rgba(52,211,153,0.12)" stroke="rgba(52,211,153,0.25)" stroke-width="1" />
        <text x="85" y="200" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8" font-weight="700" fill="#34d399" text-anchor="middle">TELEMETRY</text>
        <text x="85" y="218" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="7.5" fill="#94a3b8" text-anchor="middle">Math.ceil(chars / 4) Tokens</text>
      </g>

      <!-- Connecting Arrow 3 -> 4 -->
      <path d="M 605 180 L 625 180 M 620 175 L 625 180 L 620 185" stroke="#34d399" stroke-width="2" fill="none" stroke-linecap="round" />

      <!-- STAGE 4: COMPILE & TELEMETRY -->
      <g transform="translate(630, 58)">
        <rect width="170" height="250" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(251,191,36,0.4)" stroke-width="1" />
        <rect width="170" height="32" rx="8" fill="url(#step4Grad)" />
        <text x="85" y="21" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">4. DYNAMIC COMPILE</text>
        
        <text x="14" y="58" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="9" font-weight="700" fill="#fbbf24">EXPORT CHOICES:</text>
        <text x="14" y="78" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">📋 Compile Prompt (Filled)</text>
        <text x="14" y="96" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">📑 Template Only (Raw vars)</text>
        <text x="14" y="114" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">🐍 Python OpenAI / Claude</text>
        <text x="14" y="132" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">🌐 JS Fetch & cURL</text>
        <text x="14" y="150" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">📦 JSON Blueprint</text>
        
        <rect x="14" y="180" width="142" height="54" rx="6" fill="rgba(251,191,36,0.12)" stroke="rgba(251,191,36,0.25)" stroke-width="1" />
        <text x="85" y="200" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8" font-weight="700" fill="#fbbf24" text-anchor="middle">CLIPBOARD SYNC</text>
        <text x="85" y="218" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="7.5" fill="#94a3b8" text-anchor="middle">⌘+Enter Quick Copy</text>
      </g>

      <!-- Connecting Arrow 4 -> 5 -->
      <path d="M 805 180 L 825 180 M 820 175 L 825 180 L 820 185" stroke="#fbbf24" stroke-width="2" fill="none" stroke-linecap="round" />

      <!-- STAGE 5: 1-CLICK MULTI-LLM -->
      <g transform="translate(830, 58)">
        <rect width="140" height="250" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(244,114,182,0.4)" stroke-width="1" />
        <rect width="140" height="32" rx="8" fill="url(#step5Grad)" />
        <text x="70" y="21" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">5. LAUNCH LLM</text>
        
        <text x="10" y="58" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="9" font-weight="700" fill="#f472b6">TARGET MODELS:</text>
        <text x="10" y="78" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">🤖 ChatGPT (OpenAI)</text>
        <text x="10" y="96" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">🧠 Claude (Anthropic)</text>
        <text x="10" y="114" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">💎 Google Gemini</text>
        <text x="10" y="132" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">🔍 Perplexity AI</text>
        <text x="10" y="150" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8.5" fill="#e2e8f0">💻 Cursor / LibreChat</text>
        
        <rect x="10" y="180" width="120" height="54" rx="6" fill="rgba(244,114,182,0.12)" stroke="rgba(244,114,182,0.25)" stroke-width="1" />
        <text x="70" y="200" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="8" font-weight="700" fill="#f472b6" text-anchor="middle">DIRECT DISPATCH</text>
        <text x="70" y="218" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="7.5" fill="#94a3b8" text-anchor="middle">1-Click Auto-Handoff</text>
      </g>

      <!-- Bottom Status Bar -->
      <text x="500" y="345" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="9.5" font-weight="700" fill="#38bdf8" text-anchor="middle">ZERO-LATENCY CLIENT-SIDE EXECUTION • LOCAL INDEXEDDB PRIVACY • INSTANT CLOUD MODEL HANDOFF</text>
    </svg>
  </div>

  <!-- ====================================================================
       CHAPTER 1: SYSTEM OVERVIEW & MAIN WORKSPACE TOUR
       ==================================================================== -->
  <div class="page-break" id="ch1-overview"></div>
  <h1>
    <span>1. System Architecture & Main Workspace Tour</span>
    <a href="#table-of-contents" class="back-top">↑ Top</a>
  </h1>

  <p>PromptVault Pro provides a unified, local-first workspace for finding, customizing, parameterizing, and executing enterprise-grade AI blueprints. All private prompt data stays entirely on your local machine.</p>

  <!-- Main Dashboard UI Screenshot -->
  <div class="ui-screenshot-card avoid-break">
    <img src="{ui_main_b64}" alt="PromptVault Pro Main Workspace Dashboard">
    <div class="ui-screenshot-caption">
      <span><strong>Figure 1.1:</strong> PromptVault Pro Main Workspace, 7 Architectural Pillars & Production Prompt Card Grid</span>
      <span style="color: #4f46e5; font-weight: 700;">Live Workspace View</span>
    </div>
  </div>

  <h2>Main Workspace UI Element Reference</h2>
  <table class="element-ref-table avoid-break">
    <thead>
      <tr>
        <th style="width: 18%;">UI Element</th>
        <th style="width: 25%;">Component Location</th>
        <th>Functional Description & Best Practice</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1. 7 Domain Pillars</strong></td>
        <td>Top pill tabs below hero header</td>
        <td>Filters your library across 7 engineering domains: Automation, Coding, Business, Marketing, Multimedia, Design, and Education. Enforces clean cognitive alignment.</td>
      </tr>
      <tr>
        <td><strong>2. Global Action Bar</strong></td>
        <td>Top-right navigation bar</td>
        <td>Features quick access buttons: <code>Manage Categories</code> (Taxonomy), <code>Starred</code> (Favorites), <code>⇅ Data</code> (Hub for import/export), <code>Prompting Wiki</code>, <code>Help & Tour</code>, and <code>+ New Prompt</code>.</td>
      </tr>
      <tr>
        <td><strong>3. Instant Fuzzy Search</strong></td>
        <td>Centered hero search input (<code>⌘K</code>)</td>
        <td>Real-time substring search across titles, descriptions, modular sections, parameter tags, authors, and hashtags with zero latency.</td>
      </tr>
      <tr>
        <td><strong>4. 3-Row Category Limit</strong></td>
        <td>Category flex pill bar</td>
        <td>Limits category tags to 3 horizontal rows maximum. Additional categories are neatly bundled into a reactive <code>+ More Categories (N)</code> pill button to prevent navigation sprawl.</td>
      </tr>
      <tr>
        <td><strong>5. Prompt Cards & Badges</strong></td>
        <td>Main responsive card grid</td>
        <td>Every prompt card displays its Domain Pillar badge, Category tag, Blueprint indicator, Difficulty, dynamic variable highlights, author credit, and 1-click <code>⚡ Use Prompt</code> runner trigger.</td>
      </tr>
    </tbody>
  </table>

  <h2 id="ch1-pillars">The 7 Core Architectural Domain Pillars</h2>
  <div class="highlight-card avoid-break">
    PromptVault Pro categorizes knowledge across 7 immutable domain disciplines:
    <br>• <strong>⚙️ Automation & Systems:</strong> Robotic process automation, spreadsheet formulas, webhooks, API pipelines.
    <br>• <strong>💻 Coding & Architecture:</strong> Full-stack development, refactoring, algorithms, testing, system architecture.
    <br>• <strong>💼 Business & Strategy:</strong> Pitch decks, executive memos, competitive analysis, PRDs, strategic roadmaps.
    <br>• <strong>📈 Marketing & SEO:</strong> High-conversion copywriting, technical SEO audits, social campaigns, email sequences.
    <br>• <strong>🎨 Image & Multimedia:</strong> Midjourney, DALL-E, Stable Diffusion parameter specs, cinematography direction.
    <br>• <strong>✨ UI/UX & Web Dev:</strong> Responsive component specs, design systems, accessibility (a11y), Tailwind/CSS architecture.
    <br>• <strong>🎓 Education & Skill Building:</strong> Socratic tutoring, concept deconstruction, complex topic explanations.
  </div>

  <!-- ====================================================================
       CHAPTER 2: 3-TIER TAXONOMY & DEDUPLICATION SHIELD
       ==================================================================== -->
  <div class="page-break" id="ch2-taxonomy"></div>
  <h1>
    <span>2. The 3-Tier Taxonomy & Deduplication Shield</span>
    <a href="#table-of-contents" class="back-top">↑ Top</a>
  </h1>

  <p>To prevent prompt libraries from devolving into chaotic, duplicate-ridden tag clouds, PromptVault Pro implements a rigid 3-Tier Taxonomy Tree backed by an interactive Deduplication Manager.</p>

  <!-- Taxonomy Modal UI Screenshot -->
  <div class="ui-screenshot-card avoid-break">
    <img src="{ui_taxonomy_b64}" alt="PromptVault Pro Taxonomy & Deduplication Manager Modal">
    <div class="ui-screenshot-caption">
      <span><strong>Figure 2.1:</strong> Taxonomy & Deduplication Manager Modal with Mode Switcher and Master Subcategory Pool</span>
      <span style="color: #4f46e5; font-weight: 700;">Taxonomy Manager View</span>
    </div>
  </div>

  <h2>Taxonomy Manager UI Element Reference</h2>
  <table class="element-ref-table avoid-break">
    <thead>
      <tr>
        <th style="width: 20%;">UI Element</th>
        <th style="width: 25%;">Control Type</th>
        <th>Functional Description & Best Practice</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1. Domain Switcher</strong></td>
        <td>Pill tab bar across modal top</td>
        <td>Switches the active Domain Pillar (e.g. Business, Automation, Coding) to manage its categories and nested subcategories.</td>
      </tr>
      <tr>
        <td><strong>2. Mode Switcher</strong></td>
        <td><code>[ ✏️ Edit Category ]</code> vs <code>[ ➕ New Category ]</code></td>
        <td>Toggle between modifying an existing category's subcategories and creating a new category from scratch. Prevents competing dropdown conflicts.</td>
      </tr>
      <tr>
        <td><strong>3. Category Dropdown</strong></td>
        <td>Dropdown with telemetry counts</td>
        <td>Displays categories along with real-time stats: e.g. <code>Executive Presentations (3 prompts, 9 subcats)</code>. Selecting a category instantly pulls its subcategories into view.</td>
      </tr>
      <tr>
        <td><strong>4. Inline Rename Button</strong></td>
        <td><code>✏️ Rename Category</code> action button</td>
        <td>Allows renaming any category in place. Automatically executes a cascading database update across all assigned prompts so no cards are orphaned.</td>
      </tr>
      <tr>
        <td><strong>5. Master Subcategory Pool</strong></td>
        <td>100+ Interactive Chip Matrix</td>
        <td>Lists all available subcategories. Active/linked subcategories are highlighted with <strong>vibrant solid accent backgrounds (<code>✓ Roadmaps</code>)</strong>; unlinked appear neutral (<code>+ Name</code>). 1-click toggles link state.</td>
      </tr>
      <tr>
        <td><strong>6. Active Hierarchy Accordion</strong></td>
        <td>Collapsible domain accordion</td>
        <td>Shows the full category-to-subcategory tree for the active pillar. Each card includes a direct <strong>✏️ Edit</strong> button and a safe delete button (prompts reassign to <em>General</em>).</td>
      </tr>
    </tbody>
  </table>

  <!-- ====================================================================
       CHAPTER 3: PROMPT AUTHORING, BLUEPRINTS & TAGS
       ==================================================================== -->
  <div class="page-break" id="ch3-authoring"></div>
  <h1>
    <span>3. Prompt Authoring, 5-Section Blueprints & Tag Autocomplete</span>
    <a href="#table-of-contents" class="back-top">↑ Top</a>
  </h1>

  <p>PromptVault Pro supports both rapid single-text prompts and enterprise 5-section blueprints designed for high-reliability outputs.</p>

  <!-- Prompt Form UI Screenshot -->
  <div class="ui-screenshot-card avoid-break">
    <img src="{ui_form_b64}" alt="PromptVault Pro Add / Edit Prompt Form Modal">
    <div class="ui-screenshot-caption">
      <span><strong>Figure 3.1:</strong> Create / Edit Prompt Modal with Blueprint Sections, Tag Autocomplete & Originator Credits</span>
      <span style="color: #4f46e5; font-weight: 700;">Prompt Form View</span>
    </div>
  </div>

  <h2>Prompt Authoring UI Element Reference</h2>
  <table class="element-ref-table avoid-break">
    <thead>
      <tr>
        <th style="width: 22%;">UI Element</th>
        <th style="width: 23%;">Form Section</th>
        <th>Functional Description & Best Practice</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1. Title & Difficulty</strong></td>
        <td>Header section</td>
        <td>Assign a descriptive action title and cognitive level (Beginner, Intermediate, Advanced, Expert) to guide users.</td>
      </tr>
      <tr>
        <td><strong>2. Multi-Category Selector</strong></td>
        <td>Category Checkbox Grid</td>
        <td>Prompts can belong to multiple categories simultaneously. Selecting a category surfaces its contextual subcategory tags for 1-click addition.</td>
      </tr>
      <tr>
        <td><strong>3. 5-Section Blueprint</strong></td>
        <td>Structured Blueprint Editor</td>
        <td>Separates Persona, Primary Objective, Dynamic Context Inputs (with <code>{{variables}}</code>), Negative Guardrails, and Output Rubric.</td>
      </tr>
      <tr>
        <td><strong>4. Tag Autocomplete</strong></td>
        <td>Tag input field</td>
        <td>WordPress-style live autocomplete dropdown. As you type (e.g. <code>s</code> then <code>o</code>), shows matching tags with usage counts: <code>🏷️ seo (12)</code>. Keyboard navigable with arrow keys.</td>
      </tr>
      <tr>
        <td><strong>5. Originator Attribution</strong></td>
        <td>Author & Author URL fields</td>
        <td>Gives visible credit on prompt cards to creators (e.g. 👤 Randy Austin - ExcelForFreelancers, 👤 Anthropic, 👤 HubSpot).</td>
      </tr>
      <tr>
        <td><strong>6. Safe Delete Button</strong></td>
        <td>Bottom-left red action button</td>
        <td>Deletes the prompt with a confirmation safety modal to prevent accidental data loss.</td>
      </tr>
    </tbody>
  </table>

  <!-- ====================================================================
       CHAPTER 4: DYNAMIC VARIABLES & LIVE RUNNER
       ==================================================================== -->
  <div class="page-break" id="ch4-variables"></div>
  <h1>
    <span>4. Dynamic Variables & Live Multi-LLM Runner</span>
    <a href="#table-of-contents" class="back-top">↑ Top</a>
  </h1>

  <p>Static prompts require manual find-and-replace editing. PromptVault Pro turns prompts into interactive software tools through dynamic variable parsing and upfront parameter pre-filling.</p>

  <!-- Prompt Runner UI Screenshot -->
  <div class="ui-screenshot-card avoid-break">
    <img src="{ui_runner_b64}" alt="PromptVault Pro Live Variable Runner Modal">
    <div class="ui-screenshot-caption">
      <span><strong>Figure 4.1:</strong> Live Variable Runner with Upfront Parameter Pre-fill, Choice Pills & Token Telemetry</span>
      <span style="color: #4f46e5; font-weight: 700;">Live Runner View</span>
    </div>
  </div>

  <h2>Live Runner UI Element Reference</h2>
  <table class="element-ref-table avoid-break">
    <thead>
      <tr>
        <th style="width: 22%;">UI Element</th>
        <th style="width: 23%;">Runner Component</th>
        <th>Functional Description & Best Practice</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1. Upfront Pre-fill Panel</strong></td>
        <td>Top of runner modal</td>
        <td>Consolidates all prompt variables into a single upfront form. Gives users a bird's-eye view of project scope and requirements before copying.</td>
      </tr>
      <tr>
        <td><strong>2. Choice Toggle Pills</strong></td>
        <td>Multiple-choice inputs</td>
        <td>Renders choices defined in <code>{{name: Opt 1 | Opt 2}}</code> as 1-click selectable pills, with a custom write-in fallback for bespoke options.</td>
      </tr>
      <tr>
        <td><strong>3. Live Token Telemetry</strong></td>
        <td>Telemetry counter bar</td>
        <td>Calculates characters, words, and estimated LLM tokens (<code>Math.ceil(characters / 4)</code>) in real time as variables are adjusted.</td>
      </tr>
      <tr>
        <td><strong>4. Compile vs Template</strong></td>
        <td>Clipboard action buttons</td>
        <td>Choose between copying the compiled prompt (with variables filled in) or copying the raw template (with placeholders intact for prompt engineers).</td>
      </tr>
      <tr>
        <td><strong>5. 1-Click LLM Launcher</strong></td>
        <td><code>Run in LLM / Export ▾</code> button</td>
        <td>Opens the Multi-LLM modal to push the compiled prompt directly to your preferred AI model in a new tab.</td>
      </tr>
    </tbody>
  </table>

  <!-- Multi-LLM Popover UI Screenshot -->
  <div class="ui-screenshot-card avoid-break">
    <img src="{ui_llm_b64}" alt="PromptVault Pro Multi-LLM Launcher Modal">
    <div class="ui-screenshot-caption">
      <span><strong>Figure 4.2:</strong> 1-Click Multi-LLM Launcher Popover (ChatGPT, Claude, Gemini, Perplexity, Cursor, LibreChat)</span>
      <span style="color: #4f46e5; font-weight: 700;">LLM Launcher Popover</span>
    </div>
  </div>

  <!-- ====================================================================
       CHAPTER 5: DATA HUB, SMART INGEST & BACKUPS
       ==================================================================== -->
  <div class="page-break" id="ch5-data"></div>
  <h1>
    <span>5. ⇅ Data Hub: Ingest, Backups & Turnkey Enrichment</span>
    <a href="#table-of-contents" class="back-top">↑ Top</a>
  </h1>

  <p>The <strong>⇅ Data</strong> Hub provides comprehensive data sovereignty, rapid text ingestion, and multi-format backup tools.</p>

  <!-- Data Management UI Screenshot -->
  <div class="ui-screenshot-card avoid-break">
    <img src="{ui_data_b64}" alt="PromptVault Pro Data Management Modal">
    <div class="ui-screenshot-caption">
      <span><strong>Figure 5.1:</strong> Data Management Hub with Canvas Presets, Smart Ingest, and Multi-Format Exports</span>
      <span style="color: #4f46e5; font-weight: 700;">Data Hub View</span>
    </div>
  </div>

  <h2>Data Hub UI Element Reference</h2>
  <table class="element-ref-table avoid-break">
    <thead>
      <tr>
        <th style="width: 22%;">UI Element</th>
        <th style="width: 23%;">Action Type</th>
        <th>Functional Description & Best Practice</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1. Blank Canvas Preset</strong></td>
        <td><code>🗑️ Start from Scratch</code></td>
        <td>Clears all prompts to let you build your own library, while preserving all 44 categories and 7 domain pillars.</td>
      </tr>
      <tr>
        <td><strong>2. Starter Pack Preset</strong></td>
        <td><code>⚡ Load Starter Pack</code></td>
        <td>Restores the 7 flagship production blueprints across all domain disciplines.</td>
      </tr>
      <tr>
        <td><strong>3. Smart Ingestion</strong></td>
        <td>Raw text-to-prompt engine</td>
        <td>Paste raw prompts with brackets (<code>[Topic]</code>, <code>&lt;Audience&gt;</code>, <code>{{Tone}}</code>). Automatically converts them into PromptVault variables, infers titles, and adds them to your library.</td>
      </tr>
      <tr>
        <td><strong>4. Multi-Format Backups</strong></td>
        <td>Export & Import actions</td>
        <td>Download portable JSON backups, download the local SQLite <code>promptlibrary.db</code> file, or export documentation in Markdown.</td>
      </tr>
      <tr>
        <td><strong>5. Turnkey LLM Prompt</strong></td>
        <td>Copyable master prompt</td>
        <td>A pre-engineered prompt to batch-parameterize exported 0-variable prompts using ChatGPT, Claude, or Gemini.</td>
      </tr>
    </tbody>
  </table>

  <!-- ====================================================================
       CHAPTER 6: FAQS
       ==================================================================== -->
  <div class="page-break" id="ch6-faq"></div>
  <h1>
    <span>6. Frequently Asked Questions (FAQ)</span>
    <a href="#table-of-contents" class="back-top">↑ Top</a>
  </h1>

  <div class="faq-item avoid-break">
    <div class="faq-q"><span class="badge-q">Q1</span> Where are my prompts stored? Is my prompt data private and secure?</div>
    <div class="faq-a">Your prompts are stored 100% locally on your machine inside your browser's persistent IndexedDB database. Nothing is transmitted to external servers or cloud analytics. If you run the included optional Python backend (<code>server/server.py</code>), prompts are saved to an offline SQLite file (<code>promptlibrary.db</code>).</div>
  </div>

  <div class="faq-item avoid-break">
    <div class="faq-q"><span class="badge-q">Q2</span> How does the Upfront Variable Pre-fill workflow work?</div>
    <div class="faq-a">Clicking <strong>"⚡ Use Prompt"</strong> opens the Upfront Variable Runner. All variables are presented upfront at the top of the modal. Seeing all variables at once gives you a bird's-eye view of your project flow. As you fill text fields or click choice pills, PromptVault Pro calculates live token consumption (<code>Math.ceil(chars / 4)</code>). You can copy the compiled prompt or raw template and launch any LLM with 1 click.</div>
  </div>

  <div class="faq-item avoid-break">
    <div class="faq-q"><span class="badge-q">Q3</span> How do the Edit Category vs. New Category modes work in the Taxonomy Manager?</div>
    <div class="faq-a">In the <strong>Taxonomy & Deduplication Manager</strong>, the top box features an explicit 2-mode switcher. <strong>✏️ Edit Category Mode</strong> gives you a clean dropdown showing prompt and subcategory counts (e.g. <code>Executive Presentations (3 prompts, 9 subcats)</code>); selecting one pulls all its linked subcategories into view. <strong>➕ New Category Mode</strong> gives you an empty, auto-focused text field to name a new category under any Domain Pillar without dropdown clutter.</div>
  </div>

  <div class="faq-item avoid-break">
    <div class="faq-q"><span class="badge-q">Q4</span> How does the Master Subcategory Pool prevent duplicate tags?</div>
    <div class="faq-a">The 100+ Master Subcategory Pool displays all standard tags. Subcategories that are already linked to the currently selected category are highlighted with <strong>solid vibrant accent backgrounds (<code>✓ Roadmaps</code>)</strong>. Unlinked subcategories appear neutral (<code>+ Name</code>). Clicking any unlinked chip links it instantly; clicking any highlighted chip unlinks it.</div>
  </div>

  <div class="faq-item avoid-break">
    <div class="faq-q"><span class="badge-q">Q5</span> What happens if I rename or delete a category? Will I lose my prompts?</div>
    <div class="faq-a">No prompts are ever lost! When you click <strong>"✏️ Rename Category"</strong>, PromptVault Pro automatically updates the category name across every assigned prompt in the database. If you delete a category, all associated prompts are safely moved to the <code>General</code> fallback category.</div>
  </div>

  <div class="faq-item avoid-break">
    <div class="faq-q"><span class="badge-q">Q6</span> How does Character-by-Character Tag Autocomplete work?</div>
    <div class="faq-a">When editing a prompt, typing in the Tags field triggers a WordPress-style live autocomplete dropdown. As you type each letter (e.g. <code>s</code> then <code>o</code>), existing tags refilter instantly with real-time frequency counts (<code>🏷️ seo (12)</code>). Use <kbd>↑</kbd> <kbd>↓</kbd> arrows and <kbd>Enter</kbd> to pick an existing tag, or press <kbd>Enter</kbd>/comma to create a new tag.</div>
  </div>

  <div class="faq-item avoid-break">
    <div class="faq-q"><span class="badge-q">Q7</span> How do I delete a prompt?</div>
    <div class="faq-a">Open any prompt in the editor modal and click the red <strong>"🗑️ Delete Prompt"</strong> button at the bottom left. A confirmation modal appears to prevent accidental deletions. Upon confirmation, the prompt is removed and all library indexes update immediately.</div>
  </div>

  <div class="faq-item avoid-break">
    <div class="faq-q"><span class="badge-q">Q8</span> What is the difference between a Simple Prompt and a 5-Section Blueprint?</div>
    <div class="faq-a">A <strong>Simple Prompt</strong> is a single text block with variables, ideal for routine tasks like emails and social posts. A <strong>5-Section Blueprint</strong> partitions prompts into Role Persona, Core Objective, Dynamic Context Inputs, Negative Guardrails, and Output Schema/Rubric for mission-critical enterprise workflows.</div>
  </div>

  <div class="faq-item avoid-break">
    <div class="faq-q"><span class="badge-q">Q9</span> How can I bulk-parameterize existing prompts that have no variables?</div>
    <div class="faq-a">Open <strong>⇅ Data</strong> -> <strong>Turnkey LLM Prompt</strong>. Export your 0-variable prompts, paste them into ChatGPT, Claude, or Gemini alongside the included turnkey prompt. The LLM inserts dynamic <code>{{variables}}</code> and choice dropdowns. Re-import the resulting JSON into PromptVault Pro to enrich your prompts instantly!</div>
  </div>

  <div class="faq-item avoid-break">
    <div class="faq-q"><span class="badge-q">Q10</span> Can I run PromptVault Pro completely offline?</div>
    <div class="faq-a">Yes! The web application runs 100% offline via browser caching and local IndexedDB. Alternatively, you can run the included Python server (<code>python3 server/server.py</code>) for local SQLite persistence with zero pip dependencies.</div>
  </div>

  <!-- ====================================================================
       CHAPTER 7: INTERACTIVE A-Z GLOSSARY & INDEX
       ==================================================================== -->
  <div class="page-break" id="ch7-glossary"></div>
  <h1>
    <span>7. Interactive A-Z Prompting Glossary & Subject Index</span>
    <a href="#table-of-contents" class="back-top">↑ Top</a>
  </h1>
  <p style="color: #64748b; font-size: 8.5pt; margin-top: 0;">Click any subject badge on the right to jump directly to the relevant chapter and section in this user guide.</p>

  <div class="glossary-card avoid-break">
    <div class="glossary-term">
      <span>Author Attribution (Originator Credits)</span>
      <a href="#ch3-authoring" class="glossary-jump">Jump to Chapter 3 →</a>
    </div>
    <div style="font-size: 8.5pt; color: #334155;">Standardized metadata fields (<code>author</code> and <code>authorUrl</code>) displaying verifiable creator credits on prompt cards.</div>
  </div>

  <div class="glossary-card avoid-break">
    <div class="glossary-term">
      <span>Blank Canvas Preset</span>
      <a href="#ch5-data" class="glossary-jump">Jump to Chapter 5 →</a>
    </div>
    <div style="font-size: 8.5pt; color: #334155;">Data Hub action that purges all prompt cards to give users a fresh workspace while preserving all 44 categories and 7 domain pillars.</div>
  </div>

  <div class="glossary-card avoid-break">
    <div class="glossary-term">
      <span>Cascade Rename Architecture</span>
      <a href="#ch2-taxonomy" class="glossary-jump">Jump to Chapter 2 →</a>
    </div>
    <div style="font-size: 8.5pt; color: #334155;">Automated database synchronization that cascades category title edits across all matching prompt cards to prevent orphaned data.</div>
  </div>

  <div class="glossary-card avoid-break">
    <div class="glossary-term">
      <span>Choice Variable (Dropdown / Pill Syntax)</span>
      <a href="#ch4-variables" class="glossary-jump">Jump to Chapter 4 →</a>
    </div>
    <div style="font-size: 8.5pt; color: #334155;">Parameter format <code>{{name: Option 1 | Option 2}}</code> rendering as interactive pills with write-in fallbacks.</div>
  </div>

  <div class="glossary-card avoid-break">
    <div class="glossary-term">
      <span>Deduplication Shield</span>
      <a href="#ch2-taxonomy" class="glossary-jump">Jump to Chapter 2 →</a>
    </div>
    <div style="font-size: 8.5pt; color: #334155;">Interactive taxonomy system utilizing a 100+ master pool with highlighted active chips to prevent fragmented tags.</div>
  </div>

  <div class="glossary-card avoid-break">
    <div class="glossary-term">
      <span>Domain Pillars</span>
      <a href="#ch1-overview" class="glossary-jump">Jump to Chapter 1 →</a>
    </div>
    <div style="font-size: 8.5pt; color: #334155;">The 7 immutable functional disciplines organizing all knowledge: Automation, Coding, Business, Marketing, Multimedia, Design, and Education.</div>
  </div>

  <div class="glossary-card avoid-break">
    <div class="glossary-term">
      <span>Fuzzy Search (⌘K)</span>
      <a href="#ch1-overview" class="glossary-jump">Jump to Chapter 1 →</a>
    </div>
    <div style="font-size: 8.5pt; color: #334155;">Client-side search engine filtering titles, descriptions, sections, variables, and tags with zero network latency.</div>
  </div>

  <div class="glossary-card avoid-break">
    <div class="glossary-term">
      <span>IndexedDB Architecture</span>
      <a href="#ch1-overview" class="glossary-jump">Jump to Chapter 1 →</a>
    </div>
    <div style="font-size: 8.5pt; color: #334155;">Browser-native transactional database engine storing gigabytes of data privately on the client side without 5MB storage caps.</div>
  </div>

  <div class="glossary-card avoid-break">
    <div class="glossary-term">
      <span>Modular Blueprint (5-Section Anatomy)</span>
      <a href="#ch3-authoring" class="glossary-jump">Jump to Chapter 3 →</a>
    </div>
    <div style="font-size: 8.5pt; color: #334155;">Enterprise prompt structure partitioning prompts into Persona, Objective, Dynamic Context Inputs, Negative Guardrails, and Output Rubric.</div>
  </div>

  <div class="glossary-card avoid-break">
    <div class="glossary-term">
      <span>Multi-LLM Dispatcher</span>
      <a href="#ch4-variables" class="glossary-jump">Jump to Chapter 4 →</a>
    </div>
    <div style="font-size: 8.5pt; color: #334155;">1-click launcher transferring pre-filled prompts directly to ChatGPT, Claude, Gemini, Perplexity, Cursor, or LibreChat.</div>
  </div>

  <div class="glossary-card avoid-break">
    <div class="glossary-term">
      <span>Negative Guardrails</span>
      <a href="#ch3-authoring" class="glossary-jump">Jump to Chapter 3 →</a>
    </div>
    <div style="font-size: 8.5pt; color: #334155;">Explicit anti-hallucination instructions specifying what the AI must NOT do (e.g. no conversational preamble, no speculative citations).</div>
  </div>

  <div class="glossary-card avoid-break">
    <div class="glossary-term">
      <span>Smart Ingest (Bracket Converter)</span>
      <a href="#ch5-data" class="glossary-jump">Jump to Chapter 5 →</a>
    </div>
    <div style="font-size: 8.5pt; color: #334155;">In-app parsing engine that detects raw bracketed text like <code>[topic]</code> and automatically converts it to <code>{{topic}}</code>.</div>
  </div>

  <div class="glossary-card avoid-break">
    <div class="glossary-term">
      <span>Tag Autocomplete</span>
      <a href="#ch3-authoring" class="glossary-jump">Jump to Chapter 3 →</a>
    </div>
    <div style="font-size: 8.5pt; color: #334155;">WordPress-style live tag suggestion dropdown filtering character-by-character with real-time frequency indicators.</div>
  </div>

  <div class="glossary-card avoid-break">
    <div class="glossary-term">
      <span>Token Telemetry</span>
      <a href="#ch4-variables" class="glossary-jump">Jump to Chapter 4 →</a>
    </div>
    <div style="font-size: 8.5pt; color: #334155;">Real-time estimation of prompt token consumption calculated dynamically via <code>Math.ceil(characters / 4)</code>.</div>
  </div>

  <div class="glossary-card avoid-break">
    <div class="glossary-term">
      <span>Upfront Variable Pre-fill</span>
      <a href="#ch4-variables" class="glossary-jump">Jump to Chapter 4 →</a>
    </div>
    <div style="font-size: 8.5pt; color: #334155;">Interactive runner interface allowing users to fill in all parameters before copying or dispatching to an LLM.</div>
  </div>

</body>
</html>
"""

    print(f"💾 Writing generated HTML to {HTML_OUT}...")
    with open(HTML_OUT, "w", encoding="utf-8") as f:
        f.write(html_source)

    print("🚀 Invoking Google Chrome headless to compile interactive print-ready PDF...")
    chrome_path = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    if not os.path.exists(chrome_path):
        print(f"Error: Google Chrome not found at {chrome_path}", file=sys.stderr)
        sys.exit(1)

    cmd = [
        chrome_path,
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={PDF_OUT}",
        HTML_OUT
    ]

    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if res.returncode != 0:
        print(f"Error compiling PDF: {res.stderr}", file=sys.stderr)
        sys.exit(res.returncode)

    size_mb = os.path.getsize(PDF_OUT) / (1024 * 1024)
    print(f"🎉 Success! Generated interactive PDF User Guide: {PDF_OUT} ({size_mb:.2f} MB)")

if __name__ == "__main__":
    build_pdf()
