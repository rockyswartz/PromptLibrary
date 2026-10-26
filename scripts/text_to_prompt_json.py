#!/usr/bin/env python3
"""
PromptVault Pro — Raw Text & Markdown Prompt Ingestion Utility
Converts raw text/markdown prompts or directories of files into standard PromptVault JSON format.

Usage:
    # Convert a single text/markdown file
    python3 scripts/text_to_prompt_json.py --input my_prompt.txt --output my_prompt.json

    # Bulk convert an entire directory of .txt / .md prompt files
    python3 scripts/text_to_prompt_json.py --input-dir ./notes/ --output prompts_batch.json

    # With custom author attribution and auto variable detection:
    python3 scripts/text_to_prompt_json.py --input-dir ./prompts/ --author "Randy Austin" --auto-vars
"""

import argparse
import glob
import json
import os
import re
import sys

def parse_text_prompt(text, filename="", default_author="Custom", auto_vars=True):
    raw = text.strip()
    if not raw:
        return None

    lines = raw.splitlines()
    first_line = lines[0].strip() if lines else "Untitled Prompt"

    # Extract Title from markdown heading if present
    if first_line.startswith("#"):
        title = re.sub(r"^#+\s*", "", first_line).strip()
        body = "\n".join(lines[1:]).strip()
    else:
        if len(first_line) < 70 and len(lines) > 1 and lines[1].strip() == "":
            title = first_line
            body = "\n".join(lines[2:]).strip()
        elif filename:
            title = os.path.splitext(os.path.basename(filename))[0].replace("-", " ").replace("_", " ").title()
            body = raw
        else:
            title = first_line[:50] + "..." if len(first_line) > 50 else first_line
            body = raw

    # Convert [bracket] or <bracket> placeholders to {{variables}}
    if auto_vars:
        body = re.sub(r"\[([A-Za-z0-9_\-\s]{2,40})\]", lambda m: f"{{{{{re.sub(r'\s+', '_', m.group(1).lower().strip())}}}}}", body)
        body = re.sub(r"<([A-Za-z0-9_\-\s]{2,40})>", lambda m: f"{{{{{re.sub(r'\s+', '_', m.group(1).lower().strip())}}}}}", body)

    # Extract detected variables
    var_matches = re.findall(r"\{\{([^}]+)\}\}", body)
    variables = []
    seen = set()
    for v in var_matches:
        v_clean = v.split(":")[0].strip()
        if v_clean and v_clean not in seen:
            seen.add(v_clean)
            variables.append(v_clean)

    prompt_id = "prompt-" + str(abs(hash(title + body)))[:10]

    return {
        "id": prompt_id,
        "title": title,
        "author": default_author,
        "authorUrl": "",
        "domain": "Business & Product Strategy",
        "category": "General",
        "categories": ["General"],
        "subcategory": "General",
        "subcategories": ["General"],
        "difficulty": "Intermediate",
        "model": "ChatGPT / Claude / Gemini",
        "tags": ["converted"],
        "description": f"Imported prompt: {title}",
        "template": body or raw,
        "variables": variables,
        "notes": f"Converted from {filename}" if filename else "",
        "isFavorite": False,
        "isCustom": True
    }

def main():
    parser = argparse.ArgumentParser(description="Convert raw text/markdown prompts to PromptVault JSON format")
    parser.add_argument("--input", "-i", help="Path to a single text or markdown file")
    parser.add_argument("--input-dir", "-d", help="Directory containing .txt or .md files to bulk convert")
    parser.add_argument("--output", "-o", default="converted_prompts.json", help="Path to output JSON file (default: converted_prompts.json)")
    parser.add_argument("--author", "-a", default="Custom", help="Default author/originator credit (default: Custom)")
    parser.add_argument("--auto-vars", action="store_true", default=True, help="Auto-convert [placeholders] and <placeholders> to {{variables}}")

    args = parser.parse_args()

    results = []

    if args.input:
        if not os.path.exists(args.input):
            print(f"❌ Error: Input file not found: {args.input}")
            sys.exit(1)
        with open(args.input, "r", encoding="utf-8", errors="replace") as f:
            prompt = parse_text_prompt(f.read(), filename=args.input, default_author=args.author, auto_vars=args.auto_vars)
            if prompt:
                results.append(prompt)

    elif args.input_dir:
        if not os.path.isdir(args.input_dir):
            print(f"❌ Error: Input directory not found: {args.input_dir}")
            sys.exit(1)
        files = glob.glob(os.path.join(args.input_dir, "**/*.txt"), recursive=True) + \
                glob.glob(os.path.join(args.input_dir, "**/*.md"), recursive=True)
        print(f"🔍 Found {len(files)} text/markdown files in {args.input_dir}")
        for filepath in sorted(files):
            try:
                with open(filepath, "r", encoding="utf-8", errors="replace") as f:
                    prompt = parse_text_prompt(f.read(), filename=filepath, default_author=args.author, auto_vars=args.auto_vars)
                    if prompt:
                        results.append(prompt)
            except Exception as e:
                print(f"⚠️ Skipped {filepath}: {e}")

    else:
        print("Please specify either --input <file> or --input-dir <directory>")
        parser.print_help()
        sys.exit(1)

    payload = {
        "version": "3.3.0",
        "description": "Exported from PromptVault Pro Text Ingestion Utility",
        "count": len(results),
        "prompts": results
    }

    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)

    print(f"✅ Successfully converted {len(results)} prompt(s) into: {args.output}")
    print(f"🚀 You can now upload '{args.output}' into PromptVault Pro via Library Backup > Import JSON.")

if __name__ == "__main__":
    main()
