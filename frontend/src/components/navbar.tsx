import { Button } from './ui/button'
import { useAuthStore } from '@/store/auth'
import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { ProfileDropdownMenu } from './profile-menu'

export function Navbar() {
  const { isAuthenticated, user } = useAuthStore((state) => ({
    isAuthenticated: state.isLogged,
    user: state.user,
  }))

  return (
    <nav className="flex w-screen items-center py-2 justify-between px-4 overflow-x-hidden absolute top-0 left-0 z-50">
      <div className="flex items-center justify-start gap-2">
        <Sheet>
          <SheetTrigger>
            <Menu className="text-app-light-title size-8 dark:text-white" />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex flex-col justify-between min-h-screen rounded-none w-72 px-0"
          >
            <div className="space-y-4">
              <SheetHeader className="px-4">
                <SheetTitle className="text-left">Fetin</SheetTitle>
                {isAuthenticated && (
                  <SheetDescription>Bem vindo {user?.name}!</SheetDescription>
                )}
              </SheetHeader>
              {isAuthenticated && user?.role === 'admin' && (
                <div className="w-full">
                  <Button
                    asChild
                    className="w-full text-left justify-start rounded-none hover:shadow"
                    variant="ghost"
                  >
                    <Link to="/admin/students">Alunos</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full text-left justify-start rounded-none hover:shadow"
                    variant="ghost"
                  >
                    <Link to="/admin/advisors">Orientadores</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full text-left justify-start rounded-none hover:shadow"
                    variant="ghost"
                  >
                    <Link to="/admin/phases">Fases da Fetin</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full text-left justify-start rounded-none hover:shadow"
                    variant="ghost"
                  >
                    <Link to="/admin/courses">Cursos</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full text-left justify-start rounded-none hover:shadow"
                    variant="ghost"
                  >
                    <Link to="/admin/parallels">Paralelas</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full text-left justify-start rounded-none hover:shadow"
                    variant="ghost"
                  >
                    <Link to="/admin">Equipes</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full text-left justify-start rounded-none hover:shadow"
                    variant="ghost"
                  >
                    <Link to="/admin/projects">Projetos</Link>
                  </Button>
                </div>
              )}
            </div>
            <p className="px-4 text-slate-300 dark:text-slate-600 text-xs mt-auto">
              Desenvolvido por pedr.augustobarbosa.aparecido@gmail.com.
            </p>
          </SheetContent>
        </Sheet>
        <span className="text-app-light-title text-xl font-sans dark:text-slate-50 antialiased italic font-bold">
          Inatel
        </span>
      </div>
      <ProfileDropdownMenu />
    </nav>
  )
}
