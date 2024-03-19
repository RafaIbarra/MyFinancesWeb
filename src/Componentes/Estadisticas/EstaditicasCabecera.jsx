import React, {useEffect, useState} from 'react';
import Handelstorage from '../../Storage/handelstorage';
import {Button,InputNumber,Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { RiseOutlined,FallOutlined  } from '@ant-design/icons';
import './estadisticacabecera.css'
function EstadisticasCabecera({cargarestadisticas,setCargarestadisticas,setSpindato,titulocabecera}){
    const[anno,Setanno]=useState(0)
    const[anno_seleccion,setAnno_selecion]=useState(0)
    const[terminacarga,setTerminacarga]=useState(false)

    const seleccionaranno=(value)=>{
        
        setAnno_selecion(value)
  
    }

    const procesar =  ()=>{
        
        let anno_tomar=0
        
        let dataanno=0
        
        const datestorage=Handelstorage('obtenerstats');
        
        const anno_storage=datestorage['dataanno']
  
        
  
        
      if(anno_seleccion>0){

        if(anno_seleccion !==anno_storage){
        dataanno=anno_seleccion
        }  
        Handelstorage('actualizarstats','dataanno',dataanno)
      }
        
        
        setCargarestadisticas(!cargarestadisticas)
        setSpindato(true)
      }
    
    useEffect(() => {
        
        const datestorage=Handelstorage('obtenerstats');
        
        const anno_control=datestorage['dataanno']
        
        Setanno(anno_control)
        const cargardatos = async () => {

            setTerminacarga(true)
          
          
        };
        cargardatos()
      }, []);


    if(terminacarga){return(
        <div>
            <div className='contenedor-titulo'> 

              {titulocabecera==='ESTADISTICAS DE GASTOS' &&(
                  <h5 style={{paddingLeft:'10px',paddingTop:'10px'}}> <FallOutlined style={{color:'red'}} /> {titulocabecera}</h5>
              )
              }  
              {titulocabecera!=='ESTADISTICAS DE GASTOS' &&(
                  <h5 style={{paddingLeft:'10px',paddingTop:'10px'}}> <RiseOutlined style={{color:'red'}} /> {titulocabecera}</h5>
              )
              } 
              
              <div className='contenedor-flex-cabecera'>
                  <FormItem label="Año" style={{marginBottom:'0px'}}>

                    <InputNumber
                            
                            defaultValue={anno}
                            onChange={seleccionaranno}
                            style={{
                            width: '100%',
                            marginBottom:'0px'
                            }}
                        />
                  </FormItem>
                  <Button type="primary" onClick={procesar} style={{marginBottom:'0px'}}>Cargar Datos</Button>    
              </div>

              
            </div>
                <div className="linea-vertical"></div>


          

        </div>
          
          
      )
                    }

}
export default EstadisticasCabecera