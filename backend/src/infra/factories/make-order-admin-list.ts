import { OrderAdminListController } from "../../application/controllers/order-admin-list.controller";
import { OrderAdminListUseCase } from "../../domain/use-cases/order-admin-list.usecase";
import { OrderRepository } from "../database/repositories/order.repository";
import { OrganizationRepository } from "../database/repositories/organization-repository";
import { ProductRepository } from "../database/repositories/product.repository";
import { UserRepository } from "../database/repositories/user.repository";

export function makeOrderAdminListController() {
  const userRepository = new UserRepository()
  const organizationRepository = new OrganizationRepository()
  const orderRepository = new OrderRepository()
  const productRepository = new ProductRepository()
  const orderAdminListUseCase = new OrderAdminListUseCase(orderRepository, userRepository, organizationRepository, productRepository)

  return new OrderAdminListController(orderAdminListUseCase)
}