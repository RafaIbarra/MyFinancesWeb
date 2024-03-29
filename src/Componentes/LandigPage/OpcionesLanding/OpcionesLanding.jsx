import React,{useState,useEffect} from "react";
import { Card, Col, Row } from 'antd';

import './opcioneslanding.css'
function OpcionesLanding(){
    return(
        <div className="">

           <div style={{width:'80%'}}>
            <h3 style={{marginLeft:'40%'}}>Organizacion de datos</h3>
            <Row gutter={16}>
                    <Col span={8}>
                    <Card title="Conceptos de ingresos personalizados" bordered={false} style={{backgroundColor:'inherit'}}>
                        <p>* Divida sus ingresos en tipos</p>
                        <p>* Cree conceptos de acuerdo a sus necesidades</p>
                        <p>* Obtenga totales de acuerdo los ingresos creados</p>
                    </Card>
                    </Col>
                    <Col span={8}>
                    <Card title="Categorizacion de Gastos" bordered={false} style={{backgroundColor:'inherit'}}>
                        <p>* Establezca categorias que le faciliten el control y manejo</p>
                        <p>* Identificación de patrones de gasto</p>
                        <p>* Priorización de gastos</p>
                        
                        
                    </Card>
                    </Col>
                    <Col span={8}>
                    <Card title="Conceptos de gastos personalizados" bordered={false}style={{backgroundColor:'inherit'}}>
                        <p>* Conceptos de gastos descriptivos</p>
                        <p>* Relacion directa entre el concepto y la categoria</p>
                        <p>* Seguimiento y control de los gastos en detalle</p>
                        
                    </Card>
                    </Col>
                </Row>
           </div>

           <div style={{width:'80%',marginTop:'5%'}}>
            <h3 style={{marginLeft:'40%'}}>Resultados</h3>
            <Row gutter={16}>
                    <Col span={8}>
                    <Card title="Datos de Ingresos" bordered={false} style={{backgroundColor:'inherit'}}>
                        <p>* Total de ingresos por conceptos definidos</p>
                        <p>* Total de ingresos por meses</p>
                        <p>* Total de ingresos por periodos</p>
                    </Card>
                    </Col>
                    <Col span={8}>
                    <Card title="Datos de Gastos" bordered={false} style={{backgroundColor:'inherit'}}>
                        <p>* Total de gastos por categorias</p>
                        <p>* Total de gastos por conceptos</p>
                        <p>* Total de gastos por meses o anuales</p>
                        
                        
                    </Card>
                    </Col>
                    <Col span={8}>
                    <Card title="Estado de cuenta" bordered={false}style={{backgroundColor:'inherit'}}>
                        <p>* Relacion Ingresos Vs Gastos</p>
                        <p>* Saldos por meses</p>
                        <p>* Saldos por periodos</p>
                        
                    </Card>
                    </Col>
                </Row>
           </div>
           <div style={{width:'80%',marginTop:'5%'}}>
            <h3 style={{marginLeft:'40%'}}>Datos estadisticos</h3>
            <Row gutter={16}>
                    <Col span={8}>
                    <Card title="Ingresos" bordered={false} style={{backgroundColor:'inherit'}}>
                        <div className="opciones-div-imagenes">
                            <img src="/estadistica-ingreso2.png" alt="Ejemplo" className="opciones-imagen" />
                        </div>
                    </Card>
                    </Col>
                    <Col span={8}>
                    <Card title="Gastos" bordered={false} style={{backgroundColor:'inherit'}}>
                        <div className="opciones-div-imagenes">

                            <img src="/estadistica-egreso2.png" alt="Ejemplo" className="opciones-imagen" />
                        </div>
                        
                        
                    </Card>
                    </Col>
                    <Col span={8}>
                    <Card title="Saldos" bordered={false}style={{backgroundColor:'inherit'}}>
                        <div className="opciones-div-imagenes">

                            <img src="/estadistica-saldos2.png" alt="Ejemplo" className="opciones-imagen" />
                        </div>
                        
                    </Card>
                    </Col>
                </Row>
           </div>
          
        </div>
    )
}

export default OpcionesLanding

