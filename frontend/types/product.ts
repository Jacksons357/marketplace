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