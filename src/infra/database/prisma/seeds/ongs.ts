import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedOngs() {
  console.log("🌱 Seeding ONGs...");

  const ongs = await prisma.organization.createMany({
    data: [
      {
        name: "ONG Coração Solidário",
        description: "Ajuda comunidades com produtos artesanais.",
      },
      {
        name: "ONG Mãos Amigas",
        description: "Focada em sustentabilidade e produtos reciclados.",
      },
    ],
  });

  console.log("✅ ONGs criadas com sucesso!");
  return prisma.organization.findMany();
}
