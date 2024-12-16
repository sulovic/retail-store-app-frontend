import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  const cookies = request.headers.get("cookie");

  const refreshToken = cookies
    ?.split("; ")
    .find((cookie) => cookie.startsWith("refreshToken="))
    ?.split("=")[1];

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token found" }, { status: 401 });
  }

  try {
    const externalApiResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`,
      {},
      {
        withCredentials: true, // Send cookies with request to external API
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      }
    );

    // Create a new response object
    const response = NextResponse.json({ message: "Logged out successfully" });

    // Clear the accessToken cookie
    response.cookies.set("accessToken", "", {
      maxAge: 0, // Immediately expire the cookie
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Clear the refreshToken cookie
    response.cookies.set("refreshToken", "", {
      maxAge: 0, // Immediately expire the cookie
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return response;
  } catch (error: any) {
    const status = error.response?.status || 500;
    const errorData = error.response?.data || { error: "An unexpected error occurred" };
    return NextResponse.json(errorData, { status });
  }
}
