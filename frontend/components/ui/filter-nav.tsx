"use client";

import { useState } from "react";
import { useGetCategories } from "@/lib/queries/product";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { FilterNavSkeleton } from "../skeletons/filter-nav-skeleton";
import { GetProductsParams } from "@/types/product";

interface FilterNavProps {
  onFilterChange: (filters: GetProductsParams) => void;
}

export function FilterNav({ onFilterChange }: FilterNavProps) {
  const { data: categories, isLoading: isLoadingCategories } = useGetCategories();

  const [filters, setFilters] = useState<GetProductsParams>({
    search: "",
    category: "all",
    limit: 12,
  });

  if (isLoadingCategories) return <FilterNavSkeleton />;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value }));
  }

  function handleCategoryChange(value: string) {
    setFilters((prev) => ({ ...prev, category: value }));
  }

  function handleLimitChange(value: string) {
    setFilters((prev) => ({ ...prev, limit: Number(value) }));
  }

  function handleFilter() {
    const parsed = {
      search: filters.search || undefined,
      category: filters.category === "all" ? undefined : filters.category,
      priceMin: filters.priceMin ? Number(filters.priceMin) : undefined,
      priceMax: filters.priceMax ? Number(filters.priceMax) : undefined,
      limit: filters.limit,
    };
    onFilterChange(parsed);
  }

  return (
    <div className="w-full bg-card p-4 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2">
        <div className="col-span-1 lg:col-span-2 space-y-1">
          <Label htmlFor="search">Buscar</Label>
          <Input
            id="search"
            placeholder="Digite o nome do produto..."
            value={filters.search}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div className="col-span-1 lg:col-span-1 space-y-1">
          <Label htmlFor="category">Categoria</Label>
          <Select
            value={filters.category}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categories?.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-1 lg:col-span-1 space-y-1">
          <Label htmlFor="priceMin">Preço Mínimo</Label>
          <Input
            id="priceMin"
            type="number"
            placeholder="R$ 0,00"
            value={filters.priceMin || ""}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-1 lg:col-span-1 space-y-1">
          <Label htmlFor="priceMax">Preço Máximo</Label>
          <Input
            id="priceMax"
            type="number"
            placeholder="R$ 999,99"
            value={filters.priceMax || ""}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-1 lg:col-span-1 space-y-1">
          <Label htmlFor="limit">Itens por página</Label>
          <Select
            value={String(filters.limit)}
            onValueChange={handleLimitChange}
          >
            <SelectTrigger id="limit">
              <SelectValue placeholder="12" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="24">24</SelectItem>
              <SelectItem value="36">36</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-1 lg:col-span-2 mt-2 flex items-center justify-center">
          <Button onClick={handleFilter} className="w-full">
            Filtrar
          </Button>
        </div>
      </div>
    </div>
  );
}
