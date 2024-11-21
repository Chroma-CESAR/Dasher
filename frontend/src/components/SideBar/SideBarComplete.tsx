"use client"
import { SideBar } from ".";
import logo from "../../../public/Chroma em Preto 1.svg";
import {
  LayoutDashboard,
  FileSpreadsheet,
  Library,
  PersonStanding,
  Settings,
} from "lucide-react";
import { useState } from "react";

export default function SideBarComplete() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
      {/* Button to open sidebar on mobile */}
      <SideBar.HideButton setSidebarOpen={setSidebarOpen} />
      {/* SideBar */}
      <SideBar.Root isOpen={isSidebarOpen}>
        <SideBar.Img img={logo} width={135} height={29} />
        <div className="flex flex-col justify-between h-full">
          <SideBar.List>
            <SideBar.Item name="Dashboard" icon={LayoutDashboard} to="/" />
            <SideBar.Item name="Planilha" icon={FileSpreadsheet} to="/planilha" />
            <SideBar.Item name="Dicionário" icon={Library} to="/dicionario" />
          </SideBar.List>
          <SideBar.List>
            <SideBar.Item name="Conta" icon={PersonStanding} />
            <SideBar.Item name="Ajustes" icon={Settings} />
          </SideBar.List>
        </div>
      </SideBar.Root>
    </div>
  );
}
