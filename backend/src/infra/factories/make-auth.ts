import { AuthController } from "../../application/controllers/auth.controller";
import { AuthService } from "../../application/services/auth.service"
import { TokenService } from "../../application/services/token.service";
import { LoginUserUseCase } from "../../domain/use-cases/user-login.usecase";
import { UserRepository } from "../database/repositories/user.repository";

export function makeAuthController() {
  const userRepository = new UserRepository();
  const tokenService = new TokenService();
  const loginUserUseCase = new LoginUserUseCase(userRepository);
  const authService = new AuthService(userRepository, loginUserUseCase, tokenService);

  return new AuthController(authService)
}