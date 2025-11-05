import { getOrderByOrganization, getOrdersByUserId } from "@/http/order";
import { Order, OrderAdminListResponse } from "@/types/order";
import { useQuery } from "@tanstack/react-query";

export function useGetOrdersByUserIdQuery(token: string) {
  return useQuery<Order[] | undefined>({
    queryKey: ['orders'],
    queryFn: () => getOrdersByUserId(token),
  })
}

export function useGetOrderByOrganizationQuery(token: string, options?: { enabled: boolean }) {
  return useQuery<OrderAdminListResponse | undefined>({
    queryKey: ['orders'],
    queryFn: () => getOrderByOrganization(token),
    ...options,
    staleTime: 1000 * 60 * 2,
  })
}