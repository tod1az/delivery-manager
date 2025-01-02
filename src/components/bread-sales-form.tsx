'use client'

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DatePicker from "./day-picker"

const formSchema = z.object({
  date: z.date({
    required_error: "La fecha es requerida",
  }),
  quantity: z.string()
    .min(1)
    .default("")
    .refine((value) => !isNaN(Number(value)), { message: "La cantidad debe ser un número positivo" })
  ,
  breadType: z.string().min(1, {
    message: "Por favor seleccione un tipo de pan",
  }),
})

export function BreadSalesForm() {
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(Date.now()),
      quantity: "",
      breadType: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Aquí iría la lógica para enviar los datos al servidor
    console.log(values)
    console.log(values.date)
    setSubmissionStatus('success')
    // Reiniciar el formulario después de un envío exitoso
    form.reset()
    // Volver al estado 'idle' después de 3 segundos
    setTimeout(() => setSubmissionStatus('idle'), 3000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker field={field} />
              </FormControl>
              <FormDescription>
                La fecha de la venta.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => {
                  const newValue = e.target.value
                  field.onChange(newValue === "" ? "" : newValue)
                }} />
              </FormControl>
              <FormDescription>
                La cantidad de panes vendidos.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="breadType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Pan</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un tipo de pan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Especial">Especial</SelectItem>
                  <SelectItem value="Batidos">Batidos</SelectItem>
                  <SelectItem value="Hallullas">Hallullas</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                El tipo de pan vendido.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar</Button>
        {submissionStatus === 'success' && (
          <p className="text-green-600">Venta registrada con éxito!</p>
        )}
      </form>
    </Form>
  )
}
