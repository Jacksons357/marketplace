FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache netcat-openbsd openssl openssl-dev
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

RUN npx prisma generate --schema src/infra/database/prisma/schema.prisma

RUN yarn build

EXPOSE 3333

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["yarn", "start"]