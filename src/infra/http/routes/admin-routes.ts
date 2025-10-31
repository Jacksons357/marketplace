import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { authMiddleware, requireAdmin } from "../middlewares/auth.middleware";
import { makeProductAdminCreateController } from "../../factories/make-product-admin-create";
import validateBody from "../middlewares/validate-body";
import { productCreateSchema } from "../../../application/dtos/ProductCreateDTO";
import { makeProductAdminListController } from "../../factories/make-product-admin-list";
import { productUpdateSchema } from "../../../application/dtos/ProductUpdateDTO";
import { makeProductAdminUpdateController } from "../../factories/make-product-admin-update";

export function adminRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authMiddleware)
  app.addHook('preHandler', requireAdmin)

  const productController = makeProductAdminCreateController()
  const productListController = makeProductAdminListController()
  const productAdminUpdateController = makeProductAdminUpdateController()

  app.post('/products', {
    preHandler: [
      validateBody(productCreateSchema)
    ]
  }, async (req: FastifyRequest, res: FastifyReply) => productController.create(req, res))

  app.get('/products', async (req: FastifyRequest, res: FastifyReply) => productListController.list(req, res))

  app.put('/products/:id', {
    preHandler: [
      validateBody(productUpdateSchema)
    ]
  }, async (req: FastifyRequest, res: FastifyReply) => productAdminUpdateController.update(req, res))
}