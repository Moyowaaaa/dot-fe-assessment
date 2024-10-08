export interface Product {
  id: number;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  stock: number;
  brand: string;
  description: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  specifications: Record<string, string | number | boolean>;
}

export interface ProductFilters {
  search: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy: string;
  order: string;
}
