import { RegisterAdminUseCase } from "../../domain/use-cases/admin-register.usecase";
import { AdminRepository } from "../database/repositories/admin-repository";
import { AuthAdminController } from "../../application/controllers/auth-admin-controller";
import { OrganizationRepository } from "../database/repositories/organization-repository";
import { TokenService } from "../../application/services/token.service";
import { AuthAdminService } from "../../application/services/auth-admin.service";

export function makeAdminController() {
  const organizationRepository = new OrganizationRepository();
  const adminRepository = new AdminRepository();
  const tokenService = new TokenService();
  const registerAdminUseCase = new RegisterAdminUseCase(adminRepository, organizationRepository);
  const authAdminService = new AuthAdminService(tokenService, registerAdminUseCase);

  return new AuthAdminController(authAdminService);
}