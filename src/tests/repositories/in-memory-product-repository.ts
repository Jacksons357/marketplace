import { Product } from "../../domain/entities/Product"
import { IProductRepository, ProductAdminUpdateParams } from "../../domain/repositories/IProductRepository"

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

  async delete(id: string): Promise<void> {
    this.items = this.items.filter(item => item.id !== id)
  }

  clear() {
    this.items = []
  }
}
