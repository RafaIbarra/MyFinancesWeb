import React, {useEffect, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Form, Input,DatePicker,message  } from 'antd'
import { FileSyncOutlined   } from '@ant-design/icons';

import Generarpeticion from '../../peticiones/apipeticiones';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import './actualizaciondatospersonales.css'
import '../../Componentes/estilosgenerales.css'
import Cargadatos from '../Home/Cargadatos';
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


function ActualizacionDatosPersonales(){
    const [messageApi, contextHolder] = message.useMessage();
    const navigate=useNavigate()
    const { MonthPicker, RangePicker } = DatePicker;
    dayjs.extend(customParseFormat);
    const dateFormat = 'YYYY-MM-DD';
    const [nombre,setNombre]=useState('')
    const [apellido,setApellido]=useState('')
    const [fechanac,setFechanac]=useState('')
    const [username,setUsername]=useState('')
    const [correo,setCorreo]=useState('')
    
    const[valoresdefaultdatos,setValoresdefaultdatos]=useState([])
    const [cargacompleta,setCargacompleta]=useState(false)
    const[spindatos,setSpindato]=useState(false)
    
    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'Registro de usuario Actualizado',
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
          duration: 5,
        });
      };
    
    const error = () => {
        messageApi.open({
          type: 'error',
          content: 'No se actualizaron los datos, verificar los campos.',
          className: 'custom-class',
          style: {
            marginTop: '20vh',
            
          },
          duration: 5,
        });
      };
    const cancelar=()=>{
        navigate('/Home')
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
    const cargarcorreo=(event)=>{

        setCorreo(event.target.value)

        }
    const registrar = async()=>{
        setSpindato(true)
        const body = {
            nombre:nombre,
            apellido:apellido,
            fechanacimiento:fechanac,
            correo:correo,
        
        };

        const endpoint='ActualizarDatosUsuario/'
        const result = await Generarpeticion(endpoint, 'POST', body);
        const respuesta=result['resp']
        if(respuesta===200){
            await new Promise(resolve => setTimeout(resolve, 1000))
            setSpindato(false)
            success()
            
        }else if(respuesta === 403 || respuesta === 401){
                  
                  
            navigate('/Closesesion')

        }else{

        }
    }    

    
   


    useEffect(() => {
        
            const cargardatos = async () => {
            
                const body = {};
                const endpoint='ObtenerDatosUsuario/'
                const result = await Generarpeticion(endpoint, 'POST', body);
                
                const respuesta=result['resp']
                
                if (respuesta === 200) {
    
                    const registros=result['data']
                    
                   
                   setValoresdefaultdatos(result['data'][0])
                   setNombre(result['data'][0].nombre_usuario)
                   setApellido(result['data'][0].apellido_usuario)
                   setFechanac(result['data'][0].fecha_nacimiento)
                   setUsername(result['data'][0].user_name)
                   setCorreo(result['data'][0].correo)
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
                {contextHolder}
                <div className='contenedor-registro-box '>
                   

                    <Form 
                        {...layout}
                        name="nest-messages"
                        variant="filled"
                        
                        style={{
                        Width: 400,
                        padding:'0px'
                        
                        
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
                            <Input placeholder="Apellido"
                            defaultValue={valoresdefaultdatos.apellido_usuario} 
                            onChange={cargarapellido} style={{width:tamañoobjeto}} />
    
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
                                     
                                    defaultValue={dayjs(valoresdefaultdatos.fecha_nacimiento, dateFormat)} 
                                    
                                    
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
                            <Input placeholder="User Name"
                             defaultValue={valoresdefaultdatos.user_name} 
                             disabled
                             onChange={cargaruser} style={{width:tamañoobjeto}}/>
    
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
                            <Input placeholder="nombre@correo.com" 
                            defaultValue={valoresdefaultdatos.correo} 
                            onChange={cargarcorreo} style={{width:tamañoobjeto}}/>
                        </Form.Item>
    
                        
                        
                       
    
                        <div className="contenedor-flex ">
    
                           <Button type="primary" 
                           className='botonera'
                           onClick={registrar}
                           > Actualizar Datos</Button>
    
                            <Button type="primary" 
                           className='botonera'
                           onClick={cancelar}
                           
                           > Cancelar</Button>
                        </div>
                            
    
                        
                        
                    </Form>
                
    



                </div>

                {spindatos &&(
                    <Cargadatos setSpindato={setSpindato}></Cargadatos>
                )

                }
    
            </div>
        )
    }
}

export default ActualizacionDatosPersonales
