import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { makeOrderController } from "../../factories/make-order";
import validateBody from "../middlewares/validate-body";
import { orderCreateSchema } from "../../../application/dtos/OrderCreateDTO";
import { authMiddleware } from "../middlewares/auth.middleware";

export const orderRoutes = async (app: FastifyInstance) => {
  app.addHook('preHandler', authMiddleware)
  const orderController = makeOrderController()

  app.post('/', {
    preHandler: [
      validateBody(orderCreateSchema),
    ]
  },async (req: FastifyRequest, res:FastifyReply) => orderController.create(req, res))
}