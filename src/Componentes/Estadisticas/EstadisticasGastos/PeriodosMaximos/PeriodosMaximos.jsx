import React, {useEffect, useState} from 'react';
import './periodomaximo.css'
function PeriodosMaximos({datosperiodomaximos}){
    const [imagen, setImagen] = useState(null);
    const [periodomax,setPeriodomax]=useState(0)
    const [cantregistromax,setCantregistromax]=useState(0)
    const [montomaximo,setMontomaximo]=useState(0)
    const [promediomaximo,setPromediomaximo]=useState(0)
    const [cantidadperiodos,setCantidadperiodos]=useState(0)

    useEffect(() => {
        
        const cargardatos =  () => {
            
            
            setImagen(datosperiodomaximos['imagen'])
            setPeriodomax(datosperiodomaximos.periodo)
            setCantregistromax(datosperiodomaximos.cantidad)
            setMontomaximo(datosperiodomaximos.monto)
            setPromediomaximo(datosperiodomaximos.promedio)
            setCantidadperiodos(datosperiodomaximos.cantidadper)
            
               

  
            
          };
          
    
        cargardatos();
      }, []);

    return(
        <div className='contenedor-flex-estadistica-periodo'>


            <div className='contenedor-estadistica-periodo-texto'>

                <p style={{width: '100%'}}>
                    { `El monto maximo gastado en un periodo fue de `}
                    <strong><em>{` Gs. ${Number(montomaximo).toLocaleString('es-ES')}`}. </em></strong>
                    { `Se dio en el periodo `}
                    <strong><em>{`${periodomax}. `}</em></strong>
                    { `Registrandose el gasto por ${cantregistromax} conceptos. Con un gasto promedio de `}
                    <strong><em>{`Gs. ${Number(promediomaximo).toLocaleString('es-ES')}`} </em></strong>
                    {`en estos ${cantidadperiodos} periodos.` }
               </p>
            </div>
            <div className='contenedor-imagen-periodo'>

                <img 
                    src={`data:image/png;base64,${imagen}`}
                    alt="Descripción de la imagen"
                    className='imagen-periodo'
                />
            </div>
        </div>
    )

}
export default PeriodosMaximos