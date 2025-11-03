import { ILogRepository, LogCreateParams } from "../../domain/repositories/ILogRepository"
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { summarizePayload } from "../../utils/summary-payload";
import { LogCreateDTO } from "../dtos/LogCreateDTO";

export class LogsService {
  private queue: LogCreateDTO[] = []
  private flushIntervalMs = 2000
  private maxBatchSize = 50

  constructor(
    private userRepository: IUserRepository,
    private logRepository: ILogRepository
  ){
    setInterval(() => this.flush().catch(console.error), this.flushIntervalMs);
  }
  
  async enqueue(log: LogCreateParams & { userId?: string }) {
    let organizationId = log.organizationId ?? null;
    if (log.userId) {
      const userEntity = await this.userRepository.findById(log.userId);
      organizationId = userEntity?.organizationId ?? null;
    }
    const logToQueue: LogCreateDTO = {
      ...log,
      organizationId,
      createdAt: log.createdAt ?? new Date()
    };

    this.queue.push(logToQueue);
    if (this.queue.length >= this.maxBatchSize) {
      await this.flush().catch(console.error);
    }

    console.log(JSON.stringify({
      ts: new Date().toISOString(),
      route: logToQueue.route,
      method: logToQueue.method,
      status: logToQueue.status,
      latencyMs: logToQueue.latencyMs,
      userId: logToQueue.userId,
      organizationId: logToQueue.organizationId,
      payloadSummary: logToQueue.payload ? summarizePayload(logToQueue.payload) : undefined,
    }));
  }

  async flush() {
    if (this.queue.length === 0) return;

    const toFlush = this.queue.splice(0, this.maxBatchSize);

    await Promise.all(
      toFlush.map(item =>
        this.logRepository.create(item).catch(error => {
          console.error('Log persist error', error);
        })
      )
    );
  }
}