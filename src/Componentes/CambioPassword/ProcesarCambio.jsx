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

function ProcesarCambio({setPass1,setPass2,accioncambio,setAccioncambio,respuestacambio,mensajecambio,passconfirm}){

  const [mostrarerrorpass,setMostrarerrorpass]=useState(false)
  const [mensajemostrarpass,setMensajemostrarpass]=useState('')
  const [mostrarconfirmacion,setMostrarconfirmacion]=useState(false)

  const contra1=(event)=>{
    const valor= event.target.value;
    
    setPass1(valor)
    setMostrarerrorpass(false)
    setMostrarconfirmacion(false)
    setAccioncambio(false)
    setMensajemostrarpass('')
    
    
  }

  const contra2=(event)=>{
    const valor2= event.target.value;
    
    setPass2(valor2)
    setMostrarerrorpass(false)
    setMostrarconfirmacion(false)
    setAccioncambio(false)
    setMensajemostrarpass('')
    
  }
  useEffect(() => {
        
    const cargardatos = () => {
      
      if(respuestacambio===200){

        setMostrarerrorpass(false)
        setMostrarconfirmacion(true)

      }else{

        setMostrarerrorpass(true)
        setMostrarconfirmacion(false)
        setMensajemostrarpass(mensajecambio)
      }
      };
      

    cargardatos();
  }, [accioncambio]);

  return(
      <div className='content-procesar'>
           
 
                      
        {!mostrarconfirmacion &&(
          <FormItem style={{paddingLeft:'33%'}} label="Ingrese Password"name="Ingrese Password">
              
              <div style={{width:'300px'}}>

              <Input
                  onChange={contra1}
                  type="password"
                  placeholder='Ingrese Password'
                  /> 
              </div>
              
          </FormItem>

        )
        }

        {!mostrarconfirmacion &&(
          <FormItem style={{paddingLeft:'33%'}} label="Repita Password"name="Repita Password">
              
              <div style={{width:'300px'}}>

              <Input
                  onChange={contra2}
                  type="password"
                  placeholder='Repita Password'
                  /> 
              </div>
              
          </FormItem>
        )
        }


          {mostrarerrorpass &&(  <p style={{color:'red',fontWeight:'bold',fontStyle:'italic'}}> {mensajemostrarpass} </p>)}
          {mostrarconfirmacion &&(
              <Result
              status="success"
              title="Cambio Contraseña!"
              subTitle="Se ha realizado correctamente el cambio de contraseña."
              style={{padding:'0px'}}
             
            />
          )}

                      
                
      </div>
    )

  }
export default ProcesarCambio