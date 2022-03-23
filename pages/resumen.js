import Layout from "../layout/Layout";
import useQuiosco from "../hooks/useQuiosco";
import ResumenProducto from "../components/ResumenProducto";

export default function Resumen(){


    const {pedido} = useQuiosco();

    return (
     
        <Layout pagina="Resumen">
            <h1
            className="text-4xl font-black"
            >Resumen</h1>

            <p
            className="text-2 xl my-10"
            >
                Elije tu pedido y personalizalo a continuación
            </p>

            {pedido.length === 0 ? (
                    <p className="text-4xl font-black">No hay productos en el pedido</p>              
                        ) : (
                                pedido.map((producto) => (
                                    <ResumenProducto                                    
                                        key={producto.id} producto={producto} />
                                ))
                        )}
        </Layout>
    );
}