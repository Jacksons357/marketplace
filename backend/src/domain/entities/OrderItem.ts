import { randomUUID } from 'crypto'

export class OrderItem {
  public readonly id: string
  public readonly orderId?: string
  public readonly productId: string
  public readonly organizationId: string
  public readonly quantity: number
  public readonly priceAtPurchase: number
  public readonly createdAt: Date
  public readonly updatedAt: Date

  constructor(props: {
    id?: string
    orderId?: string
    productId: string
    organizationId: string
    quantity: number
    priceAtPurchase: number
    createdAt?: Date
    updatedAt?: Date
  }) {
    this.id = props.id ?? randomUUID()
    this.orderId = props.orderId
    this.productId = props.productId
    this.organizationId = props.organizationId
    this.quantity = props.quantity
    this.priceAtPurchase = props.priceAtPurchase
    this.createdAt = props.createdAt ?? new Date()
    this.updatedAt = props.updatedAt ?? new Date()
  }
}
