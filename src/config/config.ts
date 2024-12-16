import { NavbarLinks } from "@/types/types";

export const navbarLinks: NavbarLinks[] = [
    {
      label: "Dashboard",
      image: "/favicon.png",
      href: "/admin",
      desc: "Admin dashboard",
      minRole: 1001,
      sublinks: []
    },
    {
      label: "Products",
      image: "/favicon.png",
      href: "/admin/products",
      desc: "Products management",
      minRole: 1001,
      sublinks: []
    },
    {
        label: "Users",
        image: "/favicon.png",
        href: "/admin/users",
        desc: "Users management",
        minRole: 5001,
        sublinks: [
          {
            label: "Test",
            image: "/favicon.png",
            href: "/admin/users/test",
            desc: "Admin Users Test",
            minRole: 5001,
          },
        ]
      },
  ];