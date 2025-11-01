import { OrderController } from "../../application/controllers/order.controller";
import { OrderUseCase } from "../../domain/use-cases/order.usecase";
import { OrderRepository } from "../database/repositories/order.repository";
import { OrganizationRepository } from "../database/repositories/organization-repository";
import { ProductRepository } from "../database/repositories/product.repository";
import { UserRepository } from "../database/repositories/user-repository";

export function makeOrderController() {
  const orderRepository = new OrderRepository()
  const organizationRepository = new OrganizationRepository()
  const userRepository = new UserRepository()
  const productRepository = new ProductRepository()
  const orderUseCase = new OrderUseCase(orderRepository, organizationRepository, userRepository, productRepository)

  return new OrderController(orderUseCase)
}