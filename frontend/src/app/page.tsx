"use client";
import Header from "@/components/Header";

export default function Home() {
  const urlGrafana = process.env.NEXT_PUBLIC_GRAFANA_URL;
  const graph1 = process.env.NEXT_PUBLIC_GRAPH1
  const graph2 = process.env.NEXT_PUBLIC_GRAPH2
  const graph3 = process.env.NEXT_PUBLIC_GRAPH3
  const graph4 = process.env.NEXT_PUBLIC_GRAPH4
  return (
    <div>
      <Header classname="pr-6 pl-5" />
      <main className="flex flex-col h-screen">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6 w-full">
          <iframe
            src={`${urlGrafana}${graph1}`}
            className="w-full h-64 border rounded-lg shadow-lg"
          ></iframe>
          <iframe
            src={`${urlGrafana}${graph2}`}
            className="w-full h-64 border rounded-lg shadow-lg"
          ></iframe>
          <iframe
            src={`${urlGrafana}${graph3}`}
            className="w-full h-64 border rounded-lg shadow-lg"
          ></iframe>
          <iframe
            src={`${urlGrafana}${graph4}`}
            className="w-full h-64 border rounded-lg shadow-lg"
          ></iframe>
        </div>
      </main>
    </div>
  );
}

