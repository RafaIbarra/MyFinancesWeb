import React, {useEffect, useState} from 'react';



import { Spin,Progress  } from 'antd';


function Cargadatos({setSpindato}){

    const [percent, setPercent] = useState(0);

    useEffect(() => {

        

        
        const cargardatos = async () => {
            
            await new Promise(resolve => setTimeout(resolve, 1000))
            setSpindato(false)
            
          
        };
        cargardatos()
        
      }, []);

    

        return(
            <div className='oscurecer-contenido'>
                <Spin size="large"/>
                <Progress percent={percent} type="circle" />
                <h6> Procesando </h6>
            </div>
        )
    

}
export default Cargadatos