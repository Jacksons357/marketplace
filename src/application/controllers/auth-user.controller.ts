import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterUserDTO } from "../dtos/RegisterUserDTO";
import { LoginUserDTO } from "../dtos/LoginUserDTO";
import { AuthUserService } from "../services/auth-user.service";

export class AuthUserController {
  constructor(
    private authService: AuthUserService,
  ) {}

  async register(req: FastifyRequest, res: FastifyReply) {
    const data = req.body as RegisterUserDTO
    const result = await this.authService.register(data)
    res.status(201).send(result)
  }

  async login(req: FastifyRequest, res: FastifyReply) {
    const data = req.body as LoginUserDTO
    const result = await this.authService.login(data)
    res.status(200).send(result)
  }
}