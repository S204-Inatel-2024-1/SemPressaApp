import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { useEffect } from 'react'

export function RootLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const { loadAuthCookie } = useAuthStore((state) => {
    return {
      loadAuthCookie: state.loadAuthCookie,
    }
  })

  useEffect(() => {
    loadAuthCookie().then((isLogged) => {
      if (!isLogged) navigate('/login', { replace: true })
      if (location.pathname === '/login' && isLogged)
        navigate('/', {
          replace: true,
        })
    })
  }, [loadAuthCookie, navigate, location])

  return (
    <div className="w-screen h-screen items-center justify-center flex">
      <Outlet />
    </div>
  )
}
