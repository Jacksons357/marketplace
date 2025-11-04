import { log, logAi } from "@/http/log";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface LogBody {
  username: string;
  password: string;
}

export function useLog() {
  return useMutation({
    mutationFn: async ({ username, password }: LogBody) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return await log({ username, password })
    },
    onSuccess: () => {
      toast.success("Login realizado com sucesso!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao realizar login");
    },
  });
}

export function useLogAi() {
  return useMutation({
    mutationFn: async ({ username, password }: LogBody) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return await logAi({ username, password })
    },
    onSuccess: () => {
      toast.success("Login realizado com sucesso!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao realizar login");
    },
  });
}