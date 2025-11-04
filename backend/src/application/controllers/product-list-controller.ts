import { FastifyReply, FastifyRequest } from "fastify";
import { ProductListUseCase } from "../../domain/use-cases/product-list.usecase";
import { ListProductFilters } from "../../domain/repositories/IProductRepository";

export class ProductListController {
  constructor(private productListUseCase: ProductListUseCase) { }

  async list(req: FastifyRequest, res: FastifyReply) {
    const filters = req.query as ListProductFilters
    const products = await this.productListUseCase.execute(filters)
    res.send(products)
  }

  async listCategories(req: FastifyRequest, res: FastifyReply) {
    const categories = await this.productListUseCase.listCategories()
    res.send(categories)
  }
}