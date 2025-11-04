"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ProductForm } from "./product-form"
import { useState } from "react"
import { Product } from "@/types/product"
import { ProductTableProvider } from "./table-context"
import { useDeleteProduct } from "@/lib/mutations/product"
import { TableProductSkeleton } from "@/components/skeletons/table-product-skeleton"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  token: string;
}

export function DataTable<TData, TValue>({
  token,
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { mutateAsync: deleteProduct } = useDeleteProduct();
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination },
    onPaginationChange: setPagination,
  })

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setEditOpen(true);
  }

  const handleDelete = async (product: Product) => {
    if (!token) return;
    await deleteProduct({ token, productId: product.id });
  }

  return (
    <ProductTableProvider value={{ onEdit: handleEdit, onDelete: handleDelete }}>
      <div className="flex flex-col space-y-4">
      <div className="flex justify-between">
        <Input
          placeholder="Buscar por nome"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon />
              Novo Produto
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Produto</DialogTitle>
              <DialogDescription>
                Crie um novo produto para ser listado no catálogo.
              </DialogDescription>
            </DialogHeader>

            <ProductForm token={token} onSuccess={() => setIsOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="overflow-hidden rounded-md border border-zinc-300">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-slate-800/10">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="bg-white/30"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <TableProductSkeleton />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">Linhas por página:</span>
          <Input
            type="number"
            min={1}
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              const next = Number(e.target.value) || 10
              table.setPageSize(next)
            }}
            className="w-20 h-8"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <span className="text-sm">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
            <DialogDescription>
              Atualize os dados do produto selecionado.
            </DialogDescription>
          </DialogHeader>

          {selectedProduct && (
            <ProductForm
              token={token}
              product={selectedProduct}
              onSuccess={() => {
                setEditOpen(false);
                setSelectedProduct(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
    </ProductTableProvider>
  )
}