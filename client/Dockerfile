# Multi-stage Dockerfile for SAHAAY Frontend Client
FROM node:22-alpine AS builder

WORKDIR /app

# Copy root and client dependency specifications
COPY package.json package-lock.json ./
COPY client/package.json client/package-lock.json ./client/

# Install client dependencies
RUN npm --prefix client ci

# Copy client source files and configuration
COPY client/tsconfig.json client/vite.config.ts client/tailwind.config.js client/postcss.config.js client/index.html ./client/
COPY client/public ./client/public
COPY client/src ./client/src
COPY client/scripts ./client/scripts

# Build production bundle
RUN npm --prefix client run build

# Production Nginx web server
FROM nginx:alpine AS runner

COPY --from=builder /app/client/dist /usr/share/nginx/html
COPY client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
