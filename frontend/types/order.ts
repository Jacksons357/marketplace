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

