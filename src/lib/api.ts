export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  subcategory: string;
  images: string[];
  rating: number;
  reviews: number;
  stock: number;
  isNew: boolean;
  isBestseller: boolean;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
  productCount: number;
}

interface ProductsResponse {
  products: Product[];
  page: number;
  totalPages: number;
  total: number;
}

export async function fetchProducts(params: {
  category?: string;
  page?: number;
  limit?: number;
  search?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  minDiscount?: number;
}): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set("page", params.page.toString());
  if (params.limit) searchParams.set("limit", params.limit.toString());
  if (params.category && params.category !== "All") searchParams.set("category", params.category);
  if (params.search) searchParams.set("search", params.search);
  if (params.isNew) searchParams.set("isNew", "true");
  if (params.isBestseller) searchParams.set("isBestseller", "true");
  if (params.minDiscount) searchParams.set("minDiscount", params.minDiscount.toString());

  const res = await fetch(`/api/products?${searchParams}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch("/api/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return [{ id: "All", name: "All", icon: "🔥", subcategories: [], productCount: 2000 }, ...data];
}

export async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
