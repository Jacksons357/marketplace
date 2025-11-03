import { Prisma } from "@prisma/client"
import { Log } from "../../../domain/entities/Log"
import { ILogRepository, LogCreateParams } from "../../../domain/repositories/ILogRepository"
import { prisma } from "../prisma/client"

export class LogRepository implements ILogRepository {
  async create(log: LogCreateParams): Promise<Log> {
    const record = await prisma.log.create({
      data: {
        ...log,
        payload: log.payload as Prisma.InputJsonValue,
        createdAt: log.createdAt || new Date(),
      }
    })
    return new Log({
      id: record.id,
      userId: record.userId,
      organizationId: record.organizationId,
      route: record.route,
      method: record.method,
      status: record.status,
      latencyMs: record.latencyMs,
      payload: record.payload as Record<string, unknown> | null,
      createdAt: record.createdAt,
    })
  }

  async findRecent(limit = 50): Promise<Log[]> {
    const records = await prisma.log.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    })
    return records.map(record => new Log({
      id: record.id,
      userId: record.userId,
      organizationId: record.organizationId,
      route: record.route,
      method: record.method,
      status: record.status,
      latencyMs: record.latencyMs,
      payload: record.payload as Record<string, unknown> | null,
      createdAt: record.createdAt,
    }))
  }
}