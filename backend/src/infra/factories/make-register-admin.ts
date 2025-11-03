import { RegisterAdminUseCase } from "../../domain/use-cases/admin-register.usecase";
import { AuthAdminController } from "../../application/controllers/auth-admin-controller";
import { OrganizationRepository } from "../database/repositories/organization-repository";
import { TokenService } from "../../application/services/token.service";
import { AuthAdminService } from "../../application/services/auth-admin.service";
import { UserRepository } from "../database/repositories/user.repository";

export function makeAdminController() {
  const organizationRepository = new OrganizationRepository();
  const tokenService = new TokenService();
  const userRepository = new UserRepository();
  const registerAdminUseCase = new RegisterAdminUseCase(userRepository, organizationRepository);
  const authAdminService = new AuthAdminService(tokenService, registerAdminUseCase);

  return new AuthAdminController(authAdminService);
}