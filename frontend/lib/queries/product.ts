import { getCategories, getProducts } from '@/http/product'
import { GetProductsParams } from '@/types/product'
import { useQuery } from '@tanstack/react-query'

export function useGetProducts(params: GetProductsParams) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
    staleTime: 1000 * 60 * 2
  })
}

export function useGetCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 2
  })
}