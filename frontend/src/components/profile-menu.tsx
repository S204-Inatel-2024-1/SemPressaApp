import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/store/auth'
import { Button } from './ui/button'
import { ThemeToggle } from '@/theme/components/toggle-theme'
import { SunMoon, User } from 'lucide-react'

export function ProfileDropdownMenu() {
  const { isAuthenticate, user } = useAuthStore((state) => {
    return {
      isAuthenticate: state.isLogged,
      user: state.user,
    }
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost">
          {isAuthenticate ? (
            <User className="size-4" />
          ) : (
            <SunMoon className="size-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isAuthenticate && (
          <>
            <DropdownMenuLabel>{user?.name.slice(0, 16)}.</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Meu Perfil</DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem asChild>
          <ThemeToggle />
        </DropdownMenuItem>
        {isAuthenticate && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sair</DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
