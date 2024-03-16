import React, {useEffect, useState} from 'react';
import {Input,Typography,Result } from 'antd';
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

function ProcesarCambio({setPass1,setPass2,errorcambio,setErrorcambio,mensajecambio,passconfirm}){

  const [mostrarerrorpass,setMostrarerrorpass]=useState(false)
  const [mensajemostrarpass,setMensajemostrarpass]=useState('')

  const contra1=(event)=>{
    const valor= event.target.value;
    
    setPass1(valor)
    setMostrarerrorpass(false)
    setErrorcambio(false)
    setMensajemostrarpass('')
    
    
  }

  const contra2=(event)=>{
    const valor2= event.target.value;
    
    setPass2(valor2)
    setMostrarerrorpass(false)
    setErrorcambio(false)
    setMensajemostrarpass('')
    
  }
  useEffect(() => {
        
    const cargardatos = () => {
      console.log(mensajecambio)
      setMostrarerrorpass(errorcambio)
      setMensajemostrarpass(mensajecambio)
      };
      

    cargardatos();
  }, [errorcambio,passconfirm]);

  return(
      <div className='content-procesar'>
           
 
                      
          <FormItem style={{paddingLeft:'33%'}} label="Ingrese Password"name="Ingrese Password">
              
              <div style={{width:'300px'}}>

              <Input
                  onChange={contra1}
                  type="password"
                  placeholder='Ingrese Password'
                  /> 
              </div>
              
          </FormItem>

          <FormItem style={{paddingLeft:'33%'}} label="Repita Password"name="Repita Password">
              
              <div style={{width:'300px'}}>

              <Input
                  onChange={contra2}
                  type="password"
                  placeholder='Repita Password'
                  /> 
              </div>
              
          </FormItem>
          {mostrarerrorpass &&(  <p style={{color:'red',fontWeight:'bold',fontStyle:'italic'}}> {mensajemostrarpass} </p>)}
          {passconfirm &&(
              <Result
              status="success"
              title="Cambio Contraseña!"
              subTitle="Se ha realizado correctamente el cambio de contraseña."
             
            />
          )}

                      
                
      </div>
    )

  }
export default ProcesarCambio