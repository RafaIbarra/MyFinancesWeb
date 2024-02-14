import React, {useEffect, useState} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Resumen from './Resumen/resumenv2';
import DetalleEgreso from './DetalleEgresos/detalleegreso';
import DetalleIngreso from './DetalleIngresos/detalleingreso';
import Generarpeticion from '../../peticiones/apipeticiones';
import './home.css'
import {Button,DatePicker,Form,Input,InputNumber,Select,Radio } from 'antd';
import FormItem from 'antd/es/form/FormItem';

function Home (){
    const[meses,Setmeses]=useState(null)
    const[mes,Setmes]=useState(0)
    const[anno,Setanno]=useState(0)
    const[mesdefault,setMesdefault]=useState('')
    const[cargaconfirmada,setCargaconfirmada]=useState(false)
    
    useEffect(() => {
      const fechaActual = new Date();
      const mesactual = parseInt(fechaActual.getMonth() + 1);
      const añoActual = parseInt(fechaActual.getFullYear());
      Setmes(mesactual);
      Setanno(añoActual);
      const cargardatos = async () => {
        
        const body = {};
        const endpoint='Meses/'
        const result = await Generarpeticion(endpoint, 'POST', body);
        
        const respuesta=result['resp']
        if (respuesta === 200) {
          const registros=result['data']
          Setmeses(registros)
          setCargaconfirmada(true)
          console.log(result['data'])
          const listameses=result['data']
          const listamesactual=listameses.filter((m) => m.numero_mes === mesactual);
          setMesdefault(listamesactual[0]['nombre_mes'])
        }
      };
  
      cargardatos();
    }, []);

    
    return(
        <div style={{ width:'100%'}}>
              { cargaconfirmada &&(
            <div className='contenedor-flex'>
                <FormItem label="Año">

                  <InputNumber
                          value={anno}
                          // onChange={seleccionarmonto}
                          style={{
                          width: '100%',
                          }}
                      />
                </FormItem>

                <FormItem label="Mes">

                  <Select
                    style={{ width: 200 }}
                    defaultValue={mesdefault}
                    // onChange={handleChange}
                  >
                       
                         {meses &&  meses.map((g) => (
                             <option key={g.numero_mes} value={g.numero_mes}>
                                 {g.nombre_mes}
                             </option>
                         ))}
                  </Select>
                </FormItem>

                <Button type="primary" >Cargar Datos</Button>
              
            </div>)
              }
            
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="home" title="Resumen Movimientos">
                  {cargaconfirmada &&(<Resumen anno={anno} mes={mes} ></Resumen>)}
                </Tab>
                <Tab eventKey="profile" title="Detalle de Ingresos">
                  {cargaconfirmada &&(<DetalleIngreso anno={anno} mes={mes} ></DetalleIngreso>)}
                </Tab>
                <Tab eventKey="contact" title="Detalle de Egresos" >
                  {cargaconfirmada &&( <DetalleEgreso anno={anno} mes={mes} ></DetalleEgreso>)}
                </Tab>
            </Tabs>
            
        </div>
    )

}

export default Home