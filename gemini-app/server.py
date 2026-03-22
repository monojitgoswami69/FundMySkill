import os
import sys
from pathlib import Path

# Add current directory to Python path so modules can be imported
current_dir = str(Path(__file__).parent)
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

import uvicorn

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=9999,
        reload=True,
    )
