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
    <nav className="flex w-screen items-center py-2 justify-between px-4 overflow-x-hidden">
      <div className="flex items-center justify-start gap-2">
        <Sheet>
          <SheetTrigger>
            <Menu />
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
              {isAuthenticated && (
                <div className="w-full">
                  <Button
                    asChild
                    className="w-full text-left justify-start rounded-none hover:shadow"
                    variant="ghost"
                  >
                    <Link to="/admin/student">Alunos</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full text-left justify-start rounded-none hover:shadow"
                    variant="ghost"
                  >
                    <Link to="/admin/advisor">Orientadores</Link>
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
                    <Link to="/admin/parallel">Paralelas</Link>
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
        <span className="text-slate-800 dark:text-slate-50 font-semibold antialiased italic">
          Inatel - Fetin
        </span>
      </div>
      <ProfileDropdownMenu />
    </nav>
  )
}
