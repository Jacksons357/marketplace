"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Badge } from "./badge";
import { useCart } from "@/contexts/cart-context";
import { useState } from "react";
import { Spinner } from "./spinner";

interface ProductCardProps {
  product: {
    id: string;
    organizationId: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    stockQty: number;
    weightGrams: number;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false)

  async function handleAddToCart() {
    setIsAdding(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    addToCart({
      productId: product.id,
      organizationId: product.organizationId,
      name: product.name,
      priceAtPurchase: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
    });

    setIsAdding(false);
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={product.imageUrl} 
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="line-clamp-1">{product.name}</CardTitle>
            <CardDescription className="line-clamp-2">
              {product.description}
            </CardDescription>
          </div>
          <Badge variant="secondary">{product.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-2xl font-bold">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(product.price)}
        </div>
        <div className="text-sm text-gray-500">
          Peso: {product.weightGrams}g
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button
          className="w-full"
          disabled={isAdding}
          onClick={handleAddToCart}
        >
          {isAdding ? (
            <>
              <Spinner />
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Adicionar ao Carrinho
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}