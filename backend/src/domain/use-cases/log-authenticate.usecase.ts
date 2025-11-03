import { LogAuthenticateDTO } from "../../application/dtos/LogAuthenticateDTO";
import { AppError } from "../../shared/errors/app-error";
import { InvalidCredentialsError } from "../../shared/errors/invalid-credentials-error";
import { ILogRepository } from "../repositories/ILogRepository";

export class LogAuthenticateUseCase {
  private readonly USERNAME = "dev"
  private readonly PASSWORD = "falcoes"

  constructor(private logRepository: ILogRepository) {}

  async execute({ username, password }: LogAuthenticateDTO) {
    try {
      if (username !== this.USERNAME || password !== this.PASSWORD) {
        throw new InvalidCredentialsError()
      }
      return await this.logRepository.findRecent()
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(error instanceof Error ? error.message : 'Internal error', 500)
    }
  }
}