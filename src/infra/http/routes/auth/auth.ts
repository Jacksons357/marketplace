import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "../../controllers/admin/admin-controller";
import { RegisterAdminUseCase } from "../../../../domain/use-cases/admin/register-admin";
import { UserRepository } from "../../../database/user-repository";
import validateBody from "../../../../shared/middlewares/validate-body";
import { OrganizationRepository } from "../../../database/organization-repository";
import { registerAdminSchema } from "../../../../domain/dtos/RegisterAdminDTO";

const userRepository = new UserRepository()
const organizationRepository = new OrganizationRepository()
const registerAdminUseCase = new RegisterAdminUseCase(userRepository, organizationRepository)
const controller = new UserController(registerAdminUseCase)

export function authRoutes(app: FastifyInstance) {
  app.post("/admin/register", {
    preHandler: [
      validateBody(registerAdminSchema)
    ]
  }, async (req: FastifyRequest, res: FastifyReply) => controller.register(req, res));
}