import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { makeProductListController } from "../../factories/make-product-list";
import { makeProductAiSearchController } from "../../factories/make-product-ai-search";

export function productRoutes(app: FastifyInstance) {
  const productListController = makeProductListController()
  const productAiSearchController = makeProductAiSearchController()

  app.get('/', async (req: FastifyRequest, res: FastifyReply) => productListController.list(req, res))
  app.get('/ai', async (req: FastifyRequest, res: FastifyReply) => productAiSearchController.search(req, res))
}