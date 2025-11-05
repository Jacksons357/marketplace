import { FastifyReply, FastifyRequest } from "fastify"
import { OrderAdminListUseCase } from "../../domain/use-cases/order-admin-list.usecase"
import { AppError } from "../../shared/errors/app-error"

export class OrderAdminListController {
  constructor(
    private orderAdminListUseCase: OrderAdminListUseCase
  ) {}

  async list(req: FastifyRequest, res: FastifyReply) {
    try {
      const userId = req.user.sub as string
      const orders = await this.orderAdminListUseCase.execute(userId)
      res.status(200).send(orders)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.code).send({ message: error.message })
      }
      return res.status(500).send({ message: 'Internal server error' })
    }
  }
}