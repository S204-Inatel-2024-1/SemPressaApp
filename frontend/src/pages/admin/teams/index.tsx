import { DataTable } from '@/components/table'
import { projectColumns } from './table/columns'
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
import { Link, useSearchParams } from 'react-router-dom'
import { GLOBALS_CONSTANTS } from '@/constants/globals'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useTeamStore } from '@/store/app/team'

import * as XLSX from 'xlsx'

export function AdminHome() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { fetchTeams, deleteTeam, teams, totalOfTeams } = useTeamStore(
    (state) => ({
      teams: state.teams,
      fetchTeams: state.loadTeams,
      deleteTeam: state.deleteTeam,
      totalOfTeams: state.totalOfTeams,
    }),
  )

  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const initialCurrentPage = Number(
    searchParams.get('page') ?? GLOBALS_CONSTANTS.INITIAL_PAGE_OF_LIST,
  )

  useEffect(() => {
    fetchTeams(query, initialCurrentPage)
  }, [initialCurrentPage, fetchTeams, query])

  async function handleSearchTeamsByTitle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSearchParams((state) => {
      state.set('page', String(GLOBALS_CONSTANTS.INITIAL_PAGE_OF_LIST))
      state.set('q', query)

      return state
    })

    location.reload()
  }

  async function handleDownloadTemplate() {
    const templateHeaders = [
      'Número da equipe',
      'Nome do projeto',
      'Integrante 01 da equipe',
      'Email do integrante 01 da equipe',
      'Integrante 02 da equipe',
      'Email do integrante 02 da equipe',
      'Integrante 03 da equipe',
      'Email do integrante 03 da equipe',
      'Integrante 04 da equipe',
      'Email do integrante 04 da equipe',
      'Nome do orientador',
      'E-mail do orientador',
      'Status',
      'Paralelas',
    ]
    const workbook = XLSX.utils.book_new()

    const worksheet = XLSX.utils.json_to_sheet(
      templateHeaders.map((header) => ({ [header]: '' })),
    )

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Fetin Template')
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([buffer], { type: 'application/octet-stream' })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'template.xlsx'

    document.body.appendChild(a)
    a.click()

    document.body.removeChild(a)
  }

  return (
    <main className="h-[calc(100vh-52px)] w-screen p-16 pt-8 space-y-4">
      <h1 className="text-slate-800 dark:text-slate-50 text-2xl font-semibold">
        Listagem de equipes
      </h1>
      <div className="flex items-center justify-between">
        <form
          onSubmit={(ev) => handleSearchTeamsByTitle(ev)}
          className="flex items-center space-x-4 w-96"
        >
          <Label className="">Equipe</Label>
          <div className="relative w-full">
            <Search className="size-4 absolute top-1/2 -translate-y-1/2 left-3" />
            <Input
              className="pl-10 w-full placeholder:italic"
              placeholder="Digite o nome da equipe..."
              value={query}
              onChange={(ev) => setQuery(ev.target.value)}
            />
          </div>
        </form>

        <div className="space-x-2">
          <Button variant="outline" asChild>
            <div>
              <Label htmlFor="import-file" className="cursor-pointer">
                Importar
              </Label>
              <Input
                id="import-file"
                className="hidden"
                type="file"
                accept=".xlsx"
              />
            </div>
          </Button>
          <Button variant="outline" onClick={handleDownloadTemplate}>
            Baixar Template
          </Button>
          <Button variant="outline" asChild>
            <Link to="/admin/teams/create">
              Adicionar Equipe <Plus className="size-4 ml-2.5" />
            </Link>
          </Button>
        </div>
      </div>
      <DataTable
        filter={{
          q: query,
        }}
        fetchFn={async (page) => await fetchTeams(query, page)}
        total={totalOfTeams}
        columns={[
          ...projectColumns,
          {
            id: 'actions',
            header: 'Ações',
            cell: ({ row }) => {
              const project = row.original

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
                    <DropdownMenuItem onClick={() => deleteTeam(project.id)}>
                      Deletar equipe
                    </DropdownMenuItem>
                    <DropdownMenuItem>Atualizar Equipe</DropdownMenuItem>
                    <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            },
          },
        ]}
        data={teams}
      />
    </main>
  )
}
