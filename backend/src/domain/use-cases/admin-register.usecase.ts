import { AppError } from "../../shared/errors/app-error";
import { UserAlreadyExistsError } from "../../shared/errors/user-already-exists-error";
import { RegisterAdminDTO } from "../../application/dtos/RegisterAdminDTO";
import { Organization } from "../entities/Organization";
import { IOrganizationRepository } from "../repositories/IOrganizationRepository";
import { PasswordService } from "../../application/services/password.service";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/IUserRepository";

export class RegisterAdminUseCase {
  constructor(
    private userRepository: IUserRepository,
    private organizationRepository: IOrganizationRepository,
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

    const passwordHash = await PasswordService.hash(data.password)
    const admin = new User(
      crypto.randomUUID(),
      data.name,
      data.email,
      data.phone,
      passwordHash,
      "ADMIN",
      organization.id
    )
    try {
      await this.userRepository.create(admin)
    } catch (error) {
      throw new AppError("Error creating user", 400)
    }

    return admin
  }
}