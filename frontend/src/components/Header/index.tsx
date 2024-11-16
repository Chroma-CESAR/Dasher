"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  return (
    <nav className="flex py-6 pr-6 pl-5 justify-between font-montserrat">
      <h1 className="text-2xl font-bold leading-8">
        {pathname != "/" ? pathname : "DashBoard"}
      </h1>

      <Button
        className="bg-primary-container text-on-primary hover:bg-primary-color"
        onClick={() => console.log("Nova Operação")}
      >
        <PlusCircle size={24} />
        Nova Operação
      </Button>
    </nav>
  );
}
