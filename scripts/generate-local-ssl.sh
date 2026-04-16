#!/usr/bin/env bash
# One-time self-signed certs for docker-compose.prod.yml (paths match nginx.conf).
# Requires: openssl. Run from anywhere; paths are relative to repo root.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIR="$ROOT/ssl/certbot/conf/live/javierpardofernandez.com-0001"
mkdir -p "$DIR" "$ROOT/ssl/certbot/data"
TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT
cat >"$TMP" <<'EOF'
[req]
default_bits = 2048
prompt = no
default_md = sha256
distinguished_name = dn
x509_extensions = v3_req

[dn]
CN = javierpardofernandez.com

[v3_req]
subjectAltName = @san

[san]
DNS.1 = javierpardofernandez.com
DNS.2 = www.javierpardofernandez.com
DNS.3 = localhost
EOF
if command -v openssl >/dev/null 2>&1; then
  openssl req -x509 -nodes -days 825 -newkey rsa:2048 \
    -keyout "$DIR/privkey.pem" \
    -out "$DIR/fullchain.pem" \
    -config "$TMP" -extensions v3_req
elif command -v docker >/dev/null 2>&1; then
  DIR_ABS="$(cd "$DIR" && pwd)"
  docker run --rm -v "$DIR_ABS:/certs" alpine/openssl req -x509 -nodes -days 825 -newkey rsa:2048 \
    -keyout /certs/privkey.pem -out /certs/fullchain.pem \
    -subj "/CN=javierpardofernandez.com" \
    -addext "subjectAltName=DNS:javierpardofernandez.com,DNS:www.javierpardofernandez.com,DNS:localhost"
else
  echo "Install openssl or docker, then run this script again." >&2
  exit 1
fi
echo "OK: $DIR/fullchain.pem and privkey.pem"
