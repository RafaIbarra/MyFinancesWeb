import React, { useState } from 'react';

import { HomeOutlined,SwapOutlined,DiffOutlined,SoundOutlined,InteractionOutlined,BarChartOutlined,
        FileUnknownOutlined,CheckOutlined,RightOutlined,UserOutlined,DownOutlined,FallOutlined,RiseOutlined
      } from '@ant-design/icons';

import { Button,Menu,message, Space,Dropdown   } from 'antd';
import { Navigate, useNavigate } from "react-router-dom";

import { Avatar } from 'antd';

import './NavBar.css'
import Handelstorage
 from '../../Storage/handelstorage';
// import logoCoop from '../../assets/logoCoop.png';
// import ConsultaDatosUser from '../Usuario/ConsultaDatosUser';

const tamañoletra='15px'
const margenleft='30px'
const margentop='-50px'
const tamañoicono='25px'
const tamañosubicono='15px'
const margentopicono='12px'

const navegaciones={

  'Inicio':'/Home',
  'Egresos':'/RegistroEgreso',
  'ConceptosIngresos':'/Productos',
  'ConceptosEgresos':'/Gastos',
  

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
        label: (<p style={{fontSize:tamañoletra,marginTop:margentop,marginLeft:margenleft}} >Inicio</p>),
        // label:'Inicio',
        
        key: 'Inicio',
        icon:<HomeOutlined style={{ fontSize: tamañoicono,marginTop:margentopicono }}/>,      
      },
      
      {
        label: (<p style={{fontSize:tamañoletra,marginTop:margentop,marginLeft:margenleft}} >Conceptos Ingresos</p>),
        // label:'Inicio',
        
        key: 'ConceptosIngresos',
        icon:<RiseOutlined style={{ fontSize: tamañoicono,marginTop:margentopicono }}/>,      
      },
      
      {
        label: (<p style={{fontSize:tamañoletra,marginTop:margentop,marginLeft:margenleft}} >Conceptos Egresos</p>),
        // label:'Inicio',
        
        key: 'ConceptosEgresos',
        icon:<FallOutlined style={{ fontSize: tamañoicono,marginTop:margentopicono }}/>,      
      },
      ,


      {
        label: (<p style={{fontSize:tamañoletra,marginTop:margentop,marginLeft:margenleft}} >Movimientos</p>),
        key:"Movimientos",
        icon:<SwapOutlined style={{ fontSize: tamañoicono,marginTop:margentopicono }}/>,  
        children:[
          
          {
            label: 'Movimientos de Ingresos',
            key: 'MovimientosIngresos',
            icon: <RightOutlined style={{ fontSize: tamañosubicono }}/>, 
          
          },
          {
            label: 'Movimiento de Egresos',
            key: 'MovimientosEgresos',
            icon: <RightOutlined style={{ fontSize: tamañosubicono }}/>, 
          
          }
          ,

        ]

      }
      ,

      {
        label: (<p style={{fontSize:tamañoletra,marginTop:margentop,marginLeft:margenleft}} >Estadisticas</p>),
        key:"Estadisticas",
        icon:<BarChartOutlined style={{ fontSize:tamañoicono,marginTop:margentopicono }}/>,  
        children:[
          
          {
            label: 'Estadisticas de Ingresos',
            key: 'EstadisticasIngresos',
            icon: <RightOutlined style={{ fontSize: tamañosubicono }}/>, 
          
          },
          {
            label: 'Estadisticas de Egresos',
            key: 'EstadisticasEgresos',
            icon: <RightOutlined style={{ fontSize: tamañosubicono }}/>, 
          
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
        <Menu  onClick={onClick} selectedKeys={[current]} mode="horizontal" items={itemsmenu}  className="navbarant navbarantItem" style={{ width: '92%' }} />
        
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
                {/* <UserOutlined /> */}
                <Space wrap size={5}>
                    <Avatar shape="square" size="large" icon={<UserOutlined />} />
                </Space>
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