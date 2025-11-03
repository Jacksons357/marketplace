import { Prisma } from "@prisma/client";
import { ListProductFilters } from "../repositories/IProductRepository";

export class AiSearchLog {
  constructor(
    public readonly id: string,
    public readonly userId: string | null,
    public readonly organizationId: string | null,
    public readonly query: string,
    public readonly filters: Prisma.JsonValue,
    public readonly success: boolean,
    public readonly fallbackApplied: boolean,
    public readonly createdAt: Date
  ) {}

  static create(params: {
    id?: string;
    userId?: string | null;
    organizationId?: string | null;
    query: string;
    filters: Prisma.JsonValue;
    success: boolean;
    fallbackApplied: boolean;
    createdAt?: Date;
  }): AiSearchLog {
    return new AiSearchLog(
      params.id ?? crypto.randomUUID(),
      params.userId ?? null,
      params.organizationId ?? null,
      params.query,
      params.filters,
      params.success,
      params.fallbackApplied,
      params.createdAt ?? new Date()
    );
  }
}
