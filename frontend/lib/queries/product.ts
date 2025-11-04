import { getProducts } from '@/http/product'
import { useQuery } from '@tanstack/react-query'

export function useGetProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 2
  })
}