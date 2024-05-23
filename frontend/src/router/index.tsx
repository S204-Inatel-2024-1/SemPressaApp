import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import { Home } from '../pages/home'
import { Login } from '../pages/login'
import { RootLayout } from '../layouts/root'

export function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Route>,
    ),
  )

  return <RouterProvider router={router} />
}
