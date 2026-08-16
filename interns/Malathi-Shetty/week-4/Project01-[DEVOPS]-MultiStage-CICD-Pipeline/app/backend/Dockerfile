# ---------- Builder Stage ----------
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --ignore-scripts

COPY . .

# ---------- Runtime Stage ----------
FROM node:22-alpine AS runtime

WORKDIR /app

RUN addgroup -S flavorforge && \
    adduser -S -G flavorforge flavorforge

COPY --from=builder --chown=flavorforge:flavorforge /app/package*.json ./
COPY --from=builder --chown=flavorforge:flavorforge /app/node_modules ./node_modules
COPY --from=builder --chown=flavorforge:flavorforge /app/src ./src

USER flavorforge

EXPOSE 3000

CMD ["node", "src/server.js"]