import { ProductAiSearchController } from "../../application/controllers/product-ai-search.controller";
import { AiSearchLogService } from "../../application/services/ai-product-search-log.service";
import { AiProductSearchService } from "../../application/services/ai-product-search.service";
import { ProductAiSearchUseCase } from "../../domain/use-cases/product-ai-search.usecase";
import { AiSearchLogRepository } from "../database/repositories/ai-search-log.repository";
import { LogRepository } from "../database/repositories/log.repository";
import { ProductRepository } from "../database/repositories/product.repository";
import { UserRepository } from "../database/repositories/user.repository";

export function makeProductAiSearchController() {
  const aiSearchLogRepository = new AiSearchLogRepository()
  const aiSearchLogService = new AiSearchLogService(aiSearchLogRepository)
  const productRepository = new ProductRepository()
  const userRepository = new UserRepository()
  const aiService = new AiProductSearchService(aiSearchLogService, userRepository)
  const productAiSearchUseCase = new ProductAiSearchUseCase(productRepository, aiService)

  return new ProductAiSearchController(productAiSearchUseCase)
}
