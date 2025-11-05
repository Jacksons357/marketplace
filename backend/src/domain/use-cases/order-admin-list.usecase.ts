import { AppError } from "../../shared/errors/app-error"
import { OrganizationNotFoundError } from "../../shared/errors/organization-not-found"
import { UserNotBelongOrganizationError } from "../../shared/errors/user-not-belong-organization"
import { UserNotFoundError } from "../../shared/errors/user-not-found"
import { IOrderRepository } from "../repositories/IOrderRepository"
import { IOrganizationRepository } from "../repositories/IOrganizationRepository"
import { IProductRepository } from "../repositories/IProductRepository"
import { IUserRepository } from "../repositories/IUserRepository"

export class OrderAdminListUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private userRepository: IUserRepository,
    private organizationRepository: IOrganizationRepository,
    private productRepository: IProductRepository
  ) {}

  async execute(userId: string) {
    try {
      const user = await this.userRepository.findById(userId)
      if (!user){
        throw new UserNotFoundError()
      }
      if (!user.organizationId){
        throw new UserNotBelongOrganizationError()
      }

      const organization = await this.organizationRepository.findById(user.organizationId)
      if (!organization){
        throw new OrganizationNotFoundError()
      }
      if (user.organizationId !== organization.id){
        throw new UserNotBelongOrganizationError()
      }

      const orders = await this.orderRepository.listByOrganizationId(organization.id)
      const formattedOrders = await Promise.all(
        orders.map(async (order) => {
          const orderUser = await this.userRepository.findById(order.userId)
          const itemsWithDetails = await Promise.all(
            order.items.map(async (item) => {
              const product = await this.productRepository.findById(item.productId)
              return {
                id: item.id,
                productName: product?.name ?? "Produto não encontrado",
                quantity: item.quantity,
                priceAtPurchase: item.priceAtPurchase,
              }
            })
          )

          return {
            id: order.id,
            totalPrice: order.totalPrice,
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            user: orderUser
              ? {
                  id: orderUser.id,
                  name: orderUser.name,
                  email: orderUser.email,
                  phone: orderUser.phone,
                }
              : null,
            items: itemsWithDetails,
          }
        })
      )
      const totalOrders = formattedOrders.length
      const totalItems = formattedOrders.reduce((sum, order) => {
        return sum + order.items.length
      }, 0)

      return {
        totalOrders,
        totalItems,
        orders: formattedOrders,
      }
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(error instanceof Error ? error.message : 'Internal error', 500)
    }
  }
}
