import { DataTable } from '@/components/table'
import { courseColumns } from './table/columns'
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
import { useCourseStore } from '@/store/app/course'

export function AdminCourseList() {
  const navigate = useNavigate()
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
    <main className="h-[calc(100vh-64px)] w-screen p-16 pt-8 space-y-4">
      <h1 className="text-slate-800 dark:text-slate-50 text-2xl font-semibold">
        Listagem de cursos
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
          <Link to="/admin/courses/form">
            Adicionar Curso <Plus className="size-4 ml-2.5" />
          </Link>
        </Button>
      </div>
      <DataTable
        filter={{
          q: query,
        }}
        fetchFn={async (page) => await fetchCourses(query, page)}
        total={totalOfCourses}
        columns={[
          ...courseColumns,
          {
            id: 'actions',
            header: 'Ações',
            cell: ({ row }) => {
              const course = row.original

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
                        await deleteCourse(course.id)

                        location.reload()
                      }}
                    >
                      Deletar equipe
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        navigate(
                          `/admin/courses/form?mode=update&courseId=${course.id}`,
                        )
                      }
                    >
                      Atualizar Equipe
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        navigate(
                          `/admin/courses/form?mode=detail&courseId=${course.id}`,
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
        data={courses}
      />
    </main>
  )
}
