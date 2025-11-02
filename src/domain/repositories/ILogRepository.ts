import { Log } from "../entities/Log";

export interface LogCreateParams {
  userId?: string | null;
  organizationId?: string | null;
  route: string;
  method: string;
  status: number;
  latencyMs: number;
  payload?: Record<string, unknown> | null;
  createdAt?: Date;
}

export interface ILogRepository {
  create(log: LogCreateParams): Promise<Log>;
}