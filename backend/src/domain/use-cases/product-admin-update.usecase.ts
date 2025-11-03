import { AppError } from "../../shared/errors/app-error";
import { ProductNotFoundError } from "../../shared/errors/product-not-found";
import { UserNotBelongOrganizationError } from "../../shared/errors/user-not-belong-organization";
import { UserNotFoundError } from "../../shared/errors/user-not-found";
import { Product } from "../entities/Product";
import { IProductRepository, ProductUpdateParams } from "../repositories/IProductRepository";
import { IUserRepository } from "../repositories/IUserRepository";

export class ProductAdminUpdateUseCase {
  constructor(
    private productRepository: IProductRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(params: ProductUpdateParams): Promise<Product> {
    const { userId, productId, data } = params
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new UserNotFoundError()
    }
    if (!user.organizationId){
      throw new UserNotBelongOrganizationError()
    }

    const product = await this.productRepository.findById(productId)
    if (!product) {
      throw new ProductNotFoundError()
    }
    if (product.organizationId !== user.organizationId) {
      throw new AppError('You are not allowed to update this product', 403)
    }

    try {
      return await this.productRepository.update({
        productId,
        data,
      })
    } catch (error) {
      throw new AppError('Error updating product', 500)
    }
  }
}