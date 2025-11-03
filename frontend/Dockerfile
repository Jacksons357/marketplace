# Usar Node 20-alpine
FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache bash git curl

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]
