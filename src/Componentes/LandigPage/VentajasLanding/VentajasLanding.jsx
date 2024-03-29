import React,{useState,useEffect} from "react";
import './ventajaslanding.css'
function VentajasLanding(){
    return(
        <div className="ventajas-landing">

            <div  className="ventajas-contenedor-texto-uno">
            <div className="numero">1</div>
                <p className="">
                    En nuestra plataforma, nos dedicamos a ayudarte a organizar tus finanzas de manera eficiente y efectiva. 
                    ¿Te has preguntado alguna vez dónde se va tu dinero cada mes? ¿O te gustaría tener un control más claro de tus ingresos y gastos? 
                    ¡Estás en el lugar adecuado!
                </p>
            </div>

            <div  className="ventajas-contenedor-texto-dos">
                <div className="numero">2</div>
                <p>
                Con nuestra herramienta, podrás registrar fácilmente tus ingresos mensuales, categorizar tus gastos y crear conceptos personalizados 
                para un seguimiento más detallado. Ya no tendrás que preocuparte por perder el control de tu dinero. 
                Con nosotros, tendrás toda la información que necesitas al alcance de tu mano.
                </p>
            </div>
            <div  className="ventajas-contenedor-texto-tres">
                <div className="numero">3</div>
                <p>
                Además, te ofrecemos estadísticas detalladas sobre tus gastos, para que puedas identificar patrones, tendencias y áreas de oportunidad 
                para mejorar tu gestión financiera. ¿Quieres saber en qué estás gastando más cada mes? ¿O cómo ha evolucionado tu situación financiera 
                a lo largo del tiempo? ¡Nosotros te lo mostramos de forma clara y concisa!
                </p>
            </div>
          
        </div>
    )
}

export default VentajasLanding