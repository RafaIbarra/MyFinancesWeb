import React,{useState,useEffect} from "react";



import Login  from "../Componentes/Login/Login";
import Home from "../Componentes/Home/home";
import { Routes, Route, Navigate,useNavigate,HashRouter } from 'react-router-dom'; 


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
        {/* { Estadologin && (<NavBarboops  ></NavBarboops>)} */}
        
        <Routes>
            
            {/* <Route path="/" element={<Login  activarsesion={activarsesion} desactivarsesion={desactivarsesion} />} /> */}
            <Route path="/" element={<Login/>} />
            <Route path="/Home" element={<Home  />} />
            {/* <Route path="/registro" element={<Registrouser  activarsesion={activarsesion} desactivarsesion={desactivarsesion} />} />
            
            <Route path="/datosahorro" element={<DatosAhorro />} />
            <Route path="/datoscredito" element={<DatosCredito />} />
            <Route path="/transferencias" element={<Transferencia />} />
            <Route path="/pagocredito" element={<Pagocredito />} />
            <Route path="/pagotarjeta" element={<Pagotarjeta />} />
            <Route path="/pagocuotasocial" element={<Pagocuotasocial />} />
            <Route path="/pagoruedas" element={<Pagoruedas />} />
            <Route path="/Notificaciones" element={<Notificaciones />} />
            <Route path="/salir" element={<Logout />} /> */}
            
            <Route path="*" element={<p>Not Found</p>} />

            
        </Routes>
    </HashRouter>
);

}

export default App;