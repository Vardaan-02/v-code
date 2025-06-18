# Stage 1: Build
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build TypeScript
RUN npx tsc

# Stage 2: Runtime
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Only copy production deps and build output
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Start the app
CMD ["node", "dist/index.js"]
