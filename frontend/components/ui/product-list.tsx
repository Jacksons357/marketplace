"use client";

import { ProductCard } from "./product-card";

interface Product {
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

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}