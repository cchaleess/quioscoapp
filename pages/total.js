import Layout from "../layout/Layout";
import { useCallback, useEffect } from "react";
import useQuiosco from "../hooks/useQuiosco";
import { formatMoney } from "../helpers";

export default function Total() {

    const {pedido, nombre, setNombre, colocarOrden, total} = useQuiosco();

    //Necesito comprobarPedido para que no deje enviar el form si no hay nada, useCallback para poder pasarla dentro de useEffect y no haya error de dependencia
    const comprobarPedido = useCallback ( () => {      
        return pedido.length === 0 || nombre === "" || nombre.length < 3;
    }, [pedido, nombre]);
    
    useEffect(() => {
        comprobarPedido();
    }, [pedido, comprobarPedido]);



  return (
    <Layout pagina="Total">
      <h1 className="text-4xl font-black">Total y Confirmar pedido</h1>
      <p className="text-2 xl my-10">Confirma tu pedido a continuación </p>

      <form onSubmit={colocarOrden}> 
        <div className="flex items-center">
            <div className=""> {/* <!-- Grid cell --> */}
                        <label
                            htmlFor="nombre"
                            className="block uppercase text-slate-800 font-bold text-xl"
                        >
                            Nombre
                        </label>
                        </div>

                        <div className="lg:w-1/3 md:w-2/3 mt-2 p-2 w-full"> {/* <!-- Grid cell --> */}
                        <input
                            id="nombre"
                            type={"text"}
                            className=" bg-gray-200 rounded-md p-2"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        </div>

        </div>

            <div className="mt-10">
                <p className="text-2xl">Total a pagar: {''} <span className="font-bold">{formatMoney(total)}</span> </p>
            </div>

            <div className="mt-5">
                <input
                    type="submit"
                    className={`${
                        comprobarPedido() 
                        ? 'bg-indigo-300' 
                        : 'bg-indigo-600 hover:bg-indigo-800'
                    } w-full lg:w-auto px-5 py-2 rounded uppercase text-center text-white font-bold`}
                    value="Confirmar pedido"
                    disabled={comprobarPedido()}
               />

            </div>
      </form>
    </Layout>
  );
}
