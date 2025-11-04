"use client";

import { Input } from "./input";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export function FilterNav() {
  return (
    <div className="w-full bg-card p-4 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="col-span-1 lg:col-span-2">
          <Label htmlFor="search">Buscar</Label>
          <Input
            id="search"
            placeholder="Digite o nome do produto..."
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="category">Categoria</Label>
          <Select>
            <SelectTrigger id="category">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="artesanato">Artesanato</SelectItem>
              <SelectItem value="decoracao">Decoração</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="priceMin">Preço Mínimo</Label>
          <Input
            id="priceMin"
            type="number"
            placeholder="R$ 0,00"
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="priceMax">Preço Máximo</Label>
          <Input
            id="priceMax"
            type="number"
            placeholder="R$ 999,99"
            className="w-full"
          />
        </div>
        <div>
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
      </div>
    </div>
  );
}