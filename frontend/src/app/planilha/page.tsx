"use client";
import Header from "@/components/Header";
import axiosInstance from "@/utils/axios";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

interface Movimentacao {
  id: number;
  data_movimentacao: string;
  numero_documento: string;
  descricao: string;
  tipo_operacao: string;
  valor: number;
  banco: string;
  categoria: string;
}

interface MovimentacaoResponse {
  data: Movimentacao[];
  total_count: number;
  has_more: boolean;
  page: number;
  items_per_page: number;
}

export default function Planilha() {
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTransactions = async (page: number) => {
    setLoading(true);
    try {
      const { data }: { data: MovimentacaoResponse } = await axiosInstance.get(
        `/movimentacoes?page=${page}&itemsPerPage=15`
      );
      setMovimentacoes(data.data);
      setHasMore(data.has_more);
      setTotalCount(data.total_count);
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(page);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="bg-white shadow-lg flex flex-col h-full ml-5 mr-6 my-5 rounded-xl px-16">
      <Header title="Planilha Movimentações" />

      <div className="overflow-x-auto">
        {loading ? (
          <Loader />
        ) : (
          <table className="table-auto w-full text-center ">
            <thead>
              <tr className="bg-light-surface-bright">
                <th className="px-4 py-2">Descricao</th>
                <th className="px-4 py-2">Categoria</th>
                <th className="px-4 py-2">Valor</th>
                <th className="px-4 py-2">Data</th>
                <th className="px-4 py-2">Número Documento</th>
                <th className="px-4 py-2">Banco</th>
                <th className="px-4 py-2">Tipo de operação</th>
              </tr>
            </thead>
            <tbody>
              {movimentacoes.map((movimentacao, index) => (
                <tr
                  key={`${movimentacao.numero_documento}-${page}-${index}`}
                  className={
                    index % 2 === 0 ? "bg-surface-variant" : "bg-white"
                  }
                >
                  <td className="px-4 py-2 text-left">
                    {movimentacao.descricao}
                  </td>
                  <td className="px-4 py-2">{movimentacao.categoria}</td>
                  <td className="px-4 py-2">
                    {Number(movimentacao.valor).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(
                      movimentacao.data_movimentacao
                    ).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{movimentacao.numero_documento}</td>
                  <td className="px-4 py-2">{movimentacao.banco}</td>
                  <td
                    className={`px-4 py-2 ${
                      movimentacao.tipo_operacao === "Crédito"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {movimentacao.tipo_operacao}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Separator className="my-9 bg-black" />
        <div className="flex justify-end mt-4 py-4">
          <button
            disabled={page === 1 || page > Math.ceil(totalCount / 15)}
            onClick={() => handlePageChange(page - 1)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            <ArrowLeft />
          </button>
          <span className="px-4 py-2">{`Página ${page} de ${Math.ceil(
            totalCount / 15
          )}`}</span>
          <button
            disabled={!hasMore}
            onClick={() => handlePageChange(page + 1)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
