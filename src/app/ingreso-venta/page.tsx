'use client'
import { Combobox } from "@/components/combo-box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


type Client = { id: string; name: string }
type Item = { id: string; name: string }
type SaleItem = {
  itemId: string
  quantity: number
  rate: number
}


const clients: Client[] = [
  {
    name: "Cliente 1",
    id: "Cliente1"
  },
  {
    name: "Cliente 2 ",
    id: "Cliente2"
  },
  {
    name: "Cliente 3",
    id: "Cliente3"
  },
]

const breadTypes: Item[] = [
  {
    id: "pan 1",
    name: "pan1"
  },
  {
    id: "2 pan",
    name: "pan2"
  },
  {
    id: " 3pan ",
    name: "pan3"
  },
]

export default function SalesForm() {
  const [clientId, setClientId] = useState<string>('')
  const [saleItems, setSaleItems] = useState<SaleItem[]>([{ itemId: '', quantity: 0, rate: 0 }])

  const addItem = () => {
    setSaleItems([...saleItems, { itemId: '', quantity: 0, rate: 0 }])
  }

  const removeItem = (index: number) => {
    const newItems = saleItems.filter((_, i) => i !== index)
    setSaleItems(newItems)
  }

  const updateItem = (index: number, field: keyof SaleItem, value: string | number) => {
    const newItems = [...saleItems]
    newItems[index] = { ...newItems[index], [field]: value }
    setSaleItems(newItems)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Sale submitted:', { clientId, items: saleItems })
    // Aquí iría la lógica para enviar los datos al servidor
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Ingresar venta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cliente">Cliente</Label>
            <Select value={clientId} onValueChange={(value) => setClientId(value)}>
              <SelectTrigger id="cliente">
                <SelectValue placeholder="Seleccione un cliente" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {saleItems.map((item, index) => (
            <Card key={index}>
              <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`item-${index}`}>Item</Label>
                  <Select
                    value={item.itemId}
                    onValueChange={(value) => updateItem(index, 'itemId', value)}
                  >
                    <SelectTrigger id={`item-${index}`}>
                      <SelectValue placeholder="Seleccione un item" />
                    </SelectTrigger>
                    <SelectContent>
                      {breadTypes.map((i) => (
                        <SelectItem key={i.id} value={i.id}>
                          {i.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`cantidad-${index}`}>Cantidad (Kg)</Label>
                  <Input
                    id={`cantidad-${index}`}
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`tarifa-${index}`}>Tarifa</Label>
                  <Input
                    id={`tarifa-${index}`}
                    type="number"
                    value={item.rate}
                    onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value))}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeItem(index)}
                    disabled={saleItems.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={addItem}>
            <Plus className="mr-2 h-4 w-4" /> Agregar Item
          </Button>
          <Button type="submit">Enviar Venta</Button>
        </CardFooter>
      </Card>
    </form>
  )
}




