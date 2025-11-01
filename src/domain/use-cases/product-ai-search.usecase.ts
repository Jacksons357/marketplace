import { AiProductSearchService } from "../../application/services/ai-product-search.service";
import { AiParsedFilters, IProductRepository, ListProductFilters } from "../repositories/IProductRepository";

export class ProductAiSearchUseCase {
  constructor(
    private productRepository: IProductRepository,
    private aiService: AiProductSearchService,
  ) {}

  async execute(params: ListProductFilters) {
    const { search = '', page, limit } = params

    // Processa a query através da IA
    const filters: AiParsedFilters = await this.aiService.parseQuery(search, { page, limit })
    
    // Busca produtos com os filtros processados
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