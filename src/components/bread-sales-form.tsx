'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  quantity: z.number().positive({
    message: "La cantidad debe ser un número positivo",
  }),
  breadType: z.string().min(1, {
    message: "Por favor seleccione un tipo de pan",
  }),
})

export function BreadSalesForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 0,
      breadType: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const submissionData = {
      ...values,
      date: new Date().toISOString().split('T')[0], // Añadir la fecha actual
    };
    console.log(submissionData);
    //setSubmissionStatus('success');
    form.reset();
    //setTimeout(() => setSubmissionStatus('idle'), 3000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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
                  <SelectItem value="baguette">Baguette</SelectItem>
                  <SelectItem value="ciabatta">Ciabatta</SelectItem>
                  <SelectItem value="sourdough">Pan de masa madre</SelectItem>
                  <SelectItem value="wholewheat">Pan integral</SelectItem>
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
        {/* {submissionStatus === 'success' && (
          <p className="text-green-600">Venta registrada con éxito!</p>
        )} */}
      </form>
    </Form>
  )
}

