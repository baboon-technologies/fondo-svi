# Docker Setup for SVI US Markets

## Quick Start

### Using Docker Compose (Recomendado)

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

### Using Docker directly

```bash
# Build the image
docker build -t svi-factsheet .

# Run the container
docker run -p 5173:5173 --env-file .env svi-factsheet

# Run in detached mode
docker run -d -p 5173:5173 --env-file .env --name svi-app svi-factsheet
```

## Access the Application

Once running, access the application at:
- Local: http://localhost:5173
- Network: http://YOUR_SERVER_IP:5173

## Environment Variables

Make sure your `.env` file contains all necessary environment variables:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Production Deployment

For production, you can push the image to a registry:

```bash
# Tag the image
docker tag svi-factsheet your-registry/svi-factsheet:latest

# Push to registry
docker push your-registry/svi-factsheet:latest

# Pull and run on production server
docker pull your-registry/svi-factsheet:latest
docker run -d -p 5173:5173 --env-file .env --restart unless-stopped your-registry/svi-factsheet:latest
```

## Docker Image Features

- **Multi-stage build**: Optimized for minimal image size
- **Non-root user**: Runs as unprivileged user for security
- **Production optimized**: Uses Next.js standalone output
- **Alpine Linux**: Lightweight base image
- **Health checks ready**: Can be extended with health check endpoints

## Troubleshooting

### Container won't start
```bash
# Check logs
docker logs svi-app

# Check if port is already in use
lsof -i :5173
```

### Rebuild after changes
```bash
# Remove old image and rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```
