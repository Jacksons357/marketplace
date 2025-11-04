import { Decimal } from "@prisma/client/runtime/library";
import { Product } from "../../../domain/entities/Product";
import { IProductRepository, ListProductFilters, ProductAdminDeleteParams, ProductAdminUpdateParams } from "../../../domain/repositories/IProductRepository";
import { prisma } from "../prisma/client";

function mapPrismaProductToEntity(prismaProduct: any): Product {
  return new Product(
    prismaProduct.id,
    prismaProduct.organizationId,
    prismaProduct.name,
    prismaProduct.description,
    prismaProduct.price instanceof Decimal ? prismaProduct.price.toNumber() : prismaProduct.price,
    prismaProduct.category,
    prismaProduct.imageUrl,
    prismaProduct.stockQty,
    prismaProduct.weightGrams,
    prismaProduct.createdAt,
    prismaProduct.updatedAt,
  );
}

export class ProductRepository implements IProductRepository {
  async create(product: Product): Promise<Product> {
    const created  = await prisma.product.create({
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

    return mapPrismaProductToEntity(created)
  }

  async findByOrganization(organizationId: string, filters?: ListProductFilters): Promise<Product[]> {
    const {
      page = 1,
      limit = 12,
      category,
      priceMin,
      priceMax,
      search,
    } = filters || {}

    const skip = (page - 1) * limit

    const products = await prisma.product.findMany({
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
    
    return products.map(mapPrismaProductToEntity)
  }

  async findById(productId: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      }
    })

    return product ? mapPrismaProductToEntity(product) : null
  }

  async update(params: ProductAdminUpdateParams): Promise<Product> {
    const { productId, data } = params
    const updated = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...data,
      }
    })

    return mapPrismaProductToEntity(updated)
  }

  async delete(params: ProductAdminDeleteParams): Promise<Product> {
    const deleted = await prisma.product.delete({
      where: {
        id: params.productId,
        organizationId: params.organizationId,
      }
    })

    return mapPrismaProductToEntity(deleted)
  }

  async list(filters?: ListProductFilters): Promise<Product[]> {
    const {
      page = 1,
      limit = 12,
      category,
      priceMin,
      priceMax,
      search,
    } = filters || {}
    const skip = (page - 1) * limit
    const products = await prisma.product.findMany({
      where: {
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
    
    return products.map(mapPrismaProductToEntity)
  }

  async search(filters: ListProductFilters): Promise<Product[]> {
    const {
      search,
      category,
      priceMin,
      priceMax,
      page = 1,
      limit = 12
    } = filters

    const skip = (page - 1) * limit

    const products = await prisma.product.findMany({
      where: {
        AND: [
          ...(priceMin || priceMax
            ? [{ price: { ...(priceMin ? { gte: priceMin } : {}), ...(priceMax ? { lte: priceMax } : {}) } }]
            : []),
          search
            ? {
                OR: [
                  { name: { contains: search, mode: 'insensitive' } },
                  { description: { contains: search, mode: 'insensitive' } },
                  { category: { contains: search, mode: 'insensitive' } },
                ]
              }
            : {},
          category && category !== search
            ? { category: { contains: category, mode: 'insensitive' } }
            : {},
        ]
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    })
    
    return products.map(mapPrismaProductToEntity)
  }

  async listCategories(): Promise<string[]> {
    const categories = await prisma.product.findMany({
      distinct: ["category"],
      select: { category: true },
    })
    return categories.map((p) => p.category)
  }

  async findAll(ids: string[]) {
    const products = await prisma.product.findMany({
      where: { id: { in: ids } }
    })
    return products.map(mapPrismaProductToEntity)
  }
}