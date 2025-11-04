"use client";

import Link from "next/link";
import { Button } from "./button";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { useGetCategories } from "@/lib/queries/product";
import { CategoryScrollSkeleton } from "../skeletons/category-links-skeleton";
import { useState } from "react";

interface CategoryLinksProps {
  onCategorySelect?: (category: string) => void;
}

export function CategoryLinks({ onCategorySelect }: CategoryLinksProps) {
  const { data: categories, isLoading: isLoadingCategories } = useGetCategories()
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  if (isLoadingCategories) {
    return <CategoryScrollSkeleton />
  }

  function handleCategoryClick(category: string) {
    const normalizedCategory = category === "Todas" ? "" : category;
    setSelectedCategory(normalizedCategory);
    onCategorySelect?.(normalizedCategory);
  }


  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-4 p-4">
        <Button
          onClick={() => handleCategoryClick("")}
          variant={selectedCategory === "" ? "default" : "outline"}
        >
          Todas
        </Button>

        {categories?.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}