import Navbar from "@/components/common/Navbar";
import { cookies } from "next/headers"; // Import cookies function
import { redirect } from "next/navigation"; // Import redirect for navigation
import { jwtDecode } from "jwt-decode";
import { AuthUser } from "@/types/types";
import { navbarLinks } from "@/config/config";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value; // Extract accessToken cookie

  if (!accessToken) {
    redirect("/login?error=not_authenticated");
  }

  const authUser: AuthUser = jwtDecode(accessToken);

  return (
    <div>
      <Navbar links={navbarLinks} authUser={authUser} />
      <main className="mx-2 md:mx-4">{children}</main>
    </div>
  );
}
