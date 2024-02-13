import React, {useEffect, useState} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Resumen from './Resumen/resumenv2';
import DetalleEgreso from './DetalleEgresos/detalleegreso';
import DetalleIngreso from './DetalleIngresos/detalleingreso';
import Resumengrafico from './Resumen/resumengrafico';
// const Tabs = ({ tabs }) => {
//   const [activeTab, setActiveTab] = useState(0);

//   const handleTabClick = (index) => {
//     setActiveTab(index);
//   };

//   return (
//     <div>
//       <div style={{ display: 'flex' }}>
//         {tabs.map((tab, index) => (
//           <div
//             key={index}
//             onClick={() => handleTabClick(index)}
//             style={{
//               padding: '10px',
//               cursor: 'pointer',
//               borderBottom: activeTab === index ? '2px solid blue' : '2px solid transparent',
//             }}
//           >
//             {tab.title}
//           </div>
//         ))}
//       </div>
//       <div>
//         {tabs[activeTab].content}
//       </div>
//     </div>
//   );
// };



function Home (){

    const[mes,Setmes]=useState(2)
    const[anno,Setanno]=useState(2024)
    
    
    // const tabs = [
    //   { title: 'Resumen Movimientos', content: <Resumen anno={anno} mes={mes} ></Resumen> },
    //   { title: 'Detalle de Ingresos', content: <div>Contenido de la pestaña 2</div> },
    //   { title: 'Detalle de Egresos', content: <div>Contenido de la pestaña 3</div> },
    // ];


    
    return(
        <div style={{ width:'100%'}}>
            
            
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="home" title="Resumen Movimientos">
                  <Resumen anno={anno} mes={mes} ></Resumen>
                </Tab>
                <Tab eventKey="profile" title="Detalle de Ingresos">
                  <DetalleIngreso anno={anno} mes={mes} ></DetalleIngreso>
                </Tab>
                <Tab eventKey="contact" title="Detalle de Egresos" >
                  <DetalleEgreso anno={anno} mes={mes} ></DetalleEgreso>
                </Tab>
              </Tabs>
            {/* <Resumengrafico anno={anno} mes={mes}></Resumengrafico> */}
        </div>
    )

}

export default Home