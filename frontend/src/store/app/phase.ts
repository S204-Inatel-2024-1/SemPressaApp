import { create } from 'zustand'
import { delay } from '@/utils/delay'
import { toast } from 'sonner'
import { GLOBALS_CONSTANTS } from '@/constants/globals'

interface IPhase {
  id: number
  name: string
  period: string
  isActive: boolean
}

interface IPhaseStore {
  phases: IPhase[]
  totalOfPhases: number
  loadPhases: (query: string, pageIndex?: number) => Promise<void>
  deletePhase: (phaseId: number) => Promise<void>
  getPhase: (phaseId: number) => Promise<IPhase | null>
}

export const usePhaseStore = create<IPhaseStore>((set, get) => {
  return {
    phases: [],
    totalOfPhases: 0,

    loadPhases: async (
      query: string,
      page = GLOBALS_CONSTANTS.LIMIT_OF_LIST,
    ) => {
      const phases = [
        {
          id: 1,
          name: 'Initialization',
          isActive: true,
          period: '2024-01-01 até 2024-01-15',
        },
        {
          id: 2,
          name: 'Planning',
          isActive: false,
          period: '2024-01-16 até 2024-01-31',
        },
        {
          id: 3,
          name: 'Execution',
          isActive: true,
          period: '2024-02-01 até 2024-02-15',
        },
        {
          id: 4,
          name: 'Monitoring',
          isActive: false,
          period: '2024-02-16 até 2024-02-28',
        },
        {
          id: 5,
          name: 'Closure',
          isActive: true,
          period: '2024-03-01 até 2024-03-15',
        },
        {
          id: 6,
          name: 'Review',
          isActive: false,
          period: '2024-03-16 até 2024-03-31',
        },
        {
          id: 7,
          name: 'Evaluation',
          isActive: true,
          period: '2024-04-01 até 2024-04-15',
        },
        {
          id: 8,
          name: 'Feedback',
          isActive: false,
          period: '2024-04-16 até 2024-04-30',
        },
        {
          id: 9,
          name: 'Design',
          isActive: true,
          period: '2024-05-01 até 2024-05-15',
        },
        {
          id: 10,
          name: 'Development',
          isActive: false,
          period: '2024-05-16 até 2024-05-31',
        },
        {
          id: 11,
          name: 'Testing',
          isActive: true,
          period: '2024-06-01 até 2024-06-15',
        },
        {
          id: 12,
          name: 'Deployment',
          isActive: false,
          period: '2024-06-16 até 2024-06-30',
        },
        {
          id: 13,
          name: 'Support',
          isActive: true,
          period: '2024-07-01 até 2024-07-15',
        },
        {
          id: 14,
          name: 'Maintenance',
          isActive: false,
          period: '2024-07-16 até 2024-07-31',
        },
        {
          id: 15,
          name: 'Upgrade',
          isActive: true,
          period: '2024-08-01 até 2024-08-15',
        },
        {
          id: 16,
          name: 'Retirement',
          isActive: false,
          period: '2024-08-16 até 2024-08-31',
        },
        {
          id: 17,
          name: 'Procurement',
          isActive: true,
          period: '2024-09-01 até 2024-09-15',
        },
        {
          id: 18,
          name: 'Installation',
          isActive: false,
          period: '2024-09-16 até 2024-09-30',
        },
        {
          id: 19,
          name: 'Configuration',
          isActive: true,
          period: '2024-10-01 até 2024-10-15',
        },
        {
          id: 20,
          name: 'Integration',
          isActive: false,
          period: '2024-10-16 até 2024-10-31',
        },
      ]
      await delay(500)

      const start = (page - 1) * GLOBALS_CONSTANTS.LIMIT_OF_LIST
      const end = start + GLOBALS_CONSTANTS.LIMIT_OF_LIST

      const phasesToSet = phases.filter((phase) =>
        phase.name.toLowerCase().includes(query.toLowerCase()),
      )

      set(() => ({
        phases: phasesToSet.slice(start, end),
        totalOfPhases: phasesToSet.length,
      }))
    },

    deletePhase: async (phaseId: number) => {
      toast.info('Deletando Curso')
      await delay(500)

      const phases = get().phases.filter((phase) => phase.id !== phaseId)
      toast.success('Curso Deletado')

      set(() => ({
        phases,
        totalOfPhases: phases.length,
      }))

      toast.info('Recarregando página')
      await delay(1000)
    },

    getPhase: async (phaseId: number) => {
      await delay(500)

      return {
        id: phaseId,
        name: 'Engenharia de Software',
        period: '2024-03-01 até 2024-03-15',
        isActive: true,
      }
    },
  }
})
