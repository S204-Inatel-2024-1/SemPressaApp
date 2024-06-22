import { Button } from '@/components/ui/button'
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
import { useCourseStore } from '@/store/app/course'
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
  slug: z
    .string({
      required_error: 'É necessário que o curso tenha um slug',
    })
    .min(3, {
      message:
        'É necessário que o curso tenha um slug com pelo menos 3 caracteres',
    }),
})

type FormSchema = z.infer<typeof formSchema>

export function AdminCourseForm() {
  const [searchParams] = useSearchParams()
  const pageMode = searchParams.get('mode') ?? 'create'
  const courseId = searchParams.get('courseId')

  const { getCourse } = useCourseStore((state) => ({
    getCourse: state.getCourse,
  }))

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    disabled: pageMode === 'detail',
  })

  function extractSlugFromString(str: string) {
    return str
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')
  }

  async function handleCreateCourse({ name, slug }: FormSchema) {
    console.log({ name, slug })
  }

  async function handleUpdateCourse({ name, slug }: FormSchema) {
    console.log({ courseId, name, slug })
  }

  let fn = handleCreateCourse
  switch (pageMode) {
    case 'create':
      fn = handleCreateCourse
      break
    case 'update':
      fn = handleUpdateCourse
      break
    default:
      fn = async () => {}
  }

  useEffect(() => {
    if (['update', 'detail'].includes(pageMode) && courseId) {
      getCourse(Number(courseId)).then((course) => {
        if (course) {
          form.setValue('name', course.name)
          form.setValue('slug', course.slug)
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
            render={({ field: { onChange, ...field } }) => {
              return (
                <FormItem>
                  <FormLabel className="flex items-center gap-3 pb-1">
                    Nome <HelpText helpText="Nome do curso." />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome do curso.."
                      onChange={(ev) => {
                        form.setValue(
                          'slug',
                          extractSlugFromString(ev.target.value),
                        )

                        form.clearErrors()
                        onChange(ev)
                      }}
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
            name="slug"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="flex items-center gap-3 pb-1">
                    Slug
                    <HelpText helpText="Uma forma facilitada para realizar operações com o curso, como importação de dados entre outros.." />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Slug do curso.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <div className="col-span-2 flex justify-end items-center gap-2">
            <Button asChild variant="outline">
              <Link to="/admin/courses">Voltar</Link>
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
