'use client'

import { useGetProductsByUserId } from "@/lib/queries/product";
import { useSession } from "next-auth/react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { TableProductSkeleton } from "@/components/skeletons/table-product-skeleton";

export default function ProductsPage() {
  const { data: session } = useSession();
  const token = session?.user?.accessToken || "";

  const { data: products, isLoading } = useGetProductsByUserId(token);

  console.log(products)

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
          <DataTable token={token} columns={columns} data={products || []} />
        )
      }
    </div>
  )
}