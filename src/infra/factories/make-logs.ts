import { LogsService } from "../../application/services/logs.service";
import { LogRepository } from "../database/repositories/log.repository";

export function makeLogsService() {
  const logRepository = new LogRepository()
  return new LogsService(logRepository)
}