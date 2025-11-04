import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { makeOrderController } from "../../factories/make-order";
import validateBody from "../middlewares/validate-body";
import { orderCreateSchema } from "../../../application/dtos/OrderCreateDTO";
import { authMiddleware } from "../middlewares/auth.middleware";
import { 
  createOrderBodySchemaDocs, 
  createOrderResponseSchemaDocs, 
  headersSchemaDocs 
} from "../../../presentation/docs/swagger";

export const orderRoutes = async (app: FastifyInstance) => {
  app.addHook('preHandler', authMiddleware)
  const orderController = makeOrderController()

  app.post('/', {
    schema: {
      tags: ['Orders'],
      summary: 'Create a new order',
      description: 'Create a new order in the marketplace with organization and product details',
      security: [{ BearerAuth: []}],
      headers: headersSchemaDocs,
      body: createOrderBodySchemaDocs,
      response: createOrderResponseSchemaDocs,
    },
    preHandler: [
      validateBody(orderCreateSchema),
    ]
  },async (req: FastifyRequest, res:FastifyReply) => orderController.create(req, res))

  app.get('/', {
    schema: {
      tags: ['Orders'],
      summary: 'Get orders by user',
      description: 'Retrieve a list of all orders in the marketplace for the authenticated user',
      security: [{ BearerAuth: []}],
      headers: headersSchemaDocs,
      response: createOrderResponseSchemaDocs
    }
  }, async (req: FastifyRequest, res: FastifyReply) => orderController.handler(req, res))
}