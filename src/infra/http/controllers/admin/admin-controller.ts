import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterAdminUseCase } from "../../../../domain/use-cases/admin/register-admin";
import { RegisterAdminDTO } from "../../../../domain/dtos/RegisterAdminDTO";

export class UserController {
  constructor(private registerAdmin: RegisterAdminUseCase) {}

  async register(req: FastifyRequest, res: FastifyReply) {
    const { 
      name, 
      email, 
      phone, 
      password, 
      organizationName, 
      organizationDescription 
    } = req.body as RegisterAdminDTO
    try {
      const admin = await this.registerAdmin.execute({
        name,
        email,
        phone,
        password,
        organizationName,
        organizationDescription,
      })
      res.status(201).send(admin)
    } catch (error) {
      res.status(400).send(error)
    }
  }
}