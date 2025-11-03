import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { makeLogsAuthenticateMiddleware } from "../../factories/make-logs-autenticate"
import validateBody from "../middlewares/validate-body"
import { logAuthenticateSchema } from "../../../application/dtos/LogAuthenticateDTO"

export const logsRoutes = async (app: FastifyInstance) => {
  const logsController = makeLogsAuthenticateMiddleware()

  app.post('/', {
    preHandler: validateBody(logAuthenticateSchema)
  }, async(req: FastifyRequest, res: FastifyReply) => logsController.handle(req, res))
}