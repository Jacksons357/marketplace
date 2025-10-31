import { LoginUserUseCase } from "../../domain/use-cases/user-login.usecase";
import { RegisterUserUseCase } from "../../domain/use-cases/user-register.usecase";
import { LoginUserDTO } from "../dtos/LoginUserDTO";
import { RegisterUserDTO } from "../dtos/RegisterUserDTO";
import { TokenService } from "./token.service";

export class AuthUserService {
  constructor(
    private tokenService: TokenService,
    private registerUserUseCase: RegisterUserUseCase,
  ) {}

  async register(data: RegisterUserDTO) {
    const user = await this.registerUserUseCase.execute(data)
    const token = this.tokenService.generate({
      sub: user.id,
      role: user.role,
      name: user.name,
      phone: user.phone || undefined,
    })
    return {
      user: user.sanitize(),
      access_token: token,
    }
  }
}