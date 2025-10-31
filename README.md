# Marketplace Multi-ONG

Uma API para gerenciamento de marketplace com suporte a múltiplas ONGs.

Principios: SOLID, DDD, Clean code e Clean architecture.

---

## 🚀 Instalação

Clone o repositório:

```bash
git clone https://github.com/Jacksons357/marketplace-backend.git
cd marketplace-backend
```

Instale as dependências:

```bash
yarn install
```

Crie um arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Inicie o banco de dados e a aplicação:

```bash
docker-compose up --build -d
```

Acesse a documentação da API em [http://localhost:3333/docs](http://localhost:3333/docs).

Rode os seeds para popular o banco de dados:

```bash
yarn docker:seed
```

---

## 📁 Estrutura do Projeto

```
marketplace-backend/
├── src/
│   ├── application/
│   │   ├── controllers/
│   │   ├── dtos/
│   │   └── services/
│   ├── domain/
│   │   ├── entities/
│   │   ├── repositories/
│   │   └── use-cases/
│   ├── infra/
│   │   ├── database/
│   │   │   ├── prisma/
│   │   │   └── repositories/
│   │   ├── factories/
│   │   └── http/
│   │   │   ├── middlewares/
│   │   │   └── routes/
│   ├── presentation/
│   │   └── docs/
│   ├── shared/
│   │   └── errors/
│   ├── tests/
│   │   ├── repositories/
│   │   └── use-cases/
│   ├── types/
│   ├── utils/
│   ├── app.ts
│   ├── server.ts
├── .dockerignore
├── .env.example
├── .gitignore
├── Dockerfile
├── README.md
├── docker-compose.yml
├── docker-entrypoint.sh
├── package.json
├── tsconfig.json
└── yarn.lock
```

---
