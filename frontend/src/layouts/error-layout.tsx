import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/navbar'

export function ErrorLayout() {
  return (
    <div className="w-screen h-screen overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-muted dark:scrollbar-track-muted-foreground dark:scrollbar-thumb-slate-800">
      <Navbar />
      <div className="w-screen h-[calc(100vh-52px)]">
        <Outlet />
      </div>
    </div>
  )
}
