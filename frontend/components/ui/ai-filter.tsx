"use client";

import { Sparkles, X } from "lucide-react";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { useState } from "react";

interface AIFilterProps {
  onAISearch: (search: string) => void;
  onClearAISearch?: () => void;
  isActive?: boolean;
}
export function AIFilter({ onAISearch, onClearAISearch, isActive }: AIFilterProps) {
  const [search, setSearch] = useState("");

  function handleSearch() {
    if (search.trim() !== "") onAISearch(search.trim());
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Busca Inteligente
        </CardTitle>
        <CardDescription>
          Descreva o que você procura e deixe nossa IA encontrar os melhores produtos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder="Ex: doce até 50 reais"
            className="min-h-[100px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-2 flex-col">
            <Button className="w-full" onClick={handleSearch}>
              <Sparkles className="w-4 h-4 mr-2" />
              Buscar com IA
            </Button>

            {isActive && (
              <Button
                type="button"
                variant="outline"
                onClick={onClearAISearch}
                className="w-full"
              >
                <X className="w-4 h-4 mr-2" />
                Limpar
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}