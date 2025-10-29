import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterUserUseCase } from "../../../../domain/use-cases/user/register-user";
import { RegisterUserDTO } from "../../../../domain/dtos/RegisterUserDTO";

export class UserController {
  constructor(private registerUser : RegisterUserUseCase) {}

  async register(req: FastifyRequest, res: FastifyReply) {
    const { 
      name, 
      email, 
      phone, 
      password, 
    } = req.body as RegisterUserDTO
    try {
      const user = await this.registerUser.execute({
        name,
        email,
        phone,
        password,
      })
      res.status(201).send(user)
    } catch (error) {
      res.status(400).send(error)
    }
  }
}