import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { useEffect } from 'react'
import { Navbar } from '@/components/navbar'

export function RootLayout() {
  const navigate = useNavigate()
  const location = useLocation()

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
    <div className="w-screen h-screen">
      <Navbar />
      <div className="w-screen h-[calc(100vh-52px)] flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
