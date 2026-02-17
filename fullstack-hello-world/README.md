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

3. Start all services (frontend, backend, and Postgres database):

   ```bash
   docker compose up --build
   ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

The application includes:
- **Frontend**: Running on port 3000
- **Backend API**: Running on port 5000
- **Postgres Database**: Running on port 5432 (accessible locally)

To stop the services:

```bash
docker compose down
```

To reset the database volume and start fresh:

```bash
docker compose down -v
docker compose up --build
```

## Deployment

For production deployment to Hostinger VPS using Dokploy:

1. Ensure your code is pushed to a GitHub repository.
2. Set up a Dokploy project and configure it to pull from your repository.
3. Configure the `DATABASE_URL` environment variable for your production database in Dokploy.
4. Deploy using Dokploy's deployment interface.

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
├── Dockerfile               # Multi-stage build (if applicable)
└── README.md
```
