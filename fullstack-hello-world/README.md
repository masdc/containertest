# Fullstack Hello World (Dockerized)

A basic web application with a React frontend (Tailwind CSS), Node.js/Express backend, and Postgres database.

## Architecture

- **Frontend & Backend**: Built into a single Docker container. The Express backend serves the React static files and provides an API.
- **Database**: Postgres running in a separate Docker container.
- **Orchestration**: Docker Compose.

## How to Run

1. Make sure you have Docker and Docker Compose installed.
2. Run the following command in the root directory:

   ```bash
   docker compose up --build
   ```

3. Open your browser and navigate to [http://localhost:5000](http://localhost:5000).

If you previously ran a different Postgres major version and DB startup fails, reset the local DB volume and start again:

```bash
docker compose down -v
docker compose up --build
```

## Project Structure

```
fullstack-hello-world
├── backend           # Node.js + Express
├── frontend          # React + Vite + Tailwind
├── Dockerfile        # Combined build (Front+Back)
├── docker-compose.yml
└── .env
```
