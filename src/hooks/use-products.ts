import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories, fetchProduct } from "@/lib/api";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProducts(params: {
  category?: string;
  search?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  minDiscount?: number;
}) {
  return useInfiniteQuery({
    queryKey: ["products", params],
    queryFn: ({ pageParam = 1 }) =>
      fetchProducts({ ...params, page: pageParam, limit: 48 }),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    staleTime: 2 * 60 * 1000,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });
}
