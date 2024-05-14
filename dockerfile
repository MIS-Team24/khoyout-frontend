FROM node:lts-alpine3.19 AS base

WORKDIR /app

RUN npm install -g pnpm

FROM base AS dependencies

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

FROM base AS build

COPY package.json pnpm-lock.yaml ./

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

RUN pnpm run build

FROM base AS final

COPY --from=build /app/dist ./dist

COPY package.json pnpm-lock.yaml index.html vite.config.ts tsconfig.json tsconfig.node.json postcss.config.js tailwind.config.js ./
COPY public ./public
COPY src ./src

COPY --from=dependencies /app/node_modules ./node_modules

EXPOSE 5173

CMD ["pnpm", "run", "dev"]