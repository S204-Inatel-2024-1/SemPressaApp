import LogoInatel from '@/assets/Logo_Inatel.png'
import FetinText from '@/assets/FetinText.png'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'sonner'
import { parseZodErrors } from '@/utils/parse-zod-errors'
import { useState } from 'react'
import { useAuthStore } from '@/store/auth'

const loginFormSchema = z.object({
  user: z
    .string({
      required_error: 'É necessário digitar o seu usuário!',
    })
    .min(3, {
      message: 'É necessário ter no mínimo um 3 caracteres!',
    }),
  password: z
    .string({
      required_error: 'É necessário colocar a senha!',
    })
    .min(1, {
      message: 'É necessário colocar a senha!',
    }),
})

type LoginFormSchema = z.infer<typeof loginFormSchema>

export function Login() {
  const [currentTab, setCurrentTab] = useState<'admin' | 'team' | 'advisor'>(
    'team',
  )

  const { login } = useAuthStore((state) => ({ login: state.login }))

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  })

  async function handleLogin({ password, user }: LoginFormSchema) {
    const hasLoggedWithSuccess = await login(user, password, currentTab)

    if (!hasLoggedWithSuccess) {
      return toast.error('Erro ao tentar logar', {
        description: 'Usuário ou senha incorretos!',
      })
    }

    toast.success('Sucesso', {
      description: 'Você foi logado com sucesso',
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleFormErrors(errors: any) {
    const errorsMapped = parseZodErrors(errors, {
      user: 'Usuário',
      password: 'Senha',
    })

    for (const error of errorsMapped) {
      toast.error(error.field, {
        description: error.message,
      })
    }
  }

  return (
    <div className="flex items-end justify-end w-3/5 relative">
      <div className="flex flex-col items-center justify-start gap-1">
        <img className="w-40" src={LogoInatel} alt="" />
        <div className="bg-app-purple-600 h-96 p-8 rounded-l-xl flex justify-center items-start">
          <img className="w-64 mt-4" src={FetinText} alt="" />
        </div>
      </div>
      <div className="h-96 w-full relative">
        <div className="absolute -top-9">
          <button
            data-active={currentTab === 'team'}
            className="w-32 bg-app-pink py-1.5 rounded-t-xl data-[active=true]:opacity-100 opacity-50 text-app-purple-700 font-semibold"
            onClick={() => setCurrentTab('team')}
          >
            Equipe
          </button>
          <button
            data-active={currentTab === 'advisor'}
            className="w-32 bg-app-pink py-1.5 rounded-t-xl data-[active=true]:opacity-100 opacity-50 text-app-purple-700 font-semibold"
            onClick={() => setCurrentTab('advisor')}
          >
            Orientador
          </button>
          <button
            data-active={currentTab === 'admin'}
            className="w-32 bg-app-pink py-1.5 rounded-t-xl data-[active=true]:opacity-100 opacity-50 text-app-purple-700 font-semibold"
            onClick={() => setCurrentTab('admin')}
          >
            Administrador
          </button>
        </div>
        <div className="bg-app-pink w-full h-full rounded-r-xl flex-col space-y-8 flex items-center justify-center">
          <h2 className="text-5xl font-semibold text-app-purple-600 ">Login</h2>

          <form
            onSubmit={form.handleSubmit(handleLogin, handleFormErrors)}
            className="flex flex-col items-center justify-center gap-4"
          >
            <div className="flex flex-col items-start justify-start">
              <label
                htmlFor="user"
                className="text-lg text-app-purple-700 font-semibold"
              >
                Usuário
              </label>
              <input
                id="user"
                className="border-2 border-app-purple-800 rounded-lg bg-transparent focus-within:outline-none focus:outline-none p-3 py-2 text-sm w-72"
                {...form.register('user')}
              />
            </div>

            <div className="flex flex-col items-start justify-start">
              <label
                htmlFor="password"
                className="text-lg text-app-purple-700 font-semibold"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                className="border-2 border-app-purple-800 rounded-lg bg-transparent focus-within:outline-none focus:outline-none p-3 py-2 text-sm w-72"
                {...form.register('password')}
              />
            </div>

            <button
              type="submit"
              className="bg-app-purple-600 text-white text-lg font-semibold w-32 py-1 rounded-lg hover:brightness-75"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
