import React,{useState,useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom"
import PrincipalLanding from "./PrincipalLandig/PrincipalLanding";
import VentajasLanding from "./VentajasLanding/VentajasLanding";
import OpcionesLanding from "./OpcionesLanding/OpcionesLanding";
import { Button  } from 'antd';
import './landingpage.css'
function LandigPage({setLandingactive}){
    const navigate=useNavigate()
    
    const iniciosesion=()=>{
        navigate('/Login')
    }
    const registrarse=()=>{
        
        navigate('/Registro')
    }
    useEffect(() => {
        setLandingactive(true)
      }, []);
    return(
        <div className="landing">
            <div className="landing-menu" >
                <div style={{paddingTop:'10px',paddingLeft:'80%'}}>
                    <div style={{display:'inline-block',paddingRight:'10px'}}>

                        <Button  type='primary'  className="landing-botones" onClick={iniciosesion}>Login</Button>
                    </div>
                    <div style={{display:'inline-block'}}>

                        <Button type='primary'className="landing-botones" onClick={registrarse}>Registrarse </Button>
                    </div>
                </div>
            </div>
            <div className="landing-inicio">

                <PrincipalLanding></PrincipalLanding>
                <VentajasLanding></VentajasLanding>
            </div>
            
            <div style={{marginTop:'3%',marginLeft:'10%'}}>

                <OpcionesLanding></OpcionesLanding>
            </div>
            


        </div>
    )
}
export default LandigPage