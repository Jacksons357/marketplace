import { ProductListController } from "../../application/controllers/product-list-controller";
import { ProductListUseCase } from "../../domain/use-cases/product-list.usecase";
import { ProductRepository } from "../database/repositories/product.repository";

export function makeProductListController() {
  const productRepository = new ProductRepository()
  const productListUseCase = new ProductListUseCase(productRepository)

  return new ProductListController(productListUseCase)
}