/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from '@/components/table'
import { type ComponentProps, type FormEvent, type ReactNode } from 'react'

import { CirclePlus, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Link, useNavigate } from 'react-router-dom'

type BaseModelType<T = unknown> = T & {
  id: unknown
}

interface GenericListPageProps {
  data: BaseModelType[]
  columns: any
  totalOfData: number
  deleteFn: (dataId: number) => Promise<void>
  fetchFn: (page: number, all?: boolean) => Promise<void>
  onSearchFilterSubmitForm: (event: FormEvent<HTMLFormElement>) => Promise<void>
  onSearchFilterInputChange: (filter: string) => void
  defaultQueryFilter?: string | null
  extraActionButtons?: ReactNode[] | ReactNode
  entityName?: string | null
  entity: string
  searchInput?: ComponentProps<'input'> & {
    label?: string
  }
}

export function GenericListPage({
  data,
  columns,
  totalOfData,
  defaultQueryFilter = '',
  entityName,
  extraActionButtons,
  deleteFn,
  fetchFn,
  entity,
}: GenericListPageProps) {
  const navigate = useNavigate()

  return (
    <main className="h-[calc(100vh-52px)] w-screen p-16 pt-8 space-y-4">
      <div className="flex items-end justify-between">
        {/* <form
          onSubmit={(ev) => onSearchFilterSubmitForm(ev)}
          className="flex items-center space-x-4 w-96"
        >
          {searchInput.label && (
            <Label className="text-app-light-label w-20 dark:text-white truncate">
              {searchInput.label}
            </Label>
          )}
          <div className="relative w-full">
            <Search className="size-4 absolute top-1/2 -translate-y-1/2 left-3" />
            <Input
              className="pl-10 w-full placeholder:italic bg-app-light-input dark:bg-app-dark-blue-400/80 border-2 border-app-light-title dark:border-app-dark-blue-900 capitalize"
              placeholder={`${entityName?.toLowerCase().replace(/s$/g, '')}...`}
              value={defaultQueryFilter ?? ''}
              onChange={(ev) => onSearchFilterInputChange(ev.target.value)}
              {...searchInput}
            />
          </div>
        </form> */}
        {entityName && (
          <div className="flex flex-col items-start justify-center text-app-light-title font-bold dark:text-white">
            <span className="text-3xl ml-3">Listagem de</span>
            <span className="text-7xl italic uppercase -mt-2.5">
              {entityName}
            </span>
          </div>
        )}
        <div className="space-x-2">
          {extraActionButtons}
          <Button
            variant="outline"
            asChild
            className="border-2 border-app-light-title/70 text-white hover:text-app-light-title font-bold bg-app-light-title dark:bg-app-dark-blue-900 dark:border-app-dark-blue-900 dark:hover:text-white dark:hover:brightness-125"
          >
            <Link to={`/admin/${entity}/form`} className="capitalize">
              Adicionar {entityName}{' '}
              <CirclePlus className="size-4 ml-2.5" strokeWidth={3} />
            </Link>
          </Button>
        </div>
      </div>
      <DataTable
        filter={{
          q: defaultQueryFilter ?? '',
        }}
        fetchFn={async (page) => await fetchFn(page)}
        total={totalOfData}
        columns={[
          ...columns,
          {
            id: 'actions',
            header: 'Ações',
            cell: ({ row }) => {
              const obj = row.original

              return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Ações</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => deleteFn(Number(obj.id))}>
                      Deletar equipe
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        navigate(
                          `/admin/${entity}/form?mode=update&id=${obj.id}`,
                        )
                      }
                    >
                      Atualizar Equipe
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        navigate(
                          `/admin/${entity}/form?mode=detail&id=${obj.id}`,
                        )
                      }
                    >
                      Ver detalhes
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            },
          },
        ]}
        data={data}
      />
    </main>
  )
}
