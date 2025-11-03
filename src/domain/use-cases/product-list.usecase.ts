import { ProductRepository } from "../../infra/database/repositories/product.repository";
import { AppError } from "../../shared/errors/app-error";
import { ListProductFilters } from "../repositories/IProductRepository";

export class ProductListUseCase {
  constructor(private productRepository: ProductRepository) { }

  async execute(filters: ListProductFilters) {
    try {
      return await this.productRepository.list(filters)
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(error instanceof Error ? error.message : 'Internal error', 500)
    }
  }
}