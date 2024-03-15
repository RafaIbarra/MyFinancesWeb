import React, {useEffect, useState} from 'react';
import { Button, message, Steps, theme,Input, } from 'antd';
import { Navigate, useNavigate } from "react-router-dom";
import Generarpeticion from '../../peticiones/apipeticiones';
import './cambiopassword.css'
function CambioPassword(){
  const navigate=useNavigate()
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [correouser,setCorreouser]=useState('')
  const [cargacompleta,setCargacompleta]=useState(false)

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
        
        <p style={{height:'260px'}}  className='elementop' >Se enviara un correo a {correouser} el codigo de seguridad.</p>

            
       
      ),
    },
    {
      title: 'Carga Codigo',
      content: (
                <div style={{height:'260px'}}>
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
    setCurrent(current + 1);
  };
  const prev = () => {
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
    <div style={{width:'75%'}}>

      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </div>

  );
}
}
export default CambioPassword