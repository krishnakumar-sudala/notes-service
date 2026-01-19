# -----------------------------
# 1. Build Stage
# -----------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install --production=false

# Copy source code
COPY . .

# Optional: run tests here if needed
# RUN npm test

# -----------------------------
# 2. Runtime Stage
# -----------------------------
FROM node:20-alpine

WORKDIR /app

# Copy only what is needed for runtime
COPY --from=builder /app /app

# Install only production dependencies
RUN npm prune --production

# Security: run as non-root user
USER node

# Expose the app port
EXPOSE 3000

# Start the service
CMD ["node", "app.js"]
