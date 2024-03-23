import React, {useEffect, useState } from 'react';
import {  Table, Typography,Divider,InputNumber,Input,Select,Radio,Button,Tooltip  } from 'antd';
import { AudioOutlined,SearchOutlined,RetweetOutlined,RiseOutlined  } from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';
import { Navigate, useNavigate } from "react-router-dom";
import Generarpeticion from '../../peticiones/apipeticiones';

import './historialingreso.css'
const { Text } = Typography;
const { Search } = Input;
function HistorialIngresos(){
    const navigate=useNavigate()
    const [dataingresosoriginal,setDataingresosoriginal]=useState([])
    const [dataingresos,setDataingresos]=useState([])
    const [dataagrupacion,setDataagrupacion]=useState([])
    
    const [customSize,setCustomSize]=useState('10')
    const [cantidadresultado,setCantidadresultado]=useState(0)
    const [montoresultado,setMontoresultado]=useState(0)
    const [busquedaactiva,setBusquedaactiva]=useState(false)
    const [annos,setAnnos]=useState([])
    const [meses,setMeses]=useState([])

    const [textobusqueda,setTextobusqueda]=useState('')
    const [messel,setMessel]=useState(0)
    const [annosel,setAnnosel]=useState(0)
    
    const [categoriasel,setCategoriasel]=useState("0")
    
    const [textop,setTextop]=useState('')
    
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

    const realizarbusqueda =(palabra,anno_ver,mes_ver,cat_vert)=>{
      let arrayencontrado=dataingresosoriginal.filter(item=> item.NombreIngreso.toLowerCase().includes(palabra))
      
      if(mes_ver>0){
        arrayencontrado=arrayencontrado.filter(item=> item.MesIngreso===mes_ver)
      }
      if(anno_ver>0){
        arrayencontrado=arrayencontrado.filter(item=> item.AnnoIngreso===anno_ver)
      }
      if(cat_vert==="1"){
        
        arrayencontrado=arrayencontrado.filter(item=> item.TipoIngreso==="Fijo")
      }
      if(cat_vert==="2"){
        
        arrayencontrado=arrayencontrado.filter(item=> item.TipoIngreso==="Ocasionales")
      }
      let totalingreso=0
      arrayencontrado.forEach(({ monto_ingreso }) => {totalingreso += monto_ingreso})
      setMontoresultado(totalingreso)
      setDataingresos(arrayencontrado)
      setCantidadresultado(arrayencontrado.length)
      
      setBusquedaactiva(true)

     
      const valordatos=`La cantidad de coincidencias: ${arrayencontrado.length} con un valor de Gs. ${Number(totalingreso).toLocaleString('es-ES')}`
      setTextop(valordatos)


    }
   
    const reestablecer_busqueda=()=>{
      
      realizarbusqueda('',0,0,0)
      setTextobusqueda('')
      setMessel(0)
      setAnnosel(0)
      setCategoriasel("0")
      setBusquedaactiva(false)
      setTextop('')

    }
    const textosel=(event)=>{
      const valor=event.target.value;
      const valor_busqueda=valor.toLowerCase()
      setTextobusqueda(valor_busqueda)
      realizarbusqueda(valor_busqueda,annosel,messel,categoriasel)
    }
    const seleccionarmes=(value)=>{
      
      setMessel(value)
      realizarbusqueda(textobusqueda,annosel,value,categoriasel)

    }
    const seleccionaranno= (value)=>{
      
      setAnnosel(value)
      
      realizarbusqueda(textobusqueda,value,messel,categoriasel)
    }
    const seleccionarcategoria=(event)=>{

      const valor=event.target.value
      setCategoriasel(event.target.value)
      realizarbusqueda(textobusqueda,annosel,messel,valor)
      
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
                    setMeses(result['data']['datosmeses'])
                    
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
          
              <div className='contenedor-izquierdo'>


                <div style={{paddingBottom:'10px',paddingTop:'5px'}}>

                    <h4> <RiseOutlined style={{color:'red'}} /> Historial de Ingresos</h4>
                    <div class="linea-vertical"></div>
                </div>
                <div className='contenedor-principal-datos' >

                  {dataagrupacion && dataagrupacion.map((x, index) => {
                     
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

                                  <InputNumber value={x.ConteoRegistros}
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
                
              </div>
          

              <div className='contenedor-busqueda'>
                  
                <div className='contenedor-busqueda-opciones'>
                  <FormItem>

                    {/* <Input placeholder='ingreso busqueda' onChange={textosel} style={{width:'100%',height:'30px'}} ></Input> */}
                    <Search
                      placeholder="Concepto busqueda"
                      onChange={textosel} style={{width:'100%',height:'30px'}}
                      
                      value={textobusqueda}
                    />
                  </FormItem>

                  <FormItem label="Categoria"  >
                      <Radio.Group onChange={seleccionarcategoria} value={categoriasel}>
                        <Radio value='1'> Fijo </Radio>
                        <Radio value='2'> Ocasionales </Radio>
                        <Radio value='0'> Todas </Radio>
                      </Radio.Group>
                  </FormItem>
                  
                  <FormItem label="Años">

                    <Select name='listaanos'
                      style={{ width: '100%' }}
                      onChange={seleccionaranno}
                      value={annosel}
                    >
                          <Select.Option key='anno0' value={0}>
                                  {'Todos'}
                          </Select.Option>
                          {annos &&  annos.map((g) => (
                              <Select.Option key={g.anno} value={g.anno}>
                                  {g.anno}
                              </Select.Option>
                          ))}
                    </Select>
                  </FormItem>

                  <FormItem label="Mes" style={{marginBottom:'10px'}}>

                    <Select name='listameses'
                      style={{ width: '100%' }}
                      onChange={seleccionarmes}
                      value={messel}
                    >
                          <Select.Option key='mes0' value={0}>
                                  {'Todos'}
                          </Select.Option>
                          {meses &&  meses.map((g) => (
                              <Select.Option key={g.numero_mes} value={g.numero_mes}>
                                  {g.nombre_mes}
                              </Select.Option>
                          ))}
                    </Select>
                  </FormItem>
                </div>
                  <Tooltip title="Reestablecer busqueda">
                    <Button type="primary" 
                          style={{width:'50px',height:'50px',marginBottom:'10px',marginTop:'0px'}} 
                          shape="circle" 
                          onClick={reestablecer_busqueda}
                          icon={<RetweetOutlined style={{fontSize:'30px'}} />} />
                  </Tooltip>
                  <p style={{paddingLeft:'10px',fontSize:'small',fontStyle:'italic'}}>
                    {textop}
                  </p>
              </div>

          


        </div>
      );

}
export default HistorialIngresos