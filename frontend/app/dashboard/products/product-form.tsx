"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProduct, useUpdateProduct } from "@/lib/mutations/product";
import { Spinner } from "@/components/ui/spinner";
import { uploadImage } from "@/http/upload-image";
import { toast } from "sonner";
import { ArchiveIcon } from "lucide-react";

interface ProductFormProps {
  token: string;
  product?: any;
  onSuccess: () => void;
}

const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  price: z.number().min(0, "Preço deve ser maior ou igual a 0"),
  category: z.string(),
  imageUrl: z.string().optional(),
  stockQty: z.number().min(0, "Estoque deve ser maior ou igual a 0"),
  weightGrams: z.number().min(0, "Peso deve ser maior ou igual a 0"),
});

type ProductFormValues = z.infer<typeof productSchema>;

export function ProductForm({ token, product, onSuccess }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price,
      category: product?.category || "",
      imageUrl: product?.imageUrl || "",
      stockQty: product?.stockQty ?? 0,
      weightGrams: product?.weightGrams ?? 0,
    },
  })
  const [file, setFile] = useState<File | null>(null);
  const [priceInput, setPriceInput] = useState(
    product?.price ? (product.price * 100).toString() : ""
  )
  useEffect(() => {
    if (product?.price) {
      setPriceInput((product.price * 100).toString());
    }
  }, [product])
  const { mutateAsync: createMutate } = useCreateProduct();
  const { mutateAsync: updateMutate } = useUpdateProduct();

  const onSubmit = async (data: ProductFormValues) => { 
    try {
      let imageUrl = data.imageUrl;
      if (file) {
        imageUrl = await uploadImage(file, product?.id || Date.now().toString());
      }

      const params = { ...data, imageUrl };

      if (product?.id) {
        await updateMutate({ token, productId: product.id, params });
      } else {
        await createMutate({ token, params });
      }

      onSuccess();
      reset();
      setPriceInput("");
      setFile(null);
    } catch (error: any) {
      toast.error(error.message || "Erro ao salvar produto");
    }
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Ração balanceada com proteínas e vitaminas essenciais..."
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Preço (R$)</Label>
          <Input
            id="price"
            value={
              priceInput
                ? (Number(priceInput) / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                : ""
            }
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/\D/g, "");
              setPriceInput(onlyNumbers);
              setValue("price", onlyNumbers ? Number(onlyNumbers) / 100 : 0);
            }}
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Input
            id="category"
            {...register("category")}
            placeholder="Pet Shop"
          />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageFile">Imagem</Label>
        <div className="flex items-center">
          <ArchiveIcon />

          <Input
            id="imageFile"
            type="file"
            accept="image/*"
            className="hover:cursor-pointer"
            onChange={(e) => {
              if (e.target.files?.[0]) setFile(e.target.files[0]);
            }}
          />
        </div>
        {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="stockQty">Estoque (Qtd)</Label>
          <Input
            id="stockQty"
            type="number"
            min="0"
            {...register("stockQty", { valueAsNumber: true })}
          />
          {errors.stockQty && <p className="text-red-500 text-sm">{errors.stockQty.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="weightGrams">Peso (gramas)</Label>
          <Input
            id="weightGrams"
            type="number"
            min="0"
            {...register("weightGrams", { valueAsNumber: true })}
          />
          {errors.weightGrams && <p className="text-red-500 text-sm">{errors.weightGrams.message}</p>}
        </div>
      </div>

      <Button className="w-full" type="submit">
        {isSubmitting ? <Spinner /> : (product ? "Atualizar" : "Criar")}
        
      </Button>
    </form>
  );
}
