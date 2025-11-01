import { AppError } from "../../shared/errors/app-error";
import { OrganizationNotFoundError } from "../../shared/errors/organization-not-found";
import { ProductNotFoundError } from "../../shared/errors/product-not-found";
import { UserNotFoundError } from "../../shared/errors/user-not-found";
import { Order } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";
import { IOrderRepository, OrderCreateParams } from "../repositories/IOrderRepository";
import { IOrganizationRepository } from "../repositories/IOrganizationRepository";
import { IProductRepository } from "../repositories/IProductRepository";
import { IUserRepository } from "../repositories/IUserRepository";

export class OrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private organizationRepository: IOrganizationRepository,
    private userRepository: IUserRepository,
    private productRepository: IProductRepository,
  ) {}

  async execute(params: OrderCreateParams) {
    try {
      const organization = await this.organizationRepository.findById(params.organizationId)
      if (!organization) {
        throw new OrganizationNotFoundError()
      }
      const user = await this.userRepository.findById(params.userId)
      if (!user) {
        throw new UserNotFoundError()
      }
      const product = await this.productRepository.findById(params.items[0].productId)
      if (!product) {
        throw new ProductNotFoundError()
      }

      const orderItems = params.items.map((item) => new OrderItem({
        productId: item.productId,
        organizationId: item.organizationId,
        quantity: item.quantity,
        priceAtPurchase: item.priceAtPurchase,
      }))

      const totalPrice = orderItems.reduce((acc, item) => acc + item.quantity * item.priceAtPurchase, 0)
      const order = new Order({
        userId: params.userId,
        organizationId: params.organizationId,
        items: orderItems,
        totalPrice,
      })

      const createdOrder = await this.orderRepository.create(order)
      return createdOrder
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(error instanceof Error ? error.message : 'Internal error', 500)
    }
  }
}