import { useGetProducts } from "@/lib/queries/product";
import { GetProductsParams, Product } from "@/types/product";
import { ProductListSkeleton } from "../skeletons/product-list-skeleton";
import { ProductCard } from "./product-card";

interface ProductListProps {
  filters?: GetProductsParams;
  products?: Product[];
}

export function ProductList({ filters, products }: ProductListProps) {
  const { data, isLoading } = useGetProducts(filters ?? {}, {
    enabled: !products,
  });

  const list = products ?? data;

  if (isLoading) return <ProductListSkeleton />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {list?.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
