import { create } from 'zustand'
import { delay } from '@/utils/delay'
import { toast } from 'sonner'
import { GLOBALS_CONSTANTS } from '@/constants/globals'

interface IProject {
  id: number
  name: string
  description: string
}

interface IProjectStore {
  projects: IProject[]
  totalOfProjects: number
  loadProjects: (query: string, pageIndex?: number) => Promise<void>
  deleteProject: (projectId: number) => Promise<void>
  getProject: (projectId: number) => Promise<IProject | null>
}

export const useProjectStore = create<IProjectStore>((set, get) => {
  return {
    projects: [],
    totalOfProjects: 0,

    loadProjects: async (
      query: string,
      page = GLOBALS_CONSTANTS.LIMIT_OF_LIST,
    ) => {
      const projects = [
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

      const projectsToSet = projects.filter((project) =>
        project.name.toLowerCase().includes(query.toLowerCase()),
      )

      set(() => ({
        projects: projectsToSet.slice(start, end),
        totalOfProjects: projectsToSet.length,
      }))
    },

    deleteProject: async (projectId: number) => {
      toast.info('Deletando Curso')
      await delay(500)

      const projects = get().projects.filter(
        (project) => project.id !== projectId,
      )
      toast.success('Curso Deletado')

      set(() => ({
        projects,
        totalOfProjects: projects.length,
      }))

      toast.info('Recarregando página')
      await delay(1000)
    },

    getProject: async (projectId: number) => {
      await delay(500)

      return {
        id: projectId,
        name: 'Engenharia de Software',
        description: 'engenharia-de-software',
      }
    },
  }
})
