import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="grid justify-center mt-[20rem] gap-8">
      <Button
        variant={"outline"}
        className="shadow"
      >
        <Link href={"/registro-pan"}>
          Registro Pan
        </Link>
      </Button>

      <Button
        variant={"outline"}
        className="shadow"
      >
        <Link href={"/ventas"}>
          Tabla de ventas
        </Link>
      </Button>
      <Button
        variant={"outline"}
        className="shadow"
      >
        <Link href={"/ingreso-venta"}>
          Ingresar venta
        </Link>
      </Button>
    </main>
  )
}
