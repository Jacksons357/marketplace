FROM node:20-bullseye AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn config set enableScripts true
RUN yarn install --frozen-lockfile --unsafe-perm

COPY . .

RUN yarn prisma generate
