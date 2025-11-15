# Stage 1: Install dependencies
FROM node:20-slim AS deps
WORKDIR /usr/src/app

# Copy package.json and lockfile
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Stage 2: Build the application
FROM node:20-slim AS builder
WORKDIR /usr/src/app

# Copy dependencies from the 'deps' stage
COPY --from=deps /usr/src/app/node_modules ./node_modules
# Copy the rest of the application source code
COPY . .

# Set build-time environment variables if needed
# ARG NEXT_PUBLIC_...
# ENV NEXT_PUBLIC_...

# Build the Next.js application
RUN npm run build

# Stage 3: Production image
FROM node:20-slim AS runner
WORKDIR /usr/src/app

ENV NODE_ENV=production

# Copy the standalone Next.js server output
COPY --from=builder /usr/src/app/.next/standalone ./
# Copy the public and static assets
COPY --from=builder /usr/src/app/.next/static ./.next/static
COPY --from=builder /usr/src/app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
