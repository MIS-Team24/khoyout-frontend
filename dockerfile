FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm 

RUN pnpm install

COPY . .

RUN pnpm run build

FROM cgr.dev/chainguard/nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080