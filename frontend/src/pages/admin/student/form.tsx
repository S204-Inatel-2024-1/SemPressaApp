import { SelectWithCreateOption } from '@/components/select-with-create-option'
import { Input } from '@/components/ui/input'
import { GenericFormPage } from '@/pages/generics/form'
import { useUserStore } from '@/store/app/user'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

interface SelectFieldInput {
  value?: string | null
  defaultValue?: string | null
  onChange: (value: string) => void
}

const formSchema = z.object({
  role: z.string().optional().default('STUDENT'),
  name: z.string({
    message: 'Insira o nome do aluno',
  }),
  email: z
    .string({
      message: 'Insira o email do aluno',
    })
    .email({
      message: 'Insira um email válido',
    }),
  registration: z.coerce.number({
    message: 'Insira a matrícula do aluno',
  }),
  password: z.string({
    message: 'Insira uma senha para o aluno',
  }),
})

const courseSchema = z.object({
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

export function AdminStudentFormPage() {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('id')

  const courses = [
    {
      value: 'test1',
      text: 'Test 1',
    },
  ]

  const { fetchUser } = useUserStore((state) => {
    return {
      fetchUser: state.getUser,
    }
  })

  async function handleCreateUser({
    name,
    email,
    password,
    registration,
    role,
  }: FormSchema) {
    console.log({ name, email, password, registration, role })
  }

  async function handleUpdateUser({
    name,
    email,
    password,
    registration,
    role,
  }: FormSchema) {
    console.log({ userId, name, email, password, registration, role })
  }

  return (
    <GenericFormPage
      entityId={Number(userId)}
      fetchEntity={fetchUser}
      onCreateEntity={handleCreateUser}
      onUpdateEntity={handleUpdateUser}
      schema={formSchema}
      fields={[
        {
          name: 'name',
          element: Input,
          label: 'Nome',
          args: {
            placeholder: 'Nome do aluno..',
          },
        },
        {
          name: 'email',
          element: Input,
          label: 'E-mail',
          args: {
            placeholder: 'E-mail do aluno..',
            type: 'email',
          },
        },
        {
          name: 'password',
          element: Input,
          label: 'Senha',
          args: {
            placeholder: '********',
            type: 'password',
          },
        },
        {
          name: 'registration',
          element: Input,
          label: 'Matrícula',
          args: {
            placeholder: 'Matrícula do aluno..',
            type: 'number',
          },
        },
        {
          name: 'course',
          element: (props: SelectFieldInput) => {
            return (
              <SelectWithCreateOption
                formFields={[
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
                options={courses}
                schema={courseSchema}
                formTitle="Criar Curso"
                onCreateFunction={async (d) => {
                  console.log(d)
                }}
                {...props}
              />
            )
          },
          label: 'Curso',
          args: {
            placeholder: 'Busque pelo curso..',
          },
        },
      ]}
    />
  )
}
