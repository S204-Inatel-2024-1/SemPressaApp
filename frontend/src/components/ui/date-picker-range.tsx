'use client'

import * as React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/shadcn'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type DatePickerWithRangeProps = React.HTMLAttributes<HTMLDivElement> & {
  placeholder: string
  value?: string | null
  onChange: (dateRange: string) => void
}

export function DatePickerWithRange({
  className,
  placeholder,
  onChange,
  value,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    if (value) {
      return {
        from: new Date(),
        to: new Date(),
      }
    }

    return undefined
  })

  async function handleOnChangeDateRange(dateRange: DateRange | undefined) {
    setDate(dateRange)

    if (dateRange?.to) {
      onChange(
        `${format(dateRange.from!, 'LLL dd, y', {
          locale: ptBR,
        })} - ${format(dateRange.to, 'LLL dd, y', {
          locale: ptBR,
        })}`,
      )
    } else if (dateRange?.from) {
      onChange(format(dateRange.from, 'LLL dd, y'))
    } else {
      onChange('')
    }
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y', {
                    locale: ptBR,
                  })}{' '}
                  -{' '}
                  {format(date.to, 'LLL dd, y', {
                    locale: ptBR,
                  })}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleOnChangeDateRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
