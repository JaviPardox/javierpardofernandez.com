FROM python:3.12.5-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

# Create a non-root user for security
RUN adduser --disabled-password --gecos "" appuser
USER appuser

CMD ["gunicorn", "-c", "gunicorn_conf.py", "main:app"] 