import { axiosPublicAPI } from "@/lib/axios/axios-server";
import { Product } from "@/types/product";
import { AxiosError } from "axios";
import { toast } from "sonner";

export async function getProducts(): Promise<Product[] | undefined> {
  try {
    const response = await axiosPublicAPI.get<Product[]>("/products")
    return response.data
  }catch(error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || 'Erro ao buscar produtos');
      throw new Error(error?.response?.data?.message);
    }
  }
}