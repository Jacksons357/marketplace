import { randomUUID } from "crypto";
import { Product } from "../entities/Product";
import { IProductRepository } from "../repositories/IProductRepository";
import { ProductCreateDTO } from "../../application/dtos/ProductCreateDTO";
import { IUserRepository } from "../repositories/IUserRepository";
import { UserNotFoundError } from "../../shared/errors/user-not-found";
import { AppError } from "../../shared/errors/app-error";
import { UserNotBelongOrganizationError } from "../../shared/errors/user-not-belong-organization";

export class ProductAdminCreateUseCase {
  constructor(
    private productRepository: IProductRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(userId: string, data: ProductCreateDTO): Promise<Product> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundError()
    }
    if (!user.organizationId){
      throw new UserNotBelongOrganizationError()
    }

    const product = new Product(
      randomUUID(),
      user.organizationId as string,
      data.name,
      data.description || null,
      data.price,
      data.category,
      data.imageUrl || null,
      data.stockQty,
      data.weightGrams,
    )

    try {
      await this.productRepository.create(product)
      return product
    } catch (error) {
      throw new AppError("Error creating product", 400)
    }
  }
}