import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPrice(min = 5, max = 200) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

const adjectives = [
  "Solidário",
  "Ecológico",
  "Reciclado",
  "Artesanal",
  "Orgânico",
  "Sustentável",
  "Premium",
  "Local",
  "Natural",
  "Feito à Mão",
];

const items = [
  "Camiseta",
  "Bolsa",
  "Copo",
  "Caneca",
  "Chaveiro",
  "Pulseira",
  "Cesta",
  "Sabonete",
  "Velas",
  "Doce",
  "Café",
  "Chá",
  "Pote",
  "Kit",
  "Poster",
  "Quadro",
  "Toalha",
  "Boné",
  "Agenda",
  "Caderno",
];

const categories = [
  "Acessórios",
  "Vestuário",
  "Alimentos",
  "Artesanato",
  "Decoração",
  "Higiene",
  "Doces",
];

function makeProduct(organizationId: string, idx: number) {
  const name = `${items[idx % items.length]} ${adjectives[randomInt(0, adjectives.length - 1)]}`;
  const category = categories[randomInt(0, categories.length - 1)];
  return {
    name,
    description: `Produto ${name.toLowerCase()} criado para apoiar causas locais.`,
    price: randomPrice(),
    category,
    imageUrl: "/images/cafeteira.jpg",
    stockQty: randomInt(5, 100),
    weightGrams: randomInt(50, 2000),
    organizationId,
  };
}

export async function seedProducts(ongs: any[]) {
  console.log("🌱 Seeding Products...");

  if (!ongs || ongs.length === 0) {
    console.log("⚠️ Nenhuma ONG disponível para criar produtos.");
    return;
  }

  for (let i = 0; i < ongs.length; i++) {
    const orgId = ongs[i].id;
    const count = await prisma.product.count({ where: { organizationId: orgId } });
    const needed = Math.max(0, 20 - count);

    if (needed === 0) {
      console.log(`➡️ Organização ${orgId} já possui pelo menos 20 produtos (atual: ${count}). Pulando.`);
      continue;
    }

    const toCreate = Array.from({ length: needed }, (_, idx) => makeProduct(orgId, idx));
    await prisma.product.createMany({ data: toCreate });
    console.log(`✅ Criados ${needed} produtos para organização ${orgId}.`);
  }

  console.log("🌱 Seed de produtos concluído!");
}
