# 🐍 Local SQLite Server & Backend Bridge

An optional local backend for **Prompt Library Pro** powered by Python's built-in `sqlite3` and `http.server`.

## ✨ Highlights

- **Zero External Dependencies**: Uses only standard Python library modules (`sqlite3`, `http.server`, `json`). No `pip install` required.
- **ACID-Compliant SQLite Database**: Manages `promptlibrary.db` directly on disk with fast indexing.
- **RESTful API**: Endpoints for CRUD operations on prompts, taxonomy synchronization, and database backups.
- **Dual Mode**: Serves both the web app and the API on a single port (default: `8000`).

---

## 🚀 Quick Start

### 1. Initialize the Database
Populate `promptlibrary.db` with all 333+ prompts and taxonomy:

```bash
python3 server/init_db.py
```

### 2. Start the Server
```bash
python3 server/server.py
```

By default, the server runs on port `8000`. You can customize the port:

```bash
python3 server/server.py --port 3456
```

### 3. Open the App
Visit: [http://localhost:8000](http://localhost:8000)

The web application automatically detects the active SQLite backend and syncs changes to `promptlibrary.db`. If you close the server or open the frontend standalone, it gracefully continues using in-browser IndexedDB without interruptions.

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Healthcheck returning database status and total prompt count |
| `GET` | `/api/prompts` | Get all prompts as JSON array |
| `POST` | `/api/prompts` | Insert or update a prompt |
| `DELETE` | `/api/prompts/:id` | Delete a prompt by ID |
| `GET` | `/api/taxonomy` | Get full category and subcategory taxonomy |
| `POST` | `/api/taxonomy` | Update taxonomy mapping |
| `GET` | `/api/export/sqlite` | Direct download of `promptlibrary.db` |
