import { getAiSearch, getCategories, getProducts } from '@/http/product'
import { GetProductsParams } from '@/types/product'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export function useGetProducts(
  params: GetProductsParams,
  options?: Omit<
    UseQueryOptions<any, unknown, any, [string, GetProductsParams]>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    staleTime: 1000 * 60 * 2,
    ...options, // aqui é o segredo
  });
}

export function useGetCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 2
  })
}

export function useGetAiSearch(search: string) {
  return useQuery({
    queryKey: ['ai-search', search],
    queryFn: () => getAiSearch(search),
    enabled: !!search,
    staleTime: 1000 * 60 * 2
  })
}
