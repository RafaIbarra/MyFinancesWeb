import React, {useEffect, useState } from 'react';
import {  Table, Typography,Divider,InputNumber,Input,Select,Radio,Button,Tooltip  } from 'antd';
import { AudioOutlined,SearchOutlined,RetweetOutlined,FallOutlined  } from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';
import { Navigate, useNavigate } from "react-router-dom";
import Generarpeticion from '../../peticiones/apipeticiones';

import './historialegresos.css'

const { Text } = Typography;
const { Search } = Input;

function HistorialEgresos(){
    const navigate=useNavigate()
    const [dataegresosoriginal,setDataegresosoriginal]=useState([])
    const [dataegresos,setDataegresos]=useState([])
    const [dataagrupacionegresos,setDataagrupacionegresos]=useState([])
    
    const [customSize,setCustomSize]=useState('10')
    const [cantidadresultado,setCantidadresultado]=useState(0)
    const [montoresultado,setMontoresultado]=useState(0)
    const [busquedaactiva,setBusquedaactiva]=useState(false)
    const [annos,setAnnos]=useState([])
    const [meses,setMeses]=useState([])
    const[grupocategorias,setGrupocategorias]=useState([])

    const [textobusqueda,setTextobusqueda]=useState('')
    const [messel,setMessel]=useState(0)
    const [annosel,setAnnosel]=useState(0)
    
    const [categoriasel,setCategoriasel]=useState(0)
    
    const [textop,setTextop]=useState('')

    const columns=[
      
        { title: 'Descripcion',
          dataIndex: 'NombreGasto',
          key: 'DetalleEgreso_Descripcion',
          sorter: (a, b) => a.NombreGasto.localeCompare(b.NombreGasto),
        },
        { title: 'Tipo',
          dataIndex: 'TipoGasto',
          key: 'DetalleEgreso_Tipo',
          filters: [
            {
              text: 'Ocasionales',
              value: 'Ocasionales',
            },
            {
              text: 'Fijo',
              value: 'Fijo',
            },
            
          ],
          onFilter: (value, record) => record.TipoGasto.indexOf(value) === 0,
        },
  
        { title: 'Categoria',
          dataIndex: 'CategoriaGasto', 
          key: 'DetalleEgreso_Categoria',
      
        },
  
        { title: 'Egreso',
          dataIndex: 'monto_gasto',
          key: 'DetalleEgreso_Egreso',
          render: (monto_gasto) => (
            <span>
              Gs. {Number(monto_gasto).toLocaleString('es-ES')}
            </span>
          ),
        },
        { title: 'Fecha Gasto',dataIndex: 'fecha_gasto',key: 'DetalleEgreso_FechaGasto'},
        { title: 'Fecha Registro',
          dataIndex: 'fecha_registro',
          key: 'DetalleEgreso_FechaRegistro',
          width: 250,
          sorter: (a, b) => new Date(a.fecha_registro) - new Date(b.fecha_registro),
        },
        
      ]


    const realizarbusqueda =(palabra,anno_ver,mes_ver,cat_vert)=>{
        let arrayencontrado=dataegresosoriginal.filter(item=> item.NombreGasto.toLowerCase().includes(palabra))
        
        if(mes_ver>0){
          arrayencontrado=arrayencontrado.filter(item=> item.MesEgreso===mes_ver)
        }
        if(anno_ver>0){
          arrayencontrado=arrayencontrado.filter(item=> item.AnnoEgreso===anno_ver)
        }

        if (cat_vert>0){
          arrayencontrado=arrayencontrado.filter(item=> item.CodigoCategoriaGasto===cat_vert)
        }
        
        let totalgasto=0
        arrayencontrado.forEach(({ monto_gasto }) => {totalgasto += monto_gasto})
        setMontoresultado(totalgasto)
        setDataegresos(arrayencontrado)
        setCantidadresultado(arrayencontrado.length)
        
        setBusquedaactiva(true)
        const valordatos=`La cantidad de coincidencias: ${arrayencontrado.length} con un valor de Gs. ${Number(totalgasto).toLocaleString('es-ES')}`
        setTextop(valordatos)


      }

    const textosel=(event)=>{
      const valor=event.target.value;
      const valor_busqueda=valor.toLowerCase()
      setTextobusqueda(valor_busqueda)
      realizarbusqueda(valor_busqueda,annosel,messel,categoriasel)
      }

    const seleccionaranno= (value)=>{
      
      setAnnosel(value)
      
      realizarbusqueda(textobusqueda,value,messel,categoriasel)
      }

    const seleccionarmes=(value)=>{
      
      setMessel(value)
      realizarbusqueda(textobusqueda,annosel,value,categoriasel)

      }

    const seleccionarcategoria=(value)=>{
    
      setCategoriasel(value)
      realizarbusqueda(textobusqueda,annosel,messel,value)

      }

    const reestablecer_busqueda=()=>{
      
      realizarbusqueda('',0,0,0)
      setTextobusqueda('')
      setMessel(0)
      setAnnosel(0)
      setCategoriasel(0)
      setBusquedaactiva(false)
      setTextop('')

    }
    

    useEffect(() => {
      
      const cargardatos = async () => {
      
          const body = {};
          const endpoint='MisEgresos/0/0/'
          const result = await Generarpeticion(endpoint, 'POST', body);
          
          const respuesta=result['resp']
          
          if (respuesta === 200) {

              const registros=result['data']['detalles']
              
              
              
              if(Object.keys(registros).length>0){
                  registros.forEach((elemento) => {
                    
                    elemento.key = elemento.id;
                  })
                  
                  setDataegresos(registros)
                  setDataegresosoriginal(registros)
                  const agrupacion=result['data']['agrupados']

                  
                  const data_anos=[]
                  
                  const lista_anos = agrupacion.map(item => item.AnnoEgreso);
                  
                  lista_anos.forEach(item => {
                  
                    if(data_anos.length===0){
                      data_anos.push({ anno: item });

                    }else {
                      const existeValor = data_anos.some(elemento => elemento.anno === item)
                      if(!existeValor){
                        data_anos.push({ anno: item });
                      }
                    }
                  
                  const lista_categorias=[]

                  registros.forEach((item) => {
                    
                    if(lista_categorias.length===0){
                      lista_categorias.push({ codigo: item['CodigoCategoriaGasto'],categoria:item['CategoriaGasto'] });

                    } else {
                      const existeValor = lista_categorias.some(elemento => elemento.codigo === item['CodigoCategoriaGasto'])
                      if(!existeValor){
                        lista_categorias.push({ codigo: item['CodigoCategoriaGasto'],categoria:item['CategoriaGasto'] });
                      }
                    }
                    
                    
                  });
                  setGrupocategorias(lista_categorias)
                    
                    
                    
                  });
                  setAnnos(data_anos)
                  setMeses(result['data']['datosmeses'])
                  
                  if(Object.keys(agrupacion).length>0){

                    agrupacion.forEach((ele) => {
                    
                      ele.key = ele.AnnoEgreso.toString() + ele.MesEgreso.toString();
                    })


                  }
                  
                  setDataagrupacionegresos(agrupacion)
                  
                  
                }
                else{
                  
                  setDataegresos([])
                  
                }
              
              
          }else if(respuesta === 403 || respuesta === 401){
            
            
            navigate('/Closesesion')

        }
          
          
        };
        
  
      cargardatos();
      
    }, []);

    return(
      <div className='contenedor-principal-egreso'>
        <div className='contenedor-izquierdo-egreso'>
          <div style={{paddingBottom:'10px',paddingTop:'5px'}}>

              <h4> <FallOutlined style={{color:'red'}} /> Historial de Egresos</h4>
              <div class="linea-vertical"></div>
          </div>
          <div className='contenedor-principal-datos-egreso'>

            {dataagrupacionegresos && dataagrupacionegresos.map((x, index) => {
                  
                  const lista = dataegresos.filter((pro) => pro.AnnoEgreso === x.AnnoEgreso && pro.MesEgreso === x.MesEgreso);
                  if(lista.length>0){

                    return (
                  
                        <div className='contenedor-sub-egreso' key={x.key}>
                          <div className='texo-contenedor-egreso'>
                            <h5 > {x.NombreMesEgreso} {x.AnnoEgreso} </h5>
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
                            <div className='texo-tabla-egreso'> 
    
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

        <div className='contenedor-busqueda-egreso'>
            <div className='contenedor-busqueda-opciones-egreso'>
                <FormItem>

                  {/* <Input placeholder='ingreso busqueda' onChange={textosel} style={{width:'100%',height:'30px'}} ></Input> */}
                  <Search
                    placeholder="Concepto busqueda"
                    onChange={textosel} style={{width:'100%',height:'30px'}}
                    
                    value={textobusqueda}
                  />
                </FormItem>

                <FormItem label="Categoria:">

                    <Select name='listacategoria'
                      style={{ width: '100%' }}
                      onChange={seleccionarcategoria}
                      value={categoriasel}
                    >
                          <Select.Option key='Cat' value={0}>
                                  {'Todos'}
                          </Select.Option>
                          {grupocategorias &&  grupocategorias.map((g) => (
                              <Select.Option key={g.categoria} value={g.codigo}>
                                  {g.categoria}
                              </Select.Option>
                          ))}
                    </Select>
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
        

            

            <p>
                {textop}
            </p>


        </div>

      </div>
    )

}
export default HistorialEgresos