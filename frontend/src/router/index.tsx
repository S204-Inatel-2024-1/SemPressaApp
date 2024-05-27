import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import { AdminHome } from '../pages/admin/teams'
import { Login } from '../pages/login'
import { RootLayout } from '../layouts/root'
import NotFoundPage from '@/pages/not-found'
import { ErrorLayout } from '@/layouts/error-layout'
import { AdminCourseList } from '@/pages/admin/courses'
import { AdminCourseForm } from '@/pages/admin/courses/form'

export function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<RootLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/admin">
            <Route index element={<AdminHome />} />
            <Route path="courses" element={<AdminCourseList />} />
            <Route path="courses/form" element={<AdminCourseForm />} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>,
    ),
  )

  return <RouterProvider router={router} />
}
