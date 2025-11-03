import { FastifyReply, FastifyRequest } from "fastify"
import { ProductAiSearchUseCase } from "../../domain/use-cases/product-ai-search.usecase";
import { AiParsedFilters } from "../../domain/repositories/IAiSearchLogRepository";

export class ProductAiSearchController {
  constructor(private productAiSearchUseCase: ProductAiSearchUseCase){}

  async search(req: FastifyRequest, res: FastifyReply) {
    const { search, page, limit } = req.query as { search?: string; page?: string; limit?: string }
    const userId = req.user?.sub as string || ''
    const filters: AiParsedFilters = {
      search: search || '',
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    }
    const products = await this.productAiSearchUseCase.execute(filters, userId)
    res.status(200).send(products)
  }
}