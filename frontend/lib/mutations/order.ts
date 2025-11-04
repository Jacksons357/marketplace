import { createOrder } from "@/http/order";
import { CreateOrdersBodyParams } from "@/types/order";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateOrder() {
  return useMutation({
    mutationFn: (params: CreateOrdersBodyParams) => createOrder(params),
    onSuccess: () => {
      toast.success("Pedido adicionado ao carrinho!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao enviar pedido");
    },
  })
}