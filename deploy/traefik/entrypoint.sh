#!/bin/sh
set -e

# Ensure acme.json exists and has secure permissions (required by Traefik/Let's Encrypt)
ACME_FILE="/letsencrypt/acme.json"
if [ ! -f "$ACME_FILE" ]; then
  echo '{}' > "$ACME_FILE"
fi
chmod 600 "$ACME_FILE"

exec /usr/local/bin/traefik "$@"
