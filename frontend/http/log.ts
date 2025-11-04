import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export interface LogBody {
  username: string;
  password: string;
}

export async function log({ username, password }: LogBody) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/logs`, { username, password })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || 'Erro ao realizar login');
      throw new Error(error?.response?.data?.message);
    }
  }
}

export async function logAi({ username, password }: LogBody) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/logs/ai-search`, { username, password })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || 'Erro ao realizar login');
      throw new Error(error?.response?.data?.message);
    }
  }
}