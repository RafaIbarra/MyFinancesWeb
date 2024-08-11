import React, { useState } from 'react';

import { HomeOutlined,SwapOutlined,BarChartOutlined,
        RightOutlined,UserOutlined,FallOutlined,RiseOutlined,
        AlignLeftOutlined,SettingOutlined,SolutionOutlined,DatabaseOutlined
      } from '@ant-design/icons';

import { Button,Menu,message, Space,Dropdown   } from 'antd';
import { Navigate, useNavigate } from "react-router-dom";

import { Avatar } from 'antd';

import './NavBar.css'
import Handelstorage from '../../Storage/handelstorage';



const tamañoletra='14px'
const margenleft='30px'
const margentop='-47px'
const tamañoicono='22px'
const tamañosubicono='15px'
const margentopicono='12px'


const navegaciones={

  'Inicio':'/Home',
  'Egresos':'/RegistroEgreso',
  'ConceptosIngresos':'/Productos',
  'ConceptosEgresos':'/Gastos',
  'MovimientosIngresos':'/HistorialIngresos',
  'EstadisticasEgresos':'/EstadisticasGasto',
  'EstadisticasIngreso':'/EstadisticasIngreso',
  'CategoriaEgresos':'/CategoriaGastos',
  'MovimientosEgresos':'/HistorialEgresos',
  'Actualizacion':'/ActualizacionDatosPersonales',
  'CambioPassword':'/CambioPassword',
  'Migrausers':'/Migrausers'
  

}

function NavBar({sesionname,setEstadologin}){

    const [colorsel,setColorsel]=useState('white')
    const [colordefault,setColordefault]=useState('black')
    const [keysel,setKeysel]=useState('')
  
    const navigate=useNavigate()
    const cerrarsesion=(event)=>{
      setEstadologin(false)
      Handelstorage('borrar')
      navigate('/Login')
    }
    const datospersonales=(event)=>{
      setKeysel('')
      navigate('/ActualizacionDatosPersonales')
    }
    const cambiopassword=(event)=>{
      setKeysel('')
      navigate('/CambioPassword')
    }
    const items = [
      {
       
        label: 'Datos personales',
        key: 'Actualizacion',
        onClick:datospersonales,
        icon:<SolutionOutlined style={{fontSize:'20px'}} />
        
      },
      {
        label: 'Configuracion',
        key: 'CambioPassword',
        onClick:cambiopassword,
        icon:<SettingOutlined style={{fontSize:'20px'}}/>
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
        label: (<p key='p_inicio' style={{fontSize:tamañoletra,marginTop:margentop,marginLeft:margenleft, color: keysel === 'Inicio' ? colorsel : colordefault} } >Inicio</p>),
       
        
        key: 'Inicio',
        icon:<HomeOutlined style={{ fontSize: tamañoicono,marginTop:margentopicono,   color: keysel === 'Inicio' ? colorsel: colordefault }}/>,      
      },

      
      {
        label: (<p style={{fontSize:tamañoletra,marginTop:margentop,marginLeft:margenleft, color: keysel === 'ConceptosIngresos' ? colorsel : colordefault }} >Conceptos Ingresos</p>),
      
        
        key: 'ConceptosIngresos',
        icon:<RiseOutlined style={{ fontSize: tamañoicono,marginTop:margentopicono , color: keysel === 'ConceptosIngresos' ? colorsel : colordefault }}/>,      
        
      },
      
      {
        label: (<p style={{fontSize:tamañoletra,marginTop:margentop,marginLeft:margenleft, color: keysel === 'CategoriaEgresos' ? colorsel : colordefault }} >Categoria de Gastos</p>),
       
        
        key: 'CategoriaEgresos',
        icon:<AlignLeftOutlined style={{ fontSize: tamañoicono,marginTop:margentopicono , color: keysel === 'CategoriaEgresos' ? colorsel : colordefault }}/>,      
       
      },
      {
        label: (<p style={{fontSize:tamañoletra,marginTop:margentop,marginLeft:margenleft, color: keysel === 'ConceptosEgresos' ? colorsel : colordefault}} >Conceptos de Gastos</p>),
        
        
        key: 'ConceptosEgresos',
        icon:<FallOutlined style={{ fontSize: tamañoicono,marginTop:margentopicono, color: keysel === 'ConceptosEgresos' ? colorsel : colordefault }}/>,      
      },
      ,


      {
        label: (<p style={{fontSize:tamañoletra,marginTop:margentop,marginLeft:margenleft, color: ['Movimientos', 'MovimientosIngresos','MovimientosEgresos'].includes(keysel) ? colorsel : colordefault}} >Historico Movimientos</p>),
        key:"Movimientos",
        icon:<SwapOutlined style={{ fontSize: tamañoicono,marginTop:margentopicono, color: ['Movimientos', 'MovimientosIngresos','MovimientosEgresos'].includes(keysel) ? colorsel : colordefault }}/>,  
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
        label: (<p style={{fontSize:tamañoletra,marginTop:margentop,marginLeft:margenleft, color: ['Estadisticas', 'EstadisticasIngreso','EstadisticasEgresos'].includes(keysel) ? colorsel : colordefault}} >Estadisticas</p>),
        key:"Estadisticas",
        icon:<BarChartOutlined style={{ fontSize:tamañoicono,marginTop:margentopicono, color: ['Estadisticas', 'EstadisticasIngreso','EstadisticasEgresos'].includes(keysel) ? colorsel : colordefault }}/>,  
        children:[
          
          {
            label: 'Estadisticas de Ingresos',
            key: 'EstadisticasIngreso',
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
      {
        label: (<p style={{fontSize:tamañoletra,marginTop:margentop,marginLeft:margenleft, color: ['Migraciones', 'EstadisticasIngreso','EstadisticasEgresos'].includes(keysel) ? colorsel : colordefault}} >Migraciones</p>),
        key:"Migraciones",
        icon:<DatabaseOutlined style={{ fontSize:tamañoicono,marginTop:margentopicono, color: ['Migraciones', 'EstadisticasIngreso','EstadisticasEgresos'].includes(keysel) ? colorsel : colordefault }}/>,  
        children:[
          
          {
            label: 'Migraciones varias',
            key: 'Migrausers',
            
          
          },
         

        ]

      }
      
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
         setKeysel(e.key)
        if (navegaciones[e.key] ){
            
    
            
            navigate(navegaciones[e.key])
         

        }else{
          error()
        }      
        setCurrent(e.key);
        
    };
    
   

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
                    
                    <Space wrap size={5}>
                        <Avatar shape="square" size="large" icon={<UserOutlined />} />
                    </Space>
                  </Space>
                </a>
              </Dropdown>

            </div>



      </div>
    )
        
      
    
    
}
export default NavBar