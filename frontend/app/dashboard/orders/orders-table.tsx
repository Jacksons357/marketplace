"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useEffect, useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TableProductSkeleton } from "@/components/skeletons/table-product-skeleton"

interface OrdersTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[] | undefined
  loading: boolean
}

export function OrdersTable<TData, TValue>({
  columns,
  data = [],
  loading,
}: OrdersTableProps<TData, TValue>) {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [search, setSearch] = useState("")

  const filteredData = useMemo(() => {
    if (!search) return data
    const lower = search.toLowerCase()
    return data.filter((order: any) => {
      const name = order.user?.name?.toLowerCase() || ""
      const email = order.user?.email?.toLowerCase() || ""
      return name.includes(lower) || email.includes(lower)
    })
  }, [data, search])

  const paginatedData = useMemo(() => {
    const start = (page - 1) * limit
    const end = start + limit
    return filteredData.slice(start, end)
  }, [filteredData, page, limit])

  const totalPages = Math.ceil(filteredData.length / limit) || 1

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1))
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages))
  const handlePageSizeChange = (newLimit: number) => {
    setLimit(newLimit)
    setPage(1)
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Buscar por cliente"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="overflow-hidden rounded-md border border-zinc-300">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-slate-800/10">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
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
            ) : paginatedData.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="bg-white/30">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum pedido encontrado
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
            value={limit}
            onChange={(e) => handlePageSizeChange(Number(e.target.value) || 3)}
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
            Página {page} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={page >= totalPages || loading}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  )
}
