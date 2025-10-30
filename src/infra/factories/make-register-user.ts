import { AuthUserController } from "../../application/controllers/auth-user.controller";
import { AuthUserService } from "../../application/services/auth-user.service";
import { TokenService } from "../../application/services/token.service";
import { LoginUserUseCase } from "../../domain/use-cases/user-login.usecase";
import { RegisterUserUseCase } from "../../domain/use-cases/user-register.usecase";
import { UserRepository } from "../database/repositories/user-repository";  

export function makeUserController() {
  const userRepository = new UserRepository();
  const registerUserUseCase = new RegisterUserUseCase(userRepository);
  const tokenService = new TokenService ();
  const authService = new AuthUserService(tokenService, registerUserUseCase);

  return new AuthUserController(authService);
}