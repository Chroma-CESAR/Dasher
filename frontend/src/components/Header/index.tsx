"use client";

import { usePathname } from "next/navigation";
import ModalOperacao from "../ModalOperacao";

interface HeaderProps {
  classname?: string;
  title?: string;
}

export default function Header({ classname, title }: HeaderProps) {
  const path = usePathname();
  let pathname = '';

  if (title){
    pathname = title;
  }else{
    pathname = path ? path.replace(/^\/(.*)$/, (_, match) => match.charAt(0).toUpperCase() + match.slice(1)) : '';
  }


  return (
    <nav className={`flex py-6 justify-between font-montserrat ${classname}`}>
      <h1 className="text-2xl font-bold leading-8">
        {pathname != "" ? pathname : "DashBoard"}
      </h1>

      <ModalOperacao />
    </nav>
  );
}
