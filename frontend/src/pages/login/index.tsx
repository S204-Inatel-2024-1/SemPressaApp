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
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="admin">Admin</TabsTrigger>
        <TabsTrigger value="advisor">Orientador</TabsTrigger>
        <TabsTrigger value="student">Estudante</TabsTrigger>
      </TabsList>
      <TabsContent className="py-2" value="admin"></TabsContent>
      <TabsContent className="py-2" value="advisor"></TabsContent>
      <TabsContent className="py-2" value="student"></TabsContent>
      <Card>
        <CardHeader>
          <CardTitle className="capitalize">{title}</CardTitle>
          <CardDescription>
            Entre com suas {currentTab} credenciais abaixo.
          </CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(handleLogin, handleFormErrors)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-username">Usuário</Label>
              <Input
                id="admin-username"
                placeholder="Entre com seu usuário"
                {...form.register('username')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password">Senha</Label>
              <Input
                type="password"
                id="admin-password"
                placeholder="Entre com sua senha"
                {...form.register('password')}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={form.formState.isSubmitting} className="w-full">
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
