import os
from dotenv import load_dotenv

load_dotenv()

BACKEND_PORT = os.getenv("BACKEND_PORT", "8000")
FRONTEND_PORT = os.getenv("FRONTEND_PORT", "3000")
SERVER_IP = os.getenv("SERVER_IP", "localhost")
