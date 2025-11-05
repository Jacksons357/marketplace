import { Prisma } from "@prisma/client";
import { AppError } from "../../shared/errors/app-error";
import { ProductNotFoundError } from "../../shared/errors/product-not-found";
import { UserNotFoundError } from "../../shared/errors/user-not-found";
import { IProductRepository } from "../repositories/IProductRepository";
import { IUserRepository } from "../repositories/IUserRepository";

export class ProductAdminDeleteUseCase {
  constructor(
    private productRepository: IProductRepository,
    private userRepository: IUserRepository
  ) { }

  async execute(productId: string, userId: string) {
    const product = await this.productRepository.findById(productId)
    if (!product) {
      throw new ProductNotFoundError()
    }
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new UserNotFoundError()
    }
    const organizationId = user.organizationId
    if (product.organizationId !== organizationId) {
      throw new AppError('You are not allowed to update this product', 403)
    }
    
    try {
      await this.productRepository.delete({ productId, organizationId })
    } catch (error) {
       if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2003"
      ) {
        throw new AppError(
          "Você não pode excluir este produto porque ele está associado a pedidos existentes.",
          400
        )
      }

      throw new AppError(
        error instanceof Error ? error.message : "Internal error",
        500
      )
    }
  }
}