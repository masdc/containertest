# Fullstack Hello World (Dockerized)

A basic web application with a React frontend (Tailwind CSS), Node.js/Express backend, and Postgres database.

## Architecture

- **Frontend**: React + Vite running in its own container.
- **Backend**: Node.js + Express API running in its own container.
- **Database**: Postgres running in its own container.
- **Orchestration**: Docker Compose.

## How to Run

1. Make sure you have Docker and Docker Compose installed.
2. Create your local environment file from the template:

   ```bash
   cp .env.example .env
   ```
3. For local development (with local Postgres container), run:

   ```bash
   docker compose --profile local up --build
   ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

If you previously ran a different Postgres major version and DB startup fails, reset the local DB volume and start again:

```bash
docker compose down -v
docker compose --profile local up --build
```

## Local vs Production Database

- Local: `.env` contains `DATABASE_URL=postgres://user:password@db:5432/mydatabase` and you start with `--profile local`.
- Production: GitHub Action deploy uses `PROD_DATABASE_URL` repository secret and runs `docker compose up --build -d` (without `--profile local`), so no local Postgres container is started on VPS.
- Template: `.env.example` provides local defaults and a production `DATABASE_URL` format example.

## Project Structure

```
fullstack-hello-world
├── backend           # Node.js + Express container
├── frontend          # React + Vite container
├── docker-compose.yml
└── .env
```
