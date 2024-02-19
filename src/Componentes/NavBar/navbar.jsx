import React, { useState } from 'react';

import { HomeOutlined,SwapOutlined,
        DiffOutlined,SoundOutlined,InteractionOutlined,FileUnknownOutlined,CheckOutlined,RightOutlined } 
      from '@ant-design/icons';

import { Button,Menu,message, Space   } from 'antd';
import { Navigate, useNavigate } from "react-router-dom";
import './NavBar.css'
// import logoCoop from '../../assets/logoCoop.png';
// import ConsultaDatosUser from '../Usuario/ConsultaDatosUser';
const tamaño='13px'
const tamañosub='12px'
const navegaciones={
  'Logo':'/my-resumenCuentas',
  'Inicio':'/Home',
  'Egresos':'/RegistroEgreso',
  'Productos':'/Productos',
  'Solidaridad':'/my-pagoSolidaridad',
  'SedeSocial':'/my-pagoSedeSocial',
  'Prestamo':'/my-pagosPrestamos',
  'TarjetaCredito':'/my-pagoTarjetas',
  'CuentaColegio':'/my-pagoColegio',
  'RegistroGasto':'/RegistroGasto',
  'DatosUser':'DatosUser',
  'Padron':'/my-ConsultaPadron',

}



const items = [
    // {
    //   label:(
    //     <img src={logoCoop} alt="Logo" className="h-12 w-auto" />
    //   ),
    //   key:"Logo"
    // },
    {
      label: "Inicio",
      key:"Inicio",
      icon:<HomeOutlined style={{ fontSize: tamaño }}/>,      
    },
    {
      label: "Movimientos",
      key: 'SubMenu2',
      icon: <SwapOutlined style={{ fontSize: tamaño }}/>,
      children:[
        {
          label: 'Egresos',
          key: 'Egresos',
           icon: <RightOutlined style={{ fontSize: tamañosub }}/>,           
        },
        {
          label: 'Ingresos',
          key: 'Aterceros',
           icon: <RightOutlined style={{ fontSize: tamañosub }}/>, 
        },
      ],      
    },
    {
      label: "Servicios/Pagos",
      key: 'SubMenu3',
      icon: <DiffOutlined style={{ fontSize: tamaño }}/>,
      children:[

        {
          type:'group',
          label: 'Cuotas Sociales',
          icon: <RightOutlined style={{ fontSize: tamañosub }}/>, 
          children:[
            {
              label: 'Pago Aporte',
              key: 'PagoAporte',
              icon: <CheckOutlined style={{ fontSize: tamañosub }}/>
            },
            {
              label: 'Solidaridad',
              key: 'Solidaridad',
              icon: <CheckOutlined style={{ fontSize: tamañosub }}/>
            },
            {
              label: 'Sede Social',
              key: 'SedeSocial',
              icon: <CheckOutlined style={{ fontSize: tamañosub }}/>
            },
          ]
        },
        {
          label: 'Préstamo',
          key: 'Prestamo',
          icon: <RightOutlined style={{ fontSize: tamañosub }}/>, 
        },
        {
          label: 'Tarjeta de Crédito',
          key: 'TarjetaCredito',
          icon: <RightOutlined style={{ fontSize: tamañosub }}/>, 
        },
        ,
        {
          label: 'Cuenta Colegio',
          key: 'CuentaColegio',
          icon: <RightOutlined style={{ fontSize: tamañosub }}/>, 
        },

      ]
    },
    {
      label: "AutoGestiones",
      key:"AutoGestiones",
      icon:<InteractionOutlined style={{ fontSize: tamaño }}/>,
     
      children:[
        
        {
          label: 'Productos Financieros',
          key: 'Productos',
          icon: <RightOutlined style={{ fontSize: tamañosub }}/>, 
         
        },
        {
          label: 'Solicitar Préstamos',
          key: 'SolcitarPrestamos',
          icon: <RightOutlined style={{ fontSize: tamañosub }}/>, 
         
        },
        
        {
          label: 'Solcitar Tarjeta de Crédito',
          key: 'SolcitarTarjetaCredito',
          icon: <RightOutlined style={{ fontSize: tamañosub }}/>, 
         
        },
        {
          label: 'Solicitar Tarjeta de Débito',
          key: 'SolicitarTarjetaDébito',
          icon: <RightOutlined style={{ fontSize: tamañosub }}/>, 

        },
        

      ]

    },
    {
      label: "Consultas",
      key:"Consultas",
      icon:<FileUnknownOutlined style={{ fontSize: tamaño }}/>,
      children:[

        {
          type:'group',
          label: 'Comprobantes',
          children:[
            {
              label: 'Facturas',
              key: 'Facturas',
              icon: <CheckOutlined style={{ fontSize: tamañosub }}/>
            },
           
          ]
        },
        {
          type:'group',
          label: 'Consultas',
          children:[
            {
              label: 'Padrón',
              key: 'Padron',
              icon: <CheckOutlined style={{ fontSize: tamañosub }}/>
            },
            {
              label: 'Excedentes',
              key: 'Excedentes',
              icon: <CheckOutlined style={{ fontSize: tamañosub }}/>
            },
            {
              label: 'Extracto de tarjetas',
              key: 'Extractotarjetas',
              icon: <CheckOutlined style={{ fontSize: tamañosub }}/>
            },
           
          ]
        },
        {
          label: 'Promociones',
          key: 'Promociones',
          icon: <RightOutlined style={{ fontSize: tamañosub }}/>, 
        }

      ]
    },
    {
      label: "RegistroGasto",
      key:"RegistroGasto",
      icon:<HomeOutlined style={{ fontSize: tamaño }}/>,
      
    },  
]



function NavBar(){

       
    const navigate=useNavigate()
    const [current, setCurrent] = useState('mail');
    const [messageApi, contextHolder] = message.useMessage();

    const error = () => {
      messageApi.open({
        type: 'error',
        content: 'LA OPCION SELECCIONADA AUN NO ESTA DISPONIBLE!!',
        fontSize: '10px',
      });
    };
    const onClick = (e) => {
  
        if (navegaciones[e.key] ){

          
            navigate(navegaciones[e.key])
         

        }else{
          error()
        }      
        setCurrent(e.key);
    };
    const onhome=()=>{
      navigate('/my-resumenCuentas')
    }
    



        

    return(
        <div style={{ display: 'flex', alignItems: 'center', padding: '0px', borderBottom: '1px solid #ccc' }}>
        
        {/* <div className="navbarant navbarantLogo"  style={{ width: '10%',height:'80px', paddingTop:'10px'}}>
          <img src={logoCoop} alt="Logo" className="h-12 w-auto" style={{marginLeft: '16px'}} onClick={onhome}/>
        </div> */}

        {contextHolder}
        <Menu  onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}  className="navbarant navbarantItem" style={{ width: '75%' }} />

        
        {/* <div  className="navbarant navbarantUser" style={{ width: '15%',height:'80px' }}>
          <div  style={{width: '65%',paddingTop:'25px'}}>
          <ConsultaDatosUser/>
          </div>
          
        </div> */}
      </div>
    )
        
      
    
    
}
export default NavBar