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
  search?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  limit?: number;
  page?: number;
}

export interface AiSearchResponse {
  products: Product[];
  filters: {
    priceMax?: number;
    search?: string;
    interpretation?: string;
  };
  total: number;
  page: number;
  limit: number;
}

export interface UpdateProductParams {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  imageUrl?: string;
  stockQty?: number;
  weightGrams?: number;
}