import { FastifyReply, FastifyRequest } from "fastify"
import { ProductAdminListUseCase } from "../../domain/use-cases/product-admin-list.usecase"
import { ListProductFilters } from "../../domain/repositories/IProductRepository"

export class ProductAdminListController {
  constructor(private productAdminListUseCase: ProductAdminListUseCase) {}

  async list(req: FastifyRequest, res: FastifyReply) {
    const userId = req.user.sub as string
    const filters = req.query as ListProductFilters
    const products = await this.productAdminListUseCase.execute(userId, filters)
    console.log(products)
    res.status(200).send(products)
  }
}