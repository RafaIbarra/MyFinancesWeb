import React, {useEffect, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input,DatePicker } from 'antd'
import { FileSyncOutlined   } from '@ant-design/icons';
import Generarpeticion from '../../peticiones/apipeticiones';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import './actualizaciondatospersonales.css'
import '../../Componentes/estilosgenerales.css'
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

const validateMessages = {
    required: '${label} es requerido!',
    types: {
      email: '${label} no es email valido!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  }

const tamañoobjeto=250
const onFinish = (values) => {
    console.log(values);
  };
function ActualizacionDatosPersonales(){
    const navigate=useNavigate()
    const { MonthPicker, RangePicker } = DatePicker;
    dayjs.extend(customParseFormat);
    const dateFormat = 'YYYY-MM-DD';
    const [nombre,setNombre]=useState('')
    const [apellido,setApellido]=useState('')
    const [fechanac,setFechanac]=useState('')
    const [username,setUsername]=useState('')
    const [correo,setCorreo]=useState('')
    const [password,setPassword]=useState('')
    const[valoresdefaultdatos,setValoresdefaultdatos]=useState([])
    const [cargacompleta,setCargacompleta]=useState(false)
    const ver=()=>{
        console.log(valoresdefaultdatos.id)

    }
    const cargarnombre=(event)=>{
        setNombre(event.target.value)

        }

    const cargarapellido=(event)=>{
        setApellido(event.target.value) 

        }

    const seleccionfecha=(date, dateString)=> {
        
        setFechanac(dateString)
      }

    const cargaruser=(event)=>{

        setUsername(event.target.value)

    
    }
    const cargarcorreo=(valeventue)=>{

        setCorreo(event.target.value)

        }
    const cargarcontrasena = (event) => {
            setPassword(event.target.value);
        };


    useEffect(() => {
        
            const cargardatos = async () => {
            
                const body = {};
                const endpoint='ObtenerDatosUsuario/'
                const result = await Generarpeticion(endpoint, 'POST', body);
                
                const respuesta=result['resp']
                
                if (respuesta === 200) {
    
                    const registros=result['data']
                    
                   console.log(result['data'][0])
                   setValoresdefaultdatos(result['data'][0])
                   setCargacompleta(true)
                    
                    
                    
                }else if(respuesta === 403 || respuesta === 401){
                  
                  
                  navigate('/Closesesion')
    
              }
                
                
              };
              
        
            cargardatos();
            
          }, []);



    if(cargacompleta){

        return(
            <div className='contenedor-principal-act'>
                <div className='contenedor-registro-box '>
                <Form 
                        {...layout}
                        name="nest-messages"
                        variant="filled"
                        onFinish={onFinish}
                        style={{
                        Width: 400,
                        padding:'0px'
                        // ,backgroundColor:'rgb(0,0,0)'
                        
                        }}
                        validateMessages={validateMessages}
                    >
    
                        <div style={{paddingTop:'5px',paddingBottom:'25px'}}>
    
                            <h4> <FileSyncOutlined style={{color:'red',paddingLeft:'25%'}} /> Actualizacion Datos</h4>
                            <div className="linea-vertical"></div>
                        </div>
                        <Form.Item
                            name={['user', 'Nombre']}
                            label="Nombres: "
                            
                            rules={[
                                {
                                required: true,
                                },
                            ]}
                        >
                            <Input  placeholder="Nombre" 
                                    defaultValue={valoresdefaultdatos.nombre_usuario} 
                                    onChange={cargarnombre}
                                    
                                    style={{width:tamañoobjeto}}
                            />
                            
    
                        </Form.Item>
    
                        <Form.Item
                            name={['user', 'Apellido']}
                            label="Apellido"
                            rules={[
                                {
                                required: true,
                                },
                            ]}
                        >
                            <Input placeholder="Apellido" onChange={cargarapellido} style={{width:tamañoobjeto}} />
    
                        </Form.Item>
    
                        <Form.Item
                               label="Fecha Nacimiento"
                               name="DatePicker"
                               rules={[
                                   {
                                   required: true,
                                   message: 'Favor seleccione la fecha!',
                                   },
                               ]}
                               >
                               <DatePicker 
                                    placeholder='Fecha Nacimiento' 
                                    dateFormat="yyyy-MM-dd"
                                    onChange={seleccionfecha}
                                    // disabled={modoedicion}
                                    // defaultValue={ modoactualizacion ?  dayjs(valoresdefault[0]['fecha_gasto'], dateFormat) : ''} 
                                    format={dateFormat} 
                                    style={{width:tamañoobjeto}}
                                    
                                    />
                           </Form.Item>
    
    
    
                        <Form.Item
                            name={['user', 'UserName']}
                            label="User Name"
                            rules={[
                                {
                                required: true,
                                },
                            ]}
                        >
                            <Input placeholder="User Name" onChange={cargaruser} style={{width:tamañoobjeto}}/>
    
                        </Form.Item>
    
                        <Form.Item
                            name={['user', 'email']}
                            label="Email"
                            rules={[
                                {
                                type: 'email',
                                },
                            ]}
                        >
                            <Input placeholder="nombre@correo.com" onChange={cargarcorreo} style={{width:tamañoobjeto}}/>
                        </Form.Item>
    
                        
                        
                       
    
                        <div className="contenedor-flex ">
    
                           <Button type="primary" 
                           className='botonera'
                           > Actualizar Datos</Button>
    
                            <Button type="primary" 
                           className='botonera'
                           onClick={ver}
                           > Cancelar</Button>
                        </div>
                            
    
                        
                        
                    </Form>
    
                </div>
    
            </div>
        )
    }
}

export default ActualizacionDatosPersonales
