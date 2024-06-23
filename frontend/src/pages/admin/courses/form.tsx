import { Input } from '@/components/ui/input'
import { GenericFormPage } from '@/pages/generics/form'
import { useCourseStore } from '@/store/app/course'
import { useSearchParams } from 'react-router-dom'
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
  const courseId = searchParams.get('id')

  const { fetchCourse } = useCourseStore((state) => ({
    fetchCourse: state.getCourse,
  }))

  // function extractSlugFromString(str: string) {
  //   return str
  //     .normalize('NFKD')
  //     .toLowerCase()
  //     .trim()
  //     .replace(/\s+/g, '-')
  //     .replace(/[^\w-]+/g, '')
  //     .replace(/_/g, '-')
  //     .replace(/--+/g, '-')
  //     .replace(/-$/g, '')
  // }

  async function handleCreateCourse({ name, slug }: FormSchema) {
    console.log({ name, slug })
  }

  async function handleUpdateCourse({ name, slug }: FormSchema) {
    console.log({ courseId, name, slug })
  }

  return (
    <GenericFormPage
      schema={formSchema}
      fields={[
        {
          name: 'name',
          element: Input,
          args: {
            placeholder: 'Nome do curso..',
          },
          helpText: 'Nome do curso.',
          label: 'Nome',
        },
        {
          name: 'slug',
          element: Input,
          args: {
            placeholder: 'Slug do curso..',
          },
          helpText:
            'Uma forma facilitada para realizar operações com o curso, como importação de dados entre outros..',
          label: 'Slug',
        },
      ]}
      onCreateEntity={handleCreateCourse}
      onUpdateEntity={handleUpdateCourse}
      entityId={Number(courseId)}
      fetchEntity={fetchCourse}
    />
  )
}
