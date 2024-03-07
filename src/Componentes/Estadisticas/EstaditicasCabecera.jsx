import React, {useEffect, useState} from 'react';
import Handelstorage from '../../Storage/handelstorage';
import {Button,InputNumber,Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import './estadisticacabecera.css'
function EstadisticasCabecera({cargarestadisticas,setCargarestadisticas,setSpindato}){
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
  
        
  
        
  
        if(anno_seleccion !==anno_storage){
        dataanno=anno_seleccion
        }
        
      
        
        
        Handelstorage('actualizarstats','dataanno',dataanno)
        
        
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
          
          
      )
                    }

}
export default EstadisticasCabecera