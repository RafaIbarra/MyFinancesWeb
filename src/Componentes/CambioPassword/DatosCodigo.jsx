import React, {useEffect, useState} from 'react';
import {Input,Typography} from 'antd';
import FormItem from 'antd/es/form/FormItem';
import './cambiopassword.css'
const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };
const { Text } = Typography;
function DatosCodigo({setCodigoseguridad,errorcodigo,setErrorcodigo,mensajecodigo}){

  const [mostrarerror,setMostrarerror]=useState(false)
  const [mensajemostrar,setMensajemostrar]=useState('')

  const codigosel=(event)=>{
    const valor= event.target.value;
    setMostrarerror(false)
    setErrorcodigo(false)
    setMensajemostrar('')
    setCodigoseguridad(valor)
    
  }

  useEffect(() => {
        
    const cargardatos = () => {
        
      setMostrarerror(errorcodigo)
      setMensajemostrar(mensajecodigo)
      };
      

    cargardatos();
  }, [errorcodigo]);




  return(
      <div className='content-codigo'>
           
 
                      
            <FormItem style={{paddingLeft:'33%'}} label="Cod Seguridad"name="Cod Seguridad">
                
                <div style={{width:'300px'}}>

                <Input
                    onChange={codigosel}
                    placeholder='Codigo Seguridad'
                    /> 
                </div>
                
            </FormItem>
          {mostrarerror &&(  <p style={{color:'red',fontWeight:'bold',fontStyle:'italic'}}> {mensajemostrar} </p>)}
                      
                
      </div>
    )

  }
export default DatosCodigo