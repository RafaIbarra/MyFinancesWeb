import React,{useState,useEffect} from "react";

import { Routes, Route, Navigate,useNavigate,HashRouter  } from 'react-router-dom'; 
import Login  from "../Componentes/Login/Login";
import Home from "../Componentes/Home/home";
import NavBar from "../Componentes/NavBar/navbar";
import NabarHor from "../Componentes/NavBar/nabvarhorizontal";
import Productosfinancieros from "../Componentes/ProductosFinancieros/productosfinanciores";
import Gastos from "../Componentes/Gastos/gastos";
import CloseSesion from "../Componentes/Closesesion/closesesion";
import RegistroUsuario from "../Componentes/RegistroUsuario/registrousuario";
import HistorialIngresos from "../Componentes/HistorialIngresos/HistorialIngresos";
import HistorialEgresos from "../Componentes/HistorialEgresos/HistorialEgresos";
import EstadisticasGasto from "../Componentes/Estadisticas/EstadisticasGastos/EstadisticaGasto";
import EstadisticasIngreso from "../Componentes/Estadisticas/EstadisticasIngresos/EstadisticaIngreso";
import CategoriaGasto from "../Componentes/CategoriaGastos/CategoriaGastos";
import ActualizacionDatosPersonales from "../Componentes/ActualizacionDatosPersonales/ActualizacionDatosPersonales";
import CambioPassword from "../Componentes/CambioPassword/CambioPassword";
import PiePagina from "../Componentes/PiePagina/PiePagina";
import ComprobarStorage from "./verificarstorage";

function App (){
    
    const [Estadologin,setEstadologin]=useState(false)
    const [sesionname, setSesionname]=useState('')
    
   
    const activarsesion=()=>{
        setEstadologin(true)
    }
    const desactivarsesion=()=>{
        setEstadologin(false)
        
        
    }
    
    useEffect(() => {
        const datosstarage = ComprobarStorage();
        const alto = window.innerHeight;
        const ancho = window.innerWidth;
        console.log('Ancho de la pantalla:', ancho, 'px');
        console.log('Alto de la pantalla:', alto, 'px');
        setSesionname(datosstarage['user_name'])
        const credenciales=datosstarage['datosesion']
        if (credenciales) {
            
          activarsesion();
          
        
        } else {
          desactivarsesion();
        }
      }, []);
    
return(
    
    <HashRouter>
        
        <div style={ Estadologin ? {  display: 'flex', flexDirection: 'column' }: null}>
        {Estadologin && (<NavBar sesionname={sesionname}/>)}
            <div style={ Estadologin ?{ display: 'flex', flexDirection: 'row' }: null}>
                {/* {Estadologin && (<NabarHor />)} */}
                <Routes>
                    <Route path="/" element={<Login activarsesion={activarsesion} desactivarsesion={desactivarsesion} setSesionname={setSesionname} />} />
                    <Route path="/Registro" element={<RegistroUsuario activarsesion={activarsesion} desactivarsesion={desactivarsesion} setSesionname={setSesionname}/>} />
                    <Route path="/Home" element={<Home />} />
                    {/* <Route path="/RegistroGasto" element={<RegistroGasto />} />
                    <Route path="/RegistroEgreso" element={<RegistroEgreso />} /> */}
                    <Route path="/Productos" element={<Productosfinancieros />} />
                    <Route path="/Gastos" element={<Gastos />} />
                    <Route path="/CategoriaGastos" element={<CategoriaGasto />} />
                    <Route path="/HistorialIngresos" element={<HistorialIngresos />} />
                    <Route path="/HistorialEgresos" element={<HistorialEgresos />} />
                    <Route path="/EstadisticasGasto" element={<EstadisticasGasto />} />
                    <Route path="/EstadisticasIngreso" element={<EstadisticasIngreso />} />
                    <Route path="/ActualizacionDatosPersonales" element={<ActualizacionDatosPersonales />} />
                    <Route path="/CambioPassword" element={<CambioPassword />} />
                    
                    
                    
                    <Route path="/Closesesion" element={<CloseSesion />} />
                    
                </Routes>
                {Estadologin && (<PiePagina></PiePagina>)}
            </div>
        </div>
    </HashRouter>
);

}

export default App;