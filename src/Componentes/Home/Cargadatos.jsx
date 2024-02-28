import React, {useEffect, useState} from 'react';



import { Progress  } from 'antd';

import './cargadatos.css'

const conicColors = {
    '0%': '#87d068',
    '50%': '#ffe58f',
    '100%': '#ffccc7',
  };
function Cargadatos({setSpindato}){

    const[percent, setPercent] = useState(0);
    const[textvalor,setTexttextvalor]=useState('Procesando')

    const increase = () => {
        
    
            setPercent((prevPercent) => {
                const newPercent = prevPercent + 10;
                
      
                if (newPercent > 100) { 
                    
                    setTexttextvalor('Listo!!')
                    
                  return 100
                  
                }
      
                return newPercent;
              });
          
      };

      useEffect(() => {
        const intervalo = setInterval(() => {
          
          increase();
        }, 80); 

        setTimeout(() => {
          clearInterval(intervalo);
          setSpindato(false)
          
        }, 1000);
        
        return () => clearInterval(intervalo);
      }, []);

    

        return(
            <div className='oscurecer-contenido-progress'>
                
                <Progress 
                percent={percent} type="circle" 
                strokeColor={conicColors}
                />
                <h6 className='letras'> {textvalor} </h6>
            </div>
        )
    

}
export default Cargadatos