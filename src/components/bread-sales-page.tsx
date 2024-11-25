'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BreadSalesForm } from "./bread-sales-form"
import { BreadSalesTable } from "./bread-sales-table"

export default function BreadSalesPage() {
  return (
    <div className="container mx-auto py-10">
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sales">Ingresar Ventas</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
        </TabsList>
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Ingresar Ventas de Pan</CardTitle>
              <CardDescription>Ingrese los detalles de las ventas de pan aquí.</CardDescription>
            </CardHeader>
            <CardContent>
              <BreadSalesForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reportes de Ventas</CardTitle>
              <CardDescription>Filtrar y ver las ventas de pan.</CardDescription>
            </CardHeader>
            <CardContent>
              <BreadSalesTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

