import { create } from 'zustand'
import { delay } from '@/utils/delay'
import { toast } from 'sonner'
import { GLOBALS_CONSTANTS } from '@/constants/globals'

export type UserRole = 'admin' | 'student' | 'advisor'

export type IProject = {
  id: number
  name: string
  member_one: string
  member_two: string
  member_three: string
  member_four: string
}

interface ICourse {
  id: number
  name: string
  slug: string
}

interface IAppStore {
  teams: IProject[]
  totalOfTeams: number
  loadTeams: (query: string, pageIndex?: number) => Promise<void>
  deleteTeam: (teamId: number) => Promise<void>

  courses: ICourse[]
  totalOfCourses: number
  loadCourses: (query: string, pageIndex?: number) => Promise<void>
  deleteCourse: (courseId: number) => Promise<void>
  getCourse: (courseId: number) => Promise<ICourse | null>
}

export const useAppStore = create<IAppStore>((set, get) => {
  return {
    teams: [],
    courses: [],
    totalOfTeams: 0,
    totalOfCourses: 0,

    loadCourses: async (
      query: string,
      page = GLOBALS_CONSTANTS.LIMIT_OF_LIST,
    ) => {
      const courses = [
        {
          id: 1,
          name: 'Introduction to Programming',
          slug: 'introduction-to-programming',
        },
        {
          id: 2,
          name: 'Advanced JavaScript',
          slug: 'advanced-javascript',
        },
        {
          id: 3,
          name: 'Data Structures',
          slug: 'data-structures',
        },
        {
          id: 4,
          name: 'Web Development Basics',
          slug: 'web-development-basics',
        },
        {
          id: 5,
          name: 'Machine Learning',
          slug: 'machine-learning',
        },
        {
          id: 6,
          name: 'Database Management',
          slug: 'database-management',
        },
        {
          id: 7,
          name: 'Software Engineering',
          slug: 'software-engineering',
        },
        {
          id: 8,
          name: 'Mobile App Development',
          slug: 'mobile-app-development',
        },
        {
          id: 9,
          name: 'Cyber Security',
          slug: 'cyber-security',
        },
        {
          id: 10,
          name: 'Cloud Computing',
          slug: 'cloud-computing',
        },
        {
          id: 11,
          name: 'Artificial Intelligence',
          slug: 'artificial-intelligence',
        },
        {
          id: 12,
          name: 'Computer Networks',
          slug: 'computer-networks',
        },
        {
          id: 13,
          name: 'Big Data Analytics',
          slug: 'big-data-analytics',
        },
        {
          id: 14,
          name: 'Operating Systems',
          slug: 'operating-systems',
        },
        {
          id: 15,
          name: 'Discrete Mathematics',
          slug: 'discrete-mathematics',
        },
        {
          id: 16,
          name: 'Game Development',
          slug: 'game-development',
        },
        {
          id: 17,
          name: 'Blockchain Technology',
          slug: 'blockchain-technology',
        },
        {
          id: 18,
          name: 'Natural Language Processing',
          slug: 'natural-language-processing',
        },
        {
          id: 19,
          name: 'Robotics',
          slug: 'robotics',
        },
        {
          id: 20,
          name: 'Quantum Computing',
          slug: 'quantum-computing',
        },
      ]
      await delay(500)

      const start = (page - 1) * GLOBALS_CONSTANTS.LIMIT_OF_LIST
      const end = start + GLOBALS_CONSTANTS.LIMIT_OF_LIST

      const coursesToSet = courses.filter((course) =>
        course.name.toLowerCase().includes(query.toLowerCase()),
      )

      set(() => ({
        courses: coursesToSet.slice(start, end),
        totalOfCourses: coursesToSet.length,
      }))
    },

    deleteCourse: async (courseId: number) => {
      toast.info('Deletando Curso')
      await delay(500)

      const courses = get().courses.filter((course) => course.id !== courseId)
      toast.success('Curso Deletado')

      set(() => ({
        courses,
        totalOfCourses: courses.length,
      }))

      toast.info('Recarregando página')
      await delay(1000)
    },

    getCourse: async (courseId: number) => {
      await delay(500)

      return {
        id: courseId,
        name: 'Engenharia de Software',
        slug: 'engenharia-de-software',
      }
    },

    loadTeams: async (
      query: string,
      pageIndex = GLOBALS_CONSTANTS.INITIAL_PAGE_OF_LIST,
    ) => {
      const teams: IProject[] = [
        {
          id: 1,
          name: 'Item 1',
          member_one: 'Alice',
          member_two: 'Bob',
          member_three: 'Charlie',
          member_four: 'David',
        },
        {
          id: 2,
          name: 'Item 2',
          member_one: 'Eve',
          member_two: 'Frank',
          member_three: 'Grace',
          member_four: 'Heidi',
        },
        {
          id: 3,
          name: 'Item 3',
          member_one: 'Ivan',
          member_two: 'Judy',
          member_three: 'Mallory',
          member_four: 'Niaj',
        },
        {
          id: 4,
          name: 'Item 4',
          member_one: 'Oscar',
          member_two: 'Peggy',
          member_three: 'Sybil',
          member_four: 'Trent',
        },
        {
          id: 5,
          name: 'Item 5',
          member_one: 'Victor',
          member_two: 'Walter',
          member_three: 'Xavier',
          member_four: 'Yvonne',
        },
        {
          id: 6,
          name: 'Item 6',
          member_one: 'Zara',
          member_two: 'Alan',
          member_three: 'Bella',
          member_four: 'Chris',
        },
        {
          id: 7,
          name: 'Item 7',
          member_one: 'Donna',
          member_two: 'Earl',
          member_three: 'Fiona',
          member_four: 'George',
        },
        {
          id: 8,
          name: 'Item 8',
          member_one: 'Hank',
          member_two: 'Ivy',
          member_three: 'Jack',
          member_four: 'Kara',
        },
        {
          id: 9,
          name: 'Item 9',
          member_one: 'Liam',
          member_two: 'Mia',
          member_three: 'Nina',
          member_four: 'Owen',
        },
        {
          id: 10,
          name: 'Item 10',
          member_one: 'Paul',
          member_two: 'Quincy',
          member_three: 'Rachel',
          member_four: 'Sam',
        },
        {
          id: 11,
          name: 'Item 11',
          member_one: 'Tina',
          member_two: 'Umar',
          member_three: 'Vera',
          member_four: 'Will',
        },
        {
          id: 12,
          name: 'Item 12',
          member_one: 'Xena',
          member_two: 'Yuri',
          member_three: 'Zane',
          member_four: 'Abby',
        },
        {
          id: 13,
          name: 'Item 13',
          member_one: 'Blake',
          member_two: 'Cora',
          member_three: 'Drew',
          member_four: 'Elle',
        },
        {
          id: 14,
          name: 'Item 14',
          member_one: 'Finn',
          member_two: 'Gina',
          member_three: 'Hugo',
          member_four: 'Iris',
        },
        {
          id: 15,
          name: 'Item 15',
          member_one: 'Jake',
          member_two: 'Kara',
          member_three: 'Luna',
          member_four: 'Miles',
        },
        {
          id: 16,
          name: 'Item 16',
          member_one: 'Nate',
          member_two: 'Olga',
          member_three: 'Perry',
          member_four: 'Quinn',
        },
        {
          id: 17,
          name: 'Item 17',
          member_one: 'Reed',
          member_two: 'Sara',
          member_three: 'Troy',
          member_four: 'Uma',
        },
        {
          id: 18,
          name: 'Item 18',
          member_one: 'Vince',
          member_two: 'Wade',
          member_three: 'Xara',
          member_four: 'Yara',
        },
        {
          id: 19,
          name: 'Item 19',
          member_one: 'Zeke',
          member_two: 'Amy',
          member_three: 'Brett',
          member_four: 'Cara',
        },
        {
          id: 20,
          name: 'Item 20',
          member_one: 'Dane',
          member_two: 'Eva',
          member_three: 'Fay',
          member_four: 'Gabe',
        },
      ]

      await delay(500)

      const start = (pageIndex - 1) * GLOBALS_CONSTANTS.LIMIT_OF_LIST
      const end = start + GLOBALS_CONSTANTS.LIMIT_OF_LIST

      const teamsToSet = teams.filter((project) =>
        project.name.toLowerCase().includes(query.toLowerCase()),
      )

      set(() => ({
        teams: teamsToSet.slice(start, end),
        totalOfTeams: teamsToSet.length,
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
  }
})
