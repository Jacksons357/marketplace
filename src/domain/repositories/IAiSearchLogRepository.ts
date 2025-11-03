import { AiSearchLog } from "../entities/AiSearchLog"

export interface AiParsedFilters {
  category?: string
  priceMin?: number
  priceMax?: number
  search: string
  page?: number
  limit?: number
  interpretation?: string
  [key: string]: string | number | undefined
}

export interface AiSearchLogParams {
  type?: string
  metadata: {
    query: string
    filters: AiParsedFilters
    success: boolean
    fallbackApplied: boolean
  }
  userId?: string | null
  organizationId?: string | null
  createdAt?: Date
}

export interface IAiSearchLogRepository {
  create(log: AiSearchLogParams): Promise<AiSearchLog | null>
}