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
import { Sun, User } from 'lucide-react'
import { useTheme } from '@/theme/provider'

export function ProfileDropdownMenu() {
  const { isAuthenticate, user, logout } = useAuthStore((state) => {
    return {
      isAuthenticate: state.isLogged,
      user: state.user,
      logout: state.logout,
    }
  })

  const { theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          className="dark:bg-transparent dark:border-transparent"
        >
          {isAuthenticate ? (
            <User className="size-8 dark:text-white" />
          ) : theme === 'light' ? (
            <Sun className="size-8 text-[#5D5B57]" />
          ) : (
            <Sun className="size-8" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isAuthenticate && (
          <>
            <DropdownMenuLabel>{user?.name.slice(0, 16)}.</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>Meu Perfil</DropdownMenuItem> */}
          </>
        )}
        <DropdownMenuItem asChild>
          <ThemeToggle />
        </DropdownMenuItem>
        {isAuthenticate && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async function () {
                const isLogoutSuccess = await logout()
                if (isLogoutSuccess) {
                  window.location.replace('/login')
                }
              }}
            >
              Sair
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
