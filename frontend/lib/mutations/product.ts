import { createProduct } from "@/http/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface CreateProductParams {
  name: string;
  description?: string;
  price: number;
  category: string;
  imageUrl?: string;
  stockQty: number;
  weightGrams: number;
}

interface CreateProductProps {
  token?: string;
  params: CreateProductParams;
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ token, params }: CreateProductProps) => {
      return await createProduct(token!, params);
    },
    onSuccess: (_data, variables) => {
      toast.success("Produto criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["products-by-user-id", variables.token] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao criar produto");
    },
  });
}