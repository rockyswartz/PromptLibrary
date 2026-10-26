// Master Starter Pack — Flagship Showcase AI Blueprints across all 7 Domain Pillars
// Standardized with full variable injection, choice pills, and originator attribution
window.DEFAULT_PROMPTS = [
  {
    "id": "prompt-designer-blueprint",
    "title": "AI Prompt Library Designer & Blueprint",
    "domain": "Automation & Workflow Systems",
    "source": "PromptVault Core",
    "category": "Automation & Systems",
    "categories": [
      "Automation & Systems"
    ],
    "subcategory": "Prompt Architecture",
    "author": "Randy Austin - ExcelForFreelancers",
    "authorUrl": "https://www.excelforfreelancers.com/",
    "difficulty": "Beginner",
    "model": "ChatGPT / Claude / Gemini",
    "featured": true,
    "tags": [
      "system-design",
      "prompt-engineering",
      "blueprint",
      "automation"
    ],
    "description": "Design a decision-ready AI prompt working package with inputs, constraints, reliability rules, and audit trail.",
    "template": "You are an expert AI Prompt and System Architect. Your task is to design a robust, maintainable AI Prompt & Workflow Blueprint based on the following specifications:\n\n**Goal / Outcome:** {{goal}}\n**Target Audience / Users:** {{audience}}\n**Source Material & Context:** {{source_material}}\n**Operational Constraints & Platform Rules:** {{constraints}}\n**Deliverable Format:** {{output_format: Executive Working Blueprint | Technical Architecture Spec | Actionable 1-Page Summary}}\n**Decision Owner:** {{owner}}\n\nPlease generate a comprehensive working blueprint with the following sections:\n1. **Executive Summary & Decision Scope**: Primary outcome, verified facts vs. labeled assumptions.\n2. **System Architecture**:\n   - Model selection rationale\n   - Required system instructions and persona parameters\n   - Dynamic input variables & schema validation\n3. **Prompt Specification**:\n   - Master System Prompt\n   - User Prompt Template with placeholders\n   - Few-shot edge case demonstrations\n4. **Reliability & Guardrails**:\n   - Explicit negative constraints (what the AI must NOT do)\n   - Hallucination mitigation tactics\n   - Fallback and graceful failure behavior\n5. **Testing & Quality Rubric**:\n   - 3 test input cases (nominal, edge case, adversarial)\n   - Acceptance criteria and verification checklist\n6. **Actionable Next Steps**:\n   - Immediate implementation tasks assigned to {{owner}}",
    "variables": [
      {
        "name": "goal",
        "label": "Goal / Outcome",
        "default": "Automate invoice verification and exception routing for freelance contractors",
        "placeholder": "e.g. Build an automated lead qualification assistant"
      },
      {
        "name": "audience",
        "label": "Target Audience",
        "default": "Operations Manager and Accounts Payable team",
        "placeholder": "e.g. Sales development reps"
      },
      {
        "name": "source_material",
        "label": "Source Material / Context",
        "default": "Vendor contracts, Google Sheets billing ledger, monthly receipt scans",
        "placeholder": "e.g. CRM database schema and past 50 sales call transcripts"
      },
      {
        "name": "constraints",
        "label": "Constraints & Platform Rules",
        "default": "Must run in Zapier or Make.com; zero financial approvals above $500 without manual sign-off; privacy compliant",
        "placeholder": "e.g. No external API costs, strict GDPR compliance"
      },
      {
        "name": "output_format",
        "label": "Deliverable Format",
        "type": "choice",
        "options": [
          "Executive Working Blueprint",
          "Technical Architecture Spec",
          "Actionable 1-Page Summary"
        ],
        "default": "Executive Working Blueprint"
      },
      {
        "name": "owner",
        "label": "System Owner",
        "default": "Lead Freelance Operations Consultant",
        "placeholder": "e.g. Head of Product"
      }
    ],
    "notes": "Based on the ExcelForFreelancers AI Prompt Library Designer framework. Treat supplied facts as ground truth and label assumptions."
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
