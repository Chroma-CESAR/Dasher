import { useForm } from "react-hook-form";
import axiosInstance from "@/utils/axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  BadgeDollarSign,
  Calendar,
  File,
  PlusCircle,
  Save,
  School,
  X,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useState } from "react";

type OperationFormData = {
  operationType: string;
  operationDate: string;
  documentNumber: string;
  bank: string;
  operationValue: string;
  description: string;
};

export default function ModalOperacao() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<OperationFormData>({
    defaultValues: {
      operationType: "credit",
      operationDate: "",
      documentNumber: "",
      bank: "",
      operationValue: "",
      description: "",
    },
  });

  const onSubmit = async (data: OperationFormData) => {
    const payload = {
      data_movimentacao: new Date(
        data.operationDate.split("/").reverse().join("/")
      )
        .toISOString()
        .split("T")[0],
      numero_documento: data.documentNumber,
      descricao: data.description,
      tipo_operacao: data.operationType === "credit" ? "Crédito" : "Débito",
      valor: parseFloat(data.operationValue).toFixed(2),
      banco: data.bank || "",
    };

    console.log("Payload:", payload);

    try {
      await axiosInstance.post("/movimentacoes", payload);
      alert("Operação cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar operação:", error);
      alert(
        "Erro ao cadastrar operação. Verifique o console para mais detalhes."
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary-container text-on-primary font-montserrat hover:bg-primary-color">
          {" "}
          <PlusCircle /> Nova operação
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Adicionar nova operação</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="gap-4 space-y-6 px-6 font-montserrat text-xs font-medium"
          >
            {/* Tipo de Operação (Radio Buttons) */}
            <div className="space-y-2">
              <FormLabel>Tipo de operação</FormLabel>
              <FormField
                control={form.control}
                name="operationType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        className="flex flex-col"
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="credito" id="credito" />
                          <FormLabel htmlFor="credito" className="text-sm">
                            Crédito
                          </FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="debito" id="debito" />
                          <FormLabel htmlFor="debito" className="text-sm">
                            Débito
                          </FormLabel>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-6">
              {/* Data da Operação */}
              <FormField
                control={form.control}
                name="operationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data da operação</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                          <Calendar />
                        </span>
                        <Input
                          placeholder="__/__/____"
                          className="pl-10 border-on-surface"
                          {...field}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            let value = e.target.value;

                            // Remove qualquer caractere não numérico
                            value = value.replace(/\D/g, "");

                            // Adiciona as barras conforme o formato
                            if (value.length <= 2) {
                              value = value.replace(
                                /(\d{2})(\d{0,2})/,
                                "$1/$2"
                              );
                            } else if (value.length <= 4) {
                              value = value.replace(
                                /(\d{2})(\d{2})(\d{0,2})/,
                                "$1/$2/$3"
                              );
                            } else {
                              value = value.replace(
                                /(\d{2})(\d{2})(\d{4})(\d{0,2})/,
                                "$1/$2/$3"
                              );
                            }

                            // Chama o onChange original de react-hook-form
                            field.onChange(value);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-xs text-gray-500">
                      Insira apenas números
                    </FormDescription>
                  </FormItem>
                )}
              />

              {/* Número do Documento */}
              <FormField
                control={form.control}
                name="documentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>N. do documento</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                          <File />
                        </span>
                        <Input
                          {...field} // Spread de todas as propriedades do field
                          className="border-on-surface pl-10"
                          value={field.value} // Mantém o valor
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            let value = e.target.value;

                            // Remove qualquer caractere não numérico
                            value = value.replace(/[^0-9.,-]/g, "");

                            // Chama o onChange original de react-hook-form
                            field.onChange(value);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-xs text-gray-500">
                      Insira apenas números
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-6">
              {/* Banco */}
              <FormField
                control={form.control}
                name="bank"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banco</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                          <School />
                        </span>
                        <Input
                          placeholder="Insira o banco"
                          {...field}
                          className="pl-10 border-on-surface"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Valor da Operação */}
              <FormField
                control={form.control}
                name="operationValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor da operação</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                          <BadgeDollarSign />
                        </span>
                        <Input
                          {...field}
                          className="pl-10 border-on-surface"
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            let value = e.target.value;

                            // Remove qualquer caractere não numérico
                            value = value.replace(/[^0-9.,-]/g, "");

                            // Chama o onChange original de react-hook-form
                            field.onChange(value);
                          }}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Descrição */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva a operação"
                      {...field}
                      className="border-on-surface"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Saldo */}
            <div className="col-span-2 flex justify-between items-center border-t pt-4">
              <p className="font-bold">Saldo: R$XX.XXX,XX</p>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  type="button"
                  className="text-primary-color"
                  onClick={() => setIsOpen(false)}
                >
                  <X />
                  Cancelar
                </Button>
                <Button type="submit" className="bg-primary-container">
                  <Save />
                  Salvar
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
