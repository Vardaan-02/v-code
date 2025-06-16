# ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Copy source + tsconfig
COPY tsconfig.json ./
COPY src ./src

# Build TypeScript project
RUN npm run build

# ---------- Stage 2: Run ----------
FROM node:20-alpine

WORKDIR /app

# Copy built output and prod deps
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --omit=dev

# Expose port (adjust if needed)
EXPOSE 3000

# Start your app
CMD ["node", "dist/index.js"]
