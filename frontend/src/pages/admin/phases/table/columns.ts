import { ColumnDef } from '@tanstack/react-table'

export type Phase = {
  id: number
  name: string
  period: string
  isActive: boolean
}

export const phaseColumns: ColumnDef<Phase>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'period',
    header: 'Período',
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
  },
]
