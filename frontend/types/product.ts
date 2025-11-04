export interface Product {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stockQty: number;
  weightGrams: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetProductsParams {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
}