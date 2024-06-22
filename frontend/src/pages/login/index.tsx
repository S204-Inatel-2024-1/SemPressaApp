import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'sonner'
import { parseZodErrors } from '@/utils/parse-zod-errors'
import { useState } from 'react'
import { useAuthStore } from '@/store/auth'

import { TabsTrigger, TabsList, TabsContent, Tabs } from '@/components/ui/tabs'
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RotateCw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AdminIcon } from '@/components/icons/admin-icon'
import { StudentIcon } from '@/components/icons/student-icon'
import { AdvisorIcon } from '@/components/icons/advisor-icon'

import { AdminIcon as AdminLightIcon } from '@/components/icons/light/admin-icon'
import { AdvisorIcon as AdvisorLightIcon } from '@/components/icons/light/advisor'
import { StudentIcon as StudentLightIcon } from '@/components/icons/light/student'
import { useTheme } from '@/theme/provider'

import FetinLightLogo from '@/assets/light-logo.png'
import FetinDarkLogo from '@/assets/dark-logo.png'

const loginFormSchema = z.object({
  username: z
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
  const [currentTab, setCurrentTab] = useState<string>('student')
  const navigate = useNavigate()
  const { theme } = useTheme()

  const { login, user } = useAuthStore((state) => ({
    login: state.login,
    user: state.user,
  }))

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  })

  async function handleLogin({ password, username }: LoginFormSchema) {
    const hasLoggedWithSuccess = await login(username, password, currentTab)

    if (!hasLoggedWithSuccess) {
      return toast.error('Erro ao tentar logar', {
        description: 'Usuário ou senha incorretos!',
      })
    }

    toast.success('Sucesso', {
      description: 'Você foi logado com sucesso',
    })

    navigate(`/${user!.role}`)
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

  let title = currentTab
  switch (title) {
    case 'admin':
      title = 'Administrador'
      break
    case 'advisor':
      title = 'Orientador'
      break
    case 'student':
      title = 'Estudante'
      break
  }

  return (
    <Tabs
      className="w-full max-w-md mx-auto my-auto"
      defaultValue="admin"
      value={currentTab}
      onValueChange={setCurrentTab}
    >
      <div className="flex items-center justify-center w-full mb-6">
        <img
          src={theme === 'dark' ? FetinDarkLogo : FetinLightLogo}
          className="w-96 self-center"
          alt=""
        />
      </div>
      <TabsList className="grid grid-cols-3 w-full dark:bg-app-dark-blue-500 bg-[#DCD3C9]/45">
        <TabsTrigger
          className="dark:data-[state=active]:bg-app-dark-blue-700 data-[state=active]:bg-[#FEFAF6]"
          value="admin"
        >
          Administrador
        </TabsTrigger>
        <TabsTrigger
          className="dark:data-[state=active]:bg-app-dark-blue-700 data-[state=active]:bg-[#FEFAF6]"
          value="advisor"
        >
          Orientador
        </TabsTrigger>
        <TabsTrigger
          className="dark:data-[state=active]:bg-app-dark-blue-700 data-[state=active]:bg-[#FEFAF6]"
          value="student"
        >
          Estudante
        </TabsTrigger>
      </TabsList>
      <TabsContent className="py-2" value="admin"></TabsContent>
      <TabsContent className="py-2" value="advisor"></TabsContent>
      <TabsContent className="py-2" value="student"></TabsContent>
      <Card className="dark:bg-app-dark-blue-600 bg-[#FEFAF6]/33 border-2 border-app-dark-blue-500">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="text-center">
            <CardTitle className="capitalize text-4xl dark:text-white text-app-light-title">
              {title}
            </CardTitle>
            <CardDescription className="dark:text-app-dark-text text-app-light-text">
              Entre com suas {currentTab} credenciais abaixo.
            </CardDescription>
          </div>

          {currentTab === 'admin' &&
            (theme === 'dark' ? <AdminIcon /> : <AdminLightIcon />)}
          {currentTab === 'advisor' &&
            (theme === 'dark' ? <AdvisorIcon /> : <AdvisorLightIcon />)}
          {currentTab === 'student' &&
            (theme === 'dark' ? <StudentIcon /> : <StudentLightIcon />)}
        </CardHeader>
        <form onSubmit={form.handleSubmit(handleLogin, handleFormErrors)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-username">Usuário</Label>
              <Input
                className="bg-app-light-input dark:bg-app-dark-blue-900 border-2 border-app-light-title dark:border-app-dark-blue-400"
                id="admin-username"
                placeholder="Entre com seu usuário"
                {...form.register('username')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password">Senha</Label>
              <Input
                className="bg-app-light-input dark:bg-app-dark-blue-900 border-2 border-app-light-title dark:border-app-dark-blue-400"
                type="password"
                id="admin-password"
                placeholder="Entre com sua senha"
                {...form.register('password')}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              disabled={form.formState.isSubmitting}
              className="w-full text-white dark:bg-white dark:text-[#171923] bg-app-light-title font-bold"
            >
              {form.formState.isSubmitting ? (
                <RotateCw className="size-4 animate-spin" />
              ) : (
                'Entrar'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Tabs>
  )
}
