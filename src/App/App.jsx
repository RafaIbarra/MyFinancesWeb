import React,{useState,useEffect} from "react";



import Login  from "../Componentes/Login/Login";
import Home from "../Componentes/Home/home";
import NavBar from "../Componentes/NavBar/navbar";
import NabarHor from "../Componentes/NavBar/nabvarhorizontal";
import { Routes, Route, Navigate,useNavigate,HashRouter  } from 'react-router-dom'; 
import RegistroGasto from "../Componentes/RegistroGasto/registrogasto";
import RegistroEgreso from "../Componentes/RegistroEgreso/registroegreso";
import ComprobarStorage from "./verificarstorage";
import Productosfinancieros from "../Componentes/ProductosFinancieros/productosfinanciores";
import Gastos from "../Componentes/Gastos/gastos";

function App (){
    
    const [Estadologin,setEstadologin]=useState(false)
    
   
    const activarsesion=()=>{
        setEstadologin(true)
    }
    const desactivarsesion=()=>{
        setEstadologin(false)
        
        
    }
    
    useEffect(() => {
        const datosstarage = ComprobarStorage();
        
    
        if (datosstarage) {

          activarsesion();
          
        
        } else {
          desactivarsesion();
        }
      }, []);
    
return(
    
    <HashRouter>
        
        <div style={ Estadologin ? {  display: 'flex', flexDirection: 'column' }: null}>
        {Estadologin && (<NavBar />)}
            <div style={ Estadologin ?{ display: 'flex', flexDirection: 'row' }: null}>
                {Estadologin && (<NabarHor />)}
                <Routes>
                    <Route path="/" element={<Login activarsesion={activarsesion} desactivarsesion={desactivarsesion} />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/RegistroGasto" element={<RegistroGasto />} />
                    <Route path="/RegistroEgreso" element={<RegistroEgreso />} />
                    <Route path="/Productos" element={<Productosfinancieros />} />
                    <Route path="/Gastos" element={<Gastos />} />
                    
                </Routes>
            </div>
        </div>
    </HashRouter>
);

}

export default App;