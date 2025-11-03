import { LogAuthenticateAiSearchController } from "../../application/controllers/log-ai-search.controller"
import { LogAuthenticateAiSearchUseCase } from "../../domain/use-cases/log-authenticate-ai-search.usecase"
import { AiSearchLogRepository } from "../database/repositories/ai-search-log.repository"

export const makeLogAuthenticateAiSearchController = () => {
  const logAiSearchRepository = new AiSearchLogRepository()
  const logAuthenticateAiSearchUseCase = new LogAuthenticateAiSearchUseCase(logAiSearchRepository)
  return new LogAuthenticateAiSearchController(logAuthenticateAiSearchUseCase)
}