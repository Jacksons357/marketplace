import { axiosServerAPI } from "@/lib/axios/axios-server";
import { CreateOrderProps } from "@/types/order";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export async function createOrder({ token, params }: CreateOrderProps) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || 'Erro ao buscar produtos');
      throw new Error(error?.response?.data?.message);
    }
  }
}