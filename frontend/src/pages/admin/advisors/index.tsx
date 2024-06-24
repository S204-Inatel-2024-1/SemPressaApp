import { GLOBALS_CONSTANTS } from '@/constants/globals'
import { GenericListPage } from '@/pages/generics/list'
import { useUserStore } from '@/store/app/user'
import { useEffect, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { userColumns } from './table/columns'

export function AdminAdvisorsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { fetchUsers, deleteUser, users, totalOfUsers } = useUserStore(
    (state) => ({
      users: state.users,
      fetchUsers: state.loadUsers,
      deleteUser: state.deleteUser,
      totalOfUsers: state.totalOfUsers,
    }),
  )

  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const initialCurrentPage = Number(
    searchParams.get('page') ?? GLOBALS_CONSTANTS.INITIAL_PAGE_OF_LIST,
  )

  useEffect(() => {
    fetchUsers('advisor', initialCurrentPage)

    // setSearchParams((state) => {
    //   state.set('page', String(GLOBALS_CONSTANTS.INITIAL_PAGE_OF_LIST))
    //   state.set('q', query)

    //   return state
    // })
  }, [initialCurrentPage, fetchUsers])

  async function handleSearchUsersByTitle(event: FormEvent<HTMLFormElement>) {
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
      columns={userColumns}
      data={users}
      deleteFn={deleteUser}
      entity="advisors"
      fetchFn={fetchUsers}
      onSearchFilterInputChange={setQuery}
      onSearchFilterSubmitForm={handleSearchUsersByTitle}
      totalOfData={totalOfUsers}
      defaultQueryFilter={query}
      entityName="Orientador"
      searchInput={{
        label: 'Nome do Orientador',
      }}
    />
  )
}
