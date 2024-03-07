import React, {useEffect, useState} from 'react';
import './conceptosmaximos.css'
function ConceptosMaximos({datosconceptos}){
    const [imagen, setImagen] = useState(null);
    const [conceptomax,setConceptomax]=useState(0)
    const [cantregistromax,setCantregistromax]=useState(0)
    const [montomaximo,setMontomaximo]=useState(0)


    const [detallemonto,setDetallemonto]=useState(0)
    const [detalleperiodo,setDetalleperiodo]=useState(0)
    const [detallefecha,setDetallefecha]=useState(0)
    const [detallefecharegistro,setDetallefecharegistro]=useState(0)


    useEffect(() => {
        
        const cargardatos =  () => {
            
            
            console.log(datosconceptos)
            setImagen(datosconceptos.imagenconceptomaximo)
            setConceptomax(datosconceptos.datosconceptomaximo[0]['Concepto'])
            setCantregistromax(datosconceptos.datosconceptomaximo[0]['cantidad']) 
            setMontomaximo(datosconceptos.datosconceptomaximo[0]['Monto'])

            console.log(datosconceptos.detalleconceptomaximo[0]['Monto'])
            setDetallemonto(datosconceptos.detalleconceptomaximo[0]['Monto'])
            setDetalleperiodo(datosconceptos.detalleconceptomaximo[0]['Periodo'])
            setDetallefecha(datosconceptos.detalleconceptomaximo[0]['fecha_gasto'])
            setDetallefecharegistro(datosconceptos.detalleconceptomaximo[0]['fecha_registro'])
            // setCantregistromax()
            // setMontomaximo()

            // setDetallemonto()
            // setDetalleperiodo()
            // setDetallefecha()
            // setDetallefecharegistro()

  
            
          };
          
    
        cargardatos();
      }, []);
    return(
        // conceptomax
        <div className='contenedor-flex-estadistica-concepto'>
            
            <div className='contenedor-estadistica-concepto-texto'>
                <p style={{width: '100%'}}>
                    { `El concepto en el que mas gasto se ha registrado fue `}
                    <strong><em>{`${conceptomax}. `}</em></strong>
                    { `Con un total de:  `}
                    <strong><em>{` Gs. ${Number(montomaximo).toLocaleString('es-ES')}, `} </em></strong>
                    { `con  ${cantregistromax} registros. `}
                    { `En el periodo en el que mas se ha gastado por este concepto fue `}
                    <strong><em>{`${detalleperiodo}. `}</em></strong>
                    { `, en fecha : `} <strong><em>{`${detallefecha}, `}</em></strong>
                    { `cargado el  ${detallefecharegistro} . El monto registrado fue  `}
                    <strong><em>{`Gs. ${Number(detallemonto).toLocaleString('es-ES')}.`} </em></strong>
                
                </p>
            </div>
            <div className='contenedor-imagen-concepto'>

                    <img 
                        src={`data:image/png;base64,${imagen}`}
                        alt="Descripción de la imagen"
                        className='imagen-concepto'
                    />
            </div>
        </div>
    )

}
export default ConceptosMaximos