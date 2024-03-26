import React, {useEffect, useState} from 'react';
import { Radio, Tabs } from 'antd';
import Resumen from './Resumen/resumen';
import DetalleEgreso from './DetalleEgresos/detalleegreso';
import DetalleIngreso from './DetalleIngresos/detalleingreso';
import SaldosPeriodo from './SaldosPeriodo/SaldosPeriodo';
import Generarpeticion from '../../peticiones/apipeticiones';
import './home.css'
import HomeCabecera from './CabeceraHome/cabecera';
import Handelstorage from '../../Storage/handelstorage';
import { Navigate, useNavigate } from "react-router-dom";
import Cargadatos from './Cargadatos';
import ImagenesMes from './ImagenesMes/ImagenesMes';
import { FallOutlined,RiseOutlined,DollarOutlined ,ProjectOutlined ,PieChartOutlined 
} from '@ant-design/icons';

function Home (){
    const navigate=useNavigate()
    const[recargadatos,setRecargadatos]=useState(false)
    const[cargaconfirmada,setCargaconfirmada]=useState(false)

    const[dataresumen,setDataresumen]=useState(null)
    const[dataingresos,setDataingresos]=useState(null)
    const[dataegresos,setDataegresos]=useState(null)
    const[datasaldos,setDatasaldos]=useState(null)

    const[imgresumen,setImgresumen]=useState('')
    const[imgegresos,setImgegresos]=useState('')
    const[imgingresos,setImgingresos]=useState('')
    

    const[cargarresumen,setCargarresumen]=useState(false)
    const[spindatos,setSpindato]=useState(false)

    const [mode, setMode] = useState('left')
    const [pedidoestadistica,setpedidoestadistica]=useState(false)

    useEffect(() => {

      const datestorage=Handelstorage('obtenerdate');
      const mes_storage=datestorage['datames']
      const anno_storage=datestorage['dataanno']
      
      
      const cargardatos = async () => {
        
        const body = {};
        const endpoint='Resumen/' + anno_storage +'/' + mes_storage + '/'
        const result = await Generarpeticion(endpoint, 'POST', body);
        
        const respuesta=result['resp']
        if (respuesta === 200) {
            
            const registros=result['data']['datos']
            

            setDataresumen(registros['Resumen'])
            setDataingresos(registros['Ingresos'])
            setDataegresos(registros['Egresos'])
            setDatasaldos(registros['Saldos'])
            
            // const registros_imagenes=result['data']['graficos']
            // setImgresumen(registros_imagenes['imgResumen'])
            // setImgegresos(registros_imagenes['imgEgresos'])
            // setImgingresos(registros_imagenes['imgIngresos'])

            
        }else if(respuesta === 403 || respuesta === 401){
          
          navigate('/Closesesion')

      }
        setCargaconfirmada(true)
      };
      cargardatos()
      
    }, [cargarresumen]);

    const items = [
      {
        key: 'ResumenDelMes',
        label: 'Resumen Del Mes',
        icon:<ProjectOutlined style={{fontSize:'20px'}} />,
        children: (<Resumen dataresumen={dataresumen}   ></Resumen>),
      },
      {
        key: 'Registro de Ingresos',
        label: 'Registro de Ingresos',
        icon:<RiseOutlined style={{fontSize:'20px'}} />,
        children: (<DetalleIngreso 
                  dataingresos={dataingresos} 
                  setDataingresos={setDataingresos} 
                  setDataresumen={setDataresumen}
                  setDatasaldos={setDatasaldos}
                  
                  >
                </DetalleIngreso>
                ),
      },
      {
        key: 'RegistrosdeGastos',
        label: 'Registros de Gastos',
        icon:<FallOutlined style={{fontSize:'20px'}} />,
        children: (<DetalleEgreso 
                    dataegresos={dataegresos} 
                    setDataegresos={setDataegresos} 
                    setDataresumen={setDataresumen}
                    setDatasaldos={setDatasaldos}
                    
                    >
                    </DetalleEgreso>
                  ),
      },
      {
        key: 'Estadisticasdelmes',
        label: 'Estadisticas del mes',
        icon:<PieChartOutlined style={{fontSize:'20px'}} />,
        children: (<ImagenesMes pedidoestadistica={pedidoestadistica}  ></ImagenesMes>),
        
      },
      {
        key: 'SaldosdelAño',
        label: 'Saldos del Año',
        icon:<DollarOutlined style={{fontSize:'20px'}} />,
        children: (<SaldosPeriodo datasaldos={datasaldos} ></SaldosPeriodo>),
      },
    ];
    const onChange = (key) => {
      
      if(key==='Estadisticasdelmes'){
        
        setpedidoestadistica(!pedidoestadistica)
      }
    };
    
    return(
      // <div className="principal-home">
      //       <HomeCabecera 
      //       cargarresumen={cargarresumen}
      //         setCargarresumen={setCargarresumen}
      //         setSpindato={setSpindato}
            
            
      //       ></HomeCabecera> 
      //       <div className='principal-home-sub'>
      //           <NabarHor></NabarHor>

      //           {cargaconfirmada &&(<Resumen dataresumen={dataresumen} imgresumen={imgresumen}  ></Resumen>)}
      //       </div>

      // </div>
        <div style={{ width:'100%'}}>
              <HomeCabecera 
                cargarresumen={cargarresumen}
                setCargarresumen={setCargarresumen}
                setSpindato={setSpindato}
                
                
              ></HomeCabecera>

          {!spindatos && cargaconfirmada &&(

            
            
              <Tabs
                  defaultActiveKey="homeresumen"
                  id="uncontrolled-tab-example"
                  // className="mb-3"
                  tabPosition={mode}
                  items={items}
                  size="large"
                  onChange={onChange}
                  
                  
                >
                 
              </Tabs>
            
             
            
             )
          } 

          
          

        {spindatos &&(
            <Cargadatos setSpindato={setSpindato}></Cargadatos>
          )

          }



            
        </div>
    )

}

export default Home
