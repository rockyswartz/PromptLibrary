#!/usr/bin/env bash
# PromptVault Pro — 1-Click Linux Launcher
# Starts local server in background if needed and opens default browser

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT=3456

# Check if server is running
if ! pgrep -f "server/server.py" > /dev/null && ! ss -tuln | grep -q ":$PORT"; then
    echo "Starting PromptVault Pro server on port $PORT..."
    cd "$DIR"
    python3 server/server.py --port $PORT > /dev/null 2>&1 &
    sleep 1
fi

echo "Opening PromptVault Pro in browser..."
if command -v xdg-open > /dev/null; then
    xdg-open "http://localhost:$PORT"
elif command -v sensible-browser > /dev/null; then
    sensible-browser "http://localhost:$PORT"
fi

exit 0
