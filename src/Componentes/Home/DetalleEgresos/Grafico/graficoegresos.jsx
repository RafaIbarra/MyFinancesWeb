import React, {useEffect, useState} from 'react';

import './graficoegresos.css'
function GraficoEgresoso({dataegresos,imgegresos}){
    const [imagen, setImagen] = useState(null);
    
   
      
    useEffect(() => {
        const cargardatos =()=>{
            
            setImagen(imgegresos)
            
        };
        cargardatos();
        
    }, [dataegresos]);
    

    return(
    <div className='contenedor_principal-egreso'>
        <h4 className='titulo-grafico-egreso' > Distribucion de Gastos </h4> 
        

        <div className='contenedor-imagen-egreso'>

            <img 
            src={`data:image/png;base64,${imagen}`}
            alt="Descripción de la imagen"
            
            className="imagen-egreso"
            />
        </div>
    
    </div>




    )


}
export default GraficoEgresoso