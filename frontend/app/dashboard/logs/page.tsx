"use client";

import { useState, useMemo } from "react";
import { useLog } from "@/lib/mutations/log";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";

const logLogin = z.object({
  username: z.string().min(1, "Nome é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type LogLogin = z.infer<typeof logLogin>;

export default function LogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LogLogin>({
    resolver: zodResolver(logLogin),
  });

  const { mutateAsync: fetchLogs, isPending } = useLog();

  async function onSubmit(data: LogLogin) {
    try {
      const response = await fetchLogs(data);
      setLogs(response || []);
      setCurrentPage(1);
      reset();
    } catch (err) {
      console.error(err);
    }
  }

  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return logs.slice(start, start + itemsPerPage);
  }, [logs, currentPage]);

  const totalPages = Math.ceil(logs.length / itemsPerPage);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Consultar Logs</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl"
      >
        <div>
          <Input placeholder="Usuário" {...register("username")} />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div>
          <Input
            type="password"
            placeholder="Senha"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting || isPending}>
          {isPending ? <Spinner /> : "Buscar Logs"}
        </Button>
      </form>

      {/* Tabela de logs */}
      {logs.length > 0 && (
        <>
          <div className="overflow-x-auto border rounded-lg shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>UserId</TableHead>
                  <TableHead>Rota</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Latency (ms)</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.userId || "-"}</TableCell>
                    <TableCell>{log.route}</TableCell>
                    <TableCell>{log.method}</TableCell>
                    <TableCell>{log.status}</TableCell>
                    <TableCell>{log.latencyMs}</TableCell>
                    <TableCell>
                      {new Date(log.createdAt).toLocaleString("pt-BR")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-between items-center pt-4">
            <p className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Próxima
              </Button>
            </div>
          </div>
        </>
      )}

      {logs.length === 0 && !isPending && (
        <p className="text-muted-foreground text-sm">
          Nenhum log encontrado. Preencha o formulário e clique em "Buscar Logs".
        </p>
      )}
    </div>
  );
}
