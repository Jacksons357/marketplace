import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { authMiddleware, requireAdmin } from "../middlewares/auth.middleware";
import { makeProductAdminCreateController } from "../../factories/make-product-admin-create";
import validateBody from "../middlewares/validate-body";
import { productCreateSchema } from "../../../application/dtos/ProductCreateDTO";
import { makeProductAdminListController } from "../../factories/make-product-admin-list";
import { productUpdateSchema } from "../../../application/dtos/ProductUpdateDTO";
import { makeProductAdminUpdateController } from "../../factories/make-product-admin-update";
import { makeProductAdminDeleteController } from "../../factories/make-product-admin-delete";

export function adminRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authMiddleware)
  app.addHook('preHandler', requireAdmin)

  const productAdminCreateController = makeProductAdminCreateController()
  const productAdminListController = makeProductAdminListController()
  const productAdminUpdateController = makeProductAdminUpdateController()
  const productAdminDeleteController = makeProductAdminDeleteController()

  app.post('/products', {
    preHandler: [
      validateBody(productCreateSchema)
    ]
  }, async (req: FastifyRequest, res: FastifyReply) => productAdminCreateController.create(req, res))

  app.get('/products', async (req: FastifyRequest, res: FastifyReply) => productAdminListController.list(req, res))

  app.put('/products/:id', {
    preHandler: [
      validateBody(productUpdateSchema)
    ]
  }, async (req: FastifyRequest, res: FastifyReply) => productAdminUpdateController.update(req, res))

  app.delete('/products/:id', async (req: FastifyRequest, res: FastifyReply) => productAdminDeleteController.delete(req, res))
}