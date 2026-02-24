#!/bin/sh
set -e

# Validate EMAIL_LETSENCRYPT for ACME (Let's Encrypt requires a valid contact email)
if [ -z "${EMAIL_LETSENCRYPT}" ] || ! echo "${EMAIL_LETSENCRYPT}" | grep -q '@'; then
  echo "ERROR: EMAIL_LETSENCRYPT must be set to a valid email (e.g. admin@ultimaforma.id)" >&2
  echo "Set it in deploy/.env.prod and use: docker compose --env-file .env.prod up" >&2
  exit 1
fi

# Traefik does NOT expand ${VAR} in YAML - pass ACME email via TRAEFIK_* env var
# (Traefik sends literal "${EMAIL_LETSENCRYPT}" otherwise, causing "unable to parse email address")
export TRAEFIK_CERTIFICATESRESOLVERS_LETSENCRYPT_ACME_EMAIL="${EMAIL_LETSENCRYPT}"

# Ensure acme.json exists and has secure permissions (required by Traefik/Let's Encrypt)
ACME_FILE="/letsencrypt/acme.json"
if [ ! -f "$ACME_FILE" ]; then
  echo '{}' > "$ACME_FILE"
fi
chmod 600 "$ACME_FILE"

exec /usr/local/bin/traefik "$@"
