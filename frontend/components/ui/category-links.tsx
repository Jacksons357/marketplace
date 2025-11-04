"use client";

import Link from "next/link";
import { Button } from "./button";
import { ScrollArea, ScrollBar } from "./scroll-area";

interface CategoryLinksProps {
  categories: string[];
}

export function CategoryLinks({ categories }: CategoryLinksProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-4 p-4">
        {categories.map((category) => (
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