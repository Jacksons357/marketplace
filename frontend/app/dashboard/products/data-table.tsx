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
import { useEffect, useState } from "react"
import { Product } from "@/types/product"
import { ProductTableProvider } from "./table-context"
import { useDeleteProduct } from "@/lib/mutations/product"
import { TableProductSkeleton } from "@/components/skeletons/table-product-skeleton"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  page: number;
  limit: number;
  total: number;
  token: string;
  loading: boolean;
  onPaginationChange?: (page: number, limit: number) => void
}

export function DataTable<TData, TValue>({
  token,
  columns,
  page,
  limit,
  data,
  total,
  onPaginationChange,
  loading,
}: DataTableProps<TData, TValue>) {
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { mutateAsync: deleteProduct } = useDeleteProduct();
  const [pagination, setPagination] = useState({ pageIndex: page - 1, pageSize: limit })
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination },
    onPaginationChange: setPagination,
  })

  useEffect(() => {
    setPagination({ pageIndex: page - 1, pageSize: limit })
  }, [page, limit])


  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setEditOpen(true);
  }

  const handleDelete = async (product: Product) => {
    if (!token) return;
    await deleteProduct({ token, productId: product.id });
  }

  const handlePrev = () => {
    if (page > 1 && onPaginationChange) onPaginationChange(page - 1, limit)
  }

  const handleNext = () => {
    if (page < total / limit && onPaginationChange) onPaginationChange(page + 1, limit)
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPagination((prev) => ({ pageIndex: 0, pageSize: newPageSize })); // reset pageIndex
    if (onPaginationChange) onPaginationChange(1, newPageSize);
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <TableProductSkeleton />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
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
                  Nenhum produto encontrado
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
            value={pagination.pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value) || 10)}
            className="w-20 h-8"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={page === 1 || loading}
          >
            Anterior
          </Button>
          <span className="text-sm">
            Página {page} de {Math.ceil(total / limit)}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={page >= Math.ceil(total / limit) || loading}
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