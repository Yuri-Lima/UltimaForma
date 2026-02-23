#!/bin/bash
# Publishes the Plano de Negocios article to YouTrack Knowledge Base
#
# Prerequisites:
#   - jq (https://jqlang.github.io/jq/)
#   - curl
#
# Usage:
#   ./publish-to-youtrack-kb.sh
#     (loads YOUTRACK_TOKEN from project root .env)
#   or
#   YOUTRACK_TOKEN="your-permanent-token" ./publish-to-youtrack-kb.sh
#
# To create a token: YouTrack → Profile → Account Security → Permanent tokens

set -e

YOUTRACK_URL="${YOUTRACK_URL:-https://youtrack.ultimaforma.id}"
PROJECT_KEY="${PROJECT_KEY:-UF}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CONTENT_FILE="${SCRIPT_DIR}/plano-negocios-kb.md"

# Load .env from project root if YOUTRACK_TOKEN not already set
if [ -z "$YOUTRACK_TOKEN" ] && [ -f "$PROJECT_ROOT/.env" ]; then
  set -a
  source "$PROJECT_ROOT/.env"
  set +a
fi

if [ -z "$YOUTRACK_TOKEN" ]; then
  echo "Error: YOUTRACK_TOKEN is required."
  echo "Create a permanent token at: $YOUTRACK_URL → Profile → Account Security → Permanent tokens"
  echo ""
  echo "Usage: YOUTRACK_TOKEN='your-token' $0"
  exit 1
fi

if [ ! -f "$CONTENT_FILE" ]; then
  echo "Error: Content file not found: $CONTENT_FILE"
  exit 1
fi

SUMMARY="Plano de Negocios"

# Check for existing article to avoid duplicates
echo "Checking for existing article..."
ARTICLES=$(curl -s \
  -H "Authorization: Bearer $YOUTRACK_TOKEN" \
  -H "Accept: application/json" \
  "$YOUTRACK_URL/api/articles?fields=id,idReadable,summary,project(shortName)&\$top=100")

EXISTING_ID=$(echo "$ARTICLES" | jq -r --arg summary "$SUMMARY" --arg project "$PROJECT_KEY" \
  '.[] | select(.summary == $summary and (.project.shortName // "") == $project) | .idReadable // .id' | head -n 1)

echo "Publishing article to YouTrack Knowledge Base..."
echo "URL: $YOUTRACK_URL"
echo "Project: $PROJECT_KEY"
echo ""

if [ -n "$EXISTING_ID" ]; then
  # Update existing article
  UPDATE_BODY=$(jq -n \
    --arg summary "$SUMMARY" \
    --rawfile content "$CONTENT_FILE" \
    '{ summary: $summary, content: $content }')

  RESPONSE=$(curl -s -w "\n%{http_code}" \
    -X POST \
    -H "Authorization: Bearer $YOUTRACK_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$UPDATE_BODY" \
    "$YOUTRACK_URL/api/articles/$EXISTING_ID?fields=id,idReadable,summary,project(shortName)")

  HTTP_BODY=$(echo "$RESPONSE" | sed '$d')
  HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)

  if [ "$HTTP_CODE" -ge 200 ] && [ "$HTTP_CODE" -lt 300 ]; then
    echo "✓ Article updated successfully!"
    ARTICLE_ID=$(echo "$HTTP_BODY" | jq -r '.idReadable // .id')
    echo "  Article: $ARTICLE_ID"
    echo "  URL: $YOUTRACK_URL/articles/$ARTICLE_ID"
  else
    echo "✗ Failed to update article (HTTP $HTTP_CODE)"
    echo "$HTTP_BODY" | jq '.' 2>/dev/null || echo "$HTTP_BODY"
    exit 1
  fi
else
  # Create new article
  BODY=$(jq -n \
    --arg project "$PROJECT_KEY" \
    --arg summary "$SUMMARY" \
    --rawfile content "$CONTENT_FILE" \
    '{
      project: { shortName: $project },
      summary: $summary,
      content: $content
    }')

  RESPONSE=$(curl -s -w "\n%{http_code}" \
    -X POST \
    -H "Authorization: Bearer $YOUTRACK_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$BODY" \
    "$YOUTRACK_URL/api/articles?fields=id,idReadable,summary,project(shortName)")

  HTTP_BODY=$(echo "$RESPONSE" | sed '$d')
  HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)

  if [ "$HTTP_CODE" -ge 200 ] && [ "$HTTP_CODE" -lt 300 ]; then
    echo "✓ Article created successfully!"
    ARTICLE_ID=$(echo "$HTTP_BODY" | jq -r '.idReadable // .id')
    echo "  Article: $ARTICLE_ID"
    echo "  URL: $YOUTRACK_URL/articles/$ARTICLE_ID"
  else
    echo "✗ Failed to create article (HTTP $HTTP_CODE)"
    echo "$HTTP_BODY" | jq '.' 2>/dev/null || echo "$HTTP_BODY"
    exit 1
  fi
fi
