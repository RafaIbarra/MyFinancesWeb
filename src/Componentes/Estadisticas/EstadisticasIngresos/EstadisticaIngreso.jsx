import React, {useEffect, useState} from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import Generarpeticion from '../../../peticiones/apipeticiones';
import Handelstorage from '../../../Storage/handelstorage';
function EstadisticasIngreso(){
    const navigate=useNavigate()
    const [imagen, setImagen] = useState(null);
    const [cargarestadisticasingreso,setCargarestadisticasingreso]=useState(false)
    useEffect(() => {
        
        const cargardatos = async () => {
            const datestorage=Handelstorage('obtenerstats');
            
            const anno_stats=datestorage['dataanno']
            
            const body = {};
            const endpoint='EstadisticasIngresos/'+anno_stats+'/0/'
            const result = await Generarpeticion(endpoint, 'POST', body);
            
            const respuesta=result['resp']
            
            if (respuesta === 200) {
                // -----DATOS PARA PERIODOS MAXIMOS---
                console.log(result['data'])
                setImagen(result['data']['DatosPeriodoSaldo'][2].grafico)
                setCargarestadisticasingreso(true)
                
            }else if(respuesta === 403 || respuesta === 401){
              
              
              navigate('/Closesesion')

          }
            
            
          };
          
    
        cargardatos();
      }, [cargarestadisticasingreso]);

    return(
        
            <img 
                src={`data:image/png;base64,${imagen}`}
                alt="Descripción de la imagen"
                style={{marginLeft:'100px'}}
                />
       
    )
}
export default EstadisticasIngreso