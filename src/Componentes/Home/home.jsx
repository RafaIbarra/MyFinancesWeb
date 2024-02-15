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

    const[datosresumen,setDatosresumen]=useState('')
    const[datosingreso,setDatosingreso]=useState('')
    const[datosegresos,setDatosegresos]=useState('')


    const seleccionarmes=(value)=>{
      
      setMes_selecion(value)

    }

    const seleccionaranno=(value)=>{
      
      
      setAnno_selecion(value)

    }
    const procesar = async ()=>{
      let mes_tomar=0
      let anno_tomar=0
      let datames=0
      let dataanno=0
      
      const datestorage=Handelstorage('obtenerdate');
      const mes_storage=datestorage['datames']
      const anno_storage=datestorage['dataanno']

      if (mes_seleccion>0){
        mes_tomar=mes_seleccion
        if (mes_seleccion !==mes_storage){
          datames=mes_seleccion
        }


      }else{
        mes_tomar=mes_storage
      }

      if(anno_seleccion >0){
        anno_tomar=anno_seleccion

        if(anno_seleccion !==anno_storage){
          dataanno=anno_seleccion
        }
      }else{
        anno_tomar=anno_storage
      }
    
      const body = {};
      const endpoint='Resumen/' + anno_tomar +'/' + mes_tomar + '/'
      
      const result = await Generarpeticion(endpoint, 'POST', body);
      
      const respuesta=result['resp']
      if (respuesta === 200) {
        
        const registros=result['data']
        
        if(Object.keys(registros).length>0){
          
          setDatosresumen(registros['Resumen'])
          setDatosingreso(registros['Ingresos'])
          setDatosegresos(registros['Egresos'])
        
          
        }
        else{
          setDatosresumen([])
          setDatosingreso([])
          setDatosegresos([])
        }

        if (datames>0){
          Handelstorage('actualizardate','datames',datames)
        }
        if (dataanno>0){
          Handelstorage('actualizardate','dataanno',dataanno)
        }

      } else {
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        // navigate('/');
      }
      
    }



    useEffect(() => {

      const datestorage=Handelstorage('obtenerdate');
      
      let mes_inicio=datestorage['datames']
      const anno_control=datestorage['dataanno']
      Setanno(anno_control)

      

      
      cargardatos(mes_inicio);
      procesar()
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
                  {cargaconfirmada &&(<Resumen datosresumen={datosresumen}  ></Resumen>)}
                </Tab>
                <Tab eventKey="profile" title="Detalle de Ingresos">
                  {cargaconfirmada &&(<DetalleIngreso datosingreso={datosingreso} ></DetalleIngreso>)}
                </Tab>
                <Tab eventKey="contact" title="Detalle de Egresos" >
                  {cargaconfirmada &&( <DetalleEgreso datosegresos={datosegresos}  ></DetalleEgreso>)}
                </Tab>
            </Tabs>
            
        </div>
    )

}

export default Home
