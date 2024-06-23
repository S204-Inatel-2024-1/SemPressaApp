import { GLOBALS_CONSTANTS } from '@/constants/globals'
import { GenericListPage } from '@/pages/generics/list'
import { useProjectStore } from '@/store/app/project'
import { useEffect, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { projectColumns } from './table/columns'

export function AdminProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { fetchProjects, deleteProject, projects, totalOfProjects } =
    useProjectStore((state) => ({
      projects: state.projects,
      fetchProjects: state.loadProjects,
      deleteProject: state.deleteProject,
      totalOfProjects: state.totalOfProjects,
    }))

  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const initialCurrentPage = Number(
    searchParams.get('page') ?? GLOBALS_CONSTANTS.INITIAL_PAGE_OF_LIST,
  )

  useEffect(() => {
    fetchProjects(query, initialCurrentPage)

    setSearchParams((state) => {
      state.set('page', String(GLOBALS_CONSTANTS.INITIAL_PAGE_OF_LIST))
      state.set('q', query)

      return state
    })
  }, [initialCurrentPage, fetchProjects, query, setSearchParams])

  async function handleSearchProjectsByTitle(
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
      columns={projectColumns}
      data={projects}
      deleteFn={deleteProject}
      entity="projects"
      fetchFn={fetchProjects}
      onSearchFilterInputChange={setQuery}
      onSearchFilterSubmitForm={handleSearchProjectsByTitle}
      totalOfData={totalOfProjects}
      defaultQueryFilter={query}
      entityName="Projeto"
      searchInput={{
        label: 'Nome do projeto',
      }}
    />
  )
}
