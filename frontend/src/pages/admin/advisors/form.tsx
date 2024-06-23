import { Input } from '@/components/ui/input'
import { GenericFormPage } from '@/pages/generics/form'
import { useUserStore } from '@/store/app/user'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const formSchema = z.object({
  role: z.string().optional().default('ADVISOR'),
  name: z.string({
    message: 'Insira o nome do orientador',
  }),
  email: z
    .string({
      message: 'Insira o email do orientador',
    })
    .email({
      message: 'Insira um email válido',
    }),
  registration: z.coerce.number({
    message: 'Insira a matrícula do orientador',
  }),
  password: z.string({
    message: 'Insira uma senha para o orientador',
  }),
})

type FormSchema = z.infer<typeof formSchema>

export function AdminAdvisorFormPage() {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('id')

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
            placeholder: 'Nome do orientador..',
          },
        },
        {
          name: 'email',
          element: Input,
          label: 'E-mail',
          args: {
            placeholder: 'E-mail do orientador..',
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
            placeholder: 'Matrícula do orientador..',
            type: 'number',
          },
        },
      ]}
    />
  )
}
