import { RegisterAdminUseCase } from "../../domain/use-cases/admin-register.usecase";
import { RegisterAdminDTO } from "../dtos/RegisterAdminDTO";
import { TokenService } from "./token.service";

export class AuthAdminService {
  constructor(
    private tokenService: TokenService,
    private registerAdminUseCase: RegisterAdminUseCase,
  ) {}

  async register(data: RegisterAdminDTO) {
    const admin = await this.registerAdminUseCase.execute(data)
    const token = await this.tokenService.generate({
      sub: admin.id,
      role: admin.role,
      name: admin.name,
      phone: admin.phone || undefined,
    })
    return {
      user: admin.sanitize(),
      access_token: token,
    }
  }
}