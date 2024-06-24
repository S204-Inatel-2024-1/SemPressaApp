import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GenericFormPage } from '@/pages/generics/form'
import { useParallelStore } from '@/store/app/parallel'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string({
    message: 'Preencha o nome da paralela',
  }),
  description: z.string().optional().default(''),
})

type FormSchema = z.infer<typeof formSchema>

export function AdminParallelFormPage() {
  const [searchParams] = useSearchParams()
  const parallelId = searchParams.get('id')

  const navigate = useNavigate()

  const { fetchParallel, updateParallel, createParallel } = useParallelStore(
    (state) => {
      return {
        fetchParallel: state.getParallel,
        createParallel: state.createParallel,
        updateParallel: state.updateParallel,
      }
    },
  )

  async function handleCreateParallel({ name, description }: FormSchema) {
    const result = await createParallel({ name, description })

    if (result) navigate('/admin/parallels')
  }

  async function handleUpdateParallel({ name, description }: FormSchema) {
    const result = await updateParallel({
      id: Number(parallelId),
      name,
      description,
    })

    if (result) navigate('/admin/parallels')
  }

  return (
    <GenericFormPage
      entityId={Number(parallelId)}
      fetchEntity={fetchParallel}
      onCreateEntity={handleCreateParallel}
      onUpdateEntity={handleUpdateParallel}
      schema={formSchema}
      fields={[
        {
          name: 'name',
          element: Input,
          label: 'Nome',
          args: {
            placeholder: 'Nome da paralela..',
          },
        },
        {
          name: 'description',
          element: Textarea,
          label: 'Descrição',
          args: {
            placeholder: 'Descrição da paralela..',
          },
        },
      ]}
    />
  )
}
