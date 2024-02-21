import React,{useState,useEffect} from "react";


import Iniciarsesion from '../../peticiones/apiiniciosesion'
import Handelstorage from '../../Storage/handelstorage'

import { Navigate, useNavigate } from "react-router-dom"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

import ComprobarStorage from "../../App/verificarstorage";

import './login.css'


function Login({activarsesion,desactivarsesion}){
    
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };


    const [procesando,setProcesando]=useState(false)
    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
    const navigate=useNavigate()
    const [existecookie,setexistecookie]=useState()
    const [datosinicio,setDatosinicio]=useState('')
    
    const navegar=()=>{
        activarsesion()
        
        navigate('/Home')

    }
    const cargarusuario = (event) => {
        setUsername(event.target.value);
      };
      
    const cargarcontrasena = (event) => {
        setPassword(event.target.value);
      };

    const ingresar =async (event)=>{
        
        const datos =await Iniciarsesion(username, password)
        
        if(datos['resp']===200){
            
            
            const userdata={
                token:datos['data']['token'],
                sesion:datos['data']['sesion'],
                refresh:datos['data']['refresh'],
            }
            
            
            Handelstorage('agregar',userdata,'')
            navegar()
        }else{
            console.log(datos['data']['error'])
        }
        
    }

    const registrarse=(event)=>{
        event.preventDefault();
        navigate('/Registro')
    }

    useEffect(() => {
        const datosstarage = ComprobarStorage();
        
    
        if (datosstarage) {
          
         navegar()
          
        
        } else {
          desactivarsesion();
        }
      }, []);
    return(
        
        <div className="d-flex justify-content-center align-items-center login-container">
            <div className="login-box">

                <Form name="normal_login" className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    >
                    <Form.Item>
                    <div className="d-flex justify-content-center">
                                    <img className="estiloimg"
                                        
                                        src= "/icono.svg"
                                        alt="login-icon"
                                        // style="height: 7rem"
                                    />
                                </div>
                    </Form.Item>
                    <Form.Item name="username"
                        rules={[{
                            required: true,
                            message: 'Please input your Username!',
                                },]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" onChange={cargarusuario} />
                    </Form.Item>
                    <Form.Item name="password"
                        rules={[{
                            required: true,
                            message: 'Please input your Password!',
                                },]}
                    >
                        <Input prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                onChange={cargarcontrasena}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Recordarme</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                        Olvide mi contraseña
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary"  className="login-form-button" onClick={ingresar}>
                        Iniciar Sesion
                        </Button>
                        {/* O <a onClick={registrarse}>Registrarse!</a> */}
                        O <a href="" onClick={registrarse}>Registrarse!</a>
                        
                    </Form.Item>
                </Form>


            </div>
        </div>

        
    )

}
export default Login