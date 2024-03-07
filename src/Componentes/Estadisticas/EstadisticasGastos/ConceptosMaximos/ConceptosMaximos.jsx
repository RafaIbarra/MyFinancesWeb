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
            setCantregistromax(datosconceptos.datosconceptomaximo[0]['Monto'])
            setMontomaximo(datosconceptos.datosconceptomaximo[0]['cantidad'])

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
        <div>
            <div>
                <p>detalle</p>
            </div>
            <div>
            <img 
                    src={`data:image/png;base64,${imagen}`}
                    alt="Descripción de la imagen"
                    className='imagen-periodo'
                />
            </div>
        </div>
    )

}
export default ConceptosMaximos