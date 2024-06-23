import { create } from 'zustand'
import { delay } from '@/utils/delay'
import { toast } from 'sonner'
import { GLOBALS_CONSTANTS } from '@/constants/globals'

interface IUser {
  id: number
  name: string
  email: string
  registration: number
  role: string
  photoUrl?: string
  course: string
}

interface IUserStore {
  users: IUser[]
  totalOfUsers: number
  loadUsers: (query: string, pageIndex?: number) => Promise<void>
  deleteUser: (userId: number) => Promise<void>
  getUser: (userId: number) => Promise<IUser | null>
}

export const useUserStore = create<IUserStore>((set, get) => {
  return {
    users: [],
    totalOfUsers: 0,

    loadUsers: async (
      query: string,
      page = GLOBALS_CONSTANTS.LIMIT_OF_LIST,
    ) => {
      const users: IUser[] = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          registration: 12345678,
          role: 'student',
          course: 'Computer Science',
          photoUrl: 'https://example.com/photos/johndoe.jpg', // opcional
        },
      ]
      await delay(500)

      const start = (page - 1) * GLOBALS_CONSTANTS.LIMIT_OF_LIST
      const end = start + GLOBALS_CONSTANTS.LIMIT_OF_LIST

      const usersToSet = users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase()),
      )

      set(() => ({
        users: usersToSet.slice(start, end),
        totalOfUsers: usersToSet.length,
      }))
    },

    deleteUser: async (userId: number) => {
      toast.info('Deletando Curso')
      await delay(500)

      const users = get().users.filter((user) => user.id !== userId)
      toast.success('Curso Deletado')

      set(() => ({
        users,
        totalOfUsers: users.length,
      }))

      toast.info('Recarregando página')
      await delay(1000)
    },

    getUser: async (userId: number) => {
      await delay(500)

      return {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        registration: 12345678,
        role: 'student',
        course: 'Computer Science',
        photoUrl: 'https://example.com/photos/johndoe.jpg', // opcional
      }
    },
  }
})
