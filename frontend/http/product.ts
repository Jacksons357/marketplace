import { axiosPublicAPI } from "@/lib/axios/axios-server";
import { AiSearchResponse, GetProductsParams, Product } from "@/types/product";
import { AxiosError } from "axios";
import { toast } from "sonner";

export async function getProducts(params: GetProductsParams): Promise<Product[] | undefined> {
  try {
    const response = await axiosPublicAPI.get<Product[]>("/products", { params })
    return response.data
  }catch(error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || 'Erro ao buscar produtos');
      throw new Error(error?.response?.data?.message);
    }
  }
}

export async function getCategories(): Promise<string[] | undefined> {
  try {
    const response = await axiosPublicAPI.get<string[]>("/products/categories")
    return response.data
  } catch(error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || 'Erro ao buscar categorias');
      throw new Error(error?.response?.data?.message);
    }
  }
}

export async function getAiSearch(search: string): Promise<AiSearchResponse | undefined> {
  try {
    const response = await axiosPublicAPI.get<AiSearchResponse>("/products/ai", { 
      params: { search } 
    })
    return response.data
  } catch(error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || 'Erro ao buscar produtos');
      throw new Error(error?.response?.data?.message);
    }
  }
}