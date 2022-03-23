import { useRouter } from "next/router";
import useQuiosco
 from "../hooks/useQuiosco";

const pasos = [
  { paso: 1, nombre: "Menu", url: "/" },
  { paso: 2, nombre: "Resumen", url: "/resumen" },
  { paso: 3, nombre: "Datos y total", url: "/total" },
];

const Pasos = () => {

  const router = useRouter();

  const { handleChangePaso } = useQuiosco();


  
  const calcularProgreso = () => {
      //No es del todo estetico:
      // return (paso / 3) * 100;
      let valor
      //Utilizamos el router para no perder la referencia
        if (router.pathname ==="/") {
            valor = 2;
            } else if (router.pathname ==="/resumen") {
            valor = 50;
            } else {
            valor = 100;
            }
        return valor;

  }


  return (
    <>
      <div className="flex justify-between items-center py-4 mb-4">
        {pasos.map((paso) => (
          <button
            onClick={() => { 
                router.push(paso.url)
            }}
            className="text-2xl font-black"
            key={paso.paso}
          >
            {paso.nombre}
          </button>
        ))}
      </div>

      <div className="bg-gray-100 mb-10">
          <div 
          className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white" 
          style={{width: `${calcularProgreso()}%`}}>

          </div>
      </div>
    </>
  );
};

export default Pasos;
