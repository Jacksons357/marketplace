import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "../../controllers/user-controller";
import { RegisterUserUseCase } from "../../../../domain/use-cases/register-user";
import { UserRepository } from "../../../database/user-repository";
import { registerUserSchema } from "../../../../domain/dtos/RegisterUserDTO";
import validateBody from "../../../../shared/middlewares/validate-body";

const userRepository = new UserRepository()
const registerUserUseCase = new RegisterUserUseCase(userRepository)
const controller = new UserController(registerUserUseCase)

export function authRoutes(app: FastifyInstance) {
  app.post("/register", {
    preHandler: [
      validateBody(registerUserSchema)
    ]
  }, async (req: FastifyRequest, res: FastifyReply) => controller.register(req, res));
}