import { Product } from "../../domain/entities/Product"
import { IProductRepository, ListProductFilters, ProductAdminDeleteParams, ProductAdminUpdateParams } from "../../domain/repositories/IProductRepository"

export class InMemoryProductRepository implements IProductRepository {
  private items: Product[] = []

  async create(product: Product): Promise<Product> {
    this.items.push(product)
    return product
  }

  async findById(id: string): Promise<Product | null> {
    return this.items.find(item => item.id === id) || null
  }

  async findByOrganization(orgId: string): Promise<Product[]> {
    return this.items.filter(item => item.organizationId === orgId)
  }

  async update(params: ProductAdminUpdateParams): Promise<Product> {
    const product = await this.findById(params.productId)
    if (!product) throw new Error('Product not found')
    Object.assign(product, params.data)
    return product
  }

  async delete(params: ProductAdminDeleteParams): Promise<Product> {
    const index = this.items.findIndex(
      item => item.id === params.productId && item.organizationId === params.organizationId
    )
    if (index === -1) throw new Error("Product not found")
    const [deleted] = this.items.splice(index, 1)
    return deleted
  }

  async list(filters?: ListProductFilters): Promise<Product[]> {
    let result = [...this.items]

    if (filters) {
      const { category, priceMin, priceMax, search } = filters

      if (category) result = result.filter(p => p.category === category)
      if (priceMin !== undefined) result = result.filter(p => p.price >= priceMin)
      if (priceMax !== undefined) result = result.filter(p => p.price <= priceMax)
      if (search) {
        const lower = search.toLowerCase()
        result = result.filter(
          p => p.name.toLowerCase().includes(lower) || (p.description?.toLowerCase().includes(lower))
        )
      }
    }

    return result
  }

  clear() {
    this.items = []
  }
}