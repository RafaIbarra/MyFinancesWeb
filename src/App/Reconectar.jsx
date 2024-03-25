import React,{useState,useEffect} from "react";
import './reconectar.css'
function Reconectar ({intentar,setIntentar,setConexbd}){
    const [contadorsegundos,setContadorsegundos]=useState(0)
    useEffect(() => {
        let segundos = 0;

    // Función que se ejecutará cada segundo
    const contador = setInterval(() => {
    segundos++; // Incrementar el contador de segundos
    console.log(segundos); // Mostrar el contador en la consola

    setContadorsegundos(segundos)

    // Verificar si han transcurrido 20 segundos
    if (segundos === 20) {
        clearInterval(contador); // Detener el contador
        setIntentar(!intentar); // Ejecutar la función deseada
        setConexbd(true)
    }
    }, 1000);
      }, []);
    return(
            <div className="contenedor-reconectar">
                <p className="estilo-p-reconectar">  SIN CONEXION, TIEMPO DE ESPERA PARA INTENTO DE RECONEXION: 20 SEGUNDOS - 
                  <strong><em>{`SEGUNDOS TRASCURRIDOS: ${contadorsegundos}. `}</em></strong>
                   </p>
               

            </div>
    )

}
export default Reconectar