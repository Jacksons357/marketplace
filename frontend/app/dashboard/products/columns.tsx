import { Product } from '@/types/product'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import * as React from 'react'
import { useProductTable } from './table-context'

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
    cell: ({ getValue }) => {
    const date = new Date(getValue() as string);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
    },
  },
  {
    accessorKey: 'imageUrl',
    header: 'Imagem',
    cell: ({ row }) => {
      const product = row.original
      const url = product.imageUrl
      return (
        <div className="h-12 w-12 overflow-hidden rounded-md bg-muted">
          {url ? (
            <img
              src={url}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full grid place-items-center text-xs text-muted-foreground">
              —
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
  },
  {
    accessorKey: 'price',
    header: 'Preço',
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
  },
  {
    accessorKey: 'stockQty',
    header: 'Estoque',
  },
  {
    accessorKey: 'weightGrams',
    header: 'Peso (g)',
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      const product = row.original
      const { onEdit, onDelete } = useProductTable()
      return (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => onDelete(product)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  },
]
