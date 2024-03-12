import React, {useEffect, useState} from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import Generarpeticion from '../../../peticiones/apipeticiones';
import Handelstorage from '../../../Storage/handelstorage';
import EstadisticasCabecera from '../EstaditicasCabecera';
import SaldosPeriodos from './SaldosPeriodos/SaldosPeriodos';
import IndicesPeriodos from './IndicesPeriodos/IndicesPeriodos';
import Cargadatos from '../../Home/Cargadatos';
import {  Divider } from 'antd'

function EstadisticasIngreso(){
    const navigate=useNavigate()
    const [imagen, setImagen] = useState(null);

    const [datosperiodosaldos,setDatosperiodosaldos]=useState([])
    const [imagenperiodosaldos,setImagenperiodosaldos]=useState([])
    const [datosperiodoindices,setDatosperiodoindices]=useState([])

    const [cargarestadisticasingreso,setCargarestadisticasingreso]=useState(false)
    const [cargacompleta,setCargacompleta]=useState(false)
    const [spindatos,setSpindato]=useState(false)
    const [titulocabecera,setTitulocabecera]=useState('ESTADISTICAS DE SALDOS E INGRESOS')
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
                
                
                // console.log(result['data'])
                // console.log('fdfdf')
                setDatosperiodosaldos(result['data']['DatosPeriodoSaldo'][0]['MayorSaldo'][0])
                setDatosperiodoindices(result['data']['DatosPeriodoSaldo'][1]['MayorIndice'][0])
                setImagenperiodosaldos(result['data']['DatosPeriodoSaldo'][2]['grafico'])
                
                setCargarestadisticasingreso(true)
                setCargacompleta(true)
                
            }else if(respuesta === 403 || respuesta === 401){
              
              
              navigate('/Closesesion')

          }
            
            
          };
          
    
        cargardatos();
      }, [cargarestadisticasingreso]);

    return(
        
            // <img 
            //     src={`data:image/png;base64,${imagen}`}
            //     alt="Descripción de la imagen"
            //     style={{marginLeft:'100px'}}
            //     />

          <div style={{width:'100%',backgroundColor:'rgb(244, 246, 248)'}}>
            
            <EstadisticasCabecera 
            cargarestadisticas={cargarestadisticasingreso}
            setCargarestadisticas={setCargarestadisticasingreso} 
            setSpindato={setSpindato}
            titulocabecera={titulocabecera}

            ></EstadisticasCabecera>

            <Divider dashed  orientation="left" plain style={{fontSize:'15px',fontWeight: 'bold', fontStyle: 'italic'}}> 
            Saldos por periodos</Divider>

            {!spindatos && cargacompleta &&(<SaldosPeriodos datosperiodosaldos={datosperiodosaldos} imagenperiodosaldos={imagenperiodosaldos} ></SaldosPeriodos>
            )}


            <Divider dashed  orientation="left" plain style={{fontSize:'15px',fontWeight: 'bold', fontStyle: 'italic'}}> 
            Indices por periodos</Divider>

            {!spindatos && cargacompleta &&(<IndicesPeriodos datosperiodoindices={datosperiodoindices}  ></IndicesPeriodos>
            )}

           

           



            {spindatos &&(
                <Cargadatos setSpindato={setSpindato}></Cargadatos>
              )
    
              }
        </div>
       
    )
}
export default EstadisticasIngreso

