import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/navbar'

export function ErrorLayout() {
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <div className="w-screen h-[calc(100vh-52px)]">
        <Outlet />
      </div>
    </div>
  )
}
