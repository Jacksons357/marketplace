import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { makeProductListController } from "../../factories/make-product-list";

export function productRoutes(app: FastifyInstance) {
  const productListController = makeProductListController()

  app.get('/', async (req: FastifyRequest, res: FastifyReply) => productListController.list(req, res))
}