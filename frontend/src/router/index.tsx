import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import { Home } from '../pages/home'
import { Login } from '../pages/login'
import { RootLayout } from '../layouts/root'
import NotFoundPage from '@/pages/not-found'
import { ErrorLayout } from '@/layouts/error-layout'

export function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<ErrorLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>,
    ),
  )

  return <RouterProvider router={router} />
}
