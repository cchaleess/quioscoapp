import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";
import Categoria from "../components/Categoria";

const SideBar = () => {
   
    const {categorias} = useQuiosco();

    return (
    <>
     <Image
                src="/assets/img/logo.svg"
                alt="Logo"
                width={300}
                height={100}
            />
    
    <nav className="mt-10">
        {categorias.map(categoria => (
            <Categoria key={categoria.id} categoria={categoria} /> 
         ))
        }
    </nav>

    </>
          
    )
}
export default SideBar;