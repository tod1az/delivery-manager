import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BreadSalesForm } from "./bread-sales-form"
import { BreadSalesTable } from "./bread-sales-table"

export default function BreadSalesPage() {
  return (
    <div className="container mx-auto py-10">
      <Tabs defaultValue="production-form" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="production-form">Ingresar Produccion</TabsTrigger>
          <TabsTrigger value="production-reports">Reportes</TabsTrigger>
        </TabsList>
        <TabsContent value="production-form">
          <Card>
            <CardHeader>
              <CardTitle>Registro produccion de pan</CardTitle>
              <CardDescription>Ingrese aqui la cantidad de pan producido</CardDescription>
            </CardHeader>
            <CardContent>
              <BreadSalesForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="production-reports">
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

