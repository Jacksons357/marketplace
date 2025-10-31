import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { authMiddleware, requireAdmin } from "../middlewares/auth.middleware";
import { makeProductAdminCreateController } from "../../factories/make-product-admin-create";
import validateBody from "../middlewares/validate-body";
import { productCreateSchema } from "../../../application/dtos/ProductCreateDTO";
import { makeProductAdminListController } from "../../factories/make-product-admin-list";

export function adminRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authMiddleware)
  app.addHook('preHandler', requireAdmin)

  const productController = makeProductAdminCreateController()
  const productListController = makeProductAdminListController()

  app.post('/products', {
    preHandler: [
      validateBody(productCreateSchema)
    ]
  }, async (req: FastifyRequest, res: FastifyReply) => productController.create(req, res))

  app.get('/products', async (req: FastifyRequest, res: FastifyReply) => productListController.list(req, res))
}