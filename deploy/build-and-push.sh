#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
REGISTRY="yurimatoslima"
ENV_FILE="$SCRIPT_DIR/.env.prod"

# Parse args: optional TAG, optional --update-env
UPDATE_ENV=false
TAG_ARG=""
for arg in "$@"; do
  if [[ "$arg" == "--update-env" ]]; then
    UPDATE_ENV=true
  else
    TAG_ARG="$arg"
  fi
done

# Auto-generate date+build tag when no arg provided
generate_date_build_tag() {
  local counter_file="$SCRIPT_DIR/.build-tag"
  local today
  today=$(date +%Y%m%d)
  local last_tag=""
  local last_date=""
  local last_num=0

  if [[ -f "$counter_file" ]]; then
    last_tag=$(cat "$counter_file")
    last_date="${last_tag%.*}"   # YYYYMMDD
    last_num="${last_tag##*.}"   # N
  fi

  if [[ "$last_date" == "$today" ]]; then
    echo "${today}.$((last_num + 1))"
  else
    echo "${today}.1"
  fi
}

persist_tag() {
  echo "$1" > "$SCRIPT_DIR/.build-tag"
}

# Update .env.prod with IMAGE_TAG (portable: temp file)
update_env_prod() {
  local tag="$1"
  if [[ ! -f "$ENV_FILE" ]]; then
    echo "Warning: $ENV_FILE not found, skipping --update-env"
    return
  fi
  if grep -q '^IMAGE_TAG=' "$ENV_FILE"; then
    sed "s/^IMAGE_TAG=.*/IMAGE_TAG=$tag/" "$ENV_FILE" > "${ENV_FILE}.tmp" && mv "${ENV_FILE}.tmp" "$ENV_FILE"
  else
    echo "IMAGE_TAG=$tag" >> "$ENV_FILE"
  fi
  echo "Updated $ENV_FILE with IMAGE_TAG=$tag"
}

# Version: arg > auto date+build (YYYYMMDD.N)
if [[ -n "$TAG_ARG" ]]; then
  TAG="$TAG_ARG"
else
  TAG=$(generate_date_build_tag)
  persist_tag "$TAG"
fi

echo "Building and pushing images with tag: $TAG"
cd "$PROJECT_ROOT"

# Build for linux/amd64 (typical for cloud servers) even when building on ARM (e.g. Apple Silicon)
PLATFORM="linux/amd64"

for app in api web worker; do
  img="${REGISTRY}/ultimaforma-${app}"
  docker build --platform "$PLATFORM" -t "${img}:${TAG}" -f "apps/${app}/Dockerfile" .
  docker tag "${img}:${TAG}" "${img}:latest"
  docker push "${img}:${TAG}"
  docker push "${img}:latest"
done

echo "All images pushed as :${TAG} and :latest"

if [[ "$UPDATE_ENV" == "true" ]]; then
  update_env_prod "$TAG"
fi
