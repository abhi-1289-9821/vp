# SAHAAY Full-Stack Production Container
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./
COPY server/package.json server/package-lock.json ./server/
COPY client/package.json client/package-lock.json ./client/
COPY prisma ./prisma

# Install all dependencies and generate Prisma Client
RUN npm ci
RUN npm --prefix server ci
RUN npm --prefix client ci
RUN npx prisma generate

# Copy source code
COPY server/tsconfig.json ./server/
COPY server/src ./server/src
COPY client/tsconfig.json client/vite.config.ts client/tailwind.config.js client/postcss.config.js client/index.html ./client/
COPY client/public ./client/public
COPY client/src ./client/src
COPY client/scripts ./client/scripts

# Build server and client
RUN npm run build:server
RUN npm run build:client

# Production runtime stage
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server/node_modules ./server/node_modules
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/client/dist ./client/dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/server/package.json ./server/package.json

RUN mkdir -p /app/storage/documents

EXPOSE 5000

CMD ["node", "server/dist/index.js"]
