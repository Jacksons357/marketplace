import { AppError } from "../../../shared/errors/app-error";
import { UserAlreadyExistsError } from "../../../shared/errors/user-already-exists-error";
import { generateAccessToken } from "../../../utils/generate-access-token";
import { RegisterAdminDTO } from "../../dtos/RegisterAdminDTO";
import { Organization } from "../../entities/Organization";
import { User } from "../../entities/User";
import { IOrganizationRepository } from "../../repositories/IOrganizationRepository";
import { IUserRepository } from "../../repositories/IUserRepository";
import * as bcrypt from "bcryptjs"

export class RegisterAdminUseCase {
  constructor(
    private userRepository: IUserRepository,
    private organizationRepository: IOrganizationRepository
  ) {}

  async execute(data: RegisterAdminDTO) {
    const existingUserByEmail = await this.userRepository.findByEmail(data.email)
    if (existingUserByEmail) {
      throw new UserAlreadyExistsError()
    }

    const existingUserByPhone = await this.userRepository.findByPhone(data.phone)
    if (existingUserByPhone) {
      throw new UserAlreadyExistsError()
    }

    const organization = new Organization(
      crypto.randomUUID(),
      data.organizationName,
      data.organizationDescription,
    )
    try {
      await this.organizationRepository.create(organization)
    } catch (error) {
      throw new AppError("Error creating organization", 400)
    }

    const passwordHash = await bcrypt.hash(data.password, 10)
    const user = new User(
      crypto.randomUUID(),
      data.name,
      data.email,
      data.phone,
      passwordHash,
      organization.id,
      "ADMIN"
    )
    try {
      await this.userRepository.create(user)
    } catch (error) {
      throw new AppError("Error creating user", 400)
    }
    
    const access_token = generateAccessToken(user.id)

    return {
      user: user.sanitize(),
      access_token,
    }
  }
}