"use client";

import Link from "next/link";
import { Button } from "./button";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { useGetCategories } from "@/lib/queries/product";
import { CategoryScrollSkeleton } from "../skeletons/category-links-skeleton";

export function CategoryLinks() {
  const { data: categories, isLoading: isLoadingCategories } = useGetCategories()

  if (isLoadingCategories) {
    return <CategoryScrollSkeleton />
  }

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-4 p-4">
        {categories?.map((category) => (
          <Button
            key={category}
            variant="outline"
            className="shrink-0 bg-white"
            asChild
          >
            <Link href={`/?category=${category}`}>{category}</Link>
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}