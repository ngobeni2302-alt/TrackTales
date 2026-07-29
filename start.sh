#!/bin/bash
# TrackTales 1-Click Launcher Script

echo "🚂 Starting TrackTales Railway Server..."
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

# Open browser automatically after 1.5 seconds in background
(sleep 1.5 && (xdg-open "http://localhost:8000" || google-chrome "http://localhost:8000" || firefox "http://localhost:8000" || open "http://localhost:8000") 2>/dev/null) &

# Run FastAPI server
if [ -f "./venv/bin/python3" ]; then
    ./venv/bin/python3 main.py
else
    python3 main.py
fi
