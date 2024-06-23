import { courseColumns } from './table/columns'
import { useEffect, useState, type FormEvent } from 'react'

import { useSearchParams } from 'react-router-dom'
import { GLOBALS_CONSTANTS } from '@/constants/globals'
import { useCourseStore } from '@/store/app/course'
import { GenericListPage } from '@/pages/generics/list'

export function AdminCourseList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { fetchCourses, deleteCourse, courses, totalOfCourses } =
    useCourseStore((state) => ({
      courses: state.courses,
      fetchCourses: state.loadCourses,
      deleteCourse: state.deleteCourse,
      totalOfCourses: state.totalOfCourses,
    }))

  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const initialCurrentPage = Number(
    searchParams.get('page') ?? GLOBALS_CONSTANTS.INITIAL_PAGE_OF_LIST,
  )

  useEffect(() => {
    fetchCourses(query, initialCurrentPage)
  }, [initialCurrentPage, fetchCourses, query])

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
    <GenericListPage
      entity="courses"
      columns={courseColumns}
      data={courses}
      deleteFn={deleteCourse}
      fetchFn={fetchCourses}
      onSearchFilterSubmitForm={handleSearchTeamsByTitle}
      onSearchFilterInputChange={setQuery}
      totalOfData={totalOfCourses}
      defaultQueryFilter={query}
      entityName={'Cursos'}
      searchInput={{
        label: 'Nome',
      }}
    />
  )
}
