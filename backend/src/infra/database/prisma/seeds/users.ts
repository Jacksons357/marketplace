import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

export async function seedUsers(ongs: any[]) {
  const passwordHash = await bcrypt.hash("senha123", 10); // Hash da senha "senha123"

  console.log("🌱 Seeding Users...");

  const org1Id = ongs?.[0]?.id;
  const org2Id = ongs?.[1]?.id ?? org1Id;

  await prisma.user.createMany({
    data: [
      {
        name: "Admin",
        email: "admin@email.com",
        role: "ADMIN",
        passwordHash,
        organizationId: org1Id ?? null,
      },
      {
        name: "Admin 2",
        email: "admin2@email.com",
        role: "ADMIN",
        passwordHash,
        organizationId: org2Id ?? null,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Usuários criados com sucesso!");
}
