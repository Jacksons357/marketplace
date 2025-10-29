import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedProducts(ongs: any[]) {
  console.log("🌱 Seeding Products...");

  const productsOng1 = [
    {
      name: "Cesta Artesanal de Palha",
      description: "Feita à mão por artesãs locais.",
      price: 45.5,
      category: "Artesanato",
      imageUrl: "https://picsum.photos/200",
      stockQty: 10,
      weightGrams: 500,
      organizationId: ongs[0].id,
    },
    {
      name: "Doce de Abóbora Caseiro",
      description: "Produzido com ingredientes orgânicos.",
      price: 15.9,
      category: "Alimentos",
      imageUrl: "https://picsum.photos/200",
      stockQty: 25,
      weightGrams: 250,
      organizationId: ongs[0].id,
    },
    {
      name: "Pote de Abacate",
      description: "Pote de abacate natural, 100% orgânico.",
      price: 29.9,
      category: "Alimentos",
      imageUrl: "https://picsum.photos/200",
      stockQty: 30,
      weightGrams: 150,
      organizationId: ongs[0].id,
    },
    {
      name: "Pote de Frango",
      description: "Pote de frango natural, 100% orgânico.",
      price: 39.9,
      category: "Alimentos",
      imageUrl: "https://picsum.photos/200",
      stockQty: 30,
      weightGrams: 150,
      organizationId: ongs[0].id,
    },
    {
      name: "Pote de Ovo",
      description: "Pote de ovo natural, 100% orgânico.",
      price: 29.9,
      category: "Alimentos",
      imageUrl: "https://picsum.photos/200",
      stockQty: 30,
      weightGrams: 150,
      organizationId: ongs[0].id,
    },
  ];

  const productsOng2 = [
    {
      name: "Camiseta Ecológica",
      description: "Produzida com algodão orgânico.",
      price: 39.9,
      category: "Vestuário",
      imageUrl: "https://picsum.photos/200",
      stockQty: 20,
      weightGrams: 300,
      organizationId: ongs[1].id,
    },
    {
      name: "Bolsa Reciclada",
      description: "Feita com material reciclável.",
      price: 59.9,
      category: "Acessórios",
      imageUrl: "https://picsum.photos/200",
      stockQty: 15,
      weightGrams: 400,
      organizationId: ongs[1].id,
    },
    {
      name: "Caneca Reciclada",
      description: "Feita com material reciclável.",
      price: 29.9,
      category: "Acessórios",
      imageUrl: "https://picsum.photos/200",
      stockQty: 15,
      weightGrams: 400,
      organizationId: ongs[1].id,
    },
    {
      name: "Caneta Reciclada",
      description: "Feita com material reciclável.",
      price: 19.9,
      category: "Acessórios",
      imageUrl: "https://picsum.photos/200",
      stockQty: 15,
      weightGrams: 400,
      organizationId: ongs[1].id,
    },
    {
      name: "Lápis Reciclado",
      description: "Feita com material reciclável.",
      price: 9.9,
      category: "Acessórios",
      imageUrl: "https://picsum.photos/200",
      stockQty: 15,
      weightGrams: 400,
      organizationId: ongs[1].id,
    },
  ];

  await prisma.product.createMany({ data: [...productsOng1, ...productsOng2] });

  console.log("✅ Produtos criados com sucesso!");
}
