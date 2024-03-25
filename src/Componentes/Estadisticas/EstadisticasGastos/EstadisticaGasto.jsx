import React, {useEffect, useState} from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import Generarpeticion from '../../../peticiones/apipeticiones';
import PeriodosMaximos from './PeriodosMaximos/PeriodosMaximos';
import Comportamiento from './Comportamiento/Comportamiento';
import EstadisticasCabecera from '../EstaditicasCabecera';
import ConceptosMaximos from './ConceptosMaximos/ConceptosMaximos';
import CategoriaMaxima from './CategoriaMaxima/CategoriaMaxima';
import Handelstorage from '../../../Storage/handelstorage';
import AguardandoRespuesta from '../../AguardandoRespuesta/AguardandoRespuesta';
import './estadisticagasto.css'
import {  Space,Divider,Button } from 'antd'
function EstadisticasGasto(){
    const navigate=useNavigate()
    const [imagen, setImagen] = useState(null);
    const [datosperiodomaximos,setDatosperiodomaximos]=useState([])
    const [datos15dias,setDatos15dias]=useState([])
    const [datosconceptos,setDatosconceptos]=useState([])
    const [datoscategoriamaximo,setDatoscategoriamaximo]=useState([])
    const [cargacompleta,setCargacompleta]=useState(false)
    
    const [cargarestadisticas,setCargarestadisticas]=useState(false)
    const [titulocabecera,setTitulocabecera]=useState('ESTADISTICAS DE GASTOS')
    const [peticionresuelta,setPeticionresuelta]=useState(false)
    
    useEffect(() => {
        
        const cargardatos = async () => {
            const datestorage=Handelstorage('obtenerstats');
            
            const anno_stats=datestorage['dataanno']
            setPeticionresuelta(true)
            const body = {};
            const endpoint='EstadisticasEgresos/'+anno_stats+'/0/'
            const result = await Generarpeticion(endpoint, 'POST', body);
            
            const respuesta=result['resp']
            
            if (respuesta === 200) {
                
                // -----DATOS PARA PERIODOS MAXIMOS---
                const datosperiodo=result['data']['DatosPeriodoGasto']
                const img=datosperiodo[0]['DatosMaximoGasto'][0]['grafico']
                const periodo=datosperiodo[0]['DatosMaximoGasto'][0]['Periodo']
                const promedio=datosperiodo[0]['DatosMaximoGasto'][0]['PromedioGasto']
                const monto=datosperiodo[0]['DatosMaximoGasto'][0]['SumaMonto']
                const cantidad=datosperiodo[0]['DatosMaximoGasto'][0]['CantidadRegistros']
                const cantidadper=datosperiodo[0]['DatosMaximoGasto'][0]['CantidadPeriodos']
                const datos={periodo:periodo,promedio:promedio,monto:monto,cantidad:cantidad,cantidadper:cantidadper,imagen:img}
                setDatosperiodomaximos(datos)
               

                // -----DATOS PARA 15 dias---

               
                const datosmayoria=result['data']['DataComportamientoGasto'][0]['DatosMayoCategoria'][0]
                const detalles=result['data']['DataComportamientoGasto'][1]['DetallePeriodo']
                const grafico=result['data']['DataComportamientoGasto'][2]['grafico']
                const data15={
                    DatosMayorCategoria:datosmayoria,
                    detalles:detalles,
                    grafico:grafico
                }
                
                setDatos15dias(data15)

                //---- DATOS POR CONCEPTOS MAXIMOS----
             
                const dataconceptosmaximo={
                    datosconceptomaximo:result['data']['DatosConceptoGasto'][0].DatosConceptoGastoMaximo,
                    detalleconceptomaximo:result['data']['DatosConceptoGasto'][1].DetalleConceptoGastoMaximo,
                    imagenconceptomaximo:result['data']['DatosConceptoGasto'][2].grafico
                }
                setDatosconceptos(dataconceptosmaximo)
                
                

                //---- DATOS POR CATEGORIAS MAXIMAS----
            
                setImagen(result['data']['DatosCategoriaGasto'][2].grafico)

                const datacategoriamaximo={
                    datoscategoriamaxima:result['data']['DatosCategoriaGasto'][0].DatosCategoriaGastoMaximo,
                    detallecategoriamaximo:result['data']['DatosCategoriaGasto'][1].DetalleCategoriaGastoMaximo,
                    imagencategoriamaximo:result['data']['DatosCategoriaGasto'][2].grafico
                }
                setDatoscategoriamaximo(datacategoriamaximo)
                setCargacompleta(true)
                setPeticionresuelta(false)

                
            }else if(respuesta === 403 || respuesta === 401){
              
              
              navigate('/Closesesion')

          }
            
            
          };
          
    
        cargardatos();
      }, [cargarestadisticas]);

    return(
        
        <div className='principal-estadistica-egreso'>
            
            <EstadisticasCabecera 
            cargarestadisticas={cargarestadisticas}
            setCargarestadisticas={setCargarestadisticas} 
            
            titulocabecera={titulocabecera}

            ></EstadisticasCabecera>

            <Divider dashed  orientation="left" plain style={{fontSize:'15px',fontWeight: 'bold', fontStyle: 'italic'}}> 
            Comportamiento Gastos cada 15 primeros dias</Divider>

            {!peticionresuelta && cargacompleta &&(<Comportamiento datos15dias={datos15dias}></Comportamiento>
            )}
            
            <Divider dashed  orientation="left" plain style={{fontSize:'15px',fontWeight: 'bold', fontStyle: 'italic'}}> 
            Gastos por Meses</Divider>

            {!peticionresuelta && cargacompleta &&(<PeriodosMaximos datosperiodomaximos={datosperiodomaximos}></PeriodosMaximos>)}
        
            
            <Divider dashed  orientation="left" plain style={{fontSize:'15px',fontWeight: 'bold', fontStyle: 'italic'}}> 
            Gastos por Conceptos</Divider>

            {!peticionresuelta && cargacompleta &&(<ConceptosMaximos datosconceptos={datosconceptos}></ConceptosMaximos>)}


            <Divider dashed  orientation="left" plain style={{fontSize:'15px',fontWeight: 'bold', fontStyle: 'italic'}}> 
            Gastos por Categorias</Divider>

            {!peticionresuelta && cargacompleta &&(<CategoriaMaxima datoscategoriamaximo={datoscategoriamaximo}></CategoriaMaxima>)}

        

            {/* {spindatos &&(
                <Cargadatos setSpindato={setSpindato}></Cargadatos>
              )
    
              } */}

            {peticionresuelta &&(
                <AguardandoRespuesta ></AguardandoRespuesta>
            )

            }
        </div>
    )


}

export default EstadisticasGasto
