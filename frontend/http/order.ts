import { axiosServerAPI } from "@/lib/axios/axios-server";
import { CreateOrdersBodyParams } from "@/types/order";
import { AxiosError } from "axios";
import { toast } from "sonner";

export async function createOrder(params: CreateOrdersBodyParams) {
  try {
    const response = await axiosServerAPI.post('/orders', params)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || 'Erro ao buscar produtos');
      throw new Error(error?.response?.data?.message);
    }
  }
}