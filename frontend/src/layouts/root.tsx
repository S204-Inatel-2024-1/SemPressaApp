import { Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { useTheme } from '@/theme/provider'

import DarkBackground from '@/assets/dark-background.png'
import LightBackground from '@/assets/light-background.png'
import { toast } from 'sonner'

export function RootLayout() {
  const [isCheckingLoginState, setIsCheckingLoginState] =
    useState<boolean>(true)

  const { theme } = useTheme()

  const { loadAuthCookie, user } = useAuthStore((state) => {
    return {
      loadAuthCookie: state.loadAuthCookie,
      user: state.user,
    }
  })

  useEffect(() => {
    loadAuthCookie().then((isLogged) => {
      setIsCheckingLoginState(false)
      if (['', '/'].includes(location.pathname))
        window.location.replace('/login')
      if (isLogged && user && !location.pathname.startsWith(`/${user.role}`))
        window.location.replace('/not-found')
      if (!isLogged && location.pathname !== '/login')
        window.location.replace('/login')
      if (location.pathname === '/login' && isLogged && user) {
        toast.info('Entrando...')

        window.location.replace(`/${user!.role}`)
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadAuthCookie, user])

  if (isCheckingLoginState) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0] dark:from-[#1a1a1a] dark:to-[#0f0f0f]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground text-lg">
            Carregando, por favor espere..
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="dark:bg-app-dark-blue-800 bg-white w-screen h-screen overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-muted dark:scrollbar-track-muted-foreground dark:scrollbar-thumb-slate-800">
      <Navbar />
      <div className="w-screen h-[calc(100vh-64px)] flex items-center justify-center z-50 absolute top-[56px]">
        <Outlet />
      </div>
      <img
        src={theme === 'dark' ? DarkBackground : LightBackground}
        className="absolute w-screen h-screen top-0 left-0 z-30"
        alt=""
      />
    </div>
  )
}
