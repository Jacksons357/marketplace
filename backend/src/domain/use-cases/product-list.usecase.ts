import { AppError } from "../../shared/errors/app-error";
import { IProductRepository, ListProductFilters } from "../repositories/IProductRepository";

export class ProductListUseCase {
  constructor(private productRepository: IProductRepository) { }

  async execute(filters: ListProductFilters) {
    try {
      return await this.productRepository.list(filters)
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(error instanceof Error ? error.message : 'Internal error', 500)
    }
  }

  async listCategories() {
    try {
      return await this.productRepository.listCategories()
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(error instanceof Error ? error.message : 'Internal error', 500)
    }
  }
}