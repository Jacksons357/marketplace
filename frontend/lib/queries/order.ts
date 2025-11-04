import { getOrdersByUserId } from "@/http/order";
import { Order } from "@/types/order";
import { useQuery } from "@tanstack/react-query";

export function useGetOrdersByUserIdQuery(token: string) {
  return useQuery<Order[] | undefined>({
    queryKey: ['orders'],
    queryFn: () => getOrdersByUserId(token),
  })
}
