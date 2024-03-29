import React,{useState,useEffect} from "react";
import './principallanding.css'
function PrincipalLanding(){
    return(
        <div className="principal-landing">
            <h3 style={{marginLeft:'30%'}} className="pricipal-texto-landing">My Finances Web</h3>
            <h4 style={{marginLeft:'15%'}} className="pricipal-texto-landing"> Sistema para control de finanzas</h4>
            <div className="principal-contenedor-imagen-landing">
                <img src="/ahorro6.png" alt="Ejemplo" className="principal-imagen-landing" />
            </div>
        </div>
    )
}

export default PrincipalLanding