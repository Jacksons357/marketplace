import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

export async function seedUsers(ongs: any[]) {
  const passwordHash = await bcrypt.hash("senha123", 10); // Hash da senha "senha123"

  console.log("🌱 Seeding Users...");

  await prisma.user.createMany({
    data: [
      {
        name: "Admin",
        email: "admin@email.com",
        role: "ADMIN",
        passwordHash,
      },
      {
        name: "User",
        email: "user@email.com",
        role: "USER",
        passwordHash,
      },
    ],
  });

  console.log("✅ Usuários criados com sucesso!");
}
