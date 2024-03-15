import React, {useEffect, useState} from 'react';
import { Button, message, Steps, theme,Input, } from 'antd';
import { Navigate, useNavigate } from "react-router-dom";
import Generarpeticion from '../../peticiones/apipeticiones';

import EnvioCorreo from './enviocorreo';

import '../../Componentes/estilosgenerales.css'
import './cambiopassword.css'
function CambioPassword(){
  const navigate=useNavigate()
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [correouser,setCorreouser]=useState('')
  const [cargacompleta,setCargacompleta]=useState(false)
  const [textoboton,setTextoboton]=useState('Enviar Correo')

  const contentStyle = {
    // lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  
  

  const steps = [
    {
      title: 'Envio Correo',
      content: (
        
        <EnvioCorreo correouser={correouser}></EnvioCorreo>
       
      ),
    },
    {
      title: 'Carga Codigo',
      content: (
                <div className='content-codigo'>
                    <Input 
                        placeholder="Codigo Seguridad"
                        name='CodigoSeguridad'
                        key='CodigoSeguridad'
                            
                    />

                    <Input 
                        placeholder="Codigo Seguridad"
                        name='CodigoSeguridad'
                        key='CodigoSeguridad'
                            
                    />

                </div>


                
      ),
    },
    {
      title: 'Finalizacion',
      content: 'Last-content',
    },
  ];

  const next = () => {
    
    if((current + 1)===1){
      setTextoboton('Comprobar Codigo')
    }
    if((current + 1)===2){
      console.log('Cambiar contraseña')
      setTextoboton('Cambiar contraseña')
    }

    setCurrent(current + 1);
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
              <Button className='botonera' type="primary" onClick={() => message.success('Processing complete!')}>
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