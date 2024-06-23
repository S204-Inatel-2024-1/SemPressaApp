import { SelectWithCreateOption } from '@/components/select-with-create-option'
import { Input } from '@/components/ui/input'
import MultipleSelector, {
  type MultipleSelectorProps,
} from '@/components/ui/multi-select'
import { Textarea } from '@/components/ui/textarea'
import { GenericFormPage } from '@/pages/generics/form'
import { useTeamStore } from '@/store/app/team'
import { useSearchParams } from 'react-router-dom'
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
  name: z.string(),
  description: z.string(),
})

export function AdminTeamsFormPage() {
  const [searchParams] = useSearchParams()
  const teamId = searchParams.get('id')

  const { fetchTeam } = useTeamStore((state) => ({
    fetchTeam: state.getTeam,
  }))

  const projects = [
    {
      value: 'test1',
      text: 'Test 1',
    },
  ]

  const users = [
    { label: 'nextjs', value: 'Nextjs' },
    { label: 'Vite', value: 'vite', disable: true },
    { label: 'Nuxt', value: 'nuxt', disable: true },
    { label: 'Vue', value: 'vue, disable: true', disable: true },
    { label: 'Remix', value: 'remix' },
    { label: 'Svelte', value: 'svelte', disable: true },
    { label: 'Angular', value: 'angular', disable: true },
    { label: 'Ember', value: 'ember', disable: true },
    { label: 'React', value: 'react' },
    { label: 'Gatsby', value: 'gatsby', disable: true },
    { label: 'Astro', value: 'astro', disable: true },
  ]

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
                options={projects}
                schema={projectSchema}
                formTitle="Criar Projeto"
                onCreateFunction={async (d) => {
                  console.log(d)
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
              options={users}
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
