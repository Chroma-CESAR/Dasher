import { Menu, X } from "lucide-react";
import { useState } from "react";

interface SideBarHideButtonProps {
  setSidebarOpen: (isOpen: boolean) => void;
}

export default function SideBarHideButton({
  setSidebarOpen,
}: SideBarHideButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setSidebarOpen(!isOpen);
  };

  return (
    <button
      onClick={toggleSidebar}
      className="absolute top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md md:hidden"
    >
      {isOpen ? <X size={10} /> : <Menu size={24} />}
    </button>
  );
}
