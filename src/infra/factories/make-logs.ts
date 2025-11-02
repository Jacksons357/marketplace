import { LogsService } from "../../application/services/logs.service";
import { LogRepository } from "../database/repositories/log.repository";
import { UserRepository } from "../database/repositories/user.repository";

export function makeLogsService(){
  const logRepository = new LogRepository();
  const userRepository = new UserRepository();
  return new LogsService(userRepository, logRepository);
}