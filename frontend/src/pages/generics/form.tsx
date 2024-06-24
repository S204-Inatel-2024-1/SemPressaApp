/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { HelpText } from '@/components/ui/tooltip'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, type ElementType } from 'react'

import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import type { z } from 'zod'

type Field = {
  name: string
  shouldCoerseValue?: boolean
  coerseFn?: (value: any) => any
  shouldTransformValue?: boolean
  transformFn?: (value: any) => any
  element: ElementType
  args?: { [key: string]: any }
  helpText?: string
  label?: string
}

interface GenericFormPageProps {
  schema: any
  onCreateEntity?: (data: any) => Promise<void>
  onUpdateEntity?: (data: any) => Promise<void>
  fetchEntity?: (entityId: number) => Promise<any | null>
  fields: Field[]
  entityId: number
}

export function GenericFormPage({
  schema,
  fields,
  onCreateEntity,
  onUpdateEntity,
  fetchEntity,
  entityId,
}: GenericFormPageProps) {
  const [searchParams] = useSearchParams()

  const pageMode = searchParams.get('mode') ?? 'create'

  type FormSchema = z.infer<typeof schema>

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    disabled: pageMode === 'detail',
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function defaultActionForm(_: any) {}

  let fn = defaultActionForm
  switch (pageMode) {
    case 'create':
      fn = onCreateEntity ?? defaultActionForm
      break
    case 'update':
      fn = onUpdateEntity ?? defaultActionForm
      break
  }

  useEffect(() => {
    if (!fetchEntity || !['detail', 'update'].includes(pageMode)) return

    fetchEntity(entityId).then((response) => {
      if (!response) {
        return
      }

      for (const field of fields) {
        let fieldValue = response[field.name]
        if (field.shouldCoerseValue && field.coerseFn) {
          fieldValue = field.coerseFn(fieldValue)
        }

        form.setValue(field.name, fieldValue)
      }
    })
  }, [entityId, fetchEntity, fields, form, pageMode])

  return (
    <main className="h-[calc(100vh-52px)] w-screen p-16 pt-8 space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(fn)}
          className="grid grid-cols-2 gap-4"
        >
          {fields.map((field) => {
            const FormElement = field.element
            const fieldArgs = field.args ?? {}

            return (
              <FormField
                control={form.control}
                name={field.name}
                key={field.name}
                render={({ field: { onChange, ...formField } }) => {
                  return (
                    <FormItem>
                      <FormLabel className="flex items-center gap-3 pb-1">
                        {field.label}
                        {field.helpText && (
                          <HelpText helpText={field.helpText} />
                        )}
                      </FormLabel>
                      <FormControl>
                        <FormElement
                          onChange={(ev: any) => {
                            let value = ev
                            if (
                              field.shouldTransformValue &&
                              field.transformFn
                            ) {
                              value = field.transformFn(value)
                            }

                            onChange(value)
                          }}
                          {...fieldArgs}
                          {...formField}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            )
          })}

          <div className="col-span-2 flex justify-end items-center gap-2">
            <Button
              type="button"
              variant="asis"
              onClick={() => window.history.back()}
            >
              Voltar
            </Button>
            {['create', 'update'].includes(pageMode) && (
              <Button
                variant="asis"
                asChild={!['create', 'update'].includes(pageMode)}
              >
                {pageMode === 'create' ? 'Criar' : 'Atualizar'}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </main>
  )
}
