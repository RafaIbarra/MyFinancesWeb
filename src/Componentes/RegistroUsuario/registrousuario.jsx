import React,{useState,useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input,DatePicker } from 'antd'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import './registrousuario.css'
const layout = {
    labelCol: {
      span: 5,
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


const onFinish = (values) => {
    console.log(values);
  };

function RegistroUsuario (){
    const navigate=useNavigate()
    const { MonthPicker, RangePicker } = DatePicker;
    dayjs.extend(customParseFormat);
    const dateFormat = 'YYYY-MM-DD';

    const [nombre,setNombre]=useState('')
    const [apellido,setApellido]=useState('')
    const [fechanac,setFechanac]=useState('')
    const [username,setUsername]=useState('')
    const [correo,setCorreo]=useState('')

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

    const volveriniciosesion=()=>{
        navigate('/')
    }

    const registrar =()=>{
        const datosregistrar = {
            nombre_usuario:nombre,
            apellido_usuario:apellido,
            fecha_nacimiento:fechanac,
            user_name:username,
            correo:correo,
            

        };

        console.log(datosregistrar)
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
                    Width: 600,
                    padding:'0px'
                    // ,backgroundColor:'rgb(0,0,0)'
                    
                    }}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name={['user', 'Nombre']}
                        label="Nombre"
                        rules={[
                            {
                            required: true,
                            },
                        ]}
                    >
                        <Input placeholder="Nombre" onChange={cargarnombre}/>

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
                        <Input placeholder="Apellido" onChange={cargarapellido} />

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
                        <Input placeholder="User Name" onChange={cargaruser}/>

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
                        <Input placeholder="nombre@correo.com" onChange={cargarcorreo}/>
                    </Form.Item>
                    
                    <Form.Item

                        wrapperCol={{
                            ...layout.wrapperCol,
                            offset: 8,
                        }}
                    >
                       <Button onClick={volveriniciosesion}> Volver a iniciar Sesion</Button>

                    </Form.Item>
                    <Form.Item

                        wrapperCol={{
                            ...layout.wrapperCol,
                            offset: 8,
                        }}
                    >
                       <Button onClick={registrar}> Registrarse</Button>

                    </Form.Item>
                    
                </Form>
            </div>
     
        </div>
    )
}

export default RegistroUsuario

