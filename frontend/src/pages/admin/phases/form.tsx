import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DatePickerWithRange } from '@/components/ui/date-picker-range'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { HelpText } from '@/components/ui/tooltip'
import { usePhaseStore } from '@/store/app/phase'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
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
  const pageMode = searchParams.get('mode') ?? 'create'
  const phaseId = searchParams.get('phaseId')

  const { getPhase } = usePhaseStore((state) => ({
    getPhase: state.getPhase,
  }))

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    disabled: pageMode === 'detail',
  })

  async function handleCreatePhase({ name, isActive, period }: FormSchema) {
    console.log({ name, isActive, period })
  }

  async function handleUpdatePhase({ name, isActive, period }: FormSchema) {
    console.log({ phaseId, name, isActive, period })
  }

  let fn = handleCreatePhase
  switch (pageMode) {
    case 'create':
      fn = handleCreatePhase
      break
    case 'update':
      fn = handleUpdatePhase
      break
    default:
      fn = async () => {}
  }

  useEffect(() => {
    if (['update', 'detail'].includes(pageMode) && phaseId) {
      getPhase(Number(phaseId)).then((phase) => {
        if (phase) {
          form.setValue('name', phase.name)
          form.setValue('isActive', phase.isActive)
        }
      })
    }
  })

  return (
    <main className="h-[calc(100vh-52px)] w-screen p-16 pt-8 space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(fn)}
          className="grid grid-cols-2 gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="flex items-center gap-3 pb-1">
                    Nome <HelpText helpText="Nome da fase." />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da fase.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="flex items-center gap-3 pb-1">
                    Período{' '}
                    <HelpText helpText="Período em que a fase está ativa." />
                  </FormLabel>
                  <FormControl>
                    <DatePickerWithRange
                      placeholder="Período da fase.."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => {
              return (
                <FormItem className="flex items-end justify-start gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="flex items-center gap-3">
                    Status
                    <HelpText helpText="Indica se a fase está ativa ou não" />
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <div className="col-span-2 flex justify-end items-center gap-2">
            <Button asChild variant="outline">
              <Link to="/admin/phases">Voltar</Link>
            </Button>
            {['create', 'update'].includes(pageMode) && (
              <Button
                variant="outline"
                asChild={!['create', 'update'].includes(pageMode)}
              >
                {pageMode === 'create' ? 'Criar Curso' : 'Atualizar Curso'}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </main>
  )
}
