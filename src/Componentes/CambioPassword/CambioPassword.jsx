import React, {useEffect, useState} from 'react';
import { Button, message, Steps, theme,Input, } from 'antd';
import { Navigate, useNavigate } from "react-router-dom";
import Generarpeticion from '../../peticiones/apipeticiones';

import EnvioCorreo from './EnvioCorreo';
import DatosCodigo from './DatosCodigo';
import ProcesarCambio from './ProcesarCambio';

import '../../Componentes/estilosgenerales.css'
import './cambiopassword.css'
function CambioPassword(){
  const navigate=useNavigate()
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [correouser,setCorreouser]=useState('')
  const [cargacompleta,setCargacompleta]=useState(false)
  const [textoboton,setTextoboton]=useState('Enviar Correo')
  const [codigoseguridad,setCodigoseguridad]=useState(0)
  const [errorcodigo,setErrorcodigo]=useState(false)
  const [mensajecodigo,setMensajecodigo]=useState('')
  const [pass1,setPass1]=useState(0)
  const [pass2,setPass2]=useState(0)
  

  const contentStyle = {
    // lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  
  const enviar_correo = async () => {
        
    const datosregistrar = {};
    const endpoint='EnvioCorreoPassword/'
    const result = await Generarpeticion(endpoint, 'POST', datosregistrar);
    
    const respuesta=result['resp']
    if (respuesta === 200) {
      
      
    } else if(respuesta === 403 || respuesta === 401){
      
      navigate('/Closesesion')

    }
    return respuesta
 };

 const comprobar_codigo = async () => {
        
  const datosregistrar = {
    codigo:codigoseguridad

  };
  const endpoint='ComprobarCodigo/'
  const result = await Generarpeticion(endpoint, 'POST', datosregistrar);
  
  const respuesta=result['resp']
  if (respuesta === 200) {
    
    
  } else if(respuesta === 403 || respuesta === 401){
    
    navigate('/Closesesion')

  }else{
    setErrorcodigo(true)
    
    setMensajecodigo(result['data']['error'])
  }
  return respuesta
  };

  const cambiar_pass = async () => {
        
    const datosregistrar = {
      codigo:codigoseguridad,
      password:pass1,
      password2:pass2
  
    };
    const endpoint='ActualizarPassword/'
    const result = await Generarpeticion(endpoint, 'POST', datosregistrar);
    
    const respuesta=result['resp']
    if (respuesta === 200) {
      
      
    } else if(respuesta === 403 || respuesta === 401){
      
      navigate('/Closesesion')
  
    }
    return respuesta
    };
  

  const steps = [
    {
      title: 'Envio Correo',
      content: (
        
        <EnvioCorreo correouser={correouser} ></EnvioCorreo>
       
      ),
    },
    {
      title: 'Comprobar Codigo',
      content: (
          <DatosCodigo setCodigoseguridad={setCodigoseguridad} errorcodigo={errorcodigo} setErrorcodigo={setErrorcodigo} mensajecodigo={mensajecodigo}></DatosCodigo>


                
      ),
    },
    {
      title: 'Cambiar Contraseña',
      content: (
        <ProcesarCambio setPass1={setPass1} setPass2={setPass2}></ProcesarCambio>
      ),
    },
  ];

  const next = async () => {
    let pasar=0
    if((current + 1)===1){
      const valor_status=await enviar_correo()
      
      if(valor_status===200){
        setTextoboton('Comprobar Codigo')
        pasar=1
      }
    }
    if((current + 1)===2){
      const valor_control_cod=await comprobar_codigo()

      if(valor_control_cod===200){
        setTextoboton('Cambiar contraseña')
        pasar=1
      }
      
    }
    if((current + 1)===3){
      const valor_control_pass=await cambiar_pass()

      if(valor_control_pass===200){
        console.log('cambio de pass correcto')
        pasar=1
      }
      
    }
    if(pasar===1){
      if((current + 1)< 3){

        setCurrent(current + 1);
      }
    }
  };
  const prev = () => {
    if((current - 1)===0){
      setTextoboton('Enviar Correo')
    }

    if((current - 1)===1){
      setTextoboton('Comprobar Codigo')
    }
    if((current - 1)===2){
      
      setTextoboton('Cambiar contraseña')
    }
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));


  useEffect(() => {
        
    const cargardatos = async () => {
    
        const body = {};
        const endpoint='ObtenerDatosUsuario/'
        const result = await Generarpeticion(endpoint, 'POST', body);
        
        const respuesta=result['resp']
        
        if (respuesta === 200) {

            const registros=result['data']
            setCorreouser(result['data'][0].correo)
           
           setCargacompleta(true)
            
            
            
        }else if(respuesta === 403 || respuesta === 401){
          
          
          navigate('/Closesesion')

      }
        
        
      };
      

    cargardatos();
    
  }, []);

  if(cargacompleta){
  return (
    <div className='principal-cambio-password'>

      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        <div style={{paddingLeft:'33%'}}>

            {current < steps.length - 1 && (
              <Button className='botonera' type="primary" onClick={() => next()}>
                {textoboton}
              </Button>
            )}
            {current === steps.length - 1 && (
              // <Button className='botonera' type="primary" onClick={() => message.success('Processing complete!')}>
              <Button className='botonera' type="primary" onClick={() => next()}>
              
                {textoboton}
              </Button>
            )}
            {current > 0 && (
              <Button className='botonera'
                style={{
                  margin: '0 8px',
                }}
                onClick={() => prev()}
              >
                Anterior
              </Button>
            )}
        </div>



      </div>
    </div>

  );
}
}
export default CambioPassword