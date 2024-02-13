import React,{useState,useEffect} from "react";



import Login  from "../Componentes/Login/Login";
import Home from "../Componentes/Home/home";
import NavBar from "../Componentes/NavBar/navbar";
import NabarHor from "../Componentes/NavBar/nabvarhorizontal";
import { Routes, Route, Navigate,useNavigate,HashRouter } from 'react-router-dom'; 
import RegistroGasto from "../Componentes/RegistroGasto/registrogasto";
import RegistroEgreso from "../Componentes/RegistroEgreso/registroegreso";
function App (){
    const [Estadologin,setEstadologin]=useState(false)
    
   
    const activarsesion=()=>{
        setEstadologin(true)
        
        // console.log("estado sesion")
        // console.log(Estadologin)
    }
    const desactivarsesion=()=>{
        setEstadologin(false)
        
        
    }
    

    
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
                </Routes>
            </div>
        </div>
    </HashRouter>
);

}

export default App;