"use client";
import Header from "@/components/Header";

export default function Home() {
  const urlGrafana = process.env.NEXT_PUBLIC_GRAFANA_URL;
  return (
    <div className="h-full">
      <Header classname="pr-6 pl-5" />
      <main className="flex flex-col h-full pb-20 sm:pb-0">
        <iframe
          src={urlGrafana}
          className="h-[91%] border rounded-lg shadow-lg"
        ></iframe>
      </main>
    </div>
  );
}
