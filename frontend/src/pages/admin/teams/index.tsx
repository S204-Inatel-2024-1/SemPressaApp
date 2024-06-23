import { useEffect, useState, type FormEvent } from 'react'

import { useSearchParams } from 'react-router-dom'
import { GLOBALS_CONSTANTS } from '@/constants/globals'
import { useTeamStore } from '@/store/app/team'

import * as XLSX from 'xlsx'
import { GenericListPage } from '@/pages/generics/list'
import { projectColumns } from './table/columns'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Download, Upload } from 'lucide-react'
import { Input } from '@/components/ui/input'

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

    setSearchParams((state) => {
      state.set('page', String(GLOBALS_CONSTANTS.INITIAL_PAGE_OF_LIST))
      state.set('q', query)

      return state
    })
  }, [initialCurrentPage, fetchTeams, query, setSearchParams])

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
    <GenericListPage
      entity="teams"
      fetchFn={fetchTeams}
      onSearchFilterInputChange={setQuery}
      defaultQueryFilter={query}
      deleteFn={deleteTeam}
      totalOfData={totalOfTeams}
      onSearchFilterSubmitForm={handleSearchTeamsByTitle}
      columns={projectColumns}
      data={teams}
      entityName="Equipe"
      searchInput={{
        label: 'Equipe',
      }}
      extraActionButtons={
        <>
          <Button
            variant="outline"
            asChild
            className="border-2 border-app-light-title/70 text-app-light-title font-bold dark:bg-white dark:border-white dark:text-slate-900 dark:hover:brightness-75"
          >
            <div>
              <Label
                htmlFor="import-file"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm cursor-pointer font-bold"
              >
                Importar <Upload className="size-4 ml-2.5" strokeWidth={3} />
              </Label>
              <Input
                id="import-file"
                className="hidden"
                type="file"
                accept=".xlsx"
              />
            </div>
          </Button>
          <Button
            variant="outline"
            onClick={handleDownloadTemplate}
            className="border-2 border-app-light-title/70 text-app-light-title font-bold hover:text-app-light-title dark:bg-white dark:border-white dark:text-slate-900 dark:hover:brightness-75"
          >
            Baixar Template{' '}
            <Download className="size-4 ml-2.5" strokeWidth={3} />
          </Button>
        </>
      }
    />
  )
}
