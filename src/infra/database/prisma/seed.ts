import { PrismaClient } from "@prisma/client";
import { seedOngs, seedUsers, seedProducts } from "./seeds";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Iniciando seed...");

  const ongs = await prisma.organization.findMany();
  const createdOngs = ongs.length ? ongs : await seedOngs();
  await seedUsers(createdOngs);
  await seedProducts(createdOngs);

  console.log("🌱 Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
