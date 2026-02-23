#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
REGISTRY="yurimatoslima"

# Version: arg > git tag > package.json
if [[ -n "$1" ]]; then
  TAG="$1"
elif TAG=$(git -C "$PROJECT_ROOT" describe --tags --abbrev=0 2>/dev/null); then
  TAG="${TAG#v}"
else
  TAG=$(node -p "require('$PROJECT_ROOT/package.json').version")
fi

echo "Building and pushing images with tag: $TAG"
cd "$PROJECT_ROOT"

for app in api web worker; do
  img="${REGISTRY}/ultimaforma-${app}"
  docker build -t "${img}:${TAG}" -f "apps/${app}/Dockerfile" .
  docker tag "${img}:${TAG}" "${img}:latest"
  docker push "${img}:${TAG}"
  docker push "${img}:latest"
done

echo "All images pushed as :${TAG} and :latest"
