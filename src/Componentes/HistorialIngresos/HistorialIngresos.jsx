import React, {useEffect, useState} from 'react';
import {  Table, Typography,Divider,InputNumber,Input,Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Navigate, useNavigate } from "react-router-dom";
import Generarpeticion from '../../peticiones/apipeticiones';

import './historialingreso.css'
const { Text } = Typography;

function HistorialIngresos(){
    const navigate=useNavigate()
    const [dataingresosoriginal,setDataingresosoriginal]=useState([])
    const [dataingresos,setDataingresos]=useState([])
    const [dataagrupacion,setDataagrupacion]=useState([])
    const [textobusqueda,setTextobusqueda]=useState('')
    const [customSize,setCustomSize]=useState('10')
    const [cantidadresultado,setCantidadresultado]=useState(0)
    const [montoresultado,setMontoresultado]=useState(0)
    const [busquedaactiva,setBusquedaactiva]=useState(false)
    const [annos,setAnnos]=useState([])
    const [meses,setMeses]=useState([])
    const columns=[
      { title: 'Descripcion',dataIndex: 'NombreIngreso',key: 'Descripcion_i'},
      { title: 'Tipo',dataIndex: 'TipoIngreso',key: 'Tipo_i'},
      { title: 'Ingreso',
        dataIndex: 'monto_ingreso',
        key: 'Ingreso_i',
        render: (monto_ingreso) => (
          <span>
            Gs. {Number(monto_ingreso).toLocaleString('es-ES')}
          </span>
        ),
      },
      { title: 'Fecha Ingreso',dataIndex: 'fecha_ingreso',key: 'FechaGasto_i'},
      { title: 'Fecha Registro',dataIndex: 'fecha_registro',key: 'FechaRegistro_i'},
      { title: 'Anotacion',dataIndex: 'anotacion',key: 'Anotacion_i'},
    ]

    const tomarbusqueda=(event)=>{
      const valor=event.target.value;
      const valor_busqueda=valor.toLowerCase()
      
      const arrayencontrado=dataingresosoriginal.filter(item=> item.NombreIngreso.toLowerCase().includes(valor_busqueda))
      // console.log(arrayencontrado)
      let totalingreso=0
      arrayencontrado.forEach(({ monto_ingreso }) => {totalingreso += monto_ingreso})
      setDataingresos(arrayencontrado)
      setCantidadresultado(arrayencontrado.length)
      if (valor_busqueda.length > 0){
        
        setBusquedaactiva(true)
      }else{
        
        setBusquedaactiva(false)
      }
      setMontoresultado(totalingreso)
    }

    useEffect(() => {
        
        const cargardatos = async () => {
        
            const body = {};
            const endpoint='MisIngresos/0/0/'
            const result = await Generarpeticion(endpoint, 'POST', body);
            
            const respuesta=result['resp']
            
            if (respuesta === 200) {

                const registros=result['data']['detalles']
                
                
                
                if(Object.keys(registros).length>0){
                    registros.forEach((elemento) => {
                      
                      elemento.key = elemento.id;
                    })
                    
                    setDataingresos(registros)
                    setDataingresosoriginal(registros)
                    const agrupacion=result['data']['agrupados']

                    console.log(agrupacion)
                    const data_anos=[]
                    const lista_anos = agrupacion.map(item => item.AnnoIngreso);
                    
                    lista_anos.forEach(item => {
                    
                      if(data_anos.length===0){
                        data_anos.push({ anno: item });

                      }else {
                        const existeValor = data_anos.some(elemento => elemento.anno === item)
                        if(!existeValor){
                          data_anos.push({ anno: item });
                        }
                      }

                      
                      
                      
                    });
                    setAnnos(data_anos)
                  
                    
                    if(Object.keys(agrupacion).length>0){

                      agrupacion.forEach((ele) => {
                      
                        ele.key = ele.AnnoIngreso.toString() + ele.MesIngreso.toString();
                      })


                    }
                    
                    setDataagrupacion(agrupacion)
                    
                    
                  }
                  else{
                    
                    setDataingresos([])
                    
                  }
                
                
            }else if(respuesta === 403 || respuesta === 401){
              
              
              navigate('/Closesesion')

          }
            
            
          };
          
    
        cargardatos();
      }, []);

      return (
        <div className='contenedor-principal'>

          <div className='contenedor-principal-datos'>

            {dataagrupacion && dataagrupacion.map((x, index) => {
                // Filtrar detalles de ingresos
                const lista = dataingresos.filter((pro) => pro.AnnoIngreso === x.AnnoIngreso && pro.MesIngreso === x.MesIngreso);
                if(lista.length>0){

                  return (
                
                      <div className='contenedor-sub' key={x.key}>
                        <div className='texo-contenedor'>
                          <h5 > {x.NombreMesIngreso} {x.AnnoIngreso} </h5>
                          <FormItem label="Total Egreso"
                          style={{marginBottom:'0px'}}
                          >

                            <InputNumber
                                    
                                    value={`Gs. ${Number(x.SumaMonto).toLocaleString('es-ES')}`}
                                    disabled
                                    
                                    style={{
                                      width: '100%',
                                      height:'28px',
                                      backgroundColor:' rgb(251, 249, 248)',
                                      color:'black',
                                      
                                      }}
                                />
                          </FormItem>
                          <FormItem label="Cantidad Registros"
                          size="small"
                          style={{marginBottom:'0px'}}
                          >

                            <InputNumber
                                    
                                    value={x.ConteoRegistros}
                                    disabled
                                    
                                    style={{
                                    width: '30%',
                                    height:'28px',
                                    backgroundColor:' rgb(251, 249, 248)',
                                    color:'black',
                                    
                                    }}
                                />
                          </FormItem>
                        </div>
                          <div className='texo-tabla'> 
  
                              <Table size="small"
                                columns={columns} 
                                dataSource={lista} 
                                pagination={false}
                                scroll={{x: 300,y: 200,}}
                                bordered={true}
                              />
                          </div>
                          <Divider type="horizontal" />
                          
                          
                      </div>
                    
                    
                  );
                }




              })}
          </div>

            <div className='contenedor-busqueda'>
            
              <FormItem>

                <Input placeholder='ingreso busqueda' onChange={tomarbusqueda} style={{width:'200px',height:'30px'}} ></Input>
              </FormItem>



                <FormItem label="Categoria">

                  <Select name='listameses'
                    style={{ width: 200 }}
                  >
                        
                        {dataagrupacion &&  dataagrupacion.map((g) => (
                            <Select.Option key={g.MesIngreso} value={g.MesIngreso}>
                                {g.MesIngreso}
                            </Select.Option>
                        ))}
                  </Select>
                </FormItem>
                <FormItem label="Categoria">

                  <Select name='listameses'
                    style={{ width: 200 }}
                  >
                        
                        {annos &&  annos.map((g) => (
                            <Select.Option key={g.anno} value={g.anno}>
                                {g.anno}
                            </Select.Option>
                        ))}
                  </Select>
                </FormItem>
                <FormItem label="Categoria">

                  <Select name='listameses'
                    style={{ width: 200 }}
                  >
                        
                        {dataagrupacion &&  dataagrupacion.map((g) => (
                            <Select.Option key={g.meses} value={g.meses}>
                                {g.meses}
                            </Select.Option>
                        ))}
                  </Select>
                </FormItem>
                {busquedaactiva &&(

                  <p>
                    La cantidad de coincidencias: {cantidadresultado} con un valore de {`Gs. ${Number(montoresultado).toLocaleString('es-ES')}`}
                  </p>
                )
                }
            </div>
        </div>
      );

}
export default HistorialIngresos
