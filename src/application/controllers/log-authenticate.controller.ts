import { FastifyReply, FastifyRequest } from "fastify"
import { LogAuthenticateUseCase } from "../../domain/use-cases/log-authenticate.usecase";
import { LogAuthenticateDTO } from "../dtos/LogAuthenticateDTO";
import { AppError } from "../../shared/errors/app-error";

export class LogAuthenticateController {
  constructor(private logAuthenticateUseCase: LogAuthenticateUseCase) {}

  async handle(req: FastifyRequest, res: FastifyReply) {
    const { username, password } = req.body as LogAuthenticateDTO
    try {
      const logs = await this.logAuthenticateUseCase.execute({ username, password })
      res.status(200).send(logs)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.code).send({ message: error.message })
      }
      return res.status(500).send({ message: 'Internal server error' })
    }
  }
}