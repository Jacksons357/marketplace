import { OrderStatus } from '@prisma/client'
import { randomUUID } from 'crypto'
import { OrderItem } from './OrderItem'

export class Order {
  public readonly id: string
  public readonly userId: string
  public readonly organizationId: string
  public readonly items: OrderItem[]
  public readonly totalPrice: number
  public readonly status: OrderStatus
  public readonly createdAt: Date
  public readonly updatedAt: Date

  constructor(props: {
    id?: string
    userId: string
    organizationId: string
    items: OrderItem[]
    totalPrice: number
    status?: OrderStatus
    createdAt?: Date
    updatedAt?: Date
  }) {
    this.id = props.id ?? randomUUID()
    this.userId = props.userId
    this.organizationId = props.organizationId
    this.items = props.items
    this.totalPrice = props.totalPrice
    this.status = props.status ?? OrderStatus.PENDING
    this.createdAt = props.createdAt ?? new Date()
    this.updatedAt = props.updatedAt ?? new Date()
  }
}
