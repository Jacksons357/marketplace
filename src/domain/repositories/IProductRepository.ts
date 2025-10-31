import { ProductUpdateDTO } from "../../application/dtos/ProductUpdateDTO";
import { Product } from "../entities/Product";

export interface ListProductFilters {
  page?: number
  limit?: number
  category?: string
  priceMin?: number
  priceMax?: number
  search?: string
}

export interface ProductUpdateParams {
  userId: string
  productId: string
  data: ProductUpdateDTO
}

export interface ProductAdminUpdateParams {
  productId: string
  data: ProductUpdateDTO
}

export interface ProductAdminDeleteParams {
  productId: string
  organizationId: string
}

export interface IProductRepository {
  create(product: Product): Promise<Product>
  findByOrganization(organizationId: string, filters?: ListProductFilters): Promise<Product[]>
  findById(productId: string): Promise<Product | null>
  update(params: ProductAdminUpdateParams): Promise<Product>
  delete(params: ProductAdminDeleteParams): Promise<Product>
  list(filters?: ListProductFilters): Promise<Product[]>
}