import sys
import os

# Add parent directory to path so main.py can be imported
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app

# Export for Vercel Serverless Function
handler = app
