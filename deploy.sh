#!/usr/bin/env bash
set -euo pipefail

# Always run from the repo root
cd "$(dirname "$0")"

BRANCH="${1:-master}"
echo "Requested branch: $BRANCH"
git fetch --all || true

# Check if branch exists on remote
if git show-ref --verify --quiet "refs/remotes/origin/$BRANCH"; then
  echo "Branch '$BRANCH' found on remote, checking out..."
  git checkout "$BRANCH" 2>/dev/null || git checkout -b "$BRANCH" "origin/$BRANCH"
  git pull origin "$BRANCH"
else
  echo "Warning: Branch '$BRANCH' not found on remote. Falling back to 'master'."
  BRANCH="master"
  git checkout "$BRANCH" 2>/dev/null || git checkout -b "$BRANCH" "origin/$BRANCH"
  git pull origin "$BRANCH"
fi
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build

