# Stage 1: Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root and subpackage files
COPY package.json ./
COPY server/package.json ./server/
COPY client/package.json ./client/

# Install dependencies
RUN npm install
RUN cd server && npm install
RUN cd client && npm install

# Copy source files
COPY server ./server
COPY client ./client

# Build Backend & Frontend
RUN npm run build:server
RUN npm run build:client

# Stage 2: Production Runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/node_modules ./server/node_modules
COPY --from=builder /app/client/dist ./client/dist

EXPOSE 5000

CMD ["node", "server/dist/server.js"]
