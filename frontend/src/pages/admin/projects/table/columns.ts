import { ColumnDef } from '@tanstack/react-table'

export type Project = {
  id: number
  name: string
  description: string
}

export const projectColumns: ColumnDef<Project>[] = [
  {
    accessorKey: 'id',
    header: 'N°',
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
]
