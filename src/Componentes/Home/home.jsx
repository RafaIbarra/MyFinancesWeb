import React, {useEffect, useState} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Resumen from './Resumen/resumenv2';
import DetalleEgreso from './DetalleEgresos/detalleegreso';
import DetalleIngreso from './DetalleIngresos/detalleingreso';
import Generarpeticion from '../../peticiones/apipeticiones';
import './home.css'
import {Button,InputNumber,Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Handelstorage from '../../Storage/handelstorage';

function Home (){
    const[meses,Setmeses]=useState(null)
    const[mes,Setmes]=useState(0)
    const[anno,Setanno]=useState(0)
    const[mesdefault,setMesdefault]=useState('')
    const[cargaconfirmada,setCargaconfirmada]=useState(false)
    const[mes_seleccion,setMes_selecion]=useState(0)
    const[anno_seleccion,setAnno_selecion]=useState(0)


    const seleccionarmes=(value)=>{
      
      setMes_selecion(value)

    }

    const seleccionaranno=(value)=>{
      
      
      setAnno_selecion(value)

    }
    const procesar=()=>{
      Setmes(mes_seleccion)
      Setanno(anno_seleccion)
      
    }
    useEffect(() => {

      const datestorage=Handelstorage('obtenerdate');
      let fechaActual = new Date();
      let mes_inicio=0
      
      const mes_storage=datestorage['datames']
      if(mes_storage > 0){
        
        const mes_control=datestorage['datames']
        const anno_control=datestorage['dataanno']
        mes_inicio=mes_control
        Setmes(mes_control)
        Setanno(anno_control)
      }else{
        
        const mesactual = parseInt(fechaActual.getMonth() + 1);
        mes_inicio=mesactual
        Setmes(mesactual);
        const añoActual = parseInt(fechaActual.getFullYear());
        Setanno(añoActual);
      };

      
      cargardatos(mes_inicio);
    }, []);

    
    const cargardatos = async (mes_iniciar) => {
        
      const body = {};
      const endpoint='Meses/'
      const result = await Generarpeticion(endpoint, 'POST', body);
      
      const respuesta=result['resp']
      if (respuesta === 200) {
          const registros=result['data']
          setCargaconfirmada(true)
          Setmeses(registros)
          
          
          const listameses=result['data']
          const listamesactual=listameses.filter((m) => m.numero_mes === mes_iniciar);
          setMesdefault(listamesactual[0]['nombre_mes'])
          
      }
    };
    
    return(
        <div style={{ width:'100%'}}>
              { cargaconfirmada &&(
            <div className='contenedor-flex'>
                
                <FormItem label="Año">

                  <InputNumber
                          
                          defaultValue={anno}
                          onChange={seleccionaranno}
                          style={{
                          width: '100%',
                          }}
                      />
                </FormItem>

                <FormItem label="Mes">

                  <Select
                    style={{ width: 200 }}
                    defaultValue={mesdefault}
                    onChange={seleccionarmes}
                  >
                       
                         {meses &&  meses.map((g) => (
                             <option key={g.numero_mes} value={g.numero_mes}>
                                 {g.nombre_mes}
                             </option>
                         ))}
                  </Select>
                </FormItem>

                <Button type="primary" onClick={procesar}>Cargar Datos</Button>
              
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
