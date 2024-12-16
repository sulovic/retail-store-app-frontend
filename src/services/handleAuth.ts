import axios from "axios";
import { LoginData } from "@/types/types";
import { handleApiError } from "@/services/errorHandler";

const baseUrl = process.env.NEXT_PUBLIC_NEXT_BASE_URL;

export const handleLogin = async ({ type, email, password, credential }: LoginData) => {
  try {
    const loginResponse = await axios.post(`${baseUrl}/api/login`, { type, email, password, credential });

    if (loginResponse.status === 200) {
      return true;
    }
  } catch (error) {
    handleApiError(error);
  }
  return false;
};

export const handleLogout = async () => {
  try {
    const logoutResponse = await axios.post(`${baseUrl}/api/logout`);
    if (logoutResponse.status === 200) {
      return true;
    }
  } catch (error) {
    handleApiError(error);
  }
  return false;
};
