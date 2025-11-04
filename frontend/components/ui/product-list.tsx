"use client";

import { useGetProducts } from "@/lib/queries/product";
import { ProductCard } from "./product-card";
import { ProductListSkeleton } from "../skeletons/product-list-skeleton";
import { GetProductsParams } from "@/types/product";

interface ProductListProps {
  filters: GetProductsParams;
}

export function ProductList({ filters }: ProductListProps) {
  const { data: products, isLoading: isLoadingProducts } = useGetProducts(filters)

  if (isLoadingProducts) {
    return <ProductListSkeleton />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}