  import { NextResponse } from "next/server";
  import { NextRequest } from "next/server";
  import { jwtDecode } from "jwt-decode";
  import { AuthUser } from "@/types/types";
  import axios from "axios";

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      return decoded.exp * 1000 < Date.now() + 1000;
    } catch {
      return true;
    }
  };

  const refreshAccessToken = async (refreshToken: string): Promise<string | null> => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/refresh`, null, {
        withCredentials: true,
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      });
      if (response.data?.accessToken) {
        return response.data.accessToken;
      } else {
        throw new Error("No access token in server response");
      }
    } catch (error) {
      return null;
    }
  };

  export async function middleware(request: NextRequest) {
    let accessToken = request.cookies.get("accessToken")?.value;
    let refreshToken = request.cookies.get("refreshToken")?.value;

    if (!accessToken || isTokenExpired(accessToken)) {
      if (!refreshToken) {
        // Redirect to /login only if not already there
        if (request.nextUrl.pathname.startsWith("/login")) {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL("/login", request.url));
        }
      }

      // No accessToken or token expired, attempt to refresh the token
      const newAccessToken = await refreshAccessToken(refreshToken);

      if (!newAccessToken) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const response = NextResponse.redirect(request.url);
      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return response;
    }

    const authUser: AuthUser = jwtDecode(accessToken);

    // Redirect based on authentication status
    if (!authUser && request.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (authUser && request.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
  }

  // Specify the routes that should trigger the middleware
  export const config = {
    matcher: ["/admin/:path*", "/login"], // Adjust to match your protected routes
  };
