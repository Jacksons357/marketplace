import { axiosServerAPI } from "@/lib/axios/axios-server";
import { CreateOrderProps, Order, OrderAdminListResponse } from "@/types/order";
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

export async function getOrdersByUserId(token: string ): Promise<Order[] | undefined> {
  try {
    const response = await axios.get<Order[]>(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
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

export async function getOrderByOrganization(token: string): Promise<OrderAdminListResponse | undefined> {
  try {
    const response = await axios.get<OrderAdminListResponse>(`${process.env.NEXT_PUBLIC_API_URL}/admin/orders`, {
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