/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { delay } from '@/utils/delay'
import { toast } from 'sonner'
import { GLOBALS_CONSTANTS } from '@/constants/globals'

export type ITeam = {
  id: number
  name: string
  projectId: string
  users: any
}

interface ITeamStore {
  teams: ITeam[]
  totalOfTeams: number
  loadTeams: (query: string, pageIndex?: number) => Promise<void>
  deleteTeam: (teamId: number) => Promise<void>
  getTeam: (teamId: number) => Promise<ITeam | null>
}

export const useTeamStore = create<ITeamStore>((set, get) => {
  return {
    teams: [],
    totalOfTeams: 0,

    loadTeams: async (
      query: string,
      pageIndex = GLOBALS_CONSTANTS.INITIAL_PAGE_OF_LIST,
    ) => {
      const teams: ITeam[] = []

      await delay(500)

      const start = (pageIndex - 1) * GLOBALS_CONSTANTS.LIMIT_OF_LIST
      const end = start + GLOBALS_CONSTANTS.LIMIT_OF_LIST

      set(() => ({
        teams: teams.slice(start, end),
        totalOfTeams: teams.length,
      }))
    },
    deleteTeam: async (teamId: number) => {
      toast.info('Deletando Equipe')
      await delay(500)

      const teams = get().teams.filter((team) => team.id !== teamId)

      set(() => ({
        teams,
        totalOfTeams: teams.length,
      }))

      await get().loadTeams('')

      toast.success('Projeto equipe')
    },
    getTeam: async (teamId: number) => {
      await delay(500)

      const team = get().teams.find((team) => team.id === teamId)
      if (!team) return null

      return team
    },
  }
})
