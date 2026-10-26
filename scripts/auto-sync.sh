#!/usr/bin/env bash
# ==============================================================================
# PromptVault Pro — Auto-Sync Script (1-Click Commit & Push)
# Usage: ./scripts/auto-sync.sh ["Optional custom commit message"]
# ==============================================================================

set -e

# Prevent post-commit hook race condition
export PROMPTVAULT_AUTO_SYNC=1

# Change to repository root directory
cd "$(dirname "$0")/.."

# Check if git is initialized
if [ ! -d ".git" ]; then
  echo "❌ Error: Not a git repository. Run 'git init' first."
  exit 1
fi

# Check for modified or untracked files
CHANGED_FILES=$(git status --porcelain)

if [ -z "$CHANGED_FILES" ]; then
  echo "✅ Working tree is clean. No local changes to commit or push."
  exit 0
fi

echo "📦 Changes detected:"
echo "$CHANGED_FILES"
echo ""

# Stage all changes
git add -A

# Determine commit message
COMMIT_MSG="$1"
if [ -z "$COMMIT_MSG" ]; then
  TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
  MOD_COUNT=$(echo "$CHANGED_FILES" | wc -l | tr -d ' ')
  COMMIT_MSG="Auto-sync: update $MOD_COUNT file(s) at $TIMESTAMP"
fi

echo "📝 Committing: \"$COMMIT_MSG\""
git commit -m "$COMMIT_MSG"

echo "🚀 Syncing with remote repository..."
git pull --rebase origin main || true
git push origin main

echo "🎉 Successfully pushed all changes to https://github.com/rockyswartz/PromptLibrary (main branch)!"
