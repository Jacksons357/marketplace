import { JwtPayload } from "jsonwebtoken";
import { AdminRepository } from "../../infra/database/repositories/admin-repository";
import { UserRepository } from "../../infra/database/repositories/user-repository";
import { LoginUserDTO } from "../dtos/LoginUserDTO";
import { LoginUserUseCase } from "../../domain/use-cases/user-login.usecase";
import { TokenService } from "./token.service";

export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private adminRepository: AdminRepository,
    private loginUserUseCase: LoginUserUseCase,
    private tokenService: TokenService,
  ) {}

  async execute(payload: JwtPayload){
    if(payload.role === 'ADMIN'){
      const admin = await this.adminRepository.findById(payload.sub!)
      return admin
    }
    const user = await this.userRepository.findById(payload.sub!)
    return user
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