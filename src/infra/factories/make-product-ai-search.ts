import { ProductAiSearchController } from "../../application/controllers/product-ai-search.controller";
import { AiProductSearchService } from "../../application/services/ai-product-search.service";
import { ProductAiSearchUseCase } from "../../domain/use-cases/product-ai-search.usecase";
import { ProductRepository } from "../database/repositories/product.repository";

export function makeProductAiSearchController() {
  const productRepository = new ProductRepository()
  const aiService = new AiProductSearchService()
  const productAiSearchUseCase = new ProductAiSearchUseCase(productRepository, aiService)

  return new ProductAiSearchController(productAiSearchUseCase)
}
