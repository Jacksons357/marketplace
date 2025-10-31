import { Product } from "../../../domain/entities/Product";
import { IProductRepository, ListProductFilters } from "../../../domain/repositories/IProductRepository";
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

  async findByOrganization(organizationId: string, filters?: ListProductFilters): Promise<Product[]> {
    const {
      page = 1,
      limit = 10,
      category,
      priceMin,
      priceMax,
      search,
    } = filters || {}

    const skip = (page - 1) * limit

    return prisma.product.findMany({
      where: {
        organizationId,
        ...(category ? { category } : {}),
        ...(priceMin || priceMax
          ? { price: { ...(priceMin ? { gte: priceMin } : {}), ...(priceMax ? { lte: priceMax } : {}) } }
          : {}),
        ...(search
          ? {
              OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
              ]
            }
          : {})
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    })
  }
}