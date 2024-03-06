import React,{useState,useEffect} from "react";


import Iniciarsesion from '../../peticiones/apiiniciosesion'
import Handelstorage from '../../Storage/handelstorage'

import { Navigate, useNavigate } from "react-router-dom"
import { LockOutlined, UserOutlined,CloseOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

import ComprobarStorage from "../../App/verificarstorage";

import './login.css'


function Login({activarsesion,desactivarsesion,setSesionname}){
    
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };


    const [procesando,setProcesando]=useState(false)
    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
    const navigate=useNavigate()
    const [existecookie,setexistecookie]=useState()
    const [datosinicio,setDatosinicio]=useState('')
    const [errorinicio,setErrorinicio]=useState(false)
    const [mensajeerror,setMensajeerror]=useState('')
    
    const navegar=()=>{
        activarsesion()
        const sesionmin=username.toLowerCase()
        const sesioncapitalize = sesionmin.charAt(0).toUpperCase() + sesionmin.slice(1);
        setSesionname(sesioncapitalize)
        navigate('/Home')

    }
    const cargarusuario = (event) => {
        setMensajeerror('')
        setErrorinicio(false)
        setUsername(event.target.value);
      };
      
    const cargarcontrasena = (event) => {
        setMensajeerror('')
        setErrorinicio(false)
        setPassword(event.target.value);
      };

    const ingresar =async (values)=>{
        
        const datos =await Iniciarsesion(username, password)
        
        if(datos['resp']===200){
            
            
            const userdata={
                token:datos['data']['token'],
                sesion:datos['data']['sesion'],
                refresh:datos['data']['refresh'],
                user_name:datos['data']['user_name'],
            }
            
            
            Handelstorage('agregar',userdata,'')
            navegar()
        }else{
            console.log(datos['data']['error'])
            setErrorinicio(true)
            setMensajeerror(datos['data']['error'])
        }
        
    }

    const registrarse=(event)=>{
        event.preventDefault();
        navigate('/Registro')
    }

    useEffect(() => {
        const datosstarage = ComprobarStorage();
        const credenciales=datosstarage['datosesion']
    
        if (credenciales) {
          
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
                    
                    onFinish={ingresar}
                    
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
                            message: 'Favor ingrese su nombre de usuario!',
                                },]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" onChange={cargarusuario} />
                    </Form.Item>
                    
                    <Form.Item name="password"
                        rules={[{
                            required: true,
                            message: 'Favor ingrese su contraseña!',
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
                        <Button type="primary"   className="login-form-button" htmlType="submit">
                                Iniciar Sesion
                        </Button>
                        {/* O <a onClick={registrarse}>Registrarse!</a> */}
                        O <a href="" onClick={registrarse}>Registrarse!</a>
                        {errorinicio &&(

                            <p style={{color:'red',fontWeight: 'bold',fontStyle: 'italic',width:'400px'}} >
                                <CloseOutlined style={{marginRight:'5px',marginTop:'5px'}}></CloseOutlined>
                                {mensajeerror}
                                
                            </p>
                        )
                        }
                        
                    </Form.Item>

                    
                </Form>


            </div>
            
        </div>

        
    )

}
export default Login