"use client";

import { Banner } from "@/components/ui/banner";
import { CategoryLinks } from "@/components/ui/category-links";
import { FilterNav } from "@/components/ui/filter-nav";
import { AIFilter } from "@/components/ui/ai-filter";
import { ProductList } from "@/components/ui/product-list";
import { Footer } from "@/components/ui/footer";
import { useState } from "react";
import { GetProductsParams } from "@/types/product";
import { useGetAiSearch } from "@/lib/queries/product";
import { ProductListSkeleton } from "@/components/skeletons/product-list-skeleton";

export default function Home() {
  const [filters, setFilters] = useState<GetProductsParams>({});
  const [aiSearch, setAiSearch] = useState<string>("");

  const { data: aiData, isLoading: isLoadingAi } = useGetAiSearch(aiSearch);

  const isAiMode = !!aiSearch;
  function handleClearAISearch() {
    setAiSearch("")
  }

  return (
    <main className="min-h-screen pb-8">
      <Banner />
      
      <div className="container mx-auto space-y-8 px-4 mt-8">
        <CategoryLinks onCategorySelect={(category) => setFilters({ category })} />
        
        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <FilterNav onFilterChange={setFilters} />
          <AIFilter onAISearch={setAiSearch} onClearAISearch={handleClearAISearch} isActive={isAiMode} />
        </div>

        {isAiMode ? (
          isLoadingAi ? (
            <ProductListSkeleton />
          ) : (
              <ProductList products={aiData?.products ?? []} />
          )
        ) : (
          <ProductList filters={filters} />
        )}
      </div>

      <Footer />
    </main>
  );
}
