import React, {useEffect, useState} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Resumen from './Resumen/resumen';
import DetalleEgreso from './DetalleEgresos/detalleegreso';
import DetalleEgresov2 from './DetalleEgresos/detalleegresov2';
import DetalleIngreso from './DetalleIngresos/detalleingreso';
import SaldosPeriodo from './SaldosPeriodo/SaldosPeriodo';
import Generarpeticion from '../../peticiones/apipeticiones';
import './home.css'
import HomeCabecera from './CabeceraHome/cabecera';
import Handelstorage from '../../Storage/handelstorage';
import { Navigate, useNavigate } from "react-router-dom";
import Cargadatos from './Cargadatos';

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
            
            const registros_imagenes=result['data']['graficos']
            setImgresumen(registros_imagenes['imgResumen'])
            setImgegresos(registros_imagenes['imgEgresos'])
            setImgingresos(registros_imagenes['imgIngresos'])

            
        }else if(respuesta === 403 || respuesta === 401){
          
          navigate('/Closesesion')

      }
        setCargaconfirmada(true)
      };
      cargardatos()
      
    }, [cargarresumen]);

    
    
    
    return(
        <div style={{ width:'100%'}}>
              <HomeCabecera 
                cargarresumen={cargarresumen}
                setCargarresumen={setCargarresumen}
                setSpindato={setSpindato}
                
                
              ></HomeCabecera>

          {!spindatos &&(

            <div className='hometabs'>

              <Tabs
                  defaultActiveKey="homeresumen"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                  // onClick={tab_resumen}
                >
                  <Tab eventKey="homeresumen" title="Resumen Del Mes" >

                    {cargaconfirmada &&(<Resumen dataresumen={dataresumen} imgresumen={imgresumen}  ></Resumen>)}
                  </Tab>
                  <Tab eventKey="homeingresos" title="Detalle de Ingresos del Mes">
                    {cargaconfirmada &&(<DetalleIngreso 
                                                        dataingresos={dataingresos} 
                                                        setDataingresos={setDataingresos} 
                                                        setDataresumen={setDataresumen}
                                                        setImgresumen={setImgresumen}
                                                        setImgingresos={setImgingresos}
                                                        imgingresos={imgingresos}
                                                        >

                                        </DetalleIngreso>
                                        )
                    }
                  </Tab>
                  <Tab eventKey="homeegresos" title="Detalle de Egresos del Mes" >
                    {cargaconfirmada &&( <DetalleEgresov2 
                                                      dataegresos={dataegresos} 
                                                      setDataegresos={setDataegresos} 
                                                      setDataresumen={setDataresumen}
                                                      setDatasaldos={setDatasaldos}
                                                      setImgresumen={setImgresumen}
                                                      setImgegresos={setImgegresos}
                                                      imgegresos={imgegresos}>

                                        </DetalleEgresov2>)}
                  </Tab>
                  <Tab eventKey="homesaldos" title="Saldos del Año" >
                    {cargaconfirmada &&( <SaldosPeriodo datasaldos={datasaldos} 
                                                      >

                                        </SaldosPeriodo>)}
                  </Tab>
              </Tabs>
              
            </div>
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
