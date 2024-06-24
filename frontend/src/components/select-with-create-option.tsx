/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTrigger,
} from './ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { useState, type ElementType } from 'react'
import { HelpText } from './ui/tooltip'
import type { z } from 'zod'
import { toast } from 'sonner'

type SelectOption = {
  value: string
  text: string
}

type Field = {
  name: string
  element: ElementType
  args?: { [key: string]: any }
  helpText?: string
  label?: string
}

interface SelectWithCreateOption {
  options: SelectOption[]
  schema: any
  formFields: Field[]
  formTitle?: string
  onCreateFunction: (data: any) => Promise<void>
  value?: string | null
  defaultValue?: string | null
  onChange: (value: string) => void
}

export function SelectWithCreateOption({
  options,
  onCreateFunction,
  schema,
  formFields,
  formTitle,
  onChange,
  defaultValue,
  value,
}: SelectWithCreateOption) {
  const [creationModalOpened, setCreationModalOpened] = useState<boolean>(false)

  type FormData = z.infer<typeof schema>

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function handleCreateEntity(data: FormData) {
    try {
      await onCreateFunction(data)

      toast.success('Sucesso')
    } catch (err) {
      toast.error('Erro', {
        description: String(err),
      })
    } finally {
      setCreationModalOpened(false)
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Select
        onValueChange={onChange}
        defaultValue={value ?? defaultValue ?? ''}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem value={option.value} key={option.value}>
              {option.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Dialog open={creationModalOpened} onOpenChange={setCreationModalOpened}>
        <DialogTrigger asChild>
          <Button className="bg-white border text-app-light-title hover:bg-app-light-title hover:text-white dark:bg-popover border-input dark:text-white w-fit px-2">
            <Plus className="size-6" />
          </Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleCreateEntity)}
                className="space-y-4"
              >
                {formTitle && (
                  <DialogHeader className="text-xl text-app-light-title dark:text-white font-bold">
                    {formTitle}
                  </DialogHeader>
                )}

                {formFields.map((field) => {
                  const FormElement = field.element
                  const fieldArgs = field.args ?? {}

                  return (
                    <FormField
                      control={form.control}
                      name={field.name}
                      key={field.name}
                      render={({ field: formField }) => {
                        return (
                          <FormItem>
                            <FormLabel className="flex items-center gap-3 pb-1 text-app-light-title dark:text-white">
                              {field.label}
                              {field.helpText && (
                                <HelpText helpText={field.helpText} />
                              )}
                            </FormLabel>
                            <FormControl>
                              <FormElement {...fieldArgs} {...formField} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )
                      }}
                    />
                  )
                })}
                <div className="w-full flex items-center justify-end">
                  <Button
                    type="button"
                    onClick={form.handleSubmit(handleCreateEntity)}
                    className="border-2 border-app-light-title bg-white text-app-light-title hover:text-white dark:border-app-dark-blue-600 px-10 hover:bg-app-light-title font-bold dark:hover:bg-app-dark-blue-900/85 dark:bg-app-dark-blue-900 dark:text-white dark:hover:text-white"
                  >
                    Criar
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  )
}
