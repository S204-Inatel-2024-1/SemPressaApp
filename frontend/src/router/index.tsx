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
import { AdminPhaseList } from '@/pages/admin/phases'
import { AdminPhaseForm } from '@/pages/admin/phases/form'
import { AdminTeamsFormPage } from '@/pages/admin/teams/form'
import { AdminParallelsPage } from '@/pages/admin/parallels'
import { AdminParallelFormPage } from '@/pages/admin/parallels/form'
import { AdminProjectsPage } from '@/pages/admin/projects'
import { AdminProjectFormPage } from '@/pages/admin/projects/form'
import { AdminStudentsPage } from '@/pages/admin/student'
import { AdminStudentFormPage } from '@/pages/admin/student/form'
import { AdminAdvisorsPage } from '@/pages/admin/advisors'
import { AdminAdvisorFormPage } from '@/pages/admin/advisors/form'
import { StudentPage } from '@/pages/students/home'
import { AdvisorHomePage } from '@/pages/advisor/home'

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

            <Route path="phases" element={<AdminPhaseList />} />
            <Route path="phases/form" element={<AdminPhaseForm />} />

            <Route path="teams/form" element={<AdminTeamsFormPage />} />

            <Route path="parallels" element={<AdminParallelsPage />} />
            <Route path="parallels/form" element={<AdminParallelFormPage />} />

            <Route path="projects" element={<AdminProjectsPage />} />
            <Route path="projects/form" element={<AdminProjectFormPage />} />

            <Route path="students" element={<AdminStudentsPage />} />
            <Route path="students/form" element={<AdminStudentFormPage />} />

            <Route path="advisors" element={<AdminAdvisorsPage />} />
            <Route path="advisors/form" element={<AdminAdvisorFormPage />} />
          </Route>
          <Route path="/student">
            <Route index element={<StudentPage />} />
          </Route>
          <Route path="/advisor">
            <Route index element={<AdvisorHomePage />} />
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
