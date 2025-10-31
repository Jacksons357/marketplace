import { ProductAdminDeleteController } from "../../application/controllers/product-admin-delete.controller"
import { ProductAdminDeleteUseCase } from "../../domain/use-cases/product-admin-delete.usecase"
import { ProductRepository } from "../database/repositories/product.repository"
import { UserRepository } from "../database/repositories/user-repository"

export function makeProductAdminDeleteController() {
  const productRepository = new ProductRepository()
  const userRepository = new UserRepository()
  const productAdminDeleteUseCase = new ProductAdminDeleteUseCase(productRepository, userRepository)

  return new ProductAdminDeleteController(productAdminDeleteUseCase)
}
