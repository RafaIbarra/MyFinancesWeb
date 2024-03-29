import React,{useState,useEffect} from "react";
import { Card, Col, Row } from 'antd';

import './opcioneslanding.css'
function OpcionesLanding(){
    return(
        <div className="">

           <div className="contenedor-datos">
            <h3 style={{marginLeft:'40%',paddingTop:'5px'}}>Organizacion de datos</h3>
            <Row gutter={16}>
                    <Col span={8}>
                    <Card title="Conceptos de ingresos personalizados" bordered={false} style={{backgroundColor:'inherit'}}>
                        <p className="formato-texto-opciones">* Divida sus ingresos en tipos</p>
                        <p  className="formato-texto-opciones">* Cree conceptos de acuerdo a sus necesidades</p>
                        <p  className="formato-texto-opciones">* Obtenga totales de acuerdo los ingresos creados</p>
                    </Card>
                    </Col>
                    <Col span={8}>
                    <Card title="Categorizacion de Gastos" bordered={false} style={{backgroundColor:'inherit'}}>
                        <p className="formato-texto-opciones" >* Establezca categorias que le faciliten el control y manejo</p>
                        <p className="formato-texto-opciones" >* Identificación de patrones de gasto</p>
                        <p className="formato-texto-opciones" >* Priorización de gastos</p>
                        
                        
                    </Card> 
                    </Col>
                    <Col span={8}>
                    <Card title="Conceptos de gastos personalizados" bordered={false}style={{backgroundColor:'inherit'}}>
                        <p className="formato-texto-opciones">* Conceptos de gastos descriptivos</p>
                        <p className="formato-texto-opciones">* Relacion directa entre el concepto y la categoria</p>
                        <p className="formato-texto-opciones">* Seguimiento y control de los gastos en detalle</p>
                        
                    </Card>
                    </Col>
                </Row>
           </div>

           <div className="contenedor-datos" style={{width:'80%',marginTop:'5%'}}>
            <h3 style={{marginLeft:'45%',paddingTop:'5px'}}>Resultados</h3>
            <Row gutter={16}>
                    <Col span={8}>
                    <Card title="Datos de Ingresos" bordered={false} style={{backgroundColor:'inherit'}}>
                        <p className="formato-texto-opciones">* Total de ingresos por conceptos definidos</p>
                        <p className="formato-texto-opciones">* Total de ingresos por meses</p>
                        <p className="formato-texto-opciones">* Total de ingresos por periodos</p>
                    </Card>
                    </Col>
                    <Col span={8}>
                    <Card title="Datos de Gastos" bordered={false} style={{backgroundColor:'inherit'}}>
                        <p className="formato-texto-opciones">* Total de gastos por categorias</p>
                        <p className="formato-texto-opciones">* Total de gastos por conceptos</p>
                        <p className="formato-texto-opciones">* Total de gastos por meses o anuales</p>
                        
                        
                    </Card>
                    </Col>
                    <Col span={8}>
                    <Card title="Estado de cuenta" bordered={false}style={{backgroundColor:'inherit'}}>
                        <p className="formato-texto-opciones">* Relacion Ingresos Vs Gastos</p>
                        <p className="formato-texto-opciones">* Saldos por meses</p>
                        <p className="formato-texto-opciones">* Saldos por periodos</p>
                        
                    </Card>
                    </Col>
                </Row>
           </div>
           
           <div className="contenedor-datos" style={{width:'80%',marginTop:'5%'}}>
            <h3 style={{marginLeft:'42%',paddingTop:'5px'}}>Datos estadisticos</h3>
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

