import React, {useEffect, useState} from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import Generarpeticion from '../../../peticiones/apipeticiones';
import Handelstorage from '../../../Storage/handelstorage';
import EstadisticasCabecera from '../EstaditicasCabecera';
import SaldosPeriodos from './SaldosPeriodos/SaldosPeriodos';
import IndicesPeriodos from './IndicesPeriodos/IndicesPeriodos';

import AguardandoRespuesta from '../../AguardandoRespuesta/AguardandoRespuesta';
import {  Divider } from 'antd'
import './estadisticaingreso.css'
function EstadisticasIngreso(){
    const navigate=useNavigate()
    const [imagen, setImagen] = useState(null);

    const [datosperiodosaldos,setDatosperiodosaldos]=useState(0)
    const [imagenperiodosaldos,setImagenperiodosaldos]=useState('')
    const [datosperiodoindices,setDatosperiodoindices]=useState(0)
    const [imagenperiodoindice,setImagenperiodoindice]=useState('')
    const [cargarestadisticasingreso,setCargarestadisticasingreso]=useState(false)
    const [cargacompleta,setCargacompleta]=useState(false)
    
    const [titulocabecera,setTitulocabecera]=useState('ESTADISTICAS DE SALDOS E INGRESOS')
    const [peticionresuelta,setPeticionresuelta]=useState(false)
    useEffect(() => {
        
        const cargardatos = async () => {
            const datestorage=Handelstorage('obtenerstats');
            
            const anno_stats=datestorage['dataanno']
            setPeticionresuelta(true)
            const body = {};
            const endpoint='EstadisticasIngresos/'+anno_stats+'/0/'
            const result = await Generarpeticion(endpoint, 'POST', body);
            
            const respuesta=result['resp']
            
            if (respuesta === 200) {
                // -----DATOS PARA PERIODOS MAXIMOS---
                
                
                if(result['data']['DatosPeriodoSaldo'] !== null){
                    setDatosperiodosaldos(result['data']['DatosPeriodoSaldo'][0]['MayorSaldo'][0])
                    setDatosperiodoindices(result['data']['DatosPeriodoSaldo'][1]['MayorIndice'][0])
                    setImagenperiodosaldos(result['data']['DatosPeriodoSaldo'][2]['grafico'])
                    setImagenperiodoindice(result['data']['DatosPeriodoSaldo'][3]['graficoindice'])
                }else{
                    setDatosperiodosaldos({
                        MesOperacion:'',
                        MontoIngreso:0,
                        MontoEgreso:0,
                        PorcentajeSaldo:'0.0',
                        PorcentajeEgreso:'0.0',
                        Saldo:0

                    })
                    setImagenperiodosaldos('')

                    setDatosperiodoindices({
                        MesOperacion:'',
                        MontoIngreso:0,
                        MontoEgreso:0,
                        PorcentajeSaldo:'0.0',
                        PorcentajeEgreso:'0.0',
                        Saldo:0,
                        PromedioInidice:'0.0'

                    })
                    setImagenperiodoindice('')
                }
                
                
                setCargarestadisticasingreso(true)
                setCargacompleta(true)
                setPeticionresuelta(false)
                
            }else if(respuesta === 403 || respuesta === 401){
              
              
              navigate('/Closesesion')

          }
            
            
          };
          
    
        cargardatos();
      }, [cargarestadisticasingreso]);

    return(


          <div className='principal-estadistica-ingreso'>
            
            <EstadisticasCabecera 
            cargarestadisticas={cargarestadisticasingreso}
            setCargarestadisticas={setCargarestadisticasingreso} 
            
            titulocabecera={titulocabecera}

            ></EstadisticasCabecera>

            <Divider dashed  orientation="left" plain style={{fontSize:'15px',fontWeight: 'bold', fontStyle: 'italic'}}> 
            Saldos por periodos</Divider>

            {!peticionresuelta && cargacompleta &&(<SaldosPeriodos datosperiodosaldos={datosperiodosaldos} imagenperiodosaldos={imagenperiodosaldos} ></SaldosPeriodos>
            )}


            <Divider dashed  orientation="left" plain style={{fontSize:'15px',fontWeight: 'bold', fontStyle: 'italic'}}> 
            Indices por periodos</Divider>

            {!peticionresuelta && cargacompleta &&(<IndicesPeriodos datosperiodoindices={datosperiodoindices} imagenperiodoindice={imagenperiodoindice}  ></IndicesPeriodos>
            )}

          
            

            {peticionresuelta &&(
                <AguardandoRespuesta></AguardandoRespuesta>
            )
            }

        </div>
       
    )
}
export default EstadisticasIngreso

