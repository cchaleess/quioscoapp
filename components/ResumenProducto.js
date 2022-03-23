import Image from "next/image";
import { formatMoney } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

const ResumenProducto = ({ producto }) => {

const { handleEditarCantidades, handleEliminarProducto } = useQuiosco();

  return (
    <>
      <div className="shadow p-5 mb-3 flex gap-10 items-center">
        <div className="md:w-1/6">
          <Image
            width={300}
            height={400}
            src={`/assets/img/${producto.imagen}.jpg`}
            alt={`Imagen Producto ${producto.nombre}`}
          />
        </div>

        <div className="md:w-4/6">
          <p className="text-3xl font-bold">{producto.nombre}</p>
          <p className="text-xl font-black mt-2">
            Cantidad: {producto.cantidad}
          </p>
          <p className="text-xl font-black mt-2 text-amber-500">
            Precio: {formatMoney(producto.precio)}{" "}
          </p>
          <p className="text-sm text-grey-700 mt-2">
            Subtotal: {formatMoney(producto.precio * producto.cantidad)}{" "}
          </p>
        </div>

        <div>
          <button
            type="button"
            className="bg-sky-500 flex hover:bg-sky-800 text-white w-full mt-5 p-3 uppercase font-bold"
            onClick={() => {
                handleEditarCantidades(producto.id);
            }}

          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Editar
          </button>

          <button
            type="button"
            className="bg-red-700 flex hover:bg-red-800 text-white w-full mt-5 p-3 uppercase font-bold"
            onClick={() => {
                handleEliminarProducto(producto.id);
            }}

          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Eliminar
          </button>
        </div>
      </div>
    </>
  );
};

export default ResumenProducto;
