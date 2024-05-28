import { ColumnDef } from '@tanstack/react-table'

export type Course = {
  id: number
  name: string
  slug: string
}

export const courseColumns: ColumnDef<Course>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'slug',
    header: 'Slug',
  },
]
