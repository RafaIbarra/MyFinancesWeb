import React,{useState,useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom"
import { WarningOutlined} from '@ant-design/icons';
import { Button, Form, Input,DatePicker,Typography,notification } from 'antd'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import './registrousuario.css'
import ApiRegistroUsuario from "../../peticiones/apiregistrousuario";
import Handelstorage from "../../Storage/handelstorage";
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
   
  };

const { Text } = Typography;

function RegistroUsuario ({activarsesion,desactivarsesion,setSesionname}){
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
    const [erroresregistro,setErroresregistro]=useState('')

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
    const cargarcontrasena = (event) => {
            setPassword(event.target.value);
        };

    const volveriniciosesion=()=>{
        navigate('/')
    }

    const registrar = async()=>{
        const datosregistrar = {
            nombre:nombre,
            apellido:apellido,
            nacimiento:fechanac,
            user:username,
            correo:correo,
            password:password
            

        };

        
        const datos =await ApiRegistroUsuario(datosregistrar)
        
        if(datos['resp']===200){
            
            
            const userdata={
                token:datos['data']['token'],
                sesion:datos['data']['sesion'],
                refresh:datos['data']['refresh'],
                user_name:datos['data']['user_name'],
            }
            
            
            Handelstorage('agregar',userdata,'')
            activarsesion()
            const sesionmin=username.toLowerCase()
            const sesioncapitalize = sesionmin.charAt(0).toUpperCase() + sesionmin.slice(1);
            setSesionname(sesioncapitalize)
            navigate('/Home')
        }else{
            
            const errores=datos['data']['error']
            let mensajeerror = 'Errores: ';
            for (let clave in errores) {
                mensajeerror += `${clave}: ${errores[clave]}. `;
            }

            setErroresregistro(mensajeerror)
            mostrarmensajeerror('top',mensajeerror)
        }
    }

    const mostrarmensajeerror = (placement,mensaje) => {
        api.open({
            message: 'ERROR',
            description: ` ${mensaje}`,
            placement,
            icon: (<WarningOutlined style={{color: 'red',}}/>
            ),
          });
        };

    const [api, contextHolder] = notification.useNotification();
    return(

        <div className="login-registro-container">
            {contextHolder}
            <div className="login-registro-box">

                <Form 
                    {...layout}
                    name="nest-messages"
                    variant="filled"
                    onFinish={onFinish}
                    style={{
                    Width: 400,
                    padding:'0px'
                  
                    
                    }}
                    validateMessages={validateMessages}
                >

                    <Form.Item>
                        <div className="divimg">
                                <img className="estiloimg"
                                    
                                    src= "/icono.svg"
                                    alt="login-icon"
                                 
                                />
                         </div>
                    </Form.Item>
                    <Form.Item
                        name={['user', 'Nombre']}
                        label="Nombre"
                        
                        rules={[
                            {
                            required: true,
                            },
                        ]}
                    >
                        <Input placeholder="Nombre" onChange={cargarnombre}
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

                    <Form.Item
                        name={['user', 'Password']}
                        label="Contraseña"
                        rules={[
                            {
                            required: true,
                            },
                        ]}
                    >
                        <Input placeholder="Contraseña" type="password" onChange={cargarcontrasena} style={{width:tamañoobjeto}}/>

                    </Form.Item>
                    
                   

                    <div className="contenedor-flex ">

                       <Button type="primary" onClick={volveriniciosesion} style={{width:200}}
                       > Volver a iniciar Sesion</Button>

                   
                       <Button type="primary" onClick={registrar}
                       style={{width:200}}
                       > Registrarse</Button>
                    </div>
                        
                    {/* <p>{erroresregistro}</p> */}
                    
                    
                </Form>
            </div>
     
        </div>
    )
}

export default RegistroUsuario

