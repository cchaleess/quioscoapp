import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";
import { formatMoney } from "../helpers";
import { useState, useEffect } from "react";

const ModalProducto = () => {
  const {
    producto,
    handleChangeModal,
    handleAgregarPedido,
    pedido,
  } = useQuiosco();

  const [cantidad, setCantidad] = useState(1);
  const [edicion, setEdicion] = useState(false);

  //Comprobar  si el modal actual es igual al producto actual
  useEffect(() => {
    if (pedido.some((p) => p.id === producto.id)) {
        //Obtengo el array de productos del pedido ya que some itera pero no devuelve el array
        const productoEdicion = pedido.find((p) => p.id === producto.id);
        //Asigno la cantidad del producto actual al estado
        setCantidad(productoEdicion.cantidad);
        setEdicion(true);

    }        
  }, [producto, pedido]);

  return (
    <div className="md:flex gap-10">
      <div className="md:w-1/3">
        <Image
          alt={`imagen producto ${producto.nombre}`}
          src={`/assets/img/${producto.imagen}.jpg`}
          width={300}
          height={400}
        />
      </div>
      <div className="md:w-2/3">
        <div className="grid justify-end">
          <button onClick={() => handleChangeModal(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <h1 className="text-2xl font-black mt-5">{producto.nombre}</h1>
        <p className="text-2xl font-black mt-5 text-amber-500">
          {formatMoney(producto.precio)}
        </p>

        <div className="flex gap-4 mt-5">
          <button
            type="button"
            onClick={() => {
              if (cantidad <= 1) return;
              setCantidad(cantidad - 1);
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
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <p className="text-3xl">{cantidad}</p>

          <button
            type="button"
            onClick={() => {
              if (cantidad >= 5) return;
              setCantidad(cantidad + 1);
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
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        <button
          type="button"
          className="bg-indigo-500 hover:bg-indigo-800 text-white rounded mt-5 p-3 uppercase font-bold"
          onClick={() => {
            handleAgregarPedido({ ...producto, cantidad });
          }}
        >
          {edicion ? "Guardar cambios" : "Añadir al pedido"}
        </button>
      </div>
    </div>
  );
};

export default ModalProducto;
