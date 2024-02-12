import React,{useState,useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Iniciarsesion from '../../peticiones/apiiniciosesion'
import Handelstorage from '../../Storage/handelstorage'
import { Navigate, useNavigate } from "react-router-dom"




function Login(){
    const [procesando,setProcesando]=useState(false)
    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
    const navigate=useNavigate()
    const [existecookie,setexistecookie]=useState()
    const [datosinicio,setDatosinicio]=useState('')
    const navegar=()=>{
        
        console.log("desde aca envia en el home")
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
        console.log(datos)
        console.log(datos['resp'])
        if(datos['resp']===200){
            const userdata={
                token:datos['data']['token'],
                sesion:datos['data']['sesion'],
                refresh:datos['data']['refresh'],
            }
            console.log(userdata)
            Handelstorage('agregar',userdata)
            navegar()
        }else{
            console.log(datos['data']['error'])
        }
        
    }
    return(
        <Form>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                Usuario
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="text" placeholder="Usuario" onChange={cargarusuario}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                Password
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="password" placeholder="Password" onChange={cargarcontrasena}/>
                </Col>
            </Form.Group>
            
            

            <div className="mb-2">
                <Button variant="primary" size="lg" onClick={ingresar}>Ingresar</Button>
                <Button variant="warning" size="lg">Registrarse</Button>
            </div>
        </Form>
    )

}
export default Login