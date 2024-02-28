import React, {useEffect, useState} from 'react';


import './resumengrafico.css'
function Resumengrafico({dataresumen,imgresumen}){
    const [imagen, setImagen] = useState(null);
    const [mostrar,setMostrar]=useState(false)
    


    useEffect(() => {
        const cargardatos =()=>{
            
            setImagen(imgresumen);
                
           
            setMostrar(true)
        };
        cargardatos();
        
    }, [dataresumen]);
    
    
    if(mostrar){
     
        

        return(
            <div className='contenedor-principal-resumen'>
                <h4 className='titulo-grafico-resumen' > Relacion Ingreso-Egresos </h4> 
                
                <div className='contenedor-imagen-resumen'>
    
                    <img 
                    src={`data:image/png;base64,${imagen}`}
                    alt="Descripción de la imagen"
                    
                    className="imagen-resumen"
                    />
                </div>
            
          </div>
    
    
      
    
        )

    }  


}
export default Resumengrafico