"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SideBarItemProps {
  icon?: React.ElementType;
  name: string;
  selected?: boolean;
  to?: string;
}

export default function SideBarItem({
  icon: Icon,
  name,
  to = "#",
}: SideBarItemProps) {
  const pathname = usePathname();

  const isSelected = pathname === to;
  return (
    <li
      className={`flex items-center gap-2 p-3 text-primary-color ${
        isSelected ? "border-l-4 border-primary-color" : ""
      }`}
    >
      {Icon && <Icon className="size-5" />}
      <Link href={to}>
        <button className="font-montserrat text-sm font-medium leading-5 tracking-widest">
          {name}
        </button>
      </Link>
    </li>
  );
}
