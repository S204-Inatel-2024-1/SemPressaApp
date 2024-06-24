import { create } from 'zustand'
import { toast } from 'sonner'
import { api } from '@/lib/api'

interface IProject {
  id: number
  name: string
  description: string
}

interface IProjectStore {
  projects: IProject[]
  totalOfProjects: number
  loadProjects: (pageIndex?: number, all?: boolean) => Promise<IProject[]>
  deleteProject: (projectId: number) => Promise<void>
  getProject: (projectId: number) => Promise<IProject | null>
  create: (data: Omit<IProject, 'id'>) => Promise<boolean>
  updateProject: (data: IProject) => Promise<boolean>
}

export const useProjectStore = create<IProjectStore>((set, get) => {
  return {
    projects: [],
    totalOfProjects: 0,

    loadProjects: async (page = 0, all = false) => {
      let params = `?page=${page}&size=10`
      if (all) params = `?page=${page}&size=10`

      const response = await api.get(`/project${params}`)
      console.log(response.data)

      set(() => ({
        projects: response.data.content,
        totalOfProjects: response.data.totalElements,
      }))

      return response.data.content as IProject[]
    },

    deleteProject: async (projectId: number) => {
      toast.info('Deletando Curso')
      await api.delete(`/project/${projectId}`)
      toast.success('Curso Deletado')

      get().loadProjects(0, false)
    },

    getProject: async (projectId: number) => {
      const response = await api.get(`/project/${projectId}`)

      return response.data
    },
    create: async ({ name, description }: Omit<IProject, 'id'>) => {
      try {
        const response = await api.post('/project', {
          name,
          description,
        })

        if (response.status !== 201) {
          toast.error('Não foi possível criar o projeto')
          return false
        }

        toast.success('Projeto criado com sucesso')
        return true
      } catch {
        toast.error('Não foi possível criar o projeto')
        return false
      }
    },

    updateProject: async ({ name, description, id }: IProject) => {
      try {
        const response = await api.put(`/project/${id}`, {
          name,
          description,
        })

        if (response.status !== 200) {
          toast.error('Não foi possível atualizar o projeto')
          return false
        }

        toast.success('Projeto atualizado com sucesso')
        return true
      } catch {
        toast.error('Não foi possível atualizar o projeto')
        return false
      }
    },
  }
})
