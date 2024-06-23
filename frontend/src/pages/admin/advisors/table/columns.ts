import { ColumnDef } from '@tanstack/react-table'

export type User = {
  id: number
  name: string
  email: string
  registration: number
  role: string
  photoUrl?: string
}

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'N°',
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'email',
    header: 'E-mail',
  },
  {
    accessorKey: 'registration',
    header: 'Matrícula',
  },
]
