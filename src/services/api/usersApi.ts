import { FilterType, PaginationType, AuthUser } from "@/types/types";
import createAxiosInstance from "../createAxiosInstance";
import generateApiParams from "./generateApiParams";
import { handleApiError } from "../errorHandler";

export const getUsers = async ({
  filters,
  pagination,
  search,
}: {
  filters?: FilterType;
  pagination?: Omit<PaginationType, "count">;
  search?: string;
}): Promise<{ users: AuthUser[]; errorMessage: string | null }> => {
  try {
    const axiosInstance = await createAxiosInstance();
    const apiParams = generateApiParams({ filters, pagination, search });
    const response: { data: AuthUser[] } = await axiosInstance.get(`/api/users${apiParams}`);
    return { users: response.data, errorMessage: null };
  } catch (error) {
    return { users: [], errorMessage: handleApiError(error) };
  }
};

export const getUsersCount = async ({
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
    const response: { data: { count: number } } = await axiosInstance.get(`/api/users/count${apiParams}`);
    return { count: response.data.count, errorMessage: null };
  } catch (error) {
    return { count: 0, errorMessage: handleApiError(error) };
  }
};

export const getUserById = async (id: string): Promise<{ user: AuthUser; errorMessage: string | null }> => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response: { data: AuthUser } = await axiosInstance.get(`/api/users/${id}`);
    return { user: response.data, errorMessage: null };
  } catch (error) {
    return { user: {} as AuthUser, errorMessage: handleApiError(error) };
  }
};

export const postUser = async (
  user: Omit<AuthUser, "userId">
): Promise<{ user: AuthUser; errorMessage: string | null }> => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response: { data: AuthUser } = await axiosInstance.post(`/api/users`, user);
    return { user: response.data, errorMessage: null };
  } catch (error) {
    return { user: {} as AuthUser, errorMessage: handleApiError(error) };
  }
};

export const putUser = async (user: AuthUser): Promise<{ user: AuthUser; errorMessage: string | null }> => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response: { data: AuthUser } = await axiosInstance.put(`/api/users/${user.userId}`, user);
    return { user: response.data, errorMessage: null };
  } catch (error) {
    return { user: {} as AuthUser, errorMessage: handleApiError(error) };
  }
};

export const deleteUser = async (id: string): Promise<{ user: AuthUser; errorMessage: string | null }> => {
  try {
    const axiosInstance = await createAxiosInstance();
    const response: { data: AuthUser } = await axiosInstance.delete(`/api/users/${id}`);
    return { user: response.data, errorMessage: null };
  } catch (error) {
    return { user: {} as AuthUser, errorMessage: handleApiError(error) };
  }
};
