import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { authMiddleware, requireAdmin } from "../middlewares/auth.middleware";
import { ProductController } from "../../../application/controllers/product.controller";
import { makeProductController } from "../../factories/make-product";
import validateBody from "../middlewares/validate-body";
import { productCreateSchema } from "../../../application/dtos/ProductCreateDTO";

export function productRoutes(app: FastifyInstance) {
  const controller = makeProductController()

  app.post('/', {
    preHandler: [
      authMiddleware, 
      requireAdmin,
      validateBody(productCreateSchema)
    ]
  }, async (req: FastifyRequest, res: FastifyReply) => controller.create(req, res))
}