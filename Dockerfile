# SAHAAY Full-Stack Production Container
FROM node:22-slim AS builder

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./
COPY server/package.json server/package-lock.json ./server/
COPY client/package.json client/package-lock.json ./client/
COPY prisma ./prisma

# Install dependencies and generate Prisma Client
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN npm ci
RUN npm --prefix server ci
RUN npm --prefix client ci
RUN npx prisma generate --schema=./prisma/schema.prisma
RUN npm --prefix server run prisma:generate

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
FROM node:22-slim AS runner

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

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN mkdir -p /app/storage/documents

EXPOSE 5000

CMD ["sh", "-c", "npx prisma generate --schema=./prisma/schema.prisma && cp -r node_modules/.prisma server/node_modules/ && (npx prisma db push --schema=./prisma/schema.prisma || true) && node server/dist/index.js"]
