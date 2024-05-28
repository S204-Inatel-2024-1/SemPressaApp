import { ThemeToggle } from '@/theme/components/toggle-theme'
import { Button } from './ui/button'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
  DrawerDescription,
} from './ui/drawer'
import { useAuthStore } from '@/store/auth'
import { Menu } from 'lucide-react'

export function Navbar() {
  const { isAuthenticated, user } = useAuthStore((state) => ({
    isAuthenticated: state.isLogged,
    user: state.user,
  }))

  return (
    <nav className="flex w-screen items-center py-2 justify-between px-4">
      <div className="flex items-center justify-start gap-2">
        <Drawer direction="left">
          <DrawerTrigger>
            <Menu />
          </DrawerTrigger>
          <DrawerContent className="min-h-screen rounded-none w-96">
            <DrawerHeader>
              <DrawerTitle className="text-left">Fetin</DrawerTitle>
              {isAuthenticated && (
                <DrawerDescription>Bem vindo {user?.name}!</DrawerDescription>
              )}
            </DrawerHeader>
            <DrawerFooter>
              {!isAuthenticated && (
                <DrawerClose asChild>
                  <Button>Entrar</Button>
                </DrawerClose>
              )}

              <span className="text-slate-300 dark:text-slate-600 text-xs">
                Desenvolvido por pedr.augustobarbosa.aparecido@gmail.com.
              </span>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <span className="text-slate-800 dark:text-slate-50 font-semibold antialiased">
          Fetin
        </span>
      </div>
      <ThemeToggle />
    </nav>
  )
}
