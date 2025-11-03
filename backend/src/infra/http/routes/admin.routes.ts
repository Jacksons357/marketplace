import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { authMiddleware, requireAdmin } from "../middlewares/auth.middleware";
import { makeProductAdminCreateController } from "../../factories/make-product-admin-create";
import validateBody from "../middlewares/validate-body";
import { productCreateSchema } from "../../../application/dtos/ProductCreateDTO";
import { makeProductAdminListController } from "../../factories/make-product-admin-list";
import { productUpdateSchema } from "../../../application/dtos/ProductUpdateDTO";
import { makeProductAdminUpdateController } from "../../factories/make-product-admin-update";
import { makeProductAdminDeleteController } from "../../factories/make-product-admin-delete";
import { 
  headersSchemaDocs,
  productCreateBodySchemaDocs, 
  productCreateResponseSchemaDocs, 
  productListQuerySchemaDocs, 
  productListResponseSchemaDocs,
  productUpdateBodySchemaDocs,
  productUpdateResponseSchemaDocs,
} from "../../../presentation/docs/swagger";

export function adminRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authMiddleware)
  app.addHook('preHandler', requireAdmin)

  const productAdminCreateController = makeProductAdminCreateController()
  const productAdminListController = makeProductAdminListController()
  const productAdminUpdateController = makeProductAdminUpdateController()
  const productAdminDeleteController = makeProductAdminDeleteController()

  app.post('/products', {
    schema: {
      tags: ['Admin'],
      summary: 'Create a new product',
      description: 'Create a new product in the marketplace for the organization.',
      headers: headersSchemaDocs,
      body: productCreateBodySchemaDocs,
      response: productCreateResponseSchemaDocs,
      security: [{ BearerAuth: []}],
    },
    preHandler: [
      validateBody(productCreateSchema)
    ]
  }, async (req: FastifyRequest, res: FastifyReply) => productAdminCreateController.create(req, res))

  app.get('/products', {
    schema: {
      tags: ['Admin'],
      summary: 'List Products',
      description: 'List all products the organization has registered, or filter by category.',
      headers: headersSchemaDocs,
      querystring: productListQuerySchemaDocs,
      response: productListResponseSchemaDocs,
      security: [{ BearerAuth: []}],
    },
  },async (req: FastifyRequest, res: FastifyReply) => productAdminListController.list(req, res))

  app.put('/products/:id', {
    schema: {
      tags: ['Admin'],
      summary: 'Update a product',
      description: 'Update a product in the marketplace for the organization.',
      headers: headersSchemaDocs,
      body: productUpdateBodySchemaDocs,
      response: productUpdateResponseSchemaDocs,
      security: [{ BearerAuth: []}],
    },
    preHandler: [
      validateBody(productUpdateSchema)
    ]
  }, async (req: FastifyRequest, res: FastifyReply) => productAdminUpdateController.update(req, res))

  app.delete('/products/:id', {
    schema: {
      tags: ['Admin'],
      summary: 'Delete a product',
      description: 'Delete a product in the marketplace for the organization.',
      headers: headersSchemaDocs,
      security: [{ BearerAuth: []}],
    },
  },async (req: FastifyRequest, res: FastifyReply) => productAdminDeleteController.delete(req, res))
}