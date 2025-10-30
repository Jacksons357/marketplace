import { RegisterAdminUseCase } from "../../domain/use-cases/admin-register.usecase";
import { RegisterAdminDTO } from "../dtos/RegisterAdminDTO";
import { TokenService } from "./token.service";

export class AuthAdminService {
  constructor(
    private tokenService: TokenService,
    private registerAdminUseCase: RegisterAdminUseCase,
    // private loginAdminUseCase: LoginAdminUseCase, TODO: implementar.
  ) {}

  async register(data: RegisterAdminDTO) {
    const admin = await this.registerAdminUseCase.execute(data)
    const token = await this.tokenService.generate(admin.id)
    return {
      user: admin.sanitize(),
      access_token: token,
    }
  }
}