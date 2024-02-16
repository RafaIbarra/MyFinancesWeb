import React, {useEffect, useState} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Resumen from './Resumen/resumenv2';
import DetalleEgreso from './DetalleEgresos/detalleegreso';
import DetalleIngreso from './DetalleIngresos/detalleingreso';
import Generarpeticion from '../../peticiones/apipeticiones';
import './home.css'
import HomeCabecera from './CabeceraHome/cabecera';
import Handelstorage from '../../Storage/handelstorage';


function Home (){
    
    const[recargadatos,setRecargadatos]=useState(false)
    const[cargaconfirmada,setCargaconfirmada]=useState(false)
    const[dataresumen,setDataresumen]=useState(null)
    

    const[cargarresumen,setCargarresumen]=useState(false)
    const[cargaringresos,setCargaringresos]=useState(false)
    const[cargaregresos,setCargarEgresos]=useState(false)

    useEffect(() => {

      const datestorage=Handelstorage('obtenerdate');
      const mes_storage=datestorage['datames']
      const anno_storage=datestorage['dataanno']
      
      
      const cargardatos = async () => {
        
        const body = {};
        const endpoint='Balance/' + anno_storage +'/' + mes_storage + '/'
        const result = await Generarpeticion(endpoint, 'POST', body);
        
        const respuesta=result['resp']
        if (respuesta === 200) {
            const registros=result['data']
            setDataresumen(registros)
            
            
            
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
                cargaringresos={cargaringresos}
                setCargaringresos={setCargaringresos}
                cargaregresos={cargaregresos}
                setCargarEgresos={setCargarEgresos}
                
              ></HomeCabecera>
              
            
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
                // onClick={tab_resumen}
              >
                <Tab eventKey="home" title="Resumen Movimientos" >

                  {cargaconfirmada &&(<Resumen dataresumen={dataresumen}   ></Resumen>)}
                </Tab>
                <Tab eventKey="profile" title="Detalle de Ingresos">
                  {cargaconfirmada &&(<DetalleIngreso cargaringresos={cargaringresos} setCargaringresos={setCargaringresos} setDataresumen={setDataresumen}></DetalleIngreso>)}
                </Tab>
                <Tab eventKey="contact" title="Detalle de Egresos" >
                  {cargaconfirmada &&( <DetalleEgreso cargaregresos={cargaregresos} setCargarEgresos={setCargarEgresos} setDataresumen={setDataresumen} ></DetalleEgreso>)}
                </Tab>
            </Tabs>
            
        </div>
    )

}

export default Home
