import axios from "axios";
import { cookies } from "next/headers";

const createAxiosInstance = async () => {
  const cookieStore = await cookies();

  // Extract cookies from the request context
  const accessToken = cookieStore.get("accessToken")?.value || "";

  // Create and configure Axios instance
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return axiosInstance;
};

export default createAxiosInstance;
