import { FilterType, PaginationType, Product } from "@/types/types";
import createAxiosInstance from "@/services/createAxiosInstance";
import generateApiParams from "@/services/api/generateApiParams";
import { handleApiError } from "@/services/errorHandler";

export const getProducts = async ({
  filters,
  pagination,
  search,
}: {
  filters?: FilterType;
  pagination?: Omit<PaginationType, "count">;
  search?: string;
}): Promise<{ products: Product[]; errorMessage: string | null }> => {
  try {
    const axiosInstance = await createAxiosInstance();
    const apiParams = generateApiParams({ filters, pagination, search });
    const response: { data: Product[] } = await axiosInstance.get(`/api/products${apiParams}`);
    return { products: response.data, errorMessage: null };
  } catch (error) {
    return { products: [], errorMessage: handleApiError(error) };
  }
};

export const getProductsCount = async ({
  filters,
  pagination,
  search,
}: {
  filters?: FilterType;
  pagination?: Omit<PaginationType, "count">;
  search?: string;
}): Promise<{ count: number; errorMessage: string | null }> => {
  try {
    const axiosInstance = await createAxiosInstance();
    const apiParams = generateApiParams({ filters, pagination, search });
    const response: { data: { count: number } } = await axiosInstance.get(`/api/products/count${apiParams}`);
    return { count: response.data.count, errorMessage: null };
  } catch (error) {
    return { count: 0, errorMessage: handleApiError(error) };
  }
};

export const getProductById = async (id: string): Promise<{ product: Product; errorMessage: string | null }> => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response: { data: Product } = await axiosInstance.get(`/api/products/${id}`);
    return { product: response.data, errorMessage: null };
  } catch (error) {
    return { product: {} as Product, errorMessage: handleApiError(error) };
  }
};

export const postProduct = async (
  product: Omit<Product, "productId" | "productImage">
): Promise<{ product: Product; errorMessage: string | null }> => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response: { data: Product } = await axiosInstance.post(`/api/products`, product);
    return { product: response.data, errorMessage: null };
  } catch (error) {
    return { product: {} as Product, errorMessage: handleApiError(error) };
  }
};

export const putProduct = async (product: Product): Promise<{ product: Product; errorMessage: string | null }> => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response: { data: Product } = await axiosInstance.put(`/api/products/${product.productId}`, product);
    return { product: response.data, errorMessage: null };
  } catch (error) {
    return { product: {} as Product, errorMessage: handleApiError(error) };
  }
};

export const deleteProduct = async (id: string): Promise<{ product: Product; errorMessage: string | null }> => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response: { data: Product } = await axiosInstance.delete(`/api/products/${id}`);
    return { product: response.data, errorMessage: null };
  } catch (error) {
    return { product: {} as Product, errorMessage: handleApiError(error) };
  }
};
