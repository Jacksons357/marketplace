import { Product } from "../entities/Product";

export interface ListProductFilters {
  page?: number
  limit?: number
  category?: string
  priceMin?: number
  priceMax?: number
  search?: string
}

export interface IProductRepository {
  create(product: Product): Promise<Product>
  findByOrganization(organizationId: string, filters?: ListProductFilters): Promise<Product[]>
}