import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { useTheme } from '@/theme/provider'

import DarkBackground from '@/assets/dark-background.png'
import LightBackground from '@/assets/light-background.png'

export function RootLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const { theme } = useTheme()

  const { loadAuthCookie, user } = useAuthStore((state) => {
    return {
      loadAuthCookie: state.loadAuthCookie,
      user: state.user,
    }
  })

  useEffect(() => {
    loadAuthCookie().then((isLogged) => {
      if (!isLogged) navigate('/login')
      if (location.pathname === '/login' && isLogged && user)
        navigate(`/${user!.role}`, {
          replace: true,
        })
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadAuthCookie, navigate, location])

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
