import { ProductAdminListController } from "../../application/controllers/product-admin-list.controller"
import { ProductAdminListUseCase } from "../../domain/use-cases/product-admin-list.usecase"
import { ProductRepository } from "../database/repositories/product.repository"
import { UserRepository } from "../database/repositories/user-repository"

export function makeProductAdminListController() {
  const productRepository = new ProductRepository()
  const userRepository = new UserRepository()
  const productAdminListUseCase = new ProductAdminListUseCase(productRepository, userRepository)

  return new ProductAdminListController(productAdminListUseCase)
}