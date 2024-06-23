import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GenericFormPage } from '@/pages/generics/form'
import { useProjectStore } from '@/store/app/project'
import { useSearchParams } from 'react-router-dom'
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

  const { fetchProject } = useProjectStore((state) => {
    return {
      fetchProject: state.getProject,
    }
  })

  async function handleCreateProject({ name, description }: FormSchema) {
    console.log({ name, description })
  }

  async function handleUpdateProject({ name, description }: FormSchema) {
    console.log({ projectId, name, description })
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
