import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterAdminDTO } from "../dtos/RegisterAdminDTO";
import { AuthAdminService } from "../services/auth-admin.service";

export class AuthAdminController {
  constructor(private authAdminService: AuthAdminService) {}

  async register(req: FastifyRequest, res: FastifyReply) {
    const data = req.body as RegisterAdminDTO
    const result = await this.authAdminService.register(data)
    return res.status(201).send(result)
  }
}