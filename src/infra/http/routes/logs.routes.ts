import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import validateBody from "../middlewares/validate-body"
import { logAuthenticateSchema } from "../../../application/dtos/LogAuthenticateDTO"
import { makeLogAuthenticateAiSearchController } from "../../factories/make-logs-authenticate-ai-search"
import { makeLogAuthenticateController } from "../../factories/make-logs-autenticate"
import { loginLogBodySchemaDocs } from "../../../presentation/docs/swagger"

export const logsRoutes = async (app: FastifyInstance) => {
  const logsController = makeLogAuthenticateController()
  const logsAiSearchController = makeLogAuthenticateAiSearchController()

  app.post('/', {
    schema: {
      tags: ['Logs'],
      summary: 'Return simple logs of user authentication',
      description: 'Login and return simple logs of user authentication',
      body: loginLogBodySchemaDocs,
    },
    preHandler: validateBody(logAuthenticateSchema)
  }, async(req: FastifyRequest, res: FastifyReply) => logsController.handle(req, res))

  app.post('/ai-search', {
    schema: {
      tags: ['Logs'],
      summary: 'Return simple logs of AI search',
      description: 'Login and return simple logs of AI search',
      body: loginLogBodySchemaDocs,

    },
    preHandler: validateBody(logAuthenticateSchema)
  }, async(req: FastifyRequest, res: FastifyReply) => logsAiSearchController.handle(req, res))
}