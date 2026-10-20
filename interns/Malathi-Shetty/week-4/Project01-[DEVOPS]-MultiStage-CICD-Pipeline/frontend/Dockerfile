FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --ignore-scripts

COPY . .
RUN echo "ENV FILE:" && cat .env.docker

RUN npm run build -- --mode docker


FROM nginx:1.29-alpine

COPY nginx.conf.template /etc/nginx/templates/default.conf.template

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80