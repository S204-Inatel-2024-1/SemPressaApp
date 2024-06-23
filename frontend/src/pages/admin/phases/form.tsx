import { Checkbox } from '@/components/ui/checkbox'
import { DatePickerWithRange } from '@/components/ui/date-picker-range'
import { Input } from '@/components/ui/input'
import { GenericFormPage } from '@/pages/generics/form'
import { usePhaseStore } from '@/store/app/phase'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const formSchema = z.object({
  name: z
    .string({ required_error: 'Você precisa adicionar o nome do Curso!' })
    .min(1, {
      message: 'Você precisa adicionar o nome do Curso!',
    }),
  period: z.string({
    required_error: 'É necessário colocar um período para a fase',
  }),
  isActive: z.boolean().default(false),
})

type FormSchema = z.infer<typeof formSchema>

export function AdminPhaseForm() {
  const [searchParams] = useSearchParams()
  const phaseId = searchParams.get('id')

  const { fetchPhase } = usePhaseStore((state) => {
    return {
      fetchPhase: state.getPhase,
    }
  })

  async function handleCreatePhase({ name, isActive, period }: FormSchema) {
    console.log({ name, isActive, period })
  }

  async function handleUpdatePhase({ name, isActive, period }: FormSchema) {
    console.log({ phaseId, name, isActive, period })
  }

  return (
    <GenericFormPage
      entityId={Number(phaseId)}
      fetchEntity={fetchPhase}
      onCreateEntity={handleCreatePhase}
      onUpdateEntity={handleUpdatePhase}
      schema={formSchema}
      fields={[
        {
          name: 'name',
          element: Input,
          label: 'Nome',
          args: {
            placeholder: 'Nome da fase..',
          },
          helpText: 'Nome da fase.',
        },
        {
          name: 'period',
          element: DatePickerWithRange,
          label: 'Período',
          args: {
            placeholder: 'Período da fase..',
          },
          helpText: 'Período em que a fase está ativa.',
        },
        {
          name: 'isActive',
          element: ({
            checked,
            onCheckedChange,
          }: {
            checked: boolean | 'indeterminate'
            onCheckedChange: (checked: boolean | 'indeterminate') => void
          }) => (
            <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
          ),
          label: 'Status',
          helpText: 'Indica se a fase está ativa ou não',
        },
      ]}
    />
  )
}
