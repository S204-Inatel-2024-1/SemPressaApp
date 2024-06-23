import { GLOBALS_CONSTANTS } from '@/constants/globals'
import { GenericListPage } from '@/pages/generics/list'
import { useParallelStore } from '@/store/app/parallel'
import { useEffect, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { parallelColumns } from './table/columns'

export function AdminParallelsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { fetchParallels, deleteParallel, parallels, totalOfParallels } =
    useParallelStore((state) => ({
      parallels: state.parallels,
      fetchParallels: state.loadParallels,
      deleteParallel: state.deleteParallel,
      totalOfParallels: state.totalOfParallels,
    }))

  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const initialCurrentPage = Number(
    searchParams.get('page') ?? GLOBALS_CONSTANTS.INITIAL_PAGE_OF_LIST,
  )

  useEffect(() => {
    fetchParallels(query, initialCurrentPage)

    setSearchParams((state) => {
      state.set('page', String(GLOBALS_CONSTANTS.INITIAL_PAGE_OF_LIST))
      state.set('q', query)

      return state
    })
  }, [initialCurrentPage, fetchParallels, query, setSearchParams])

  async function handleSearchParallelsByTitle(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setSearchParams((state) => {
      state.set('page', String(GLOBALS_CONSTANTS.INITIAL_PAGE_OF_LIST))
      state.set('q', query)

      return state
    })

    location.reload()
  }

  return (
    <GenericListPage
      columns={parallelColumns}
      data={parallels}
      deleteFn={deleteParallel}
      entity="parallels"
      fetchFn={fetchParallels}
      onSearchFilterInputChange={setQuery}
      onSearchFilterSubmitForm={handleSearchParallelsByTitle}
      totalOfData={totalOfParallels}
      defaultQueryFilter={query}
      entityName="Paralela"
      searchInput={{
        label: 'Paralela',
      }}
    />
  )
}
