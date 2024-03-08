import React, {useEffect, useState} from 'react';
import './categoriamaxima.css'

function CategoriaMaxima({datoscategoriamaximo}){


    const [imagencategoria, setImagencategoria] = useState(null);
    const [categoriamax,setCategoriamax]=useState(0)
    const [categoriacantregistromax,setCategoriacantregistromax]=useState(0)
    const [categoriamontomaximo,setCategoriamontomaximo]=useState(0)


    const [categoriadetallemonto,setCategoriadetallemonto]=useState(0)
    const [categoriadetalleperiodo,setCategoriadetalleperiodo]=useState(0)
    const [categoriadetallefecha,setCategoriadetallefecha]=useState(0)
    const [categoriadetallefecharegistro,setCategoriadetallefecharegistro]=useState(0)

    useEffect(() => {
        
        const cargardatos =  () => {
            
            
            
            setImagencategoria(datoscategoriamaximo.imagencategoriamaximo)
            setCategoriamax(datoscategoriamaximo.datoscategoriamaxima[0]['Categoria'])
            setCategoriacantregistromax(datoscategoriamaximo.datoscategoriamaxima[0]['cantidad']) 
            setCategoriamontomaximo(datoscategoriamaximo.datoscategoriamaxima[0]['Monto'])

            
            setCategoriadetallemonto(datoscategoriamaximo.detallecategoriamaximo[0]['Monto'])
            setCategoriadetalleperiodo(datoscategoriamaximo.detallecategoriamaximo[0]['Periodo'])
            setCategoriadetallefecha(datoscategoriamaximo.detallecategoriamaximo[0]['fecha_gasto'])
            setCategoriadetallefecharegistro(datoscategoriamaximo.detallecategoriamaximo[0]['fecha_registro'])
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
        <div className='contenedor-flex-estadistica-categoria'>
            
            <div className='contenedor-estadistica-categoria-texto'>
                <p style={{width: '100%'}}>
                    { `La categoria en la que mas gasto se ha registrado fue `}
                    <strong><em>{`${categoriamax}. `}</em></strong>
                    { `Con un total de:  `}
                    <strong><em>{` Gs. ${Number(categoriamontomaximo).toLocaleString('es-ES')}, `} </em></strong>
                    { `con  ${categoriacantregistromax} registros. `}
                    { `En el periodo en el que mas se ha gastado por esta categoria fue `}
                    <strong><em>{`${categoriadetalleperiodo}. `}</em></strong>
                    { `, en fecha : `} <strong><em>{`${categoriadetallefecha}, `}</em></strong>
                    { `cargado el  ${categoriadetallefecharegistro} . El monto registrado fue  `}
                    <strong><em>{`Gs. ${Number(categoriadetallemonto).toLocaleString('es-ES')}.`} </em></strong>
                
                </p>
            </div>
            <div className='contenedor-imagen-categoria'>

                    <img 
                        src={`data:image/png;base64,${imagencategoria}`}
                        alt="Descripción de la imagen"
                        className='imagen-categoria'
                    />
            </div>
        </div>
    )
}

export default CategoriaMaxima