import { create } from 'zustand'
import { delay } from '@/utils/delay'
import { toast } from 'sonner'
import { GLOBALS_CONSTANTS } from '@/constants/globals'

interface ICourse {
  id: number
  name: string
  slug: string
}

interface ICourseStore {
  courses: ICourse[]
  totalOfCourses: number
  loadCourses: (query: string, pageIndex?: number) => Promise<void>
  deleteCourse: (courseId: number) => Promise<void>
  getCourse: (courseId: number) => Promise<ICourse | null>
}

export const useCourseStore = create<ICourseStore>((set, get) => {
  return {
    courses: [],
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
  }
})
