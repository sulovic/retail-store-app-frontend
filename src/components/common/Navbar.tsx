"use client";

import Link from "next/link";
import Image from "next/image";
import NavBarDropDown from "@/components/common/NavBarDropDown";
import UserMenu from "@/components/common/UserMenu";
import { usePathname } from "next/navigation";
import { NavbarLinks } from "@/types/types";
import { AuthUser } from "@/types/types";

const Navbar: React.FC<{ links: NavbarLinks[] , authUser: AuthUser }> = ({ links = [] , authUser }) => {

  const pathName = usePathname();

  return (
    <nav tabIndex={-1} className={`mb-3 flex flex-wrap items-center justify-between bg-sky-400 p-1 dark:bg-sky-600`}>
      <Link href="/" className="flex items-center ps-2">
        <Image src={"/favicon.png"} alt="Logo" width={40} height={40} />
      </Link>
      <div className="mr-6 flex items-center ps-2">
        <h4 className="text-white">Retail Store Admin</h4>
      </div>
      <div className="hidden lg:flex lg:w-auto lg:flex-grow lg:items-center">
        <ul className="mb-0" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          {links.map((link) =>
            link.sublinks.length === 0 ? (
              <li className="mt-3 text-end text-lg font-medium lg:!mt-0 lg:inline-block" key={`${link.label}-${link.href}`}>
                <Link className={`mr-4 no-underline ${pathName === link?.href ? `text-sky-200` : `text-sky-100`} hover:text-white`} href={link?.href}>
                  {link?.label}
                </Link>
              </li>
            ) : (
              <NavBarDropDown key={link.label} link={link} />
            )
          )}
        </ul>
      </div>
      <div className="flex justify-end pe-1">
        <UserMenu links={links} authUser={authUser}/>
      </div>
    </nav>
  );
};

export default Navbar;
