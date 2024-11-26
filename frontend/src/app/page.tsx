"use client";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div>
      <Header classname="pr-6 pl-5" />
      <main className="flex flex-col h-screen">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6 w-full">
          <iframe
            src="http://localhost:3002/d-solo/ae4xrbe6nhwxsc/d6d770d?orgId=1&from=1704067200000&to=1723420800000&timezone=browser&theme=light&panelId=4&__feature.dashboardSceneSolo"
            className="w-full h-64 border rounded-lg shadow-lg"
          ></iframe>
          <iframe
            src="http://localhost:3002/d-solo/ae4xrbe6nhwxsc/d6d770d?orgId=1&from=1704067200000&to=1723420800000&timezone=browser&theme=light&panelId=1&__feature.dashboardSceneSolo"
            className="w-full h-64 border rounded-lg shadow-lg"
          ></iframe>
          <iframe
            src="http://localhost:3002/d-solo/ae4xrbe6nhwxsc/d6d770d?orgId=1&from=1704067200000&to=1723420800000&timezone=browser&theme=light&panelId=3&__feature.dashboardSceneSolo"
            className="w-full h-64 border rounded-lg shadow-lg"
          ></iframe>
          <iframe
            src="http://localhost:3002/d-solo/ae4xrbe6nhwxsc/d6d770d?orgId=1&from=1704067200000&to=1723420800000&timezone=browser&theme=light&panelId=2&__feature.dashboardSceneSolo"
            className="w-full h-64 border rounded-lg shadow-lg"
          ></iframe>
        </div>
      </main>
    </div>
  );
}

