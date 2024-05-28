import { useAuthStore } from '@/store/auth'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }))

  return (
    <div className="flex min-h-[calc(100vh-52px)] flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-900">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
          404 - Página não encontrada
        </h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          A página que você procura não existe ou foi movida.
        </p>
        <Link
          className="mt-6 inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          to={user ? `/${user.role}` : '/login'}
        >
          Voltar para o Início
        </Link>
      </div>
    </div>
  )
}
