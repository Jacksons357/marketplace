import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { makeProductListController } from "../../factories/make-product-list";
import { makeProductAiSearchController } from "../../factories/make-product-ai-search";
import { productListQuerySchemaDocs } from "../../../presentation/docs/swagger";
import { optionalAuth } from "../middlewares/optional.middleware";

export function productRoutes(app: FastifyInstance) {
  const productListController = makeProductListController()
  const productAiSearchController = makeProductAiSearchController()

  app.get('/', {
    schema: {
      tags: ['Products'],
      summary: 'List Products',
      description: 'List all products of the all organization and filter by category, price range, and search term and pagination',
      querystring: productListQuerySchemaDocs
    }
  }, async (req: FastifyRequest, res: FastifyReply) => productListController.list(req, res))

  app.get('/ai', {
    preHandler: optionalAuth,
    schema: {
      tags: ['Products'],
      summary: 'AI Search Products',
      description: 'Search products using AI and filter by category, price range, and search term and pagination',
      querystring: productListQuerySchemaDocs
    }
  }, async (req: FastifyRequest, res: FastifyReply) => productAiSearchController.search(req, res))
}