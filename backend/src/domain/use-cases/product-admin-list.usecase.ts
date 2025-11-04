import { UserNotBelongOrganizationError } from "../../shared/errors/user-not-belong-organization"
import { UserNotFoundError } from "../../shared/errors/user-not-found"
import { IProductRepository, ListProductFilters } from "../repositories/IProductRepository"
import { IUserRepository } from "../repositories/IUserRepository"

export class ProductAdminListUseCase {
  constructor(
    private productRepository: IProductRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(userId: string, filters?: ListProductFilters) {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new UserNotFoundError()
    }

    const organizationId = user.organizationId
    if (!organizationId) {
      throw new UserNotBelongOrganizationError()
    }

    return this.productRepository.findByOrganization(organizationId, filters)
  }
}