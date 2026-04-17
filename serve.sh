#!/bin/sh
# Serves this folder — run: ./serve.sh
# If 8080 is busy: PORT=8765 ./serve.sh
cd "$(dirname "$0")" || exit 1
PORT="${PORT:-8080}"
echo "Open http://127.0.0.1:${PORT}  (http not https; Ctrl+C to stop)"
exec python3 -m http.server "$PORT" --bind 127.0.0.1
