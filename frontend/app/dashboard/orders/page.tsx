'use client'

import { TableProductSkeleton } from "@/components/skeletons/table-product-skeleton";
import { useGetOrderByOrganizationQuery } from "@/lib/queries/order";
import { useSession } from "next-auth/react";
import { columns } from "./columns";
import { OrdersTable } from "./orders-table";

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const token = session?.user?.accessToken || "";
  const { data: orders, isLoading } = useGetOrderByOrganizationQuery(token, {
    enabled: status === "authenticated" && !!token,
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Produtos</h1>
        <p className="text-sm text-muted-foreground">
          Acesse a tabela para visualizar, editar e excluir seus produtos.
        </p>
      </div>
      {
        isLoading ? <TableProductSkeleton /> : (
          <OrdersTable
            columns={columns}
            data={orders?.orders ?? []}
            loading={isLoading}
          />
        )
      }
    </div>
  )
}
