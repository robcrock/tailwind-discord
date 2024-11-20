"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

const NavLink = ({ href, children }: NavLinkProps) => {
  let pathname = usePathname();
  pathname = pathname.split("/").slice(0, 3).join("/");
  const isActive = pathname === href;

  const activeIndicatorBaseClasses =
    "bg-white group-hover:w-1 rounded-r-full transition-all duration-300 origin-left";
  const activeIndicatorActiveClasses = "scale-1 group-hover:scale-100 w-1 h-10";
  const activeIndicatorInactiveClasses =
    "scale-0 group-hover:scale-100 w-1 h-4";

  const iconBaseClasses =
    "flex h-12 w-12 items-center justify-center transition-all duration-300 group-hover:rounded-2xl group-hover:bg-brand group-hover:text-white overflow-hidden";
  const iconActiveClasses = "rounded-2xl bg-brand text-white";
  const iconInactiveClasses = "rounded-3xl bg-gray-800 text-gray-400";

  return (
    <div className="group relative">
      <div className="absolute -left-3 flex h-full items-center">
        <div
          className={`${isActive ? activeIndicatorActiveClasses : activeIndicatorInactiveClasses} ${activeIndicatorBaseClasses}`}
        ></div>
      </div>
      <div className="group-active:translate-y-px">
        <Link
          href={href}
          className={`${isActive ? iconActiveClasses : iconInactiveClasses} ${iconBaseClasses}`}
        >
          {children}
        </Link>
      </div>
    </div>
  );
};

export default NavLink;
