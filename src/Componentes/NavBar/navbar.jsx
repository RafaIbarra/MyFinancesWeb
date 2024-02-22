import React, { useState } from 'react';

import { HomeOutlined,SwapOutlined,DiffOutlined,SoundOutlined,InteractionOutlined,
        FileUnknownOutlined,CheckOutlined,RightOutlined,UserOutlined,DownOutlined   
      } from '@ant-design/icons';

import { Button,Menu,message, Space,Dropdown   } from 'antd';
import { Navigate, useNavigate } from "react-router-dom";
import './NavBar.css'
import Handelstorage
 from '../../Storage/handelstorage';
// import logoCoop from '../../assets/logoCoop.png';
// import ConsultaDatosUser from '../Usuario/ConsultaDatosUser';
const tamaño='13px'
const tamañosub='12px'

const navegaciones={
  'Logo':'/my-resumenCuentas',
  'Inicio':'/Home',
  'Egresos':'/RegistroEgreso',
  'Productos':'/Productos',
  'Gastos':'/Gastos',
  'SedeSocial':'/my-pagoSedeSocial',
  'Prestamo':'/my-pagosPrestamos',
  'TarjetaCredito':'/my-pagoTarjetas',
  'CuentaColegio':'/my-pagoColegio',
  'RegistroGasto':'/RegistroGasto',
  'DatosUser':'DatosUser',
  'Padron':'/my-ConsultaPadron',

}

function NavBar({sesionname}){
    const navigate=useNavigate()
    const cerrarsesion=(event)=>{
      Handelstorage('borrar')
      navigate('/')
    }
    const items = [
      {
        label: <a href="https://www.antgroup.com">1st menu item</a>,
        key: '0000',
      },
      {
        label: <a href="https://www.aliyun.com">2nd menu item</a>,
        key: '11111',
      },
      {
        type: 'divider',
      },
      {
        label: (
          <Button type='primary' danger style={{width:'100%',height:'100%'}} onClick={cerrarsesion} > CERRAR SESION </Button>
        ),
        key: '333333',
        
      },
      ];


    const itemsmenu = [
      
    
      {
        label: "Inicio",
        
        key:"Inicio",
        icon:<HomeOutlined style={{ fontSize: '25px',marginTop:'12px' }}/>,      
      },
      
      ,


      {
        label: "Conceptos",
        key:"AutoGestiones",
        icon:<InteractionOutlined style={{ fontSize: tamaño }}/>,
      
        children:[
          
          {
            label: 'Conceptos de Ingresos',
            key: 'Productos',
            icon: <RightOutlined style={{ fontSize: tamañosub }}/>, 
          
          },
          {
            label: 'Conceptos de Egresos',
            key: 'Gastos',
            icon: <RightOutlined style={{ fontSize: tamañosub }}/>, 
          
          }
          ,
          
          
          

        ]

      }
      ,
      
      
      ]


    
    
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
        <Menu  onClick={onClick} selectedKeys={[current]} mode="horizontal" items={itemsmenu}  className="navbarant navbarantItem" style={{ width: '93%' }} />
        <div className='contenedor-drow'>

            <Dropdown
            menu={{
              items,
            }}
            placement="bottomRight"
            trigger={['click']}
            
          >
            <a onClick={(e) => e.preventDefault()} className='nombreuser' >
              <Space>
              {sesionname}
                <UserOutlined />
              </Space>
            </a>
          </Dropdown>

        </div>




        {/* <div>
          {username}
        </div> */}
        
        {/* <div  className="navbarant navbarantUser" style={{ width: '15%',height:'80px' }}>
          <div  style={{width: '65%',paddingTop:'25px'}}>
          <ConsultaDatosUser/>
          </div>
          
        </div> */}
      </div>
    )
        
      
    
    
}
export default NavBar