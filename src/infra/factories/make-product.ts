import { ProductController } from "../../application/controllers/product.controller"
import { ProductCreateUseCase } from "../../domain/use-cases/product-create.usecase"
import { ProductRepository } from "../database/repositories/product.repository"
import { UserRepository } from "../database/repositories/user-repository"

export function makeProductController() {
  const productRepository = new ProductRepository()
  const userRepository = new UserRepository()
  const productCreateUseCase = new ProductCreateUseCase(productRepository, userRepository)

  return new ProductController(productCreateUseCase)
}