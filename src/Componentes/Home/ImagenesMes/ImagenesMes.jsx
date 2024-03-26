import React, {useEffect, useState} from 'react';
import Handelstorage from '../../../Storage/handelstorage';
import Generarpeticion from '../../../peticiones/apipeticiones';
import { Navigate, useNavigate } from "react-router-dom";
import {  Divider,Spin } from 'antd'
import { SyncOutlined } from '@ant-design/icons';
import './imagenesmes.css'
function ImagenesMes({pedidoestadistica}){
    const navigate=useNavigate()
    const [imgresumen,setImgresumen]=useState([])
    const [imgingreso,setImgingreso]=useState([])
    const [imgegreso,setImgegreso]=useState([])
    const [cargaculminada,setCargaculminada]=useState(false)
    
    useEffect(() => {

        const datestorage=Handelstorage('obtenerdate');
        const mes_storage=datestorage['datames']
        const anno_storage=datestorage['dataanno']
        
        setCargaculminada(false)
        const cargardatos = async () => {
            
          const body = {};
          const endpoint='EstadisticasMes/' + anno_storage +'/' + mes_storage + '/'
          const result = await Generarpeticion(endpoint, 'POST', body);
          
          const respuesta=result['resp']
          if (respuesta === 200) {
              
              const registros=result['data']
              
              setImgresumen(registros[0].imgResumen)
              setImgingreso(registros[0].imgIngresos)
              setImgegreso(registros[0].imgEgresos)
              setCargaculminada(true)
              
          }else if(respuesta === 403 || respuesta === 401){
            
            navigate('/Closesesion')
  
        }
          
        };
        cargardatos()
        
      }, [pedidoestadistica]);

    
    return(
        <div className='principal-container-home-imagenes'>
            {cargaculminada &&(

                <div>
                    <Divider dashed  orientation="left" plain style={{fontSize:'15px',fontWeight: 'bold', fontStyle: 'italic',backgroundColor:'rgb(238, 236, 235,0.3)'}}> 
                    Relacion Ingreso - Egreso</Divider>
                    <div className='imagen-home'>
                        <img 
                                src={`data:image/png;base64,${imgresumen}`}
                                alt="Descripción de la imagen"
                                
                            />
                    </div>
                </div>
            )}

            {cargaculminada &&(

                <div>
                    <Divider dashed  orientation="left" plain style={{fontSize:'15px',fontWeight: 'bold', fontStyle: 'italic',backgroundColor:'rgb(238, 236, 235,0.3)'}}> 
                    Distribucion de Ingresos</Divider>
                    <div className='imagen-home'>
                        <img 
                                src={`data:image/png;base64,${imgingreso}`}
                                alt="Descripción de la imagen"
                                
                            />
                    </div>
                </div>
            )}
            {cargaculminada &&(

            <div >
                <Divider dashed  orientation="left" plain style={{fontSize:'15px',fontWeight: 'bold', fontStyle: 'italic',backgroundColor:'rgb(238, 236, 235,0.3)'}}> 
                Distribucion de Gastos</Divider>
                <div className='imagen-home'>
                    <img 
                            src={`data:image/png;base64,${imgegreso}`}
                            alt="Descripción de la imagen"
                            
                        />
                </div>
            </div>
            )}
            {!cargaculminada &&(
                 <div className='componente-espara'> 
                 <Spin style={{paddingLeft:'50%',paddingTop:'20%'}}
                     
                     indicator={
                       <SyncOutlined
                         style={{
                           fontSize: 100,
          
                          color:'Highlight',
                           fontWeight:'bold'
                           ,
                         }}
                         spin
                       />
                     }
                   />
                  
               </div>
  
            )

            }
        </div>
    )
}

export default ImagenesMes