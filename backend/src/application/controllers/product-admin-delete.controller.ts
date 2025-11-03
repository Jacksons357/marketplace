import { FastifyReply, FastifyRequest } from "fastify"
import { ProductAdminDeleteUseCase } from "../../domain/use-cases/product-admin-delete.usecase"

export class ProductAdminDeleteController {
  constructor(private productAdminDeleteUseCase: ProductAdminDeleteUseCase) { }

  async delete(req: FastifyRequest, res: FastifyReply) {
    const { id: productId } = req.params as { id: string }
    const userId = req.user.sub as string
    await this.productAdminDeleteUseCase.execute(productId, userId)
    res.status(204).send()
  }
}