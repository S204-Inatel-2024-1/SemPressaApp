import { phaseColumns } from './table/columns'
import { useEffect, useState, type FormEvent } from 'react'

import { useSearchParams } from 'react-router-dom'
import { GLOBALS_CONSTANTS } from '@/constants/globals'
import { usePhaseStore } from '@/store/app/phase'
import { GenericListPage } from '@/pages/generics/list'

export function AdminPhaseList() {
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
    fetchPhases(initialCurrentPage)
  }, [initialCurrentPage, fetchPhases])

  async function handleSearchTeamsByTitle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // setSearchParams((state) => {
    //   state.set('page', String(GLOBALS_CONSTANTS.INITIAL_PAGE_OF_LIST))
    //   state.set('q', query)

    //   return state
    // })

    // location.reload()
  }

  return (
    <GenericListPage
      entity="phases"
      entityName={'Fases da Fetin'}
      columns={phaseColumns}
      data={phases}
      deleteFn={deletePhase}
      fetchFn={fetchPhases}
      onSearchFilterInputChange={setQuery}
      onSearchFilterSubmitForm={handleSearchTeamsByTitle}
      totalOfData={totalOfPhases}
      defaultQueryFilter={query}
      searchInput={{
        label: 'Nome',
      }}
    />
  )
}
