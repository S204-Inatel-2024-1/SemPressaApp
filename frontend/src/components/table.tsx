import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { GLOBALS_CONSTANTS } from '@/constants/globals'
import { Button } from '@/components/ui/button'
import { HelpText } from './ui/tooltip'
import { cn } from '@/lib/shadcn'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  total: number
  fetchFn: (page: number) => Promise<void>
  filter?: { [key: string]: string }
}

export function DataTable<TData, TValue>({
  columns,
  data,
  total,
  filter = {},
  fetchFn,
}: DataTableProps<TData, TValue>) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page') ?? GLOBALS_CONSTANTS.INITIAL_PAGE_OF_LIST),
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(total / 10),
  })

  async function handleChangePage(page: number) {
    setSearchParams((state) => {
      state.set('page', String(page))

      Object.keys(filter).forEach((key) => {
        state.set(key, filter[key])
      })

      return state
    })

    setCurrentPage(page)
    await fetchFn(page)
  }

  return (
    <>
      <div className="border rounded-md">
        <Table className="">
          <TableHeader className="h-11 border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="overflow-hidden">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        'dark:text-slate-100 h-full bg-app-light-title/85 dark:bg-app-dark-blue-900 last:rounded-tr-md first:rounded-tl-md text-app-table-cell-header',
                        header.column.columnDef.id === 'actions' &&
                          'flex items-center gap-3 h-11 pt-0.5',
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      {header.isPlaceholder
                        ? null
                        : header.column.columnDef.id === 'actions' && (
                            <HelpText helpText="Ações para ser executadas em cima de cada dado da tabela" />
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="even:bg-[#E5DBD1]/30 odd:bg-[#EBDACB]/70 dark:odd:bg-[#37384B]/30 dark:even:bg-app-table-cell-body-dark/70"
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="py-0 h-10 truncate text-ellipsis"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="even:bg-[#E5DBD1]/30 odd:bg-[#EBDACB]/70 dark:odd:bg-[#37384B]/30 dark:even:bg-app-table-cell-body-dark/70">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-app-table-cell-body"
                >
                  Não há projetos cadastrados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-app-light-title font-semibold dark:text-white">
          Página {currentPage} de{' '}
          {Math.ceil(total / GLOBALS_CONSTANTS.LIMIT_OF_LIST)}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              let pageToChange = currentPage - 1
              if (pageToChange < 0) {
                pageToChange = 0
              }

              handleChangePage(pageToChange)
            }}
            disabled={!(currentPage > GLOBALS_CONSTANTS.INITIAL_PAGE_OF_LIST)}
            className="disabled:cursor-not-allowed border-2 border-app-light-title/70 text-app-light-title hover:text-app-light-title font-bold dark:bg-white dark:border-white dark:text-slate-900 dark:hover:brightness-75"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              let pageToChange = currentPage + 1
              if (
                pageToChange >
                Math.ceil(total / GLOBALS_CONSTANTS.LIMIT_OF_LIST)
              ) {
                pageToChange = Math.ceil(
                  total / GLOBALS_CONSTANTS.LIMIT_OF_LIST,
                )
              }

              handleChangePage(pageToChange)
            }}
            disabled={
              currentPage >= Math.ceil(total / GLOBALS_CONSTANTS.LIMIT_OF_LIST)
            }
            className="disabled:cursor-not-allowed border-2 border-app-light-title/70 text-app-light-title hover:text-app-light-title font-bold dark:bg-white dark:border-white dark:text-slate-900 dark:hover:brightness-75"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  )
}
