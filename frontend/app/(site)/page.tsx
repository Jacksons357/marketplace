"use client";

import { Banner } from "@/components/ui/banner";
import { CategoryLinks } from "@/components/ui/category-links";
import { FilterNav } from "@/components/ui/filter-nav";
import { AIFilter } from "@/components/ui/ai-filter";
import { ProductList } from "@/components/ui/product-list";
import { useGetCategories, useGetProducts } from "@/lib/queries/product";
import { Footer } from "@/components/ui/footer";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  return (
    <main className="min-h-screen pb-8">
      <Banner />
      
      <div className="container mx-auto space-y-8 px-4 mt-8">
        <CategoryLinks />
        
        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <FilterNav />
          <AIFilter />
        </div>
        
         <ProductList />
      </div>

      <Footer />
    </main>
  );
}
