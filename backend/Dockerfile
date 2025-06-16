# Stage 1: Build with full tooling
FROM node:20-bookworm AS builder

WORKDIR /app

# Install Python and build tools needed for node-pty
RUN apt-get update && \
    apt-get install -y python3 g++ make && \
    apt-get clean

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npx tsc

# Stage 2: Production image
FROM node:20-slim AS production

WORKDIR /app

COPY package*.json ./
RUN apt-get update && apt-get install -y python3 g++ make && npm install --omit=dev && apt-get remove -y python3 g++ make && apt-get clean

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]
