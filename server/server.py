#!/usr/bin/env python3
"""
Prompt Library Pro — Local SQLite Backend & Web Server
Provides optional local SQLite sync and serves the static web application.
Zero external pip dependencies (uses Python standard library).

Usage:
    python3 server/server.py
    python3 server/server.py --port 8000
"""

import argparse
import http.server
import json
import os
import socketserver
import sqlite3
import sys
import urllib.parse

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)
DB_PATH = os.path.join(BASE_DIR, "promptlibrary.db")

class Database:
    def __init__(self, db_path=DB_PATH):
        self.db_path = db_path
        self.ensure_db()

    def get_connection(self):
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def ensure_db(self):
        if not os.path.exists(self.db_path):
            import init_db
            init_db.init_db(self.db_path)

    def get_all_prompts(self):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM prompts ORDER BY createdAt DESC")
            rows = cursor.fetchall()
            result = []
            for r in rows:
                p = dict(r)
                # Unpack JSON fields
                for field in ["categories", "subcategories", "tags", "variables"]:
                    if p.get(field):
                        try:
                            p[field] = json.loads(p[field])
                        except Exception:
                            pass
                p["isFavorite"] = bool(p.get("isFavorite"))
                p["isCustom"] = bool(p.get("isCustom"))
                p["featured"] = bool(p.get("featured"))
                result.append(p)
            return result

    def get_prompt_count(self):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM prompts")
            return cursor.fetchone()[0]

    def save_prompt(self, p):
        with self.get_connection() as conn:
            cursor = conn.cursor()
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
            conn.commit()
            return True

    def delete_prompt(self, prompt_id):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM prompts WHERE id = ?", (prompt_id,))
            conn.commit()
            return cursor.rowcount > 0

    def get_taxonomy(self):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM taxonomy")
            rows = cursor.fetchall()
            tax = {}
            for r in rows:
                try:
                    tax[r["category"]] = json.loads(r["subcategories"])
                except Exception:
                    tax[r["category"]] = []
            return tax

    def save_taxonomy(self, tax_dict):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM taxonomy")
            for cat, subs in tax_dict.items():
                cursor.execute("INSERT INTO taxonomy (category, subcategories) VALUES (?, ?)", (cat, json.dumps(subs)))
            conn.commit()
            return True

db = Database(DB_PATH)

class PromptLibraryHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PROJECT_ROOT, **kwargs)

    def end_headers(self):
        # Enable CORS for local cross-origin connections
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/api/health":
            self.send_json({
                "status": "ok",
                "engine": "SQLite",
                "database": "promptlibrary.db",
                "promptsCount": db.get_prompt_count()
            })
            return

        if path == "/api/prompts":
            prompts = db.get_all_prompts()
            self.send_json(prompts)
            return

        if path == "/api/taxonomy":
            taxonomy = db.get_taxonomy()
            self.send_json(taxonomy)
            return

        if path == "/api/export/sqlite":
            if os.path.exists(DB_PATH):
                self.send_response(200)
                self.send_header("Content-Type", "application/x-sqlite3")
                self.send_header("Content-Disposition", 'attachment; filename="promptlibrary.db"')
                with open(DB_PATH, "rb") as f:
                    data = f.read()
                    self.send_header("Content-Length", str(len(data)))
                    self.end_headers()
                    self.wfile.write(data)
                return
            else:
                self.send_error(404, "Database file not found")
                return

        # Default: Serve static files from PROJECT_ROOT
        super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/api/prompts":
            body = self.get_json_body()
            if not body or not body.get("id"):
                self.send_json({"error": "Prompt must include an 'id'"}, 400)
                return
            db.save_prompt(body)
            self.send_json({"success": True, "id": body.get("id")})
            return

        if path == "/api/taxonomy":
            body = self.get_json_body()
            if isinstance(body, dict):
                db.save_taxonomy(body)
                self.send_json({"success": True})
            else:
                self.send_json({"error": "Invalid taxonomy payload"}, 400)
            return

        self.send_error(404, "Endpoint not found")

    def do_DELETE(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path.startswith("/api/prompts/"):
            prompt_id = path[len("/api/prompts/"):]
            deleted = db.delete_prompt(prompt_id)
            self.send_json({"success": deleted, "id": prompt_id})
            return

        self.send_error(404, "Endpoint not found")

    def get_json_body(self):
        content_length = int(self.headers.get("Content-Length", 0))
        if content_length > 0:
            raw = self.rfile.read(content_length).decode("utf-8")
            return json.loads(raw)
        return None

    def send_json(self, data, status=200):
        body = json.dumps(data, indent=2).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

def run(port=3456):
    current_port = port
    max_attempts = 15
    for attempt in range(max_attempts):
        try:
            with ReusableTCPServer(("", current_port), PromptLibraryHandler) as httpd:
                print(f"🚀 Prompt Library Pro SQLite Server running at: http://localhost:{current_port}")
                print(f"📦 Connected to SQLite database: {DB_PATH}")
                print(f"✨ Direct web app available at: http://localhost:{current_port}/index.html")
                print("Press Ctrl+C to stop.")
                try:
                    httpd.serve_forever()
                except KeyboardInterrupt:
                    print("\nShutting down server.")
                return
        except OSError as e:
            if e.errno in (48, 98): # Errno 48 on macOS / BSD, 98 on Linux (Address already in use)
                print(f"⚠️ Port {current_port} is already in use by another instance. Trying port {current_port + 1}...")
                current_port += 1
            else:
                raise e
    print(f"❌ Could not find an open port between {port} and {current_port}.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Prompt Library Pro Local SQLite Server")
    parser.add_argument("--port", type=int, default=3456, help="Port to run on (default: 3456)")
    args = parser.parse_args()
    run(args.port)
