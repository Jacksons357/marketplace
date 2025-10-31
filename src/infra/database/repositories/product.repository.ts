import { Product } from "../../../domain/entities/Product";
import { IProductRepository } from "../../../domain/repositories/IProductRepository";
import { prisma } from "../prisma/client";

export class ProductRepository implements IProductRepository {
  async create(product: Product): Promise<Product> {
    return await prisma.product.create({
      data: {
        id: product.id,
        organizationId: product.organizationId,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        imageUrl: product.imageUrl,
        stockQty: product.stockQty,
        weightGrams: product.weightGrams,
      },
    });
  }
}