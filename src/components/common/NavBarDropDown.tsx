"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarLinks } from "@/types/types";

const NavBarDropDown: React.FC<{ link: NavbarLinks }> = ({ link }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname();

  const handleClickOutside = (e: any) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <li onClick={() => setIsOpen(!isOpen)} className="relative z-10 mt-3 min-w-24 text-end text-lg font-medium lg:!mt-0 lg:inline-block" key={`sub-${link.label}-${link.href}`}>
        <Link className={`mr-4 no-underline ${pathName === link?.href ? `text-sky-200` : `text-sky-100`} hover:text-white`} href={link?.href}>
          {link?.label}
          {link?.sublinks.length > 0 && <span className="inline-block pl-1">▼</span>}
        </Link>
        {isOpen && (
          <div ref={menuRef} className="absolute right-0 mt-4 min-w-40 bg-sky-400 px-4 pt-2 font-medium shadow-lg ring-1 ring-sky-200 ring-opacity-20 dark:bg-sky-600">
            <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {link?.sublinks.map((sublink) => (
                <li key={`${sublink.label}-${sublink.href}`} className="pb-2">
                  <Link className={`block no-underline ${pathName === sublink?.href ? `text-sky-200` : `text-sky-100`} hover:text-white`} href={sublink?.href}>
                    {sublink?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </li>
    </>
  );
};

export default NavBarDropDown;