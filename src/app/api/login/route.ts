import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    // Forward the request to the external API
    const externalApiResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, body, {
      withCredentials: true, // Send cookies with request to external API
    });

    // Extract accessToken from the response body
    const { accessToken } : { accessToken: string } = externalApiResponse.data;

    // Create a new response object
    const response = NextResponse.json(externalApiResponse.data);

    // Set the accessToken cookie on the new response
    response.cookies.set("accessToken", accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    // Append refreshToken cookies from the external API response to your response
    const refreshTokenCookies = externalApiResponse.headers['set-cookie'];
    if (refreshTokenCookies) {
      refreshTokenCookies.forEach(cookie => {
        response.headers.append('Set-Cookie', cookie);
      });
    }

    return response;
  } catch (error : any) {
    const status = error.response?.status || 500;
    const errorData = error.response?.data || { error: 'An unexpected error occurred' };

    return NextResponse.json(errorData, { status });  }
}
