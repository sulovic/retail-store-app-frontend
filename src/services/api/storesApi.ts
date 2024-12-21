import { Store } from "@/types/types";
import createAxiosInstance from "@/services/createAxiosInstance";
import { handleApiError } from "@/services/errorHandler";

export const getStores = async (): Promise<{ stores: Store[]; errorMessage: string | null }> => {
    try {
        const axiosInstance = await createAxiosInstance();
        const response: { data: Store[] } = await axiosInstance.get(`/api/stores`);
        return { stores: response.data, errorMessage: null };
      } catch (error) {
        return { stores: [], errorMessage: handleApiError(error) };
      }
  };