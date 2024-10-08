import axios from "axios";

export const API_URL = "http://localhost:3000/api";

export const api = axios.create({
  baseURL: API_URL,
});

// Helper function to handle API errors
export const handleApiError = (error: unknown) => {
  if (error instanceof Error) {
    throw new Error(`API Error: ${error.message}`);
  }
  throw new Error("An unknown error occurred");
};
