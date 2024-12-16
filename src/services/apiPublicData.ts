import axios from "axios";
import { Product } from "@/types/types";
import { handleApiError } from "./errorHandler";

export const getProducts = async (): Promise<{ products: Product[]; errorMessage: string | null }> => {
  try {
    const response: { data: Product[] } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/publicProducts`);
    return { products: response.data, errorMessage: null };
  } catch (error: any) {
    return { products: [], errorMessage: handleApiError(error) };
  }
};
