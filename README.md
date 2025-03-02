# My Website

A full-stack web application with React frontend and FastAPI backend.

## Development with Hot Reloading

This project is set up for development with hot reloading, allowing you to see changes in real-time without rebuilding containers.

### Getting Started

1. Start the development environment:
   ```bash
   ./dev.sh
   ```
   or
   ```bash
   docker-compose up
   ```

2. Access your application:
   - Frontend: http://localhost:3000 (React development server with hot reloading)
   - Backend API: http://localhost:8000 (FastAPI with auto-reload)

### How Hot Reloading Works

- **Frontend**: The React development server automatically reloads when you make changes to your frontend code.
- **Backend**: The FastAPI server runs with the `--reload` flag, which watches for file changes and restarts the server.

### Development Workflow

1. Make changes to your frontend or backend code
2. Save the files
3. The changes will be automatically detected and applied
4. Refresh your browser if needed (React hot reloading often doesn't require a refresh)

## API Request Handling

The application is configured to handle API requests differently in development and production:

### Development
- `NODE_ENV` is set to `development` in the docker-compose.yml file
- API requests from the frontend are sent directly to the backend at `http://localhost:8000`
- This is configured automatically in the axios setup based on `NODE_ENV`
- Image URLs returned by the backend are automatically prefixed with the backend URL

### Production
- `NODE_ENV` is set to `production` in the docker-compose.prod.yml file
- API requests use relative paths (e.g., `/job-info`, `/blog`, etc.)
- Nginx proxies these requests to the backend service
- Image URLs work as relative paths, served through nginx
- This maintains the original architecture while enabling development mode

## Production Deployment

For production deployment, we use optimized builds without hot reloading:

```bash
./prod.sh
```
or
```bash
docker-compose -f docker-compose.prod.yml up --build
```

### Production Setup

- Frontend: Built with optimized production settings and served by Nginx
- Backend: Running without the development reload flag for better performance
- Configuration: Uses production-specific Nginx configuration

## Project Structure

- `/frontend` - React application
- `/backend` - FastAPI application
- `/nginx` - Nginx configuration files
  - `nginx.prod.conf` - Production configuration 