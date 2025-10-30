import { AppError } from "../../shared/errors/app-error";
import { UserAlreadyExistsError } from "../../shared/errors/user-already-exists-error";
import { RegisterUserDTO } from "../../application/dtos/RegisterUserDTO";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/IUserRepository";
import { PasswordService } from "../../application/services/password.service";

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
  ) {}

  async execute(data: RegisterUserDTO) {
    const existingUserByEmail = await this.userRepository.findByEmail(data.email)
    if (existingUserByEmail) {
      throw new UserAlreadyExistsError()
    }

    const existingUserByPhone = await this.userRepository.findByPhone(data.phone)
    if (existingUserByPhone) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await PasswordService.hash(data.password)
    const user = new User(
      crypto.randomUUID(),
      data.name,
      data.email,
      data.phone,
      passwordHash,
    )
    try {
      await this.userRepository.create(user)
    } catch (error) {
      throw new AppError("Error creating user", 400)
    }
    return user
  }
}