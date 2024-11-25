"use client";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div>
      <Header classname="pr-6 pl-5" />
      <main className="flex flex-col h-screen justify-center items-center">
        <iframe
          src="http://localhost:3002/d/be51fax9t2z9cd/variacao-do-saldo-ao-longo-do-tempo?orgId=1&from=2024-01-02T00:00:00.000Z&to=2024-08-12T00:00:00.000Z&timezone=browser"
          width="100%"
          height="800"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </main>
    </div>
  );
}
