import { create } from 'zustand'
import { toast } from 'sonner'
import { api } from '@/lib/api'

interface IPhase {
  id: number
  name: string
  period: string
  isActive: boolean
}

interface IPhaseStore {
  phases: IPhase[]
  totalOfPhases: number
  loadPhases: (pageIndex?: number) => Promise<void>
  deletePhase: (phaseId: number) => Promise<void>
  getPhase: (phaseId: number) => Promise<IPhase | null>
}

export const usePhaseStore = create<IPhaseStore>((set, get) => {
  return {
    phases: [],
    totalOfPhases: 0,

    loadPhases: async (page = 0) => {
      const response = await api.get(`/phase?page=${page}&size=10`)

      set(() => ({
        phases: response.data.content,
        totalOfPhases: response.data.totalElements,
      }))
    },

    deletePhase: async (phaseId: number) => {
      toast.info('Deletando Curso')
      await api.delete(`/phase/${phaseId}`)
      toast.success('Curso Deletado')

      get().loadPhases()
    },

    getPhase: async (phaseId: number) => {
      const response = await api.get(`/phase/${phaseId}`)

      return response.data
    },
  }
})
