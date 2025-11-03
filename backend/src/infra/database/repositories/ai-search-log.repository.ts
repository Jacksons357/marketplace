import { AiSearchLog } from '../../../domain/entities/AiSearchLog'
import { AiSearchLogParams, IAiSearchLogRepository } from '../../../domain/repositories/IAiSearchLogRepository'
import { prisma } from '../prisma/client'

export class AiSearchLogRepository implements IAiSearchLogRepository {

  async create(params: AiSearchLogParams): Promise<AiSearchLog | null> {
    try {
      const record = await prisma.aiSearchLog.create({
        data: {
          id: crypto.randomUUID(),
          userId: params.userId || null,
          organizationId: params.organizationId || null,
          query: params.metadata.query,
          filters: params.metadata.filters,
          success: params.metadata.success,
          fallbackApplied: params.metadata.fallbackApplied,
          createdAt: params.createdAt ?? new Date()
        }
      })

      return AiSearchLog.create({
        id: record.id,
        userId: record.userId,
        organizationId: record.organizationId,
        query: record.query,
        filters: record.filters,
        success: record.success,
        fallbackApplied: record.fallbackApplied,
        createdAt: record.createdAt
      })
    } catch (error) {
      console.error('Erro ao criar log AI_SEARCH no DB:', error)
      return null
    }
  }

  async findRecent(limit = 50): Promise<AiSearchLog[]> {
    try {
      const records = await prisma.aiSearchLog.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
      })
      return records.map(record => AiSearchLog.create({
        id: record.id,
        userId: record.userId,
        organizationId: record.organizationId,
        query: record.query,
        filters: record.filters,
        success: record.success,
        fallbackApplied: record.fallbackApplied,
        createdAt: record.createdAt
      }))
    } catch (error) {
      console.error('Erro ao buscar logs AI_SEARCH recentes no DB:', error)
      return []
    }
  }
}
