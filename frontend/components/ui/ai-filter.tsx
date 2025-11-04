"use client";

import { Sparkles } from "lucide-react";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

export function AIFilter() {
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
            placeholder="Ex: Procuro uma peça de artesanato sustentável para decorar minha sala..."
            className="min-h-[100px]"
          />
          <Button className="w-full">
            <Sparkles className="w-4 h-4 mr-2" />
            Buscar com IA
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}