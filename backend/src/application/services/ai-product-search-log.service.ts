import { AiSearchLogParams, IAiSearchLogRepository } from "../../domain/repositories/IAiSearchLogRepository"
import { AppError } from "../../shared/errors/app-error"

export class AiSearchLogService {
  constructor(private aiSearchLogRepository: IAiSearchLogRepository) {}

  async createLog(params: AiSearchLogParams) {
    try {
      return await this.aiSearchLogRepository.create({
        type: params.type ?? 'AI_SEARCH',
        metadata: {
          query: params.metadata.query,
          filters: params.metadata.filters,
          success: params.metadata.success,
          fallbackApplied: params.metadata.fallbackApplied
        },
        userId: params.userId,
        organizationId: params.organizationId,
        createdAt: params.createdAt ?? new Date()
      })
    } catch (error) {
      if (error instanceof AppError) throw error
      return null
    }
  }
}
