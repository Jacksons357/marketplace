import { ProductAdminUpdateController } from "../../application/controllers/product-admin-update.controller";
import { ProductAdminUpdateUseCase } from "../../domain/use-cases/product-admin-update.usecase";
import { ProductRepository } from "../database/repositories/product.repository";
import { UserRepository } from "../database/repositories/user-repository";

export function makeProductAdminUpdateController() {
  const productRepository = new ProductRepository()
  const userRepository = new UserRepository()
  const productAdminUpdateUseCase = new ProductAdminUpdateUseCase(productRepository, userRepository)

  return new ProductAdminUpdateController(productAdminUpdateUseCase)
}