"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProductFormProps {
  token: string;
  product?: any;
  onSuccess: () => void;
}

export function ProductForm({ token, product, onSuccess }: ProductFormProps) {
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || "");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(name, price);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Nome</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Preço</label>
        <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <Button className="w-full" type="submit">{product ? "Atualizar" : "Criar"}</Button>
    </form>
  );
}
