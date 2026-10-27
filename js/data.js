// Master Starter Pack — Flagship Showcase AI Blueprints across all 7 Domain Pillars
// Standardized with full variable injection, choice pills, and originator attribution
window.DEFAULT_PROMPTS = [
  {
    "id": "seo-geo-website-audit-scorer",
    "title": "Website SEO & GEO (Generative Engine Optimization) Audit & Scorer",
    "domain": "Marketing, Content & SEO",
    "source": "PromptVault Core",
    "category": "SEO & Metadata",
    "categories": [
      "SEO & Metadata",
      "Content Writing"
    ],
    "subcategory": "On-Page SEO",
    "author": "PromptVault Core",
    "authorUrl": "https://prompts.chat/",
    "difficulty": "Intermediate",
    "model": "GPT-4o / Claude 3.5 Sonnet / Gemini 2.0",
    "featured": true,
    "tags": [
      "seo",
      "geo",
      "generative-engine-optimization",
      "website-audit",
      "perplexity",
      "chatgpt-search",
      "content-strategy"
    ],
    "description": "Conducts an exhaustive dual-layer audit of any website to calculate a Traditional SEO Score (0-100) and AI Generative Engine Optimization (GEO) Readiness Score (0-100) with prioritized remedial actions.",
    "template": "# 1. PERSONA & CORE PURPOSE\nYou are a Principal Search & Generative Engine Optimization (GEO) Architect, combining elite Technical SEO mastery with cutting-edge expertise in LLM retrieval mechanics, Perplexity citation indexing, Google Gemini AI Overviews, and ChatGPT Search visibility. Your core purpose is to conduct an authoritative, rigorous dual-layer audit of the specified website to determine its baseline performance, uncover blindspots, calculate standardized diagnostic scores (0-100), and formulate an actionable optimization roadmap.\n\n# 2. CONTEXT & SCOPE\nTraditional search engine indexing is undergoing a generational shift toward AI Answer Engines and generative search synthesis. To thrive, modern digital properties must not only comply with classic crawler heuristics (PageRank, crawl budget, Core Web Vitals, HTML semantics), but also engineer for Generative Engine Optimization (GEO)—enabling LLMs to reliably parse, quote, cite, and recommend their content as authoritative ground truth.\n\n# 3. VARIABLE DECLARATIONS & INPUT INSTRUCTIONS\nOperate on the following input parameters:\n- **Target Website / URL:** {{website_url}}\n- **Core Focus Keywords & Topics:** {{target_keywords}}\n- **Target Geographic Market & Language:** {{target_region}}\n- **Audit Depth & Priority:** {{audit_depth: Full Dual SEO & GEO Diagnostic | Fast Executive Scorecard | Technical & GEO Citation Deep-Dive}}\n- **Competitor Benchmarks:** {{competitor_urls}}\n- **Deliverable Format:** {{output_format: Executive Markdown Report with Scorecards | Technical Engineering & Content Roadmap | Client-Ready Audit Memo}}\n\n*(Note: If you have live web retrieval/browsing capability, actively examine the current public pages, header tags, schema markup, and content structure of {{website_url}}. If live web browsing is unavailable or restricted in your runtime, perform the full heuristic audit based on your knowledge base of the domain, standard structural patterns for its vertical, and provide exact diagnostic instructions and inspection checklists for each test).*\n\n# 4. STEP-BY-STEP EXECUTION FRAMEWORK\nExecute the audit across six distinct methodological phases:\n\n### Phase 1: Technical SEO & Crawlability Baseline\n- Evaluate robots.txt, sitemap index integrity, canonicalization, and indexability hygiene.\n- Audit mobile responsiveness, viewport configurations, and Core Web Vitals indicators (LCP, INP, CLS).\n- Analyze URL hierarchy, internal link depth (click distance from root), and anchor text diversity.\n\n### Phase 2: On-Page Architecture & Semantic HTML\n- Inspect title tags (50-60 chars) and meta descriptions (150-160 chars) for CTR appeal and keyword alignment.\n- Verify single `<h1>` tag discipline and logical heading hierarchy (`<h1>` -> `<h2>` -> `<h3>`) without skipped levels.\n- Evaluate rich media hygiene: descriptive WebP/AVIF images, explicit width/height attributes, and context-rich `alt` attributes.\n\n### Phase 3: E-E-A-T & Knowledge Graph Schema\n- Audit JSON-LD structured data implementation (Organization, Person, WebSite, BreadcrumbList, FAQPage, Article/Product).\n- Verify entity disambiguation signals (Wikidata IDs, `sameAs` social profiles, industry affiliations).\n- Evaluate Trust & Authority indicators: clear editorial policies, author bios with verifiable credentials, privacy/terms accessibility, and physical business contact info.\n\n### Phase 4: Generative Engine Optimization (GEO) & AI Citation Readiness\n- **Citation Extraction Rate:** Assess whether sentences contain compact, high-entropy, quotable statistics and authoritative declarations that LLMs can extract verbatim.\n- **Direct Answer Density:** Determine whether introductory paragraphs answer search intent immediately within the first 60 words (anti-fluff principle).\n- **Fluency & Content Freshness:** Verify that terminology is clear, unencumbered by marketing jargon, and updated with current temporal markers.\n- **Statistical Grounding:** Check for primary data references, research methodology callouts, and source attribution that prevent LLM hallucination filtering.\n\n### Phase 5: Competitive Gap Analysis\n- Compare {{website_url}} against {{competitor_urls}} across domain authority footprint, topical cluster depth, and AI engine citation share.\n- Identify \"Citation Gaps\"—topics where competitors are cited in ChatGPT Search or Perplexity but the target site is absent.\n\n### Phase 6: Diagnostic Scoring & Prioritized Remediation\n- Calculate quantitative scores based on the calibrated rubric in Section 5.\n- Categorize fixes into P0 (Critical / Quick Wins, 1-7 days), P1 (Strategic Improvements, 8-30 days), and P2 (Long-term Moat & Scale, 31-90 days).\n\n# 5. OUTPUT FORMAT & CONSTRAINTS\nProduce the deliverable strictly formatted as {{output_format}} adhering to these standards:\n\n1. **Executive Scorecard Table**:\n   | Pillar | Score (0-100) | Status | Primary Bottleneck |\n   | :--- | :---: | :---: | :--- |\n   | **Technical SEO** | [0-100] | [Critical / Moderate / Strong] | [1-sentence diagnostic] |\n   | **On-Page & Keyword Alignment** | [0-100] | [Critical / Moderate / Strong] | [1-sentence diagnostic] |\n   | **E-E-A-T & Schema Markup** | [0-100] | [Critical / Moderate / Strong] | [1-sentence diagnostic] |\n   | **Traditional SEO Subtotal** | **[0-100]** | [Rating] | [Aggregate Summary] |\n   | **GEO: Quotability & Direct Answers** | [0-100] | [Critical / Moderate / Strong] | [1-sentence diagnostic] |\n   | **GEO: AI Citation & Entity Graph** | [0-100] | [Critical / Moderate / Strong] | [1-sentence diagnostic] |\n   | **GEO: Hallucination Defense & E-E-A-T** | [0-100] | [Critical / Moderate / Strong] | [1-sentence diagnostic] |\n   | **Generative Engine (GEO) Subtotal** | **[0-100]** | [Rating] | [Aggregate Summary] |\n   | **Overall Digital Visibility Index** | **[0-100]** | [Grade A+ to F] | [Strategic Verdict] |\n\n2. **Top 5 High-Impact Findings & Diagnostics**: Specific findings with code snippets or structural examples.\n3. **GEO Transformation Blueprint**: 3 concrete examples transforming existing weak paragraphs from {{website_url}} into high-citation GEO snippets optimized for Perplexity and ChatGPT Search.\n4. **JSON-LD Schema Implementation Code**: Ready-to-deploy `<script type=\"application/ld+json\">` snippet custom tailored to the brand.\n5. **Prioritized 30-60-90 Day Action Checklist**: Organized by impact, estimated effort, and required role (Developer, Content Writer, or SEO Strategist).",
    "variables": [
      {
        "name": "website_url",
        "label": "Target Website / URL",
        "default": "https://example.com",
        "placeholder": "e.g. https://mybrand.com or https://clientwebsite.com/services"
      },
      {
        "name": "target_keywords",
        "label": "Core Focus Keywords & Topics",
        "default": "B2B SaaS project management, workflow automation for remote teams, agile sprint planning software",
        "placeholder": "Primary keywords, search phrases, or core topic clusters"
      },
      {
        "name": "target_region",
        "label": "Target Market & Region",
        "default": "Global (English) with primary focus on United States & Canada",
        "placeholder": "e.g. United States (en-US), United Kingdom (en-GB), Global"
      },
      {
        "name": "audit_depth",
        "label": "Audit Depth & Priority",
        "type": "choice",
        "options": [
          "Full Dual SEO & GEO Diagnostic",
          "Fast Executive Scorecard",
          "Technical & GEO Citation Deep-Dive"
        ],
        "default": "Full Dual SEO & GEO Diagnostic"
      },
      {
        "name": "competitor_urls",
        "label": "Competitor Benchmarks",
        "default": "https://competitor-alpha.com, https://competitor-beta.com",
        "placeholder": "1-3 competitor domains for comparative benchmark"
      },
      {
        "name": "output_format",
        "label": "Deliverable Format",
        "type": "choice",
        "options": [
          "Executive Markdown Report with Scorecards",
          "Technical Engineering & Content Roadmap",
          "Client-Ready Audit Memo"
        ],
        "default": "Executive Markdown Report with Scorecards"
      }
    ],
    "notes": "Generative Engine Optimization (GEO) prepares content for citation and inclusion in modern AI search synthesis (ChatGPT Search, Perplexity, Gemini AI Overviews)."
  },
  {
    "id": "meta-prompt-optimizer",
    "title": "Meta-Prompt Optimizer & Prompt Refiner",
    "category": "Prompt Engineering",
    "subcategory": "Meta-AI",
    "author": "Prompt Engineering Lab",
    "difficulty": "Advanced",
    "model": "Claude 3.5 Sonnet / GPT-4o / Gemini 2.0",
    "featured": true,
    "tags": [
      "meta-prompt",
      "optimization",
      "system-prompts",
      "few-shot"
    ],
    "description": "Transforms rough, vague user prompts into world-class, structured system prompts with XML tags, delimiters, and few-shot examples.",
    "template": "You are a world-class Prompt Engineer and LLM Architect. Analyze and upgrade the following raw prompt into a masterclass-tier prompt.\n\n**Raw Prompt:**\n\"{{raw_prompt}}\"\n\n**Target LLM:** {{target_model}}\n**Primary Goal:** {{primary_goal}}\n**Output Format Desired:** {{desired_format}}\n\nRe-engineer this prompt by applying state-of-the-art prompt design techniques:\n1. **Role & Persona Definition**: Establish a clear, authoritative persona with domain-specific mastery.\n2. **Context & Objective**: Clearly define the mission and why high precision matters.\n3. **Structured Instructions**: Use explicit XML tags (e.g. <context>, <instructions>, <constraints>, <output_format>, <examples>).\n4. **Delimiters & Variable Placeholders**: Standardize placeholders like {{variable}} for easy dynamic substitution.\n5. **Guardrails & Negative Constraints**: Explicitly forbid common failure modes, clichés, generic fluff, and hallucinated sources.\n6. **Chain-of-Thought Scratchpad Guidance**: Instruct the model to reason through its plan before outputting the final deliverable.\n7. **Two Golden Few-Shot Demonstrations**: Provide realistic input/output examples demonstrating the exact expected caliber.\n\nDeliver the finalized prompt in a clean, copy-ready code block followed by a brief explanation of the key enhancements made.",
    "variables": [
      {
        "name": "raw_prompt",
        "label": "Raw / Draft Prompt",
        "default": "Write a newsletter about AI trends for small business owners so they don't get left behind.",
        "placeholder": "Enter your draft prompt here..."
      },
      {
        "name": "target_model",
        "label": "Target Model",
        "default": "Claude 3.5 Sonnet & GPT-4o",
        "placeholder": "e.g. GPT-4o, Claude 3.5 Sonnet, Gemini Pro"
      },
      {
        "name": "primary_goal",
        "label": "Primary Goal",
        "default": "Deliver actionable, hype-free practical AI implementations that save business owners 5+ hours a week",
        "placeholder": "What is the ultimate measure of success?"
      },
      {
        "name": "desired_format",
        "label": "Desired Format",
        "default": "Engaging 4-part newsletter format with punchy TL;DR, 3 case studies, tool breakdown, and 1 action step",
        "placeholder": "e.g. JSON, Markdown guide, Email sequence"
      }
    ],
    "notes": "Use this whenever you have a basic idea and need to engineer it into an enterprise-grade prompt.",
    "domain": "Engineering & Code Architecture",
    "source": "PromptVault Core",
    "categories": [
      "Prompt Engineering"
    ]
  },
  {
    "id": "executive-decision-memo",
    "title": "Executive 1-Page Decision Memo (Amazon PR/FAQ Style)",
    "category": "Business & Strategy",
    "subcategory": "Executive Communication",
    "author": "Strategic Operations Consultant",
    "difficulty": "Intermediate",
    "model": "GPT-4o / Claude 3.5 Sonnet / Gemini",
    "featured": true,
    "tags": [
      "executive-memo",
      "strategy",
      "decision-making",
      "leadership",
      "c-suite"
    ],
    "description": "Distills complex proposals into crisp, high-stakes decision memos that executives can approve in 5 minutes.",
    "template": "You are an Executive Chief of Staff and Strategic Advisor. Create a concise, high-impact **1-Page Executive Decision Memo** based on the following:\n\n**Decision Subject:** {{decision_subject}}\n**Context & Current Friction:** {{friction_and_context}}\n**Proposed Recommendation:** {{recommendation}}\n**Financial / Resource Investment:** {{investment_required}}\n**Key Risks & Mitigation:** {{risks_and_mitigation}}\n\nWrite the memo using the battle-tested Amazon/McKinsey executive format:\n1. **Executive Summary**: 3-sentence bottom-line up front (BLUF) covering what is requested, why now, and expected ROI.\n2. **The Problem & Quantified Opportunity**: The real cost of inaction vs. value unlocked.\n3. **Strategic Options Analyzed**:\n   - Option A: Status Quo / Do Nothing (risks & hidden costs)\n   - Option B: Lean / Interim Band-Aid\n   - Option C: Proposed Recommendation (Rationale for why this wins)\n4. **Financial Impact & Payback Horizon**: Expected cost, return, breakeven timeframe.\n5. **Execution Plan & Milestone Gates**: 30-day, 60-day, 90-day targets with named owners.\n6. **Pre-Mortem (Top 3 Failure Risks & Countermeasures)**.\n7. **Clear Decision Ask**: Explicit sign-off button / approval checkbox for the leadership team.",
    "variables": [
      {
        "name": "decision_subject",
        "label": "Decision Subject",
        "default": "Migrating from Zendesk to an AI-Assisted Customer Support Engine",
        "placeholder": "What is being decided?"
      },
      {
        "name": "friction_and_context",
        "label": "Current Friction",
        "default": "Support ticket resolution times spiked by 42% as user base grew 3x; hiring more agents is linear cost that erodes margins.",
        "placeholder": "What is currently broken?"
      },
      {
        "name": "recommendation",
        "label": "Proposed Recommendation",
        "default": "Deploy an AI agent triage layer on Intercom with automated ticket categorization and tier-1 self-serve deflection.",
        "placeholder": "What do you propose doing?"
      },
      {
        "name": "investment_required",
        "label": "Investment Required",
        "default": "$24,000 annual software subscription + 60 engineering hours for integration",
        "placeholder": "Budget and headcount needed"
      },
      {
        "name": "risks_and_mitigation",
        "label": "Risks & Mitigation",
        "default": "Risk of inaccurate automated replies. Mitigated by strict human-in-the-loop review for first 30 days and confidence score threshold > 90%.",
        "placeholder": "What could go wrong?"
      }
    ],
    "notes": "Structured for high clarity and quick executive buy-in without fluff.",
    "domain": "Business & Product Strategy",
    "source": "PromptVault Core",
    "categories": [
      "Business & Strategy"
    ]
  },
  {
    "id": "excel-vba-sheets-architect",
    "title": "Excel, VBA & Google Sheets Formula & Automation Architect",
    "category": "Automation & Systems",
    "subcategory": "Spreadsheet Automation",
    "author": "Randy Austin - ExcelForFreelancers",
    "authorUrl": "https://www.excelforfreelancers.com/",
    "difficulty": "Beginner",
    "model": "ChatGPT / Claude / Gemini",
    "featured": true,
    "tags": [
      "excel",
      "vba",
      "google-sheets",
      "formulas",
      "freelance-automation"
    ],
    "description": "Build robust, high-performance Excel formulas (LAMBDA, XLOOKUP, dynamic arrays) or bulletproof VBA macros with error handling.",
    "template": "You are a World-Class Excel & VBA Specialist and Google Sheets Automation Engineer.\n\n**Platform:** {{spreadsheet_platform}}\n**Task / Business Need:** {{task_description}}\n**Input Data Structure & Cell References:** {{data_structure}}\n**Output / Expected Result:** {{expected_result}}\n**Performance & Scale Requirements:** {{scale_requirements}}\n\nProvide a battle-tested solution adhering to modern spreadsheet best practices:\n1. **Formula Approach**:\n   - Primary Formula (using modern dynamic array functions: LAMBDA, LET, XLOOKUP, FILTER, or ARRAYFORMULA).\n   - Step-by-step plain English breakdown of each formula component.\n   - Backward compatibility alternative if running on Excel 2019/older.\n2. **VBA / Apps Script Automation (if procedural logic or automated button action is requested)**:\n   - Clean, fully commented, modular code.\n   - Proper variable typing, explicit sheet references, ScreenUpdating/Calculation toggles for high-speed execution.\n   - Defensive error handling block (On Error GoTo ErrorHandler).\n3. **Audit & Edge Cases**:\n   - How it handles blanks, duplicate keys, case sensitivity, or text-formatted numbers.",
    "variables": [
      {
        "name": "spreadsheet_platform",
        "label": "Spreadsheet Platform",
        "default": "Microsoft Excel 365 / Desktop VBA",
        "placeholder": "e.g. Excel 365, Google Sheets, Excel VBA"
      },
      {
        "name": "task_description",
        "label": "Task / Need",
        "default": "Automatically reconcile monthly bank statement transactions against internal invoice records and highlight unmatched items",
        "placeholder": "What calculation or automation do you need?"
      },
      {
        "name": "data_structure",
        "label": "Data Structure & Columns",
        "default": "Sheet1 'Bank': Col A = Date, Col B = Description, Col C = Amount\nSheet2 'Invoices': Col A = InvoiceNo, Col B = Client, Col C = ExpectedAmount",
        "placeholder": "List columns and sample rows"
      },
      {
        "name": "expected_result",
        "label": "Expected Result",
        "default": "A matched table indicating Match Status, Variance (if any), and flag for missing invoices",
        "placeholder": "What should the output look like?"
      },
      {
        "name": "scale_requirements",
        "label": "Scale & Performance",
        "default": "~15,000 rows per month; must calculate in under 2 seconds without freezing Excel",
        "placeholder": "Row count and speed expectations"
      }
    ],
    "notes": "ExcelForFreelancers best practice: Always leverage LET() to calculate common expressions once for 10x faster execution.",
    "domain": "Automation & Workflow Systems",
    "source": "PromptVault Core",
    "categories": [
      "Automation & Systems"
    ]
  },
  {
    "id": "prompcat-1778748258252",
    "title": "Product Landing Page",
    "category": "Midjourney & Diffusion",
    "categories": [
      "Midjourney & Diffusion",
      "Photography Styles"
    ],
    "subcategory": "Visual Prompt",
    "subcategories": [],
    "tags": [],
    "description": "Create a visually engaging landing page template for a personal care product (e.g., shampoo). Include a hero section with a product image, compelling headline, ...",
    "template": "Create a visually engaging landing page template for a personal care product (e.g., shampoo). Include a hero section with a product image, compelling headline, and clear call-to-action button. Add supporting sections for benefits, key ingredients, testimonials, and a subscription offer. Use soft, fresh color schemes, high-quality imagery, and ensure the layout is responsive, clean, and optimized for conversions.",
    "variables": [],
    "notes": "",
    "isFavorite": false,
    "isCustom": true,
    "difficulty": "All Levels",
    "model": "Midjourney / Flux / DALL-E",
    "createdAt": "2026-05-14T08:44:18.252Z",
    "updatedAt": "2026-05-14T08:44:18.252Z",
    "domain": "Image & Visual Generation",
    "source": "PromptVault Core",
    "author": "PromptVault Curated"
  },
  {
    "id": "prompcat-1779120286884",
    "title": "Hero Section 1",
    "category": "Web Components",
    "categories": [
      "Web Components",
      "UI Sections"
    ],
    "subcategory": "Component Blueprint",
    "subcategories": [],
    "tags": [],
    "description": "Create a hero as one centered vertical stack on a full-width section background. Stack from top to bottom: a small pill-shaped badge composed of a tiny leading ...",
    "template": "Create a hero as one centered vertical stack on a full-width section background. Stack from top to bottom: a small pill-shaped badge composed of a tiny leading icon and a short label, both centered horizontally on its own line; a large centered heading on its own line directly below the badge; a centered supporting paragraph directly below the heading at a comfortable reading width; a horizontal row of two CTA buttons sitting side by side on the same baseline (a primary button on the left and a secondary button on the right), centered as a pair beneath the paragraph; finally, a single large centered image placed directly below the button row that spans most of the width of the container. On narrow viewports keep the same single-column centered stack, let the two CTA buttons wrap into a vertical pair if needed, and allow the image to span the full content width with comfortable side padding.",
    "variables": [],
    "notes": "",
    "isFavorite": false,
    "isCustom": true,
    "difficulty": "All Levels",
    "model": "ChatGPT / Claude / Gemini",
    "createdAt": "2026-05-18T16:04:46.884Z",
    "updatedAt": "2026-05-18T16:05:28.478Z",
    "domain": "UI / UX & Component Design",
    "source": "TypeUI Web Kit",
    "author": "TypeUI"
  },
  {
    "id": "prompcat-1778747961647",
    "title": "Differentiated Features",
    "category": "Brainstorming",
    "categories": [
      "Brainstorming"
    ],
    "subcategory": "Learning & Productivity",
    "subcategories": [],
    "tags": [],
    "description": "Help me brainstorm 5-7 new features we could explore for this product. Prioritize ideas that differentiate us from competitors and respond to user pain points. ...",
    "template": "Help me brainstorm 5-7 new features we could explore for this product. Prioritize ideas that differentiate us from competitors and respond to user pain points. [Paste a 1-2 sentence product description, your target user persona, or sample user feedback here.]",
    "variables": [],
    "notes": "",
    "isFavorite": false,
    "isCustom": true,
    "difficulty": "All Levels",
    "model": "ChatGPT / Claude / Gemini",
    "createdAt": "2026-05-14T08:39:21.647Z",
    "updatedAt": "2026-05-14T08:39:21.647Z",
    "domain": "Education & Productivity",
    "source": "PromptVault Core",
    "author": "PromptVault Curated"
  }
];
