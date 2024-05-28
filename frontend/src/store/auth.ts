import { create } from 'zustand'
import Cookie from 'js-cookie'
import { AUTH_CONSTANTS } from '../constants/store/auth'
import { delay } from '@/utils/delay'

export type UserRole = 'admin' | 'student' | 'advisor'

interface IAuthStore {
  isLogged: boolean
  authToken: string
  loadAuthCookie: () => Promise<boolean>
  login: (user: string, password: string, role: string) => Promise<boolean>
  user?: {
    id: number
    name: string
    email: string
    role: UserRole
  } | null
}

export const useAuthStore = create<IAuthStore>((set) => {
  return {
    isLogged: false,
    authToken: '',
    user: null,
    loadAuthCookie: async () => {
      const cookies = Cookie.get()
      const hasAuthorizationToken = AUTH_CONSTANTS.AUTH_PROPERTY_NAME in cookies

      if (!hasAuthorizationToken) {
        set(() => ({ isLogged: false }))

        return false
      }

      const authToken = cookies[AUTH_CONSTANTS.AUTH_PROPERTY_NAME]
      set(() => ({
        authToken,
        isLogged: true,
        user: {
          id: 1,
          role: 'admin',
          name: 'Pedro Augusto',
          email: 'pedro007augustobarbosa@gmail.com',
        },
      }))

      return true
    },
    login: async (user, password, role) => {
      // TODO - send credentials to backend
      console.log('Realizando login:', { user, password, role })

      await delay(500)
      Cookie.set(AUTH_CONSTANTS.AUTH_PROPERTY_NAME, 'empty-token')

      set(() => ({
        isLogged: true,
        user: {
          id: 1,
          role: 'admin',
          name: 'Pedro Augusto',
          email: 'pedro007augustobarbosa@gmail.com',
        },
      }))

      return true
    },
  }
})
