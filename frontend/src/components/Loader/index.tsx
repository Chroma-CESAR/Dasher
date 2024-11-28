import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Loader2 size={64} className="text-primary-container animate-spin"/>
      <h3>Carregando...</h3>
    </div>
  );
}
