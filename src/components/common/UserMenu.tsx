"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Modal from "@/components/modals/Modal";
import { NavbarLinks } from "@/types/types";
import { AuthUser } from "@/types/types";
import { handleLogout } from "@/services/handleAuth";
import { toast } from "react-toastify";
import { UserIcon } from "../icons/Icons";

const UserMenu: React.FC<{ links: NavbarLinks[]; authUser: AuthUser }> = ({ links = [], authUser }) => {
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [menuHidden, setMenuHidden] = useState<boolean>(true);
  const currentLocation: string = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleMenuHidden = () => {
    setMenuHidden(!menuHidden);
  };

  const handleClickOutside = (e: any) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuHidden(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogoutConfirmed = async () => {
    setMenuHidden(true);
    const logoutResponse = await handleLogout();
    if (logoutResponse) {
      toast.success(`Uspešno ste se odjavili`, {
        position: "top-center",
      });
      router.push("/");
    } else {
      toast.error(`Greška pri odjavljivanju`, {
        position: "top-center",
      });
    }
    setShowLogoutModal(false);
  };

  return (
    <>
      <div className="relative m-1" ref={menuRef}>
        <button className="button flex  bg-zinc-600 !py-1" type="button" id="dropdownUser" data-dropdown-toggle="dropdown" aria-expanded="false" onClick={toggleMenuHidden}>
          <span className="text-lg text-white">MENU</span>
          <span className="m-auto ps-2 text-white w-9">
          <UserIcon />
          </span>
        </button>
        <div className={`${menuHidden ? "hidden" : "absolute right-0"} z-10 my-2 w-auto min-w-56 divide-y divide-zinc-100 rounded-lg border border-solid border-zinc-600 bg-white shadow dark:bg-zinc-600`}>
          <ul className="mb-0 flex w-full flex-col justify-end px-0 py-2 text-end text-base font-medium text-zinc-600 dark:text-zinc-200" aria-labelledby="dropdownMenu">
            <li key={`userMenu-user`} className="px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-600 dark:hover:text-white">
              {authUser?.firstName + " " + authUser?.lastName}
            </li>
            <div className="my-1 h-0.5 w-full bg-zinc-200"></div>

            {links.map(
              (link, index) =>
                authUser?.UserRoles?.roleId &&
                link?.minRole < authUser?.UserRoles?.roleId && (
                  <React.Fragment key={`fragment-${index}`}>
                    <li className={`block px-4 py-2 font-medium no-underline ${currentLocation === link?.href ? `text-zinc-500` : `text-zinc-600`} text-zinc-600 hover:bg-zinc-100 lg:hidden dark:text-zinc-100 dark:hover:bg-zinc-600 dark:hover:text-white`} key={`userMenu-${index}`} onClick={toggleMenuHidden}>
                      <Link href={link?.href}>{link?.label}</Link>
                    </li>
                    {link?.sublinks.length > 0 &&
                      link.sublinks.map((sublink, subIndex) => (
                        <li key={`userMenu-${index}-${subIndex}`} className={`block px-6 py-1 font-medium no-underline ${currentLocation === link?.href ? `text-zinc-500` : `text-zinc-600`} text-zinc-600 hover:bg-zinc-100 lg:hidden dark:text-zinc-100 dark:hover:bg-zinc-600 dark:hover:text-white`}>
                          <Link href={sublink?.href}>
                            {sublink?.label} {"<"}
                          </Link>
                        </li>
                      ))}
                  </React.Fragment>
                )
            )}
            <div className="my-1 h-0.5 w-full bg-zinc-200"></div>

            <li key={`toggleDarkMode`} className="px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-600 dark:hover:text-white">
              <div className="flex items-center justify-end">
                <p>Dark mode: </p>
              </div>
            </li>
            <div className="my-1 h-0.5 w-full bg-zinc-200"></div>

            <li key={`userMenu-logout`} className="px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-600 dark:hover:text-white">
              <button className="float-end" onClick={() => setShowLogoutModal(true)}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {showLogoutModal && <Modal onOK={handleLogoutConfirmed} onCancel={() => setShowLogoutModal(false)} title="Odjava iz aplikacije" question="Da li ste sigurni da želite da se odjavite sa aplikacije?" />}
    </>
  );
};

export default UserMenu;
