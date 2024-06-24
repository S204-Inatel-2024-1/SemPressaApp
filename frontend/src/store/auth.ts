import { create } from 'zustand'
import Cookie from 'js-cookie'
import { AUTH_CONSTANTS } from '../constants/store/auth'
import { api } from '@/lib/api'
import { toast } from 'sonner'

import * as jwt from 'jose'

export type UserRole = 'admin' | 'student' | 'advisor'

interface IUserLogged {
  id: number
  name: string
  email: string
  role: UserRole
}

interface IAuthStore {
  isLogged: boolean
  authToken: string
  loadAuthCookie: () => Promise<boolean>
  login: (user: string, password: string, role: string) => Promise<boolean>
  logout: () => Promise<boolean>
  user?: IUserLogged | null
}

function extractUserRole(role: string): UserRole {
  switch (role) {
    case 'ADMIN':
      return 'admin'
    case 'STUDENT':
      return 'student'
    case 'ADVISOR':
      return 'advisor'
    default:
      return 'student'
  }
}

export const useAuthStore = create<IAuthStore>((set, get) => {
  return {
    isLogged: false,
    authToken: '',
    user: null,
    loadAuthCookie: async () => {
      if (get().isLogged) {
        return true
      }

      const cookies = Cookie.get()
      const hasAuthorizationToken = AUTH_CONSTANTS.AUTH_PROPERTY_NAME in cookies

      if (!hasAuthorizationToken) {
        set(() => ({ isLogged: false }))

        return false
      }

      const authToken = cookies[AUTH_CONSTANTS.AUTH_PROPERTY_NAME]

      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { aud, exp, iat, iss, jti, nbf, ...userLogged } = jwt.decodeJwt<
          jwt.JWTPayload & IUserLogged
        >(authToken)

        userLogged.role = extractUserRole(userLogged.role)
        userLogged.email = userLogged.sub!
        set(() => ({
          authToken,
          isLogged: true,
          user: userLogged,
        }))

        console.log('PASSOU')
        return true
      } catch {
        toast.error('Não foi possível obter as informações usuário')
        return false
      }
    },
    login: async (user, password, role) => {
      // TODO - send credentials to backend
      console.log('Realizando login:', { role })

      try {
        const response = await api.post('/login', {
          email: user,
          password,
        })

        if (response.status !== 200) {
          toast.error('Credenciais Inválidas', {
            description: 'Verifique suas credenciais e tente novamente',
          })
          return false
        }

        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { aud, exp, iat, iss, jti, nbf, ...userLogged } = jwt.decodeJwt<
            jwt.JWTPayload & IUserLogged
          >(response.data.token)

          userLogged.role = extractUserRole(userLogged.role)
          userLogged.email = userLogged.sub!
          set(() => ({
            isLogged: true,
            user: userLogged,
          }))

          Cookie.set(AUTH_CONSTANTS.AUTH_PROPERTY_NAME, response.data.token)

          return true
        } catch {
          toast.error('Não foi possível obter as informações usuário')
          return false
        }
      } catch {
        toast.error('Credenciais inválidas')
        return false
      }
    },
    logout: async () => {
      try {
        const response = await api.post('/logout')
        if (response.status !== 200) {
          toast.error('Houve um erro ao tentar deslogar')
          return false
        }

        Cookie.remove(AUTH_CONSTANTS.AUTH_PROPERTY_NAME)
        return true
      } catch {
        toast.error('Houve um erro ao tentar deslogar')
        return false
      }
    },
  }
})
