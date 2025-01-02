'use client'

import { useState, useMemo } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
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
  { id: 1, date: "2023-06-01", quantity: 100, breadType: "Especial" },
  { id: 2, date: "2023-06-02", quantity: 150, breadType: "Batidos" },
  { id: 3, date: "2023-06-03", quantity: 200, breadType: "Hallullas" },
  { id: 4, date: "2023-06-04", quantity: 120, breadType: "Batidos" },
  { id: 5, date: "2023-06-05", quantity: 180, breadType: "Hallullas" },
]

export function BreadSalesTable() {
  const today = new Date()
  const [date, setDate] = useState<Date>(today)
  console.log(date)

  const filteredSales = useMemo(() => {
    return salesData.filter((sale) => {
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
        <DatePicker date={date} setDate={setDate} />
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
function DatePicker({ date, setDate }: { date: Date, setDate: React.Dispatch<React.SetStateAction<Date>> }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={`w-[240px] pl-3 text-left font-normal `}
        >
          {date ? (
            format(date, "d 'de' MMMM 'de' yyyy", { locale: es })
          ) : (
            <span className="text-black">Seleccione una fecha</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => newDate && setDate(newDate)}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
          locale={es}
        />
      </PopoverContent>
    </Popover>)
}
