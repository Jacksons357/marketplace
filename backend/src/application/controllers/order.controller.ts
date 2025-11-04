import { FastifyReply, FastifyRequest } from "fastify";
import { OrderUseCase } from "../../domain/use-cases/order.usecase";
import { OrderCreateDTO } from "../dtos/OrderCreateDTO";
import { AppError } from "../../shared/errors/app-error";

export class OrderController {
  constructor(private orderUseCase: OrderUseCase) {}
  async create(req: FastifyRequest, res: FastifyReply) {
    try{ 
      const userId = req.user.sub as string
      const { organizationId, items } = req.body as OrderCreateDTO
      const result = await this.orderUseCase.execute({
        userId,
        organizationId,
        items,
      })
      return res.status(201).send(result)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.code).send({ message: error.message })
      }
      return res.status(500).send({ message: 'Internal server error' })
    }
  }

  async handler(req: FastifyRequest, res: FastifyReply) {
    try{ 
      const userId = req.user.sub as string
      const result = await this.orderUseCase.getByUserId({
        userId,
      })
      return res.status(200).send(result)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.code).send({ message: error.message })
      }
      return res.status(500).send({ message: 'Internal server error' })
    }
  }
}