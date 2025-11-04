# Marketplace

Este é o projeto Marketplace, desenvolvido com:

**Backend**
Node.js, TypeScript, Fastify, Prisma e PostgreSQL.
- Principios de Clean Architecture
- SOLID Principles
- DDD
- Clean CODE

**Frontend**
Next.js, TypeScript, TailwindCSS e React.
- Componentes reutilizáveis
- Páginas estáticas e dinâmicas
- Rotas dinâmicas
- API Routes
- Server-Side Rendering (SSR)
- Client-Side Rendering (CSR)

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

3. Copie o arquivo de exemplo de variáveis de ambiente do back-end:
```bash
cd backend
cp .env.example .env
```

4. Configure as variáveis de ambiente no arquivo `.env` conforme necessário. Os valores padrão já estão configurados para desenvolvimento local.
- Crie sua conta no ollama para utilizar o modelo de linguagem: [Ollama](https://ollama.com/settings/keys)
- Adicione sua chave de API no arquivo `.env` como `OLLAMA_API_KEY=your_api_key`

5. Volte para a pasta raiz do projeto e copie o arquivo de exemplo de variáveis de ambiente do front-end:
```bash
cd ..
cd frontend
cp .env.example .env.local
```

6. Configure as variáveis de ambiente no arquivo `.env.local` conforme necessário. Os valores padrão já estão configurados para desenvolvimento local.
- Caso queira configurar supabase para utilizar o bucket: [Supabase](https://supabase.com/)

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
- **Rotas API - Swagger Docs**: http://localhost:3333/docs
- **Prisma Studio**: http://localhost:5555
- **Banco de Dados**: localhost:5432
- **Frontend**: http://localhost:3000

## Logs

<img width="1892" height="807" alt="image" src="https://github.com/user-attachments/assets/c06097f5-b785-4723-951c-d4928d53ebd3" />

Para visualizar e analisar os registros de requisições, é necessário autenticar-se com as credenciais de acesso abaixo:

```
username: dev
password: falcoes
```

Após inserir as informações acima no formulário, o sistema exibirá todos os logs registrados, incluindo rota, método HTTP, status da resposta, tempo de latência e data da requisição.


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

```
frontend/
│   ├── app/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── lib/
│   ├── public/
│   ├── types/
│   └── utils/
```

## Desenvolvimento

- O código fonte é automaticamente sincronizado com o container Docker
- A documentação dos endpoints está disponível em http://localhost:3333/docs
- As alterações no código são recarregadas automaticamente
- O Prisma Studio permite visualizar e editar dados do banco

## Modelagem de Dados

### Organization
- `id`: string (PK, UUID)
- `name`: string
- `description`: string (opcional)
- `users`: relação 1:N com `User`
- `products`: relação 1:N com `Product`
- `orders`: relação 1:N com `Order`
- `createdAt`: DateTime (default now)
- `updatedAt`: DateTime (atualizado automaticamente)

### User
- `id`: string (PK, UUID)
- `name`: string
- `email`: string (único)
- `phone`: string (opcional, único)
- `passwordHash`: string
- `role`: enum `UserRole` (default `USER`)
- `organizationId`: string (FK opcional)
- `organization`: relação N:1 com `Organization`
- `orders`: relação 1:N com `Order`
- `createdAt`: DateTime (default now)
- `updatedAt`: DateTime (atualizado automaticamente)

### UserRole (Enum)
- `ADMIN`
- `USER`

### Product
- `id`: string (PK, UUID)
- `organizationId`: string (FK)
- `organization`: relação N:1 com `Organization`
- `name`: string
- `description`: string (opcional)
- `price`: Decimal(10,2)
- `category`: string
- `imageUrl`: string (opcional)
- `stockQty`: int
- `weightGrams`: int
- `createdAt`: DateTime (default now)
- `updatedAt`: DateTime (atualizado automaticamente)
- `orderItems`: relação 1:N com `OrderItem`

### Order
- `id`: string (PK, UUID)
- `userId`: string (FK)
- `user`: relação N:1 com `User`
- `organizationId`: string (FK)
- `organization`: relação N:1 com `Organization`
- `items`: relação 1:N com `OrderItem`
- `totalPrice`: float
- `status`: enum `OrderStatus` (default `PENDING`)
- `createdAt`: DateTime (default now)
- `updatedAt`: DateTime (atualizado automaticamente)

### OrderItem
- `id`: string (PK, UUID)
- `orderId`: string (FK)
- `order`: relação N:1 com `Order`
- `productId`: string (FK)
- `product`: relação N:1 com `Product`
- `organizationId`: string
- `quantity`: int
- `priceAtPurchase`: float
- `createdAt`: DateTime (default now)
- `updatedAt`: DateTime (atualizado automaticamente)

### OrderStatus (Enum)
- `PENDING`
- `CONFIRMED`
- `CANCELLED`

### Log
- `id`: string (PK, UUID)
- `userId`: string (opcional)
- `organizationId`: string (opcional)
- `route`: string
- `method`: string
- `status`: int
- `latencyMs`: int
- `payload`: JSON (opcional)
- `createdAt`: DateTime (default now)

### AiSearchLog
- `id`: string (PK, UUID)
- `userId`: string (opcional)
- `organizationId`: string (opcional)
- `query`: string
- `filters`: JSON
- `success`: boolean
- `fallbackApplied`: boolean
- `createdAt`: DateTime (default now)

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
