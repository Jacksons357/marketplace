import { FastifyReply, FastifyRequest } from "fastify"
import { LogAuthenticateUseCase } from "../../domain/use-cases/log-authenticate.usecase";
import { LogAuthenticateDTO } from "../dtos/LogAuthenticateDTO";
import { AppError } from "../../shared/errors/app-error";
import { LogAuthenticateAiSearchUseCase } from "../../domain/use-cases/log-authenticate-ai-search.usecase";

export class LogAuthenticateAiSearchController {
  constructor(private logAuthenticateAiSearchUseCase: LogAuthenticateAiSearchUseCase) {}

  async handle(req: FastifyRequest, res: FastifyReply) {
    const { username, password } = req.body as LogAuthenticateDTO
    try {
      const logs = await this.logAuthenticateAiSearchUseCase.execute({ username, password })
      res.status(200).send(logs)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.code).send({ message: error.message })
      }
      return res.status(500).send({ message: 'Internal server error' })
    }
  }
}