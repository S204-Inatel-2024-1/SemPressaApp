import { create } from 'zustand'
import Cookie from 'js-cookie'
import { AUTH_CONSTANTS } from '../contants/store/auth'

interface IAuthStore {
  isLogged: boolean
  authToken: string
  loadAuthCookie: () => Promise<boolean>
  login: (
    user: string,
    password: string,
    role: 'admin' | 'team' | 'advisor',
  ) => Promise<boolean>
}

export const useAuthStore = create<IAuthStore>((set) => {
  return {
    isLogged: false,
    authToken: '',
    loadAuthCookie: async () => {
      const cookies = Cookie.get()
      const hasAuthorizationToken = AUTH_CONSTANTS.AUTH_PROPERTY_NAME in cookies

      if (!hasAuthorizationToken) {
        set(() => ({ isLogged: false }))

        return false
      }

      const authToken = cookies[AUTH_CONSTANTS.AUTH_PROPERTY_NAME]
      set(() => ({ authToken, isLogged: true }))

      return true
    },
    login: async (user, password, role) => {
      // TODO - send credentials to backend
      console.log('Realizando login:', { user, password, role })

      return true
    },
  }
})
