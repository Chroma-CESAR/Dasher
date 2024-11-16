"use client";

import { SideBar } from "./components/SideBar";

export default function Home() {
  return (
    <div className="flex">
      <SideBar.Complete />
      <main className="flex h-screen justify-center items-center"></main>
    </div>
  );
}
