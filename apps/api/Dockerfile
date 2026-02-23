FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build:api

FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/dist/apps/api .
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --prod --ignore-scripts
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "main.js"]
