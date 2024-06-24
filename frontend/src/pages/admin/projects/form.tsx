import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GenericFormPage } from '@/pages/generics/form'
import { useProjectStore } from '@/store/app/project'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string({
    message: 'Preencha o nome do projeto',
  }),
  description: z.string().optional().default(''),
})

type FormSchema = z.infer<typeof formSchema>

export function AdminProjectFormPage() {
  const [searchParams] = useSearchParams()
  const projectId = searchParams.get('id')

  const navigate = useNavigate()

  const { fetchProject, createProject, updateProject } = useProjectStore(
    (state) => {
      return {
        fetchProject: state.getProject,
        createProject: state.create,
        updateProject: state.updateProject,
      }
    },
  )

  async function handleCreateProject({ name, description }: FormSchema) {
    createProject({ name, description })

    navigate('/admin/projects')
  }

  async function handleUpdateProject({ name, description }: FormSchema) {
    updateProject({ id: Number(projectId!), name, description })

    navigate('/admin/projects')
  }

  return (
    <GenericFormPage
      entityId={Number(projectId)}
      fetchEntity={fetchProject}
      onCreateEntity={handleCreateProject}
      onUpdateEntity={handleUpdateProject}
      schema={formSchema}
      fields={[
        {
          name: 'name',
          element: Input,
          label: 'Nome',
          args: {
            placeholder: 'Nome do projeto..',
          },
        },
        {
          name: 'description',
          element: Textarea,
          label: 'Descrição',
          args: {
            placeholder: 'Descrição do projeto..',
          },
        },
      ]}
    />
  )
}
