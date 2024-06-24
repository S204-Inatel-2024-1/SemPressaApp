import { Input } from '@/components/ui/input'
import { GenericFormPage } from '@/pages/generics/form'
import { useUserStore } from '@/store/app/user'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

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
  course: z.string({
    message: 'É necessário colocar o curso do estudante',
  }),
})

type FormSchema = z.infer<typeof formSchema>

export function AdminStudentFormPage() {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('id')

  const navigate = useNavigate()

  const { fetchUser, createStudent, updateStudent } = useUserStore((state) => {
    return {
      fetchUser: state.getUser,
      createStudent: state.createStudent,
      updateStudent: state.updateStudent,
    }
  })

  async function handleCreateUser({
    name,
    email,
    password,
    registration,
    role,
    course,
  }: FormSchema) {
    const result = await createStudent({
      name,
      email,
      password,
      registration,
      role,
      course,
    })
    if (result) {
      navigate('/admin/students')
    }
  }

  async function handleUpdateUser({
    name,
    email,
    password,
    registration,
    role,
    course,
  }: FormSchema) {
    const result = await updateStudent({
      id: Number(userId),
      name,
      email,
      password,
      registration,
      role,
      course,
    })
    if (result) {
      navigate('/admin/students')
    }
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
          element: Input,
          label: 'Curso',
          args: {
            placeholder: 'Busque pelo curso..',
          },
        },
      ]}
    />
  )
}
