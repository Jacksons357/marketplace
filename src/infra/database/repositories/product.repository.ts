import { Product } from "../../../domain/entities/Product";
import { IProductRepository, ListProductFilters, ProductAdminDeleteParams, ProductAdminUpdateParams } from "../../../domain/repositories/IProductRepository";
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

  async findById(productId: string): Promise<Product | null> {
    return await prisma.product.findUnique({
      where: {
        id: productId,
      }
    })
  }

  async update(params: ProductAdminUpdateParams): Promise<Product> {
    const { productId, data } = params
    return await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...data,
      }
    })
  }

  async delete(params: ProductAdminDeleteParams): Promise<Product> {
    return await prisma.product.delete({
      where: {
        id: params.productId,
        organizationId: params.organizationId,
      }
    })
  }
}