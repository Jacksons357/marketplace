import { JwtPayload } from "jsonwebtoken";
import { UserRepository } from "../../infra/database/repositories/user-repository";
import { LoginUserDTO } from "../dtos/LoginUserDTO";
import { LoginUserUseCase } from "../../domain/use-cases/user-login.usecase";
import { TokenService } from "./token.service";

export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private loginUserUseCase: LoginUserUseCase,
    private tokenService: TokenService,
  ) {}

  async execute(payload: JwtPayload){
    const user = await this.userRepository.findById(payload.sub!)
    return user
  }

  async login(data: LoginUserDTO) {
    const user = await this.loginUserUseCase.execute(data)
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