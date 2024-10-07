import { useQuery } from "@tanstack/react-query";
import { handleApiError } from "../../utils/api-service";

const API_URL = "http://localhost:3000/api";

// Products
export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/categories?`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    onError: handleApiError, // Optional error handling
  });
};
