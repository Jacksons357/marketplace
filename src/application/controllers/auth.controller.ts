import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "../services/auth.service";
import { LoginUserDTO } from "../dtos/LoginUserDTO";

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(req: FastifyRequest, res: FastifyReply) {
    const data = req.body as LoginUserDTO
    const result = await this.authService.login(data)
    res.status(200).send(result)
  }

  async me(req: FastifyRequest, res: FastifyReply) {
    const user = req.user
    const result = await this.authService.execute(user)
    return res.status(200).send(result)
  }
}