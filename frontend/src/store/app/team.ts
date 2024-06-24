/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { toast } from 'sonner'
import { api } from '@/lib/api'

export type ITeam = {
  id: number
  name: string
  projectId: string
  users: any
}

interface ITeamStore {
  teams: ITeam[]
  totalOfTeams: number
  loadTeams: (pageIndex?: number) => Promise<void>
  deleteTeam: (teamId: number) => Promise<void>
  getTeam: (teamId: number) => Promise<ITeam | null>
}

export const useTeamStore = create<ITeamStore>((set, get) => {
  return {
    teams: [],
    totalOfTeams: 0,

    loadTeams: async (pageIndex = 0) => {
      const response = await api.get(`/team?page=${pageIndex}&size=10`)

      set(() => ({
        teams: response.data.content,
        totalOfTeams: response.data.totalElements,
      }))
    },
    deleteTeam: async (teamId: number) => {
      toast.info('Deletando Equipe')
      await api.delete(`/team/${teamId}`)

      await get().loadTeams()
    },
    getTeam: async (teamId: number) => {
      const response = await api.get(`/team/${teamId}`)
      if (!response.data) return null

      return response.data
    },
  }
})
