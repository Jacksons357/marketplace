import { createOrder } from "@/http/order";
import { CreateOrdersBodyParams } from "@/types/order";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface CreateOrderProps {
  token?: string;
  params: CreateOrdersBodyParams;
}

export function useCreateOrder() {
  return useMutation({
    mutationFn: async ({ token, params }: CreateOrderProps) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return await createOrder({ token: token || "", params });
    },
    onSuccess: () => {
      toast.success("Pedido criado com sucesso!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao criar pedido");
    },
  });
}