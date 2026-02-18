# Environment Configuration Guide

## Quick Start

### Local Development

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Update `.env` with your local settings** (optional - defaults work for local development):
   ```bash
   # Default values are sufficient for Docker Compose local setup
   # Only modify if you need custom database credentials
   ```

3. **Start services:**
   ```bash
   docker compose up --build
   ```

## Environment Files

### `.env.example`
- **Version Control:** ✅ Committed
- **Purpose:** Template for all available environment variables
- **Usage:** Copy to `.env` before running
- **Security:** Contains only examples, safe to share

### `.env` (Local Development)
- **Version Control:** ❌ Not committed (in `.gitignore`)
- **Purpose:** Your local configuration
- **Usage:** Used by Docker Compose when running locally
- **Security:** Contains sensitive data - keep private

### `.env.local` (Optional)
- **Version Control:** ❌ Not committed
- **Purpose:** Additional local-only settings
- **Usage:** Can be used as reference for `.env`

## Environment Variables Reference

### Backend Configuration
| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `5000` | Backend server port |
| `NODE_ENV` | `development` | Node environment (development/production) |
| `DATABASE_URL` | `postgres://user:password@db:5432/mydatabase` | Database connection string |

### Database Configuration
| Variable | Default | Purpose |
|----------|---------|---------|
| `POSTGRES_USER` | `user` | PostgreSQL username |
| `POSTGRES_PASSWORD` | `password` | PostgreSQL password |
| `POSTGRES_DB` | `mydatabase` | PostgreSQL database name |

### Infrastructure
| Variable | Default | Purpose |
|----------|---------|---------|
| `NGINX_HOST` | `localhost` | Nginx host |
| `NGINX_PORT` | `80` | Nginx port |

## Production Deployment (Dokploy/VPS)

### Setup on Dokploy Dashboard:

1. **Do NOT use `.env` file** - Set environment variables directly in Dokploy
2. **Configure these environment variables:**
   ```
   NODE_ENV=production
   PORT=5000
   DATABASE_URL=postgres://[your_prod_user]:[your_prod_password]@[your_prod_host]:5432/[your_prod_db]
   POSTGRES_USER=[your_prod_user]
   POSTGRES_PASSWORD=[your_prod_password]
   POSTGRES_DB=[your_prod_db]
   ```

3. **Security Best Practices:**
   - Use strong database passwords
   - Use a separate database host (not localhost)
   - Keep credentials in Dokploy secrets, not in code
   - Never commit production credentials to git

## Environment Variable Precedence

Docker Compose uses this priority order:

1. **Compose file** (highest priority)
   ```yaml
   environment:
     DATABASE_URL: hardcoded_value
   ```

2. **`.env` file**
   ```
   DATABASE_URL=from_env_file
   ```

3. **System environment variables** 
   ```bash
   export DATABASE_URL=from_system
   ```

4. **Default values** (lowest priority)
   ```yaml
   DATABASE_URL: ${DATABASE_URL:-postgres://user:password@db:5432/mydatabase}
   ```

## Troubleshooting

### "DATABASE_URL not set"
- Check if `.env` file exists
- Verify `DATABASE_URL` is in `.env`
- Run from project root: `docker compose up`

### Database connection fails
- Verify `DATABASE_URL` format: `postgres://user:password@host:port/database`
- Check database container is healthy: `docker compose ps`
- For local dev, ensure host is `db` (not localhost)

### Different values for each environment
- **Local:** Use `.env` (default Docker compose setup)
- **Staging:** Set variables in Dokploy dashboard
- **Production:** Use strong credentials in Dokploy secrets

## Security Checklist

- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` contains only examples, no real secrets
- [ ] `.env` file is never committed to git
- [ ] Production credentials are set in Dokploy, not in `.env`
- [ ] Database password is strong (min 12 chars, mixed case, numbers, symbols)
- [ ] Database host is not exposed to the internet
