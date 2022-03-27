import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {useRouter} from 'next/router';

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]);
    const [nombre, setNombre] = useState('');
    const [total, setTotal] = useState(0);

    const router = useRouter();

    const obtenerCategorias = async () => {
        const {data} = await axios('/api/categorias');
        setCategorias(data);
    }

    useEffect(() => {
        obtenerCategorias();
    }, []);

    //setear Categoria por defecto
    useEffect(() => {
     setCategoriaActual(categorias[0]);
    }, [categorias]);

    //calcular total
    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad)+total, 0)
        setTotal(nuevoTotal);
    }, [pedido]);


    const handleClickCategoria = id => {

        const categoria = categorias.filter(cat => cat.id === id);
         setCategoriaActual(categoria[0]);
         //Para que si el usuario esta en el resumen pueda volver a la categoria
         router.push('/');
    }

    const handleSetProducto = producto => {
        setProducto(producto);
    }

    const handleChangeModal = () => {
        setModal(!modal);
    }
//quitar categoriaId e imagen del producto con spread operator
    const handleAgregarPedido = ({categoriaId, ...producto}) => {        
        //No agregar producto si ya esta en el pedido
        if(pedido.some(p => p.id === producto.id)){
            //Actualizar cantidad
            const pedidoActualizado = pedido.map(p => p.id === producto.id ? producto : p);
            setPedido(pedidoActualizado);
            toast.info('Producto modificado correctamente');
        }else{
            setPedido([...pedido, producto]);
            toast.success(`${producto.nombre} agregado al pedido`);
        }

        setModal(false);
    }

    
    const handleEditarCantidades = (id) => {
        const productoActualizado = pedido.filter(p => p.id === id)[0];
        setProducto(productoActualizado);
        setModal(!modal);
    }

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter(p => p.id !== id);
        setPedido(pedidoActualizado);
        toast.success('Producto eliminado del pedido');
    }


//Guardar registro en la base de datos
    const colocarOrden = async (e) => {
        e.preventDefault();
        console.log(total);
        try {
         await axios.post('/api/ordenes', {
                pedido,
                nombre,
                total,
                fecha: Date.now().toString()
            });
         
            //resetear pedido
            setPedido([]);
            setNombre('');
            setTotal(0);
            toast.success('Orden enviada correctamente');
           
            setTimeout(() => {
                router.push('/');
            }, 3000);


        } catch (error) {
            console.log(error);
        }
    }



    return (
        <QuioscoContext.Provider 
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total
            }}
           >
            {children}
        </QuioscoContext.Provider>
    );
};
export { QuioscoProvider };

export default QuioscoContext;
