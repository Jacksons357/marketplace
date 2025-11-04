import { Product } from '@/types/product'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
  },
  {
    accessorKey: 'imageUrl',
    header: 'Imagem',
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
]
