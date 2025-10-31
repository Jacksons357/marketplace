import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterUserDTO } from "../dtos/RegisterUserDTO";
import { AuthUserService } from "../services/auth-user.service";

export class AuthUserController {
  constructor(
    private authUserService: AuthUserService,
  ) {}

  async register(req: FastifyRequest, res: FastifyReply) {
    const data = req.body as RegisterUserDTO
    const result = await this.authUserService.register(data)
    res.status(201).send(result)
  }
}