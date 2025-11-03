#!/bin/sh
# Wait for database to be ready
echo "Waiting for PostgreSQL to be ready..."
while ! nc -z db 5432; do
  sleep 1
done
echo "PostgreSQL is ready!"

# Run migrations
echo "Running database migrations..."
npx prisma migrate deploy --schema src/infra/database/prisma/schema.prisma

# Generate Prisma client if needed
echo "Generating Prisma client..."
npx prisma generate --schema src/infra/database/prisma/schema.prisma

# Execute the passed command
exec "$@"