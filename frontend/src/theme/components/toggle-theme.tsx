import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '../provider'
import { cn } from '@/lib/shadcn'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="px-2 w-full justify-between font-normal"
        >
          <span className="capitalize">Tema</span>
          <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 ml-auto dark:hidden" />
          <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 hidden transition-all dark:rotate-0 dark:scale-100 ml-auto dark:block" />
          {/* <span className="sr-only">Toggle theme</span> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="left"
        sideOffset={8}
        align="start"
        className="space-y-1"
      >
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={cn(
            theme === 'light' && 'bg-accent text-accent-foreground',
          )}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={cn(theme === 'dark' && 'bg-accent text-accent-foreground')}
        >
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
