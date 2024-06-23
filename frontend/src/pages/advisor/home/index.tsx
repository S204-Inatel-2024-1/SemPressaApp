import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { CircleHelp, FileDown } from 'lucide-react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function AdvisorHomePage() {
  return (
    <main className="h-[calc(100vh-52px)] w-screen p-16 pt-8 space-y-4">
      <Card>
        <CardHeader className="flex-row justify-between items-center">
          <CardTitle className="font-semibold text-app-light-title dark:text-white">
            Seus Projetos
          </CardTitle>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger className="cursor-default">
                <CircleHelp className="size-6 text-app-light-title dark:text-white" />
              </TooltipTrigger>
              <TooltipContent>
                Informações dos projetos
                <TooltipPrimitive.TooltipArrow />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableHead>N° do Projeto</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Equipe</TableHead>
              <TableHead>Orientador</TableHead>
              <TableHead>Status</TableHead>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b border-b-input last:border-b-0">
                <TableCell>01</TableCell>
                <TableCell>Projeto 01</TableCell>
                <TableCell>Colocar os membros</TableCell>
                <TableCell>Jorge</TableCell>
                <TableCell>
                  <span className="bg-green-500 dark:bg-green-800 font-semibold rounded-full text-white py-1 px-3">
                    Classificado
                  </span>
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-b-input last:border-b-0">
                <TableCell>01</TableCell>
                <TableCell>Projeto 01</TableCell>
                <TableCell>Colocar os membros</TableCell>
                <TableCell>Jorge</TableCell>
                <TableCell>
                  <span className="bg-green-500 dark:bg-green-800 font-semibold rounded-full text-white py-1 px-3">
                    Classificado
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-app-light-title dark:text-white">
              Informações da FETIN
            </CardTitle>
            <div className="space-x-2">
              <a href="https://cdn.discordapp.com/attachments/1225240949735559182/1254472458992353370/FETIN_-_Requisitos_para_app.pdf?ex=66799e05&is=66784c85&hm=5f3cc7b317045baee2a5cb06c66c3fc3ebb68f266989f38b5da52d018b9e61c8&">
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger className="cursor-default">
                      <FileDown className="size-6 cursor-pointer text-app-light-title dark:text-white" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Manual do orientador
                      <TooltipPrimitive.TooltipArrow />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </a>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger className="cursor-default">
                    <CircleHelp className="size-6 text-app-light-title dark:text-white" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Informações sobre a fetin
                    <TooltipPrimitive.TooltipArrow />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h5 className="font-semibold text-app-light-title dark:text-white">
                Fase Atual
              </h5>
              <p>Entrega 80% do projeto</p>
            </div>
            <div>
              <h5 className="font-semibold text-app-light-title dark:text-white">
                Prazos
              </h5>
              <div>
                <p>Fase 1: June 30, 2024</p>
                <p>Fase 2: July 30, 2024</p>
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-app-light-title dark:text-white">
                Entregas
              </h5>
              <ul>
                <li>Documentação do projeto</li>
                <li>Apresentação para o orientador</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-app-light-title dark:text-white">
              Formulários
            </CardTitle>
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger className="cursor-default">
                  <CircleHelp className="size-6 text-app-light-title dark:text-white" />
                </TooltipTrigger>
                <TooltipContent>
                  Links para os formulários da fetin
                  <TooltipPrimitive.TooltipArrow />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-start justify-center gap-2">
              <div className="flex flex-col items-start justify-center gap-0.5">
                <a
                  href="#"
                  className="underline mb-2 hover:text-blue-900 dark:hover:text-blue-600"
                >
                  Avaliação primeira banca
                </a>
                <span>Critérios de avaliação: </span>
                <ol>
                  <li>Ideia do projeto é possível ser feita</li>
                  <li>Tempo necessário para execução</li>
                </ol>
              </div>
              <div className="flex flex-col items-start justify-center gap-0.5">
                <a
                  href="#"
                  className="underline mb-2 hover:text-blue-900 dark:hover:text-blue-600"
                >
                  Avaliação segunda banca
                </a>
                <span>Critérios de avaliação: </span>
                <ol>
                  <li>Está ocorrendo conforme o planejado</li>
                  <li>Está com no mínimo 20% pronto</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
