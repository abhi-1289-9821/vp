# Multi-stage Dockerfile for SAHAAY Backend Server
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./
COPY server/package.json server/package-lock.json ./server/
COPY prisma ./prisma

# Install dependencies
RUN npm ci
RUN npm --prefix server ci
RUN npx prisma generate

# Copy server source code and compile
COPY server/tsconfig.json ./server/
COPY server/src ./server/src
RUN npm run build:server

# Production image
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Copy runtime files
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server/node_modules ./server/node_modules
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/server/package.json ./server/package.json

# Storage mount point
RUN mkdir -p /app/storage/documents

EXPOSE 5000

CMD ["node", "server/dist/index.js"]
