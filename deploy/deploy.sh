#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="${1:-$SCRIPT_DIR/.env.prod}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Error: .env.prod not found. Copy deploy/.env.prod.example to deploy/.env.prod and fill values."
  echo "Usage: ./deploy.sh [path-to-.env.prod]"
  exit 1
fi

export COMPOSE_PROJECT_NAME=ultimaforma
cd "$SCRIPT_DIR"

echo "Starting Postgres, vector-db, and Redis..."
docker compose -f docker-compose.yml --env-file "$ENV_FILE" up -d postgres vector-db redis

echo "Waiting for Postgres and vector-db to be healthy..."
attempts=0
until docker compose -f docker-compose.yml --env-file "$ENV_FILE" exec -T postgres pg_isready -U postgres 2>/dev/null && \
      docker compose -f docker-compose.yml --env-file "$ENV_FILE" exec -T vector-db pg_isready -U postgres 2>/dev/null; do
  sleep 2
  attempts=$((attempts + 1))
  [[ $attempts -ge 30 ]] && { echo "Error: Postgres/vector-db did not become ready in time."; exit 1; }
done
echo "Postgres and vector-db are ready."

echo "Running migrations and embeddings setup..."
# Run migrations via Docker so the host doesn't need Node/pnpm.
# DB_HOST=postgres for primary; VECTOR_DB_HOST=vector-db for embeddings.
docker run --rm \
  --network ultimaforma_default \
  -v "$PROJECT_ROOT:/app" \
  -w /app \
  --env-file "$ENV_FILE" \
  -e DB_HOST=postgres \
  -e VECTOR_DB_HOST=vector-db \
  -e REDIS_HOST=redis \
  node:22-alpine \
  sh -c "corepack enable && corepack prepare pnpm@latest --activate && pnpm install --frozen-lockfile && pnpm run db:migration:run && pnpm run db:ensure-embeddings"

# Let's Encrypt requires acme.json to be 600 (Traefik refuses 644)
[[ -f "$SCRIPT_DIR/traefik/letsencrypt/acme.json" ]] && chmod 600 "$SCRIPT_DIR/traefik/letsencrypt/acme.json"

echo "Starting full stack..."
cd "$SCRIPT_DIR"
docker compose -f docker-compose.yml --env-file "$ENV_FILE" up -d

echo "Deploy complete."
