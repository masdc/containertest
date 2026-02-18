# Stage 1: Build Frontend
FROM node:alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Backend
FROM node:alpine AS backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
RUN npm run build

# Stage 3: Final Image
FROM node:alpine
WORKDIR /app

# Copy backend build and dependencies. 
COPY --from=backend-build /app/backend/dist /app/backend/dist
COPY --from=backend-build /app/backend/package*.json /app/backend/
WORKDIR /app/backend
RUN npm install --omit=dev

# Copy frontend static files
COPY --from=frontend-build /app/frontend/dist /app/frontend/dist

# Set permissions (important for some environments).
USER node

EXPOSE 5000
CMD ["npm", "start"]


