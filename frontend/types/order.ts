export interface CreateOrdersBodyParams {
  organizationId: string;
  items: {
    productId: string;
    organizationId: string;
    quantity: number;
    priceAtPurchase: number;
  }[];
}


export interface CreateOrderProps {
  token: string
  params: CreateOrdersBodyParams
}

export interface OrderItem {
  id: string;
  orderId: string;
  name: string;
  productId: string;
  organizationId: string;
  quantity: number;
  priceAtPurchase: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  organizationId: string;
  totalPrice: number;
  status: "PENDING" | "PAID" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  organizationName: string;
}

export interface OrderAdminListResponse {
  totalOrders: number
  totalItems: number
  orders: OrderResponse[]
}

export interface OrderResponse {
  id: string
  totalPrice: number
  status: string
  createdAt: string
  updatedAt: string
  user: OrderUser | null
  items: OrderItem[]
}

export interface OrderUser {
  id: string
  name: string
  email: string
  phone: string
}

export interface OrderItem {
  id: string
  productName: string
  quantity: number
  priceAtPurchase: number
}

