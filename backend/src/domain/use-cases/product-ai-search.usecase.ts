import { AiProductSearchService } from "../../application/services/ai-product-search.service";
import { IProductRepository, ListProductFilters } from "../repositories/IProductRepository";

export class ProductAiSearchUseCase {
  constructor(
    private productRepository: IProductRepository,
    private aiService: AiProductSearchService,
  ) {}

  async execute(
    params: ListProductFilters,
    userId?: string
  ) {
    const { search = '', page, limit } = params
    const filters = await this.aiService.parseQuery(search, { page, limit }, userId)
    const products = await this.productRepository.search(filters)

    return {
      products,
      filters,
      total: products.length,
      page: filters.page || 1,
      limit: filters.limit || 10,
    }
  }
}