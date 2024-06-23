import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GenericFormPage } from '@/pages/generics/form'
import { useParallelStore } from '@/store/app/parallel'
import { useSearchParams } from 'react-router-dom'
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

  const { fetchParallel } = useParallelStore((state) => {
    return {
      fetchParallel: state.getParallel,
    }
  })

  async function handleCreateParallel({ name, description }: FormSchema) {
    console.log({ name, description })
  }

  async function handleUpdateParallel({ name, description }: FormSchema) {
    console.log({ parallelId, name, description })
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
