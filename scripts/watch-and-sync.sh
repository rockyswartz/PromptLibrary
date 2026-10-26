#!/usr/bin/env bash
# ==============================================================================
# PromptVault Pro — Auto-Watcher & Auto-Updater Daemon
# Continuously monitors for local changes, batches edits, and auto-pushes
# ==============================================================================

cd "$(dirname "$0")/.."

echo "👀 PromptVault Pro Auto-Watcher started."
echo "📂 Monitoring /Volumes/Active/AI Builds/PromtLibrary for changes..."
echo "🚀 Any file saves will be automatically committed and pushed to GitHub."
echo "Press Ctrl+C to stop the watcher at any time."
echo "------------------------------------------------------------------"

POLL_INTERVAL=5

while true; do
  # Check git status for any changes
  STATUS=$(git status --porcelain 2>/dev/null)
  
  if [ -n "$STATUS" ]; then
    echo ""
    echo "⚡ Detected changes in project files. Waiting 3s to batch edits..."
    sleep 3
    
    # Run the auto-sync script
    ./scripts/auto-sync.sh
    echo "------------------------------------------------------------------"
    echo "👀 Resuming change monitor..."
  fi
  
  sleep $POLL_INTERVAL
done
