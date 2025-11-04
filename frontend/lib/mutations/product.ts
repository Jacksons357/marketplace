import { createProduct, updateProduct, deleteProduct } from "@/http/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UpdateProductParams } from "@/types/product";

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

interface UpdateProductProps {
  token: string;
  productId: string;
  params: UpdateProductParams;
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ token, productId, params }: UpdateProductProps) => {
      return await updateProduct(token, productId, params);
    },
    onSuccess: (_data, variables) => {
      toast.success("Produto atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["products-by-user-id", variables.token] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao atualizar produto");
    },
  });
}

interface DeleteProductProps {
  token: string;
  productId: string;
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ token, productId }: DeleteProductProps) => {
      return await deleteProduct(token, productId);
    },
    onSuccess: (_data, variables) => {
      toast.success("Produto deletado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["products-by-user-id", variables.token] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao deletar produto");
    },
  });
}