import os
from dotenv import load_dotenv

load_dotenv()

FRONTEND_PORT = os.getenv("FRONTEND_PORT", "3000")
PRIVATE_NETWORK_IP = os.getenv("PRIVATE_NETWORK_IP", "localhost")
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

# Define CORS settings based on environment
if ENVIRONMENT == "production":
    PRODUCTION_DOMAIN = os.getenv("PRODUCTION_DOMAIN", "yourdomain.com")
    ALLOWED_ORIGINS = [
        f"https://{PRODUCTION_DOMAIN}",
        f"https://www.{PRODUCTION_DOMAIN}",
        f"http://{PRODUCTION_DOMAIN}",  # Include HTTP for testing or non-HTTPS scenarios
        f"http://www.{PRODUCTION_DOMAIN}"
    ]
    ALLOWED_METHODS = ["GET"]
    ALLOWED_HEADERS = ["Content-Type"]
else:
    ALLOWED_ORIGINS = [
        f"http://{PRIVATE_NETWORK_IP}:{FRONTEND_PORT}",
        "http://localhost:3000"
    ]
    ALLOWED_METHODS = ["*"]
    ALLOWED_HEADERS = ["*"]
