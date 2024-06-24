import { SelectWithCreateOption } from '@/components/select-with-create-option'
import { Input } from '@/components/ui/input'
import MultipleSelector, {
  type MultipleSelectorProps,
} from '@/components/ui/multi-select'
import { Textarea } from '@/components/ui/textarea'
import { GenericFormPage } from '@/pages/generics/form'
import { useProjectStore } from '@/store/app/project'
import { useTeamStore } from '@/store/app/team'
import { useUserStore } from '@/store/app/user'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

interface SelectFieldInput {
  value?: string | null
  defaultValue?: string | null
  onChange: (value: string) => void
}

const schema = z.object({
  projectId: z
    .string({
      message: 'Selecione o projeto da equipe',
    })
    .uuid({
      message: 'Selecione um projeto válido',
    }),
  users: z
    .array(
      z
        .string({
          message: 'Selecione um usuário com identificação válida',
        })
        .uuid({
          message: 'Há usuários inválidos selecionados',
        }),
      {
        message: 'É necessário indicar os membros da equipe',
      },
    )
    .min(2, {
      message: 'Selecione no mínimo dois usuários',
    }),
  name: z.string({
    message: 'É necessário colocar um nome válido para a equipe',
  }),
  disqualifiedPhase: z.string().uuid().optional().default(''),
})

const projectSchema = z.object({
  name: z.string({
    message: 'Você deve preencher o nome do projeto',
  }),
  description: z.string(),
})

export function AdminTeamsFormPage() {
  const [searchParams] = useSearchParams()
  const teamId = searchParams.get('id')

  const { fetchTeam } = useTeamStore((state) => ({
    fetchTeam: state.getTeam,
  }))

  const { fetchProjects, projects, createProject } = useProjectStore(
    (state) => {
      return {
        fetchProjects: state.loadProjects,
        projects: state.projects,
        createProject: state.create,
      }
    },
  )

  const { fetchStudents, users } = useUserStore((state) => {
    return {
      fetchStudents: () => state.loadUsers('student', 0, true),
      users: state.users,
    }
  })

  const [projectsToShow, setProjectsToShow] = useState(
    projects.map((proj) => ({
      text: proj.name,
      value: proj.id.toString(),
    })),
  )

  const [usersToShow, setUsersToShow] = useState(
    users.map((proj) => ({
      label: proj.name,
      value: proj.id.toString(),
    })),
  )

  useEffect(() => {
    toast.info('Carregando Projetos')
    fetchProjects(0, true).then((response) => {
      setProjectsToShow(
        response.map((proj) => ({
          text: proj.name,
          value: proj.id.toString(),
        })),
      )
    })

    toast.info('Carregando Estudantes')
    fetchStudents().then((response) => {
      setUsersToShow(
        response.map((proj) => ({
          label: proj.name,
          value: proj.id.toString(),
        })),
      )
    })
  }, [])

  return (
    <GenericFormPage
      entityId={Number(teamId)}
      fetchEntity={fetchTeam}
      fields={[
        {
          name: 'name',
          element: Input,
          label: 'Nome',
          args: {
            placeholder: 'Digite o nome da equipe...',
          },
        },
        {
          name: 'projectId',
          element: (props: SelectFieldInput) => {
            return (
              <SelectWithCreateOption
                formFields={[
                  {
                    label: 'Nome',
                    name: 'name',
                    element: Input,
                    args: {
                      placeholder: 'Insira o nome do projeto...',
                    },
                  },
                  {
                    label: 'Descrição',
                    name: 'description',
                    element: Textarea,
                    args: {
                      placeholder: 'Insira uma descrição para o projeto...',
                    },
                  },
                ]}
                options={projectsToShow}
                schema={projectSchema}
                formTitle="Criar Projeto"
                onCreateFunction={async (data) => {
                  await createProject(data)
                  const response = await fetchProjects(0, false)
                  setProjectsToShow(
                    response.map((proj) => ({
                      text: proj.name,
                      value: proj.id.toString(),
                    })),
                  )
                }}
                {...props}
              />
            )
          },
          label: 'Projeto',
          args: {
            placeholder: 'Busque pelo projeto..',
          },
        },
        {
          name: 'users',
          element: (props: MultipleSelectorProps) => (
            <MultipleSelector
              badgeClassName="rounded-sm"
              placeholder="Selecione os membros da equipe"
              options={usersToShow}
              maxSelected={4}
              hidePlaceholderWhenSelected
              {...props}
            />
          ),
          label: 'Membros',
        },
      ]}
      schema={schema}
    />
  )
}
