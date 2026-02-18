# Fullstack Hello World (Dockerized)

A basic web application with a React frontend (Tailwind CSS), Node.js/Express backend, and Postgres database.

## Architecture

- **Frontend**: React application with Vite and Tailwind CSS, running in a Docker container.
- **Backend**: Node.js/Express REST API, running in a Docker container.
- **Database**: PostgreSQL database, running in a Docker container.
- **Orchestration**: Docker Compose manages all three services with automatic service discovery and health checks.

## How to Run Locally

1. Ensure Docker and Docker Compose are installed on your system.
2. Navigate to the project directory:

   ```bash
   cd fullstack-hello-world
   ```

3. **Configure environment variables:**

   ```bash
   cp .env.example .env
   ```
   
   The default values in `.env.example` are suitable for local development with Docker Compose.

4. Start all services (frontend, backend, and Postgres database):

   ```bash
   docker compose up --build
   ```

5. Open your browser and navigate to [http://localhost](http://localhost) (via Nginx proxy).

**Access Points:**
- **Frontend/App**: http://localhost (port 80 via Nginx)
- **Backend API**: http://localhost/api/ (proxied through Nginx)
- **Postgres Database**: localhost:5432 (for local development)

**Useful Commands:**

Stop all services:
```bash
docker compose down
```

Reset database and restart (careful - deletes data):
```bash
docker compose down -v
docker compose up --build
```

View logs:
```bash
docker compose logs -f backend  # Backend logs
docker compose logs -f db       # Database logs
```

## Environment Configuration

See [ENV_SETUP.md](ENV_SETUP.md) for detailed environment variable configuration guide including:
- Quick start setup
- Local development environment
- Production deployment on Dokploy
- Security best practices
- Troubleshooting

## Deployment

### Production Deployment to Hostinger VPS using Dokploy

1. **Prepare your code:**
   - Ensure your code is pushed to a GitHub repository
   - Update `.env.example` with all required variables (without sensitive values)

2. **Set up Dokploy project:**
   - Create a new project in Dokploy
   - Configure it to pull from your GitHub repository
   - Connect your GitHub account for automatic deployments

3. **Configure environment variables in Dokploy:**
   
   Set these in your Dokploy dashboard (don't use `.env` file):
   ```
   NODE_ENV=production
   PORT=5000
   DATABASE_URL=postgres://[your_user]:[your_password]@[your_host]:5432/[your_db]
   POSTGRES_USER=[your_user]
   POSTGRES_PASSWORD=[your_password]
   POSTGRES_DB=[your_db]
   ```

4. **Deploy:**
   - Use Dokploy's deployment interface
   - Your app will be built and deployed automatically

**Security Notes:**
- ✅ Keep production credentials in Dokploy secrets
- ❌ Never commit `.env` files with production values
- ✅ Use strong database passwords
- ✅ Use a managed database service for production (external PostgreSQL)

For detailed environment configuration, see [ENV_SETUP.md](ENV_SETUP.md)

## Project Structure

```
fullstack-hello-world/
├── frontend/                # React + Vite + Tailwind CSS
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.ts
├── backend/                 # Node.js + Express
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml       # Docker Compose configuration
├── nginx.Dockerfile         # Nginx reverse proxy container
├── nginx.conf               # Nginx configuration
├── .env.example             # Environment variables template
├── .env.local               # Local development template (reference)
├── .gitignore               # Git ignore rules
├── ENV_SETUP.md             # Environment configuration guide
└── README.md                # This file
```
