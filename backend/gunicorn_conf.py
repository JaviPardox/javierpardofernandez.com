import multiprocessing
import os

# Gunicorn configuration file
# https://docs.gunicorn.org/en/stable/configure.html

# Server socket
bind = "0.0.0.0:8000"

# Worker processes
# Recommended formula: (2 x $num_cores) + 1
workers = int(os.getenv("GUNICORN_WORKERS", multiprocessing.cpu_count() * 2 + 1))
worker_class = "uvicorn.workers.UvicornWorker"

# Timeout
timeout = 120

# Server mechanics
daemon = False
pidfile = None
umask = 0
user = None
group = None
tmp_upload_dir = None

# Logging
errorlog = "-"
loglevel = "info"
accesslog = "-"
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"'

# Process naming
proc_name = None

# Server hooks
def on_starting(server):
    server.log.info("Starting Gunicorn server with FastAPI application")

def on_exit(server):
    server.log.info("Stopping Gunicorn server")