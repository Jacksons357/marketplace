import { ILogRepository, LogCreateParams } from "../../domain/repositories/ILogRepository"
import { summarizePayload } from "../../utils/summary-payload";
import { LogCreateDTO } from "../dtos/LogCreateDTO";

export class LogsService {
  private logRepository: ILogRepository
  private queue: LogCreateDTO[] = []
  private flushIntervalMs = 2000
  private maxBatchSize = 50
  constructor(
    logRepository: ILogRepository
  ){
    this.logRepository = logRepository
    setInterval(() => this.flush().catch(console.error), this.flushIntervalMs);
  }
  
  enqueue(log: LogCreateParams) {
    this.queue.push(log)
    if (this.queue.length >= this.maxBatchSize) {
      this.flush().catch(console.error)
    }
    console.log(JSON.stringify({
      ts: new Date().toISOString(),
      route: log.route,
      method: log.method,
      status: log.status,
      latencyMs: log.latencyMs,
      userId: log.userId,
      organizationId: log.organizationId,
      payloadSummary: log.payload ? summarizePayload(log.payload) : undefined,
    }));
  }

  async flush() {
    if (this.queue.length === 0) return;
    const toFlush = this.queue.splice(0, this.maxBatchSize);
    await Promise.all(toFlush.map(item => this.logRepository.create(item).catch(error => {
      console.error('Log persist error', error);
    })));
  }
}