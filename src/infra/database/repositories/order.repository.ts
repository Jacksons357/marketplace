import { Order } from "../../../domain/entities/Order";
import { IOrderRepository } from "../../../domain/repositories/IOrderRepository";
import { prisma } from "../prisma/client";

export class OrderRepository implements IOrderRepository {
  async create(order: Order): Promise<Order | null> {
    const created = await prisma.order.create({
      data: {
        id: order.id,
        userId: order.userId,
        organizationId: order.organizationId,
        totalPrice: order.totalPrice,
        status: order.status,
        items: {
          create: order.items.map((item) => ({
            id: item.id,
            productId: item.productId,
            organizationId: item.organizationId,
            quantity: item.quantity,
            priceAtPurchase: item.priceAtPurchase
          }))
        }
      },
      include: { items: true }
    })

    return created
  }
}