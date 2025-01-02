import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { es } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ControllerRenderProps } from "react-hook-form"


type Props = {
  field: ControllerRenderProps<{
    date: Date;
    quantity: string;
    breadType: string;
  }, "date">
}

export default function DatePicker({ field }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={`w-[240px] pl-3 text-left font-normal ${!field.value && "text-muted-foreground"
            }`}
        >
          {field.value ? (
            format(field.value, "d 'de' MMMM 'de' yyyy", { locale: es })
          ) : (
            <span>Seleccione una fecha</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
          locale={es}
        />
      </PopoverContent>
    </Popover>)
}
