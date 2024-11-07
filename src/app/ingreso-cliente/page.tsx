import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-start mt-[10rem]">
      <form className="flex flex-col gap-3 p-6 bg-gray-100 shadow items-center justify-center w-[20rem] rounded-lg">
        <h1 className="pb-6 font-bold text-xl"> Ingresar un nuevo cliente </h1>
        <Input className="bg-white px-2" placeholder="Nombre" />
        <Input className="bg-white px-2" placeholder="Direccion" />
        <Input className="bg-white px-2" placeholder="Tarifa" />
        <Button>Guardar</Button>
      </form>
    </main>
  )
}
