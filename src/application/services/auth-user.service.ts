import { LoginUserUseCase } from "../../domain/use-cases/user-login.usecase";
import { RegisterUserUseCase } from "../../domain/use-cases/user-register.usecase";
import { LoginUserDTO } from "../dtos/LoginUserDTO";
import { RegisterUserDTO } from "../dtos/RegisterUserDTO";
import { TokenService } from "./token.service";

export class AuthUserService {
  constructor(
    private tokenService: TokenService,
    private registerUserUseCase: RegisterUserUseCase,
    private loginUserUseCase: LoginUserUseCase,
  ) {}

  async register(data: RegisterUserDTO) {
    const user = await this.registerUserUseCase.execute(data)
    const token = this.tokenService.generate(user.id)
    return {
      user: user.sanitize(),
      access_token: token,
    }
  }

  async login(data: LoginUserDTO) {
    const user = await this.loginUserUseCase.execute(data)
    const token = this.tokenService.generate(user.id)
    return {
      user: user.sanitize(),
      access_token: token,
    }
  }
}