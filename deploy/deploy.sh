#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="${1:-$SCRIPT_DIR/.env.prod}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Error: .env.prod not found. Copy .env.example to deploy/.env.prod and fill values."
  echo "Usage: ./deploy.sh [path-to-.env.prod]"
  exit 1
fi

export COMPOSE_PROJECT_NAME=ultimaforma
cd "$SCRIPT_DIR"

echo "Starting Postgres and Redis..."
docker compose -f docker-compose.prod.yml --env-file "$ENV_FILE" up -d postgres redis

echo "Waiting for Postgres..."
sleep 5

echo "Running migrations..."
set -a
source "$ENV_FILE"
set +a
cd "$PROJECT_ROOT"
# DB_HOST=127.0.0.1 in .env.prod for migration (postgres port 5432 exposed to localhost)
pnpm run db:migration:run

echo "Starting full stack..."
cd "$SCRIPT_DIR"
docker compose -f docker-compose.prod.yml --env-file "$ENV_FILE" up -d

echo "Deploy complete."
