import { useQuery } from "@tanstack/react-query";
import { handleApiError } from "../../utils/api-service";

const API_URL = "http://localhost:3000/api";

// Products
export const useGetProducts = (params: any) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      try {
        const queryParams = new URLSearchParams(params).toString();
        const response = await fetch(`${API_URL}/products?${queryParams}`);
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      } catch (error) {
        handleApiError(error);
      }
    },
  });
};

export const useGetProduct = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      try {
        const response = await fetch(`${API_URL}/products/${id}`);
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      } catch (error) {
        handleApiError(error);
      }
    },
  });
};
