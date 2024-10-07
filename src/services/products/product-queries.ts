import { useQuery } from "@tanstack/react-query";
import { handleApiError } from "../../utils/api-service";

const API_URL = "http://localhost:3000/api";

// Products
export const useGetProducts = (params: any) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const queryParams = new URLSearchParams(params).toString();
      const response = await fetch(`${API_URL}/products?${queryParams}`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    onError: handleApiError, // Optional error handling
  });
};
