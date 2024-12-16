import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ToastProvider from "@/components/common/ToastProvider";
import "./globals.css";

const roboto = Roboto({
  display: "swap",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Retail Store App",
  description: "Retail store stock management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={`${roboto.className} antialiased`}>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC__GOOGLE_CLIENT_ID as string}>
          <ToastProvider />
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
