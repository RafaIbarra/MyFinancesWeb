import React, {useEffect, useState} from 'react';
 
import { CheckOutlined  } from '@ant-design/icons';
import './indicesperiodos.css'

function IndicesPeriodos({datosperiodoindices,imagenperiodoindice}){
    const [imagenindice, setImagenindice] = useState(null);
    const [mayorsindicemes,setMayorsindicemes]=useState('')
    const [mayorsindiceingreso,setMayorsindiceingreso]=useState('')
    const [mayorindiceegreso,setMayorindiceegreso]=useState('')
    const [mayorindiceporcentajesaldo,setMayorindiceporcentajesaldo]=useState('')
    const [mayorindiceporcentajeegreso,setMayorindiceporcentajeegreso]=useState('')
    useEffect(() => {
        
        const cargardatos =  () => {
            
            
            
            console.log(datosperiodoindices)
            setImagenindice(imagenperiodoindice)
            setMayorsindicemes(datosperiodoindices.MesOperacion)
            setMayorsindiceingreso(datosperiodoindices.MontoIngreso)
            setMayorindiceegreso(datosperiodoindices.MontoEgreso)
            setMayorindiceporcentajesaldo(datosperiodoindices.PorcentajeSaldo)
            setMayorindiceporcentajeegreso(datosperiodoindices.PorcentajeEgreso)
  
            
          };
          
    
        cargardatos();
      }, []);

    return(
        <div className='contenedor-flex-estadistica-indice'>

            <div className='contenedor-estadistica-indice-texto'>
                <div className="contenedor-lista-indice">
                    <h6 className='titulodatos'>Datos del mes con Mayor indice no utilizado:</h6>
                    <p className="item"> <CheckOutlined></CheckOutlined> Mes: <strong><em>{`  ${(mayorsindicemes)}`}. </em></strong> </p>
                    <p className="item"> <CheckOutlined></CheckOutlined> Monto Ingreso: <strong><em>{` Gs. ${Number(mayorsindiceingreso).toLocaleString('es-ES')}`}. </em></strong> </p>
                    <p className="item"> <CheckOutlined></CheckOutlined> Monto Egreso: <strong><em>{` Gs. ${Number(mayorindiceegreso).toLocaleString('es-ES')}`}. </em></strong> </p>
                    <p className="item"> <CheckOutlined></CheckOutlined> Monto Saldo:  </p>
                    <p className="item"> <CheckOutlined></CheckOutlined> Indice del porcentaje NO utilizado del ingreso: <strong><em>{`  ${(mayorindiceporcentajesaldo)}% `}. </em></strong></p>
                    <p className="item"> <CheckOutlined></CheckOutlined> Indice utilizado del Ingresog: <strong><em>{`  ${(mayorindiceporcentajeegreso)}%`}. </em></strong></p>
                
                </div>
            </div>
            <div className='contenedor-imagen-indice'>

                <img 
                    src={`data:image/png;base64,${imagenindice}`}
                    alt="Descripción de la imagen"
                    className='imagen-saldos'
                />
            </div>
        </div>
    )

}

export default IndicesPeriodos