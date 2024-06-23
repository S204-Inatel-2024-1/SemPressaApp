export function StudentPage() {
  return (
    <main className="h-[calc(100vh-52px)] w-screen p-16 pt-8 space-y-4 flex items-center justify-center">
      <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 text-app-light-title dark:text-white">
        <div className="rounded-lg border bg-background p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Project Data</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Número</span>
              <span>123456</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Título</span>
              <span>Acme Project</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Membros</span>
              <span>John Doe, Jane Smith, Bob Johnson</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Orientador</span>
              <span>Dr. Alice Williams</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Status</span>
              <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-medium text-green-900">
                Active
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-background p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Fase da Fetin</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Fase Atual</span>
              <span>Design</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Data de encerramento</span>
              <span>June 30, 2023</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Entregas</span>
              <span>Wireframes, Mockups, Prototypes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Progresso</span>
              <div className="flex items-center">
                <div className="h-2 w-24 rounded-full bg-muted">
                  <div className="h-2 w-[60%] rounded-full bg-primary" />
                </div>
                <span className="ml-2">60%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
