import { Order } from "../entities/Order";

export interface OrderItemCreateParams {
  productId: string
  organizationId: string
  quantity: number
  priceAtPurchase: number
}

export interface OrderCreateParams {
  userId: string
  organizationId: string
  items: readonly OrderItemCreateParams[]
}

export interface IOrderRepository {
  create(order: Order): Promise<Order | null>
}