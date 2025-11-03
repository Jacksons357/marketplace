import { InvalidPasswordError } from "../../shared/errors/invalid-password";
import { UserNotFoundError } from "../../shared/errors/user-not-found";
import { LoginUserDTO } from "../../application/dtos/LoginUserDTO";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/IUserRepository";
import { PasswordService } from "../../application/services/password.service";

export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
  ) {}

  async execute({ email, password }: LoginUserDTO): Promise<User> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new UserNotFoundError()
    }
    const passwordMatch = await PasswordService.compare(password, user.getPasswordHash());
    if (!passwordMatch) {
      throw new InvalidPasswordError()
    }
    return user
  }
}
