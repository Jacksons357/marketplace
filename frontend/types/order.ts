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
