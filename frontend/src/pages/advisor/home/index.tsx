import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { CircleHelp } from 'lucide-react'
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
              <TableRow>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}
