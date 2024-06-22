import { DataTable } from '@/components/table'
import { phaseColumns } from './table/columns'
import { useEffect, useState, type FormEvent } from 'react'

import { MoreHorizontal, Plus, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { GLOBALS_CONSTANTS } from '@/constants/globals'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { usePhaseStore } from '@/store/app/phase'

export function AdminPhaseList() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { fetchPhases, deletePhase, phases, totalOfPhases } = usePhaseStore(
    (state) => ({
      phases: state.phases,
      fetchPhases: state.loadPhases,
      deletePhase: state.deletePhase,
      totalOfPhases: state.totalOfPhases,
    }),
  )

  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const initialCurrentPage = Number(
    searchParams.get('page') ?? GLOBALS_CONSTANTS.INITIAL_PAGE_OF_LIST,
  )

  useEffect(() => {
    fetchPhases(query, initialCurrentPage)
  }, [initialCurrentPage, fetchPhases, query])

  async function handleSearchTeamsByTitle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSearchParams((state) => {
      state.set('page', String(GLOBALS_CONSTANTS.INITIAL_PAGE_OF_LIST))
      state.set('q', query)

      return state
    })

    location.reload()
  }

  return (
    <main className="h-[calc(100vh-64px)] w-screen p-16 pt-8 space-y-4">
      <h1 className="text-slate-800 dark:text-slate-50 text-2xl font-semibold">
        Listagem das fases da fetin
      </h1>
      <div className="flex items-center justify-between">
        <form
          onSubmit={(ev) => handleSearchTeamsByTitle(ev)}
          className="flex items-center space-x-4 w-96"
        >
          <Label>Nome</Label>
          <div className="relative w-full">
            <Search className="size-4 absolute top-1/2 -translate-y-1/2 left-3" />
            <Input
              className="pl-10 w-full placeholder:italic"
              placeholder="Digite o nome do curso..."
              value={query}
              onChange={(ev) => setQuery(ev.target.value)}
            />
          </div>
        </form>

        <Button variant="outline" asChild>
          <Link to="/admin/phases/form">
            Adicionar Fase <Plus className="size-4 ml-2.5" />
          </Link>
        </Button>
      </div>
      <DataTable
        filter={{
          q: query,
        }}
        fetchFn={async (page) => await fetchPhases(query, page)}
        total={totalOfPhases}
        columns={[
          ...phaseColumns,
          {
            id: 'actions',
            header: 'Ações',
            cell: ({ row }) => {
              const phase = row.original

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
                    <DropdownMenuItem
                      onClick={async () => {
                        await deletePhase(phase.id)

                        location.reload()
                      }}
                    >
                      Deletar fase
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        navigate(
                          `/admin/phases/form?mode=update&phaseId=${phase.id}`,
                        )
                      }
                    >
                      Atualizar Fase
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        navigate(
                          `/admin/phases/form?mode=detail&phaseId=${phase.id}`,
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
        data={phases}
      />
    </main>
  )
}
