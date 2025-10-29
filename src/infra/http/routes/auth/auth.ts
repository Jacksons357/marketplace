import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AdminController } from "../../controllers/admin/admin-controller";
import { RegisterAdminUseCase } from "../../../../domain/use-cases/admin/register-admin";
import { OrganizationRepository } from "../../../database/organization-repository";
import { registerAdminSchema } from "../../../../domain/dtos/RegisterAdminDTO";
import { registerUserSchema } from "../../../../domain/dtos/RegisterUserDTO";
import { UserController } from "../../controllers/user/user-controller";
import { RegisterUserUseCase } from "../../../../domain/use-cases/user/register-user";
import validateBody from "../../../../shared/middlewares/validate-body";
import { AdminRepository } from "../../../database/admin/admin-repository";
import { UserRepository } from "../../../database/user/user-repository";

const adminRepository = new AdminRepository()
const organizationRepository = new OrganizationRepository()
const registerAdminUseCase = new RegisterAdminUseCase(adminRepository, organizationRepository)
const adminController = new AdminController(registerAdminUseCase)
const userRepository = new UserRepository()
const registerUserUseCase = new RegisterUserUseCase(userRepository)
const userController = new UserController(registerUserUseCase)

export function authRoutes(app: FastifyInstance) {
  app.post("/admin/register", {
    preHandler: [
      validateBody(registerAdminSchema) 
    ]
  }, async (req: FastifyRequest, res: FastifyReply) => adminController.register(req, res));

  app.post('/user/register', {
    preHandler: [
      validateBody(registerUserSchema)
    ]
  }, async (req: FastifyRequest, res: FastifyReply) => userController.register(req, res));
}