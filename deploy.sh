#!/usr/bin/env bash
set -euo pipefail

# Always run from the repo root
cd "$(dirname "$0")"

BRANCH="${1:-main}"
git fetch origin "$BRANCH"
git checkout "$BRANCH" 2>/dev/null || git checkout -b "$BRANCH" "origin/$BRANCH"
git pull origin "$BRANCH"
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build

