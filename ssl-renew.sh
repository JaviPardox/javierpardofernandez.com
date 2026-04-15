#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Run renewal and capture output + exit code (Certbot wording changes; volume already updates files)
RENEW_OUTPUT=$(docker run --rm \
  -v "$SCRIPT_DIR/ssl/certbot/conf:/etc/letsencrypt" \
  -v "$SCRIPT_DIR/ssl/certbot/data:/var/www/certbot" \
  certbot/certbot renew --webroot --webroot-path=/var/www/certbot 2>&1)
RENEW_EXIT=$?

echo "$RENEW_OUTPUT"

if [ "$RENEW_EXIT" -ne 0 ]; then
  echo "Certbot failed (exit $RENEW_EXIT). Check output above."
  exit "$RENEW_EXIT"
fi

# Nginx keeps certs in memory until reload; bind mount already has new PEMs after renew
cd "$SCRIPT_DIR"
docker-compose -f docker-compose.prod.yml exec -T frontend nginx -s reload
echo "Nginx reloaded (picks up certs from mounted volume)."