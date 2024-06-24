import { create } from 'zustand'
import { toast } from 'sonner'
import type { UserRole } from '../auth'
import { api } from '@/lib/api'

interface IUser {
  id: number
  name: string
  email: string
  registration: number
  password: string
  role: string
  photoUrl?: string
  course: string
}

interface IUserStore {
  users: IUser[]
  totalOfUsers: number
  loadUsers: (
    role: UserRole,
    pageIndex?: number,
    all?: boolean,
  ) => Promise<IUser[]>
  deleteUser: (userId: number) => Promise<void>
  getUser: (userId: number) => Promise<IUser | null>
  createStudent: (data: Omit<IUser, 'id'>) => Promise<boolean>
  updateStudent: (data: IUser) => Promise<boolean>
}

export const useUserStore = create<IUserStore>((set, get) => {
  return {
    users: [],
    totalOfUsers: 0,

    loadUsers: async (role: UserRole, page = 0, all: boolean = false) => {
      const url = `/user/${role}?page=${page}&size=${all ? 10000 : 10}`
      const response = await api.get(url)

      set(() => ({
        users: response.data.content,
        totalOfUsers: response.data.totalElements,
      }))

      return response.data.content
    },

    deleteUser: async (userId: number) => {
      toast.info('Deletando Usuário')
      await api.delete(`/user/${userId}`)

      toast.success('Usuário Deletado')

      get().loadUsers('student', 0, false)
    },

    getUser: async (userId: number) => {
      const response = await api.get(`/user/${userId}`)

      return response.data
    },

    createStudent: async ({
      course,
      email,
      name,
      registration,
      password,
      role,
    }: Omit<IUser, 'id'>): Promise<boolean> => {
      try {
        const response = await api.post('/user/students', {
          course,
          email,
          name,
          password,
          registration,
          role: 'student',
        })

        if (response.status !== 201) {
          toast.error('Não foi possível criar o aluno')
          return false
        }

        toast.success('Aluno criado com sucesso')
        return true
      } catch {
        toast.error('Não foi possível criar o aluno')
        return false
      }
    },
    updateStudent: async ({
      course,
      email,
      name,
      registration,
      role,
      id,
    }: IUser): Promise<boolean> => {
      try {
        const response = await api.post(`/user/${id}`, {
          course,
          email,
          name,
          registration,
          role: 'student',
        })

        if (response.status !== 201) {
          toast.error('Não foi possível atualizar o aluno')
          return false
        }

        toast.success('Aluno atualizado com sucesso')
        return true
      } catch {
        toast.error('Não foi possível atualizar o aluno')
        return false
      }
    },
  }
})
