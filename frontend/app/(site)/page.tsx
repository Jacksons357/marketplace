"use client";

import { Banner } from "@/components/ui/banner";
import { CategoryLinks } from "@/components/ui/category-links";
import { FilterNav } from "@/components/ui/filter-nav";
import { AIFilter } from "@/components/ui/ai-filter";
import { ProductList } from "@/components/ui/product-list";
import { useGetProducts } from "@/lib/queries/product";
import { Footer } from "@/components/ui/footer";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: products, isLoading } = useGetProducts()
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl border p-4 flex flex-col space-y-3"
          >
            <Skeleton className="h-40 w-full rounded-md" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  const categories = products?.map((product) => product.category) || []

  return (
    <main className="min-h-screen pb-8">
      <Banner />
      
      <div className="container mx-auto space-y-8 px-4 mt-8">
        <CategoryLinks categories={categories} />
        
        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <FilterNav />
          <AIFilter />
        </div>
        
         <ProductList products={products || []} />
      </div>

      <Footer />
    </main>
  );
}
