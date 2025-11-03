import { FastifyReply, FastifyRequest } from "fastify";
import { ProductAdminUpdateUseCase } from "../../domain/use-cases/product-admin-update.usecase";
import { ProductUpdateDTO } from "../dtos/ProductUpdateDTO";

export class ProductAdminUpdateController {
  constructor(private productAdminUpdateUseCase: ProductAdminUpdateUseCase) { }

  async update(req: FastifyRequest, res: FastifyReply) {
    const { id: productId } = req.params as { id: string }
    const userId = req.user.sub as string
    const data = req.body as ProductUpdateDTO
    const result = await this.productAdminUpdateUseCase.execute({ userId, productId, data })
    res.status(200).send(result)
  }
}