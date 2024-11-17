"use client";

import { usePathname } from "next/navigation";
import ModalOperacao from "../ModalOperacao";

export default function Header() {
  const path = usePathname();
  const pathname = path ? path.replace(/^\/(.*)$/, (_, match) => match.charAt(0).toUpperCase() + match.slice(1)) : '';

  return (
    <nav className="flex py-6 pr-6 pl-5 justify-between font-montserrat">
      <h1 className="text-2xl font-bold leading-8">
        {pathname != "" ? pathname : "DashBoard"}
      </h1>

      <ModalOperacao />
    </nav>
  );
}
