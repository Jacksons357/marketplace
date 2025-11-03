import { randomUUID } from "crypto";
import { LogCreateDTO, logCreateSchema } from "../../application/dtos/LogCreateDTO";

export class Log {
  public readonly id: string;
  public readonly userId?: string | null;
  public readonly organizationId?: string | null;
  public readonly route: string;
  public readonly method: string;
  public readonly status: number;
  public readonly latencyMs: number;
  public readonly payload?: Record<string, unknown> | null;
  public readonly createdAt: Date;

  constructor(props: {
    id?: string;
    userId?: string | null;
    organizationId?: string | null;
    route: string;
    method: string;
    status: number;
    latencyMs: number;
    payload?: Record<string, unknown> | null;
    createdAt?: Date;
  }) {
    this.id = props.id ?? randomUUID();
    this.userId = props.userId ?? null;
    this.organizationId = props.organizationId ?? null;
    this.route = props.route;
    this.method = props.method.toUpperCase();
    this.status = props.status;
    this.latencyMs = props.latencyMs;
    this.payload = props.payload ?? null;
    this.createdAt = props.createdAt ?? new Date();
  }

  static create(data: LogCreateDTO): Log {
    const validated = logCreateSchema.parse(data);
    return new Log(validated);
  }
}
