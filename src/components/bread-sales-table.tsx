'use client'

import { useState, useMemo } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { es } from "date-fns/locale"

// Simulated data - replace this with actual data fetching logic
const salesData = [
  { id: 1, date: "2023-06-01", quantity: 100, breadType: "baguette" },
  { id: 2, date: "2023-06-02", quantity: 150, breadType: "ciabatta" },
  { id: 3, date: "2023-06-03", quantity: 200, breadType: "sourdough" },
  { id: 4, date: "2023-06-04", quantity: 120, breadType: "wholewheat" },
  { id: 5, date: "2023-06-05", quantity: 180, breadType: "baguette" },
]

export function BreadSalesTable() {
  const today = new Date()
  const [date, setDate] = useState<DateRange | undefined>({
    from: today,
    to: today,
  })

  const filteredSales = useMemo(() => {
    return salesData.filter((sale) => {
      if (!date?.from) return true
      const saleDate = new Date(sale.date)
      if (date.to) {
        return saleDate >= date.from && saleDate <= date.to
      }
      return saleDate.toDateString() === date.from.toDateString()
    })
  }, [date])

  const totalByType = useMemo(() => {
    return filteredSales.reduce((acc, sale) => {
      acc[sale.breadType] = (acc[sale.breadType] || 0) + sale.quantity
      return acc
    }, {} as Record<string, number>)
  }, [filteredSales])

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={`w-[300px] justify-start text-left font-normal`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Seleccionar fecha</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              locale={es}
            />

          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Ventas de Pan</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Tipo de Pan</TableHead>
                <TableHead className="text-right">Cantidad (kg)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell>{sale.breadType}</TableCell>
                  <TableCell className="text-right">{sale.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Total por Tipo de Pan</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo de Pan</TableHead>
                <TableHead className="text-right">Total (kg)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(totalByType).map(([breadType, total]) => (
                <TableRow key={breadType}>
                  <TableCell>{breadType}</TableCell>
                  <TableCell className="text-right">{total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

