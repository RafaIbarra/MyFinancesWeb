import React,{useState,useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input,DatePicker } from 'antd'
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
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
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

function RegistroUsuario ({activarsesion,desactivarsesion}){
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

        console.log(datosregistrar)
        const datos =await ApiRegistroUsuario(datosregistrar)
        
        if(datos['resp']===200){
            
            
            const userdata={
                token:datos['data']['token'],
                sesion:datos['data']['sesion'],
                refresh:datos['data']['refresh'],
            }
            
            
            Handelstorage('agregar',userdata,'')
            activarsesion()
            navigate('/Home')
        }else{
            console.log(datos['data']['error'])
        }
    }
    return(

        <div className="login-registro-container">

            <div className="login-registro-box">

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

                    <Form.Item>
                        <div className="divimg">
                                <img className="estiloimg"
                                    
                                    src= "/icono.svg"
                                    alt="login-icon"
                                    // style="height: 7rem"
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
                               message: 'Please input!',
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
                        

                    
                    
                </Form>
            </div>
     
        </div>
    )
}

export default RegistroUsuario

