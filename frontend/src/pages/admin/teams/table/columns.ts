import { ColumnDef } from '@tanstack/react-table'

export type Project = {
  id: number
  name: string
  member_one: string
  member_two: string
  member_three: string
  member_four: string
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
  {
    accessorKey: 'member_one',
    header: 'Integrante 1',
  },
  {
    accessorKey: 'member_two',
    header: 'Integrante 2',
  },
  {
    accessorKey: 'member_three',
    header: 'Integrante 3',
  },
  {
    accessorKey: 'member_four',
    header: 'Integrante 4',
  },
]
