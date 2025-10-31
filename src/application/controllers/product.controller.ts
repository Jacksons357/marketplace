import { FastifyReply, FastifyRequest } from "fastify";
import { ProductCreateUseCase } from "../../domain/use-cases/product-create.usecase";
import { ProductCreateDTO } from "../dtos/ProductCreateDTO";

export class ProductController {
  constructor(private productCreateUseCase: ProductCreateUseCase) {}

  async create(req: FastifyRequest, res: FastifyReply) {
    const userId = req.user.sub as string
    const data = req.body as ProductCreateDTO
    const parsedPrice = parseFloat(data.price.toFixed(2))
    const product = await this.productCreateUseCase.execute(userId, {
      ...data,
      price: parsedPrice,
    })
    return res.status(201).send(product)
  }
}