import { create } from 'zustand'
import { toast } from 'sonner'
import { api } from '@/lib/api'

interface IParallel {
  id: number
  name: string
  description: string
}

interface IParallelStore {
  parallels: IParallel[]
  totalOfParallels: number
  loadParallels: (pageIndex?: number) => Promise<void>
  deleteParallel: (parallelId: number) => Promise<void>
  getParallel: (parallelId: number) => Promise<IParallel | null>
  createParallel(parallel: Omit<IParallel, 'id'>): Promise<boolean>
  updateParallel(parallel: IParallel): Promise<boolean>
}

export const useParallelStore = create<IParallelStore>((set, get) => {
  return {
    parallels: [],
    totalOfParallels: 0,

    loadParallels: async (page = 0) => {
      const response = await api.get(`/parallel?page=${page}&size=10`)

      set(() => ({
        parallels: response.data.content,
        totalOfParallels: response.data.totalElements,
      }))
    },

    deleteParallel: async (parallelId: number) => {
      toast.info('Deletando Paralela')
      await api.delete(`/parallel/${parallelId}`)

      get().loadParallels()
    },

    getParallel: async (parallelId: number) => {
      const response = await api.get(`/parallel/${parallelId}`)

      return response.data
    },

    createParallel: async ({ description, name }: Omit<IParallel, 'id'>) => {
      try {
        const response = await api.post(`/parallel`, {
          name,
          description,
        })

        if (response.status !== 200) {
          toast.error('Não foi possível criar a paralela')
          return false
        }

        toast.success('Paralela criada com sucesso')
        return true
      } catch {
        toast.error('Não foi possível criar a paralela')
        return false
      }
    },
    updateParallel: async ({ description, name, id }: IParallel) => {
      try {
        const response = await api.post(`/parallel/${id}`, {
          name,
          description,
        })

        if (response.status !== 200) {
          toast.error('Não foi possível atualizar a paralela')
          return false
        }

        toast.success('Paralela atualizada com sucesso')
        return true
      } catch {
        toast.error('Não foi possível atualizar a paralela')
        return false
      }
    },
  }
})
