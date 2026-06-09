#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/halo-system/backend"

if [ ! -f .env ]; then
  echo "No .env file found. Copy .env.example to .env and configure as needed."
  echo "cp .env.example .env"
fi

npm install
npm run db:setup
npm start
