"use client";

import { useGetCategories, useGetProducts } from "@/lib/queries/product";
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

export function FilterNav() {
  const { data: categories, isLoading: isLoadingCategories } = useGetCategories()

  if (isLoadingCategories) {
    return <FilterNavSkeleton />
  }

  return (
    <div className="w-full bg-card p-4 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2">
        <div className="col-span-1 lg:col-span-2 space-y-1">
          <Label htmlFor="search">Buscar</Label>
          <Input
            id="search"
            placeholder="Digite o nome do produto..."
            className="w-full"
          />
        </div>
        <div className="col-span-1 lg:col-span-1 space-y-1">
          <Label htmlFor="category">Categoria</Label>
          <Select>
            <SelectTrigger id="category">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categories?.map((category) => (
                <SelectItem key={category} value={category} >
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
            className="w-full"
          />
        </div>
        <div className="col-span-1 lg:col-span-1 space-y-1">
          <Label htmlFor="priceMax">Preço Máximo</Label>
          <Input
            id="priceMax"
            type="number"
            placeholder="R$ 999,99"
            className="w-full"
          />
        </div>
        <div className="col-span-1 lg:col-span-1 space-y-1" >
          <Label htmlFor="limit">Itens por página</Label>
          <Select>
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
          <Button className="w-full">Filtrar</Button>
        </div>
      </div>
    </div>
  );
}