#!/usr/bin/env bash
# PromptVault Pro — 1-Click macOS Desktop Launcher
# Starts Python server if not already active and opens localhost in default browser

DIR="$(cd "$(dirname "$0")/.." && pwd)"
PORT=3456

# Check if Python server is already running
if ! pgrep -f "server/server.py" > /dev/null && ! lsof -i :$PORT > /dev/null 2>&1; then
    echo "Starting PromptVault Pro server on port $PORT..."
    cd "$DIR"
    python3 server/server.py --port $PORT > /dev/null 2>&1 &
    sleep 1
fi

echo "Opening PromptVault Pro in browser..."
open "http://localhost:$PORT"

# Clean exit
exit 0
