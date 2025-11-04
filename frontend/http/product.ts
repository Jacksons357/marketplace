import { axiosPublicAPI } from "@/lib/axios/axios-server";
import { AiSearchResponse, GetProductsParams, Product } from "@/types/product";
import axios, { AxiosError } from "axios";
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

export async function getProductsByUserId(token: string ): Promise<Product[] | undefined> {
  try {
    const response = await axios.get<Product[]>(`${process.env.NEXT_PUBLIC_API_URL}/admin/products`, {
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
