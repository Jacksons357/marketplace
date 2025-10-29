import { UserAlreadyExistsError } from "../../shared/errors/user-already-exists-error";
import { generateAccessToken } from "../../utils/generate-access-token";
import { RegisterUserDTO } from "../dtos/RegisterUserDTO";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/IUserRepository";
import * as bcrypt from "bcryptjs"

export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: RegisterUserDTO) {
    const existingUserByEmail = await this.userRepository.findByEmail(data.email)
    if (existingUserByEmail) {
      throw new UserAlreadyExistsError()
    }

    const existingUserByPhone = await this.userRepository.findByPhone(data.phone)
    if (existingUserByPhone) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await bcrypt.hash(data.password, 10)
    const user = new User(
      crypto.randomUUID(),
      data.name,
      data.email,
      data.phone,
      passwordHash,
    )

    const access_token = generateAccessToken(user.id)

    await this.userRepository.create(user)
    return {
      user: user.sanitize(),
      access_token,
    }
  }
}