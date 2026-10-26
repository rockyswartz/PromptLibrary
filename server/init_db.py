#!/usr/bin/env python3
"""
Initialize promptlibrary.db SQLite database from the combined master dataset.
Includes all 333 prompts and full 45-category taxonomy.
Zero pip dependencies required (uses standard library sqlite3 and json).
"""

import json
import os
import sqlite3
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)
DB_PATH = os.path.join(BASE_DIR, "promptlibrary.db")
DATA_JS_PATH = os.path.join(PROJECT_ROOT, "js", "data.js")

def init_db(db_path=DB_PATH):
    print(f"Initializing SQLite database at: {db_path}")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Create tables
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS prompts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT,
        categories TEXT,
        subcategory TEXT,
        subcategories TEXT,
        author TEXT,
        authorUrl TEXT,
        model TEXT,
        difficulty TEXT,
        featured BOOLEAN DEFAULT 0,
        tags TEXT,
        description TEXT,
        template TEXT,
        variables TEXT,
        notes TEXT,
        isFavorite BOOLEAN DEFAULT 0,
        isCustom BOOLEAN DEFAULT 0,
        createdAt TEXT,
        updatedAt TEXT
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS taxonomy (
        category TEXT PRIMARY KEY,
        subcategories TEXT
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS favorites (
        prompt_id TEXT PRIMARY KEY
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT
    )
    """)

    # Load prompts from data.js
    if os.path.exists(DATA_JS_PATH):
        with open(DATA_JS_PATH, "r", encoding="utf-8") as f:
            content = f.read()
            # Extract JSON from window.DEFAULT_PROMPTS = [...];
            start = content.find("window.DEFAULT_PROMPTS = ")
            if start != -1:
                json_str = content[start + len("window.DEFAULT_PROMPTS = "):].strip()
                if json_str.endswith(";"):
                    json_str = json_str[:-1].strip()
                prompts = json.loads(json_str)

                # Clear and insert prompts
                cursor.execute("DELETE FROM prompts")
                for p in prompts:
                    cursor.execute("""
                    INSERT OR REPLACE INTO prompts (
                        id, title, category, categories, subcategory, subcategories,
                        author, authorUrl, model, difficulty, featured, tags,
                        description, template, variables, notes, isFavorite, isCustom,
                        createdAt, updatedAt
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """, (
                        p.get("id"),
                        p.get("title", "Untitled Prompt"),
                        p.get("category", "General"),
                        json.dumps(p.get("categories", [p.get("category", "General")])),
                        p.get("subcategory", "General"),
                        json.dumps(p.get("subcategories", [])),
                        p.get("author", ""),
                        p.get("authorUrl", ""),
                        p.get("model", "Universal"),
                        p.get("difficulty", "All Levels"),
                        1 if p.get("featured") else 0,
                        json.dumps(p.get("tags", [])),
                        p.get("description", ""),
                        p.get("template", ""),
                        json.dumps(p.get("variables", [])),
                        p.get("notes", ""),
                        1 if p.get("isFavorite") else 0,
                        1 if p.get("isCustom") else 0,
                        p.get("createdAt", ""),
                        p.get("updatedAt", "")
                    ))

                print(f"Successfully inserted {len(prompts)} prompts into SQLite prompts table.")

    conn.commit()
    conn.close()
    print("Database initialization complete.")

if __name__ == "__main__":
    init_db()
