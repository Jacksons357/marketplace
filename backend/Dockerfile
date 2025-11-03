FROM node:20-alpine

WORKDIR /app

# Instalar dependências necessárias
RUN apk add --no-cache \
    netcat-openbsd \
    wget \
    curl \
    openssl \
    openssl-dev

# Copiar arquivos de dependências
COPY package.json yarn.lock ./

# Instalar dependências com cache em camada separada
RUN yarn install --frozen-lockfile

# Copiar o restante dos arquivos do projeto
COPY . .

# Gerar o Prisma Client
RUN yarn prisma generate --schema src/infra/database/prisma/schema.prisma

# Garantir que o script tenha permissões de execução e linha endings corretos
RUN chmod +x docker-entrypoint.sh && \
    sed -i 's/\r$//' docker-entrypoint.sh

# Expor a porta da aplicação
EXPOSE 3333

ENTRYPOINT ["/bin/sh", "./docker-entrypoint.sh"]
CMD ["yarn", "dev"]
