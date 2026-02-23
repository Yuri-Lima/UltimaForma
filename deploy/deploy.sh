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

echo "Starting Postgres and Redis..."
docker compose -f docker-compose.prod.yml --env-file "$ENV_FILE" up -d postgres redis

echo "Waiting for Postgres..."
sleep 5

echo "Running migrations (if necessary)..."
# Run migrations via Docker so the host doesn't need Node/pnpm.
# Uses .env.prod with DB_HOST=postgres (container network).
# TypeORM migration:run only applies pending migrations (idempotent).
docker run --rm \
  --network ultimaforma_default \
  -v "$PROJECT_ROOT:/app" \
  -w /app \
  --env-file "$ENV_FILE" \
  -e DB_HOST=postgres \
  -e REDIS_HOST=redis \
  node:22-alpine \
  sh -c "corepack enable && corepack prepare pnpm@latest --activate && pnpm install --frozen-lockfile && pnpm run db:migration:run"

echo "Starting full stack..."
cd "$SCRIPT_DIR"
docker compose -f docker-compose.prod.yml --env-file "$ENV_FILE" up -d

echo "Deploy complete."
