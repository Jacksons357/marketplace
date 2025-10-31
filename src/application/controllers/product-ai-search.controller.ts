import { FastifyReply, FastifyRequest } from "fastify"
import { ListProductFilters } from "../../domain/repositories/IProductRepository"
import { ProductAiSearchUseCase } from "../../domain/use-cases/product-ai-search.usecase";

export class ProductAiSearchController {
  constructor(private productAiSearchUseCase: ProductAiSearchUseCase){}

  async search(req: FastifyRequest, res: FastifyReply) {
    const { search, page, limit } = req.query as { search?: string; page?: string; limit?: string }
    const filters: ListProductFilters = {
      search,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    }
    const products = await this.productAiSearchUseCase.execute(filters)
    res.status(200).send(products)
  }
}