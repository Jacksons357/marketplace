# Marketplace Backend

Este é o projeto Marketplace, desenvolvido com Node.js, TypeScript, Prisma e PostgreSQL.

## Pré-requisitos

- [Yarn](https://yarnpkg.com/getting-started/install)
- [Node version: 20](https://nodejs.org/en/download/)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Configuração do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/Jacksons357/marketplace.git
cd marketplace
```

2. Instale as dependências:
```bash
cd backend
yarn install
```

3. Copie o arquivo de exemplo de variáveis de ambiente:
```bash
cd backend
cp .env.example .env
```

4. Configure as variáveis de ambiente no arquivo `.env` conforme necessário. Os valores padrão já estão configurados para desenvolvimento local.

## Executando o Projeto

1. Na pasta raiz do projeto, execute:
```bash
docker-compose up
```

Isso irá:
- Iniciar o banco de dados PostgreSQL
- Executar as migrações do Prisma
- Iniciar a aplicação em modo de desenvolvimento
- Iniciar o Prisma Studio para gerenciamento do banco de dados

## Comandos Úteis

- **Executar os seeds**:
Dentro de /backend rode:
```bash
yarn docker:seed
```

## Serviços Disponíveis

- **API Backend**: http://localhost:3333
- **Prisma Studio**: http://localhost:5555
- **Banco de Dados**: localhost:5432

## Estrutura do Projeto

```
backend/
├── src/
│   ├── application/    # Casos de uso da aplicação
│   ├── domain/        # Entidades e regras de negócio
│   ├── infra/         # Implementações de infraestrutura
│   ├── presentation/  # Controllers e rotas
│   └── shared/        # Recursos compartilhados
```

## Desenvolvimento

- O código fonte é automaticamente sincronizado com o container Docker
- As alterações no código são recarregadas automaticamente
- O Prisma Studio permite visualizar e editar dados do banco

## Troubleshooting

Se encontrar problemas:

1. Verifique se todas as portas necessárias estão disponíveis
2. Certifique-se de que o Docker está rodando
3. Tente reconstruir os containers:
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```
