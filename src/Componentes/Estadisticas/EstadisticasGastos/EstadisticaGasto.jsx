import React, {useEffect, useState} from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import Generarpeticion from '../../../peticiones/apipeticiones';
import PeriodosMaximos from './PeriodosMaximos/PeriodosMaximos';
function EstadisticasGasto(){
    const navigate=useNavigate()
    const [imagen15, setImagen15] = useState(null);
    const [datosperiodomaximos,setDatosperiodomaximos]=useState([])
    const [cargacompleta,setCargacompleta]=useState(false)
    useEffect(() => {
        
        const cargardatos = async () => {
        
            const body = {};
            const endpoint='EstadisticasEgresos/0/0/'
            const result = await Generarpeticion(endpoint, 'POST', body);
            
            const respuesta=result['resp']
            
            if (respuesta === 200) {
                // -----DATOS PARA PERIODOS MAXIMOS---
                const datosperiodo=result['data']['DatosPeriodoGasto']
                const img=datosperiodo[0]['DatosMaximoGasto'][0]['grafico']
                const periodo=datosperiodo[0]['DatosMaximoGasto'][0]['Periodo']
                const promedio=datosperiodo[0]['DatosMaximoGasto'][0]['PromedioGasto']
                const monto=datosperiodo[0]['DatosMaximoGasto'][0]['SumaMonto']
                const cantidad=datosperiodo[0]['DatosMaximoGasto'][0]['CantidadRegistros']
                const cantidadper=datosperiodo[0]['DatosMaximoGasto'][0]['CantidadPeriodos']
                const datos={periodo:periodo,promedio:promedio,monto:monto,cantidad:cantidad,cantidadper:cantidadper,imagen:img}
                setDatosperiodomaximos(datos)

                // -----DATOS PARA 15 dias---
                // console.log(result['data'])
                // console.log(result['data']['DataComportamientoGasto'][2]['grafico'])
                setImagen15(result['data']['DataComportamientoGasto'][2]['grafico'])





                setCargacompleta(true)

                
            }else if(respuesta === 403 || respuesta === 401){
              
              
              navigate('/Closesesion')

          }
            
            
          };
          
    
        cargardatos();
      }, []);

    return(
        <div>
            {cargacompleta &&(
            <img 
                    src={`data:image/png;base64,${imagen15}`}
                    alt="Descripción de la imagen"
                    className='imagen-periodo'
                />)}

            {cargacompleta &&(<PeriodosMaximos datosperiodomaximos={datosperiodomaximos}></PeriodosMaximos>)}
           
        </div>
    )


}

export default EstadisticasGasto