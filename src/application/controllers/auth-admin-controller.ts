import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterAdminUseCase } from "../../domain/use-cases/admin-register.usecase";
import { RegisterAdminDTO } from "../dtos/RegisterAdminDTO";
import { AuthAdminService } from "../services/auth-admin.service";
import { Admin } from "../../domain/entities/Admin";
import { User } from "../../domain/entities/User";

export class AuthAdminController {
  constructor(private authAdminService: AuthAdminService) {}

  async register(req: FastifyRequest, res: FastifyReply) {
    const data = req.body as RegisterAdminDTO
    const result = await this.authAdminService.register(data)
    return res.status(201).send(result)
  }
}