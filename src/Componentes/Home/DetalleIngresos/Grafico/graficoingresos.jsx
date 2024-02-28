import React, {useEffect, useState} from 'react';
import './graficoingresos.css'

function GraficoIngresos({dataingresos,imgingresos}){
    const [imagen, setImagen] = useState(null);
    
   
      
    useEffect(() => {
        const cargardatos =()=>{
            setImagen(imgingresos)
            
        };
        cargardatos();
        
    }, [dataingresos]);
    
    
    return(
    <div className='contenedor-principal-ingreso'>
        <h4 className='titulo-grafico-ingreso' > Distribucion de ingresos </h4> 
        
        <div className='contenedor-imagen-ingreso'>

            <img 
            src={`data:image/png;base64,${imagen}`}
            alt="Descripción de la imagen"
            
            className="imagen-ingreso"
            />

        </div>

    
    </div>





    )


}
export default GraficoIngresos