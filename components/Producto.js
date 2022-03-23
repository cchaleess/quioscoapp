import Image from "next/image";
import { formatMoney } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

const Producto = ({producto}) => {

    const {handleSetProducto,  handleChangeModal} = useQuiosco();
    const {nombre, precio, imagen} = producto;

    return (
       <>
          <div className="border p-2">

            <Image
                src={`/assets/img/${imagen}.jpg`}
                alt={`Imagen Plato ${nombre}`}
                width={400}
                height={500}
            />
       

        <div className="p-5">
            <h3 className="text-2xl font-bold">{nombre}</h3>
            <p className="mt-5 font-black text-4xl text-amber-500">
                {formatMoney(precio)}
                </p>
            
            <button
                className="bg-indigo-500 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                type="button"
                onClick={() => {
                    handleChangeModal(true);
                    handleSetProducto(producto);
                }
            }
            >
                Agregar
            </button>
        </div>
 </div>
       </>
     


     );
}
 
export default Producto;