FROM node:20-alpine AS base

FROM base AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci
COPY . .

RUN npm run build

FROM base AS runner
WORKDIR /app

RUN apk update
RUN apk add --no-cache nginx
RUN adduser -D -g 'www' www
RUN chown -R www:www /var/lib/nginx
RUN chown -R www:www /app

COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

CMD ["sh", "-c", "nginx && npm start"]
