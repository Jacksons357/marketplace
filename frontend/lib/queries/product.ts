import { getAiSearch, getCategories, getProducts, getProductsByUserId } from '@/http/product'
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
    ...options,
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

export function useGetProductsByUserId(token: string, page: number, limit: number) {
  return useQuery({
    queryKey: ['products-by-user-id', token, page, limit],
    queryFn: () => getProductsByUserId(token, page, limit),
    enabled: !!token,
    staleTime: 1000 * 60 * 2,
    placeholderData: (prev) => prev,
  })
}