import React, {useEffect, useState} from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import Generarpeticion from '../../../peticiones/apipeticiones';

function EstadisticasGasto(){
    const navigate=useNavigate()
    useEffect(() => {
        
        const cargardatos = async () => {
        
            const body = {};
            const endpoint='EstadisticasEgresos/0/0/'
            const result = await Generarpeticion(endpoint, 'POST', body);
            
            const respuesta=result['resp']
            
            if (respuesta === 200) {

                const registros=result['data']
                
                
                
                console.log(registros)
                
                
            }else if(respuesta === 403 || respuesta === 401){
              
              
              navigate('/Closesesion')

          }
            
            
          };
          
    
        cargardatos();
      }, []);

    return(
        <div>
            ESTADISTICAS EGRESOS
        </div>
    )


}

export default EstadisticasGasto