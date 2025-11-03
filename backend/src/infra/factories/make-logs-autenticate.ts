import { LogAuthenticateController } from "../../application/controllers/log-authenticate.controller";
import { LogAuthenticateUseCase } from "../../domain/use-cases/log-authenticate.usecase";
import { LogRepository } from "../database/repositories/log.repository";

export function makeLogAuthenticateController(){
  const logRepository = new LogRepository()
  const logAuthenticateUseCase = new LogAuthenticateUseCase(logRepository)
  return new LogAuthenticateController(logAuthenticateUseCase)
}