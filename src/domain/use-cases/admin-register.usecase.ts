import { AppError } from "../../shared/errors/app-error";
import { UserAlreadyExistsError } from "../../shared/errors/user-already-exists-error";
import { RegisterAdminDTO } from "../../application/dtos/RegisterAdminDTO";
import { Organization } from "../entities/Organization";
import { Admin } from "../entities/Admin";
import { IOrganizationRepository } from "../repositories/IOrganizationRepository";
import { IAdminRepository } from "../repositories/IAdminRepository";
import { PasswordService } from "../../application/services/password.service";

export class RegisterAdminUseCase {
  constructor(
    private adminRepository: IAdminRepository,
    private organizationRepository: IOrganizationRepository,
  ) {}

  async execute(data: RegisterAdminDTO) {
    const existingUserByEmail = await this.adminRepository.findByEmail(data.email)
    if (existingUserByEmail) {
      throw new UserAlreadyExistsError()
    }

    const existingUserByPhone = await this.adminRepository.findByPhone(data.phone)
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
    const admin = new Admin(
      crypto.randomUUID(),
      data.name,
      data.email,
      data.phone,
      passwordHash,
      organization.id,
      "ADMIN"
    )
    try {
      await this.adminRepository.create(admin)
    } catch (error) {
      throw new AppError("Error creating user", 400)
    }

    return admin
  }
}