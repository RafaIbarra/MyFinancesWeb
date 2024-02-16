import React, {useEffect, useState} from 'react';
import Generarpeticion from '../../../peticiones/apipeticiones';
import Handelstorage from '../../../Storage/handelstorage';
import {Button,InputNumber,Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import './cabecera.css'

function HomeCabecera ({cargarresumen,setCargarresumen,cargaringresos,setCargaringresos,cargaregresos,setCargarEgresos}){

    console.log("Cabecera")

    const[meses,Setmeses]=useState(null)
    const[mesdefault,setMesdefault]=useState('')
    const[anno,Setanno]=useState(0)
    
    const[mes_seleccion,setMes_selecion]=useState(0)
    const[anno_seleccion,setAnno_selecion]=useState(0)
    const[terminacarga,setTerminacarga]=useState(false)



    const seleccionarmes=(value)=>{
      
        setMes_selecion(value)
  
      }
  
    const seleccionaranno=(value)=>{
        
        setAnno_selecion(value)
  
    }
    const procesar =  ()=>{
        let mes_tomar=0
        let anno_tomar=0
        let datames=0
        let dataanno=0
        
        const datestorage=Handelstorage('obtenerdate');
        const mes_storage=datestorage['datames']
        const anno_storage=datestorage['dataanno']
  
        if (mes_seleccion>0){
          mes_tomar=mes_seleccion
          if (mes_seleccion !==mes_storage){
            datames=mes_seleccion
          }
  
  
        }else{
          mes_tomar=mes_storage
        }
  
        if(anno_seleccion >0){
          anno_tomar=anno_seleccion
  
          if(anno_seleccion !==anno_storage){
            dataanno=anno_seleccion
          }
        }else{
          anno_tomar=anno_storage
        }
      
        if (datames>0){
            Handelstorage('actualizardate','datames',datames)
        }
        if (dataanno>0){
            Handelstorage('actualizardate','dataanno',dataanno)
        }
        
        setCargarresumen(!cargarresumen)
        setCargaringresos(!cargaringresos)
        setCargarEgresos(!cargaregresos)
  
        
        
      }

    useEffect(() => {
        const datestorage=Handelstorage('obtenerdate');
        const mes_inicio=datestorage['datames']
        const anno_control=datestorage['dataanno']
        Setanno(anno_control)
        const cargardatos = async () => {

          
    
          const body = {};
          const endpoint='Meses/'
          const result = await Generarpeticion(endpoint, 'POST', body);
          
          const respuesta=result['resp']
          if (respuesta === 200) {
              const registros=result['data']
              Setmeses(registros)
            
              const listamesactual=registros.filter((m) => m.numero_mes === mes_inicio);  
              
              setMesdefault(listamesactual[0]['nombre_mes'])
              setTerminacarga(true)
              
          }
          
        };
        cargardatos()
      }, []);

      if(terminacarga){
        return(
        
            <div className='contenedor-flex'>
    
    
                      
                      <FormItem label="Año">
    
                        <InputNumber
                                
                                defaultValue={anno}
                                onChange={seleccionaranno}
                                style={{
                                width: '100%',
                                }}
                            />
                      </FormItem>
    
                      <FormItem label="Mes">
    
                        <Select
                          style={{ width: 200 }}
                          defaultValue={mesdefault}
                          
                          onChange={seleccionarmes}
                        >
                            
                              {meses &&  meses.map((g) => (
                                  <option key={g.numero_mes} value={g.numero_mes}>
                                      {g.nombre_mes}
                                  </option>
                              ))}
                        </Select>
                      </FormItem>
                      
                      <Button type="primary" onClick={procesar}>Cargar Datos</Button>
                       
    
    
                    
            </div>
    
            
            
        )
      } 

}

export default HomeCabecera