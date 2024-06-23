import { create } from 'zustand'
import { delay } from '@/utils/delay'
import { toast } from 'sonner'
import { GLOBALS_CONSTANTS } from '@/constants/globals'

interface IParallel {
  id: number
  name: string
  description: string
}

interface IParallelStore {
  parallels: IParallel[]
  totalOfParallels: number
  loadParallels: (query: string, pageIndex?: number) => Promise<void>
  deleteParallel: (parallelId: number) => Promise<void>
  getParallel: (parallelId: number) => Promise<IParallel | null>
}

export const useParallelStore = create<IParallelStore>((set, get) => {
  return {
    parallels: [],
    totalOfParallels: 0,

    loadParallels: async (
      query: string,
      page = GLOBALS_CONSTANTS.LIMIT_OF_LIST,
    ) => {
      const parallels = [
        {
          id: 1,
          name: 'Introduction to Programming',
          description: 'introduction-to-programming',
        },
        {
          id: 2,
          name: 'Advanced JavaScript',
          description: 'advanced-javascript',
        },
        {
          id: 3,
          name: 'Data Structures',
          description: 'data-structures',
        },
        {
          id: 4,
          name: 'Web Development Basics',
          description: 'web-development-basics',
        },
        {
          id: 5,
          name: 'Machine Learning',
          description: 'machine-learning',
        },
        {
          id: 6,
          name: 'Database Management',
          description: 'database-management',
        },
        {
          id: 7,
          name: 'Software Engineering',
          description: 'software-engineering',
        },
        {
          id: 8,
          name: 'Mobile App Development',
          description: 'mobile-app-development',
        },
        {
          id: 9,
          name: 'Cyber Security',
          description: 'cyber-security',
        },
        {
          id: 10,
          name: 'Cloud Computing',
          description: 'cloud-computing',
        },
        {
          id: 11,
          name: 'Artificial Intelligence',
          description: 'artificial-intelligence',
        },
        {
          id: 12,
          name: 'Computer Networks',
          description: 'computer-networks',
        },
        {
          id: 13,
          name: 'Big Data Analytics',
          description: 'big-data-analytics',
        },
        {
          id: 14,
          name: 'Operating Systems',
          description: 'operating-systems',
        },
        {
          id: 15,
          name: 'Discrete Mathematics',
          description: 'discrete-mathematics',
        },
        {
          id: 16,
          name: 'Game Development',
          description: 'game-development',
        },
        {
          id: 17,
          name: 'Blockchain Technology',
          description: 'blockchain-technology',
        },
        {
          id: 18,
          name: 'Natural Language Processing',
          description: 'natural-language-processing',
        },
        {
          id: 19,
          name: 'Robotics',
          description: 'robotics',
        },
        {
          id: 20,
          name: 'Quantum Computing',
          description: 'quantum-computing',
        },
      ]
      await delay(500)

      const start = (page - 1) * GLOBALS_CONSTANTS.LIMIT_OF_LIST
      const end = start + GLOBALS_CONSTANTS.LIMIT_OF_LIST

      const parallelsToSet = parallels.filter((parallel) =>
        parallel.name.toLowerCase().includes(query.toLowerCase()),
      )

      set(() => ({
        parallels: parallelsToSet.slice(start, end),
        totalOfParallels: parallelsToSet.length,
      }))
    },

    deleteParallel: async (parallelId: number) => {
      toast.info('Deletando Curso')
      await delay(500)

      const parallels = get().parallels.filter(
        (parallel) => parallel.id !== parallelId,
      )
      toast.success('Curso Deletado')

      set(() => ({
        parallels,
        totalOfParallels: parallels.length,
      }))

      toast.info('Recarregando página')
      await delay(1000)
    },

    getParallel: async (parallelId: number) => {
      await delay(500)

      return {
        id: parallelId,
        name: 'Engenharia de Software',
        description: 'engenharia-de-software',
      }
    },
  }
})
