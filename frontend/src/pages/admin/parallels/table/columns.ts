import { ColumnDef } from '@tanstack/react-table'

export type Parallel = {
  id: number
  name: string
  description: string
}

export const parallelColumns: ColumnDef<Parallel>[] = [
  {
    accessorKey: 'id',
    header: 'N°',
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
]
