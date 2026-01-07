#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Run renewal and capture output
RENEW_OUTPUT=$(docker run --rm \
  -v "$SCRIPT_DIR/ssl/certbot/conf:/etc/letsencrypt" \
  -v "$SCRIPT_DIR/ssl/certbot/data:/var/www/certbot" \
  certbot/certbot renew --webroot --webroot-path=/var/www/certbot 2>&1)

echo "$RENEW_OUTPUT"

# Check if certificates were actually renewed (not just "no renewals attempted")
if echo "$RENEW_OUTPUT" | grep -q "Congratulations.*renewed"; then
  echo "Certificates renewed. Reloading nginx..."
  cd "$SCRIPT_DIR"
  docker-compose -f docker-compose.prod.yml exec frontend nginx -s reload
  echo "Nginx reloaded with new certificates."
elif echo "$RENEW_OUTPUT" | grep -q "No renewals were attempted"; then
  echo "No renewals needed (certificate not within 30 days of expiration)."
else
  echo "Renewal process may have failed. Check the output above."
fi 