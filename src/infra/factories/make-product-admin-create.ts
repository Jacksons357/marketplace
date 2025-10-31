import { ProductAdminCreateController } from "../../application/controllers/product-admin-create.controller"
import { ProductAdminCreateUseCase } from "../../domain/use-cases/product-admin-create.usecase"
import { ProductRepository } from "../database/repositories/product.repository"
import { UserRepository } from "../database/repositories/user-repository"

export function makeProductAdminCreateController() {
  const productRepository = new ProductRepository()
  const userRepository = new UserRepository()
  const productAdminCreateUseCase = new ProductAdminCreateUseCase(productRepository, userRepository)

  return new ProductAdminCreateController(productAdminCreateUseCase)
}