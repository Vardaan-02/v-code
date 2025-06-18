FROM node:20-alpine

WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache \
  bash \
  python3 \
  py3-pip \
  g++ \
  make \
  libc6-compat \
  libstdc++

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
