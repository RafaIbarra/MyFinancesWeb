import React, {useEffect, useState} from 'react';
import { Button, Table, Typography,notification } from 'antd';
import { DeleteOutlined,RetweetOutlined,PlusCircleTwoTone,CheckOutlined,WarningOutlined,FilePdfOutlined } from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';
import jsPDF from 'jspdf';
import numeral from 'numeral';

import ModalEliminarIngreso from './Modales/modal_eliminar_ingreso';
import ModalRegistroIngreso from './Modales/modal_registro_ingreso';
import './detalleingreso.css'
import '../../../Componentes/estilosgenerales.css'

const { Text } = Typography;

function DetalleIngreso({dataingresos,setDataingresos,setDataresumen,setDatasaldos}){

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

    
  const [openeliminaringreso, setOpeneliminaringreso] = useState(false);
  const [openregistroingreso, setOpenregistroingreso] = useState(false);

  const [detalle,setDetalle]=useState(null)
  const [detalleseleccioningreso,setDetalleseleccioningreso]=useState([])
 
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [montototalingreso,setMontototalingreso]=useState(0)
  const [canttotalingreso,setCanttotalingreso]=useState(0)

  const [erroreliminarcion, setErroreliminacion]=useState(false)
  const [errorcantidadunica, setErrorcantidadunica]=useState(true)
  const [mesajecantidadunica, setMesajecantidadunica]=useState('')
  const [modoedicioningreso,setModoedicioningreso]=useState(false)

  const nuevo=()=>{
    setDetalleseleccioningreso([])
    setOpenregistroingreso(true)
    setModoedicioningreso(false)
    }


  const mensajeControlEliminacion = (placement) => {
    api.open({
        message: 'ERROR',
        
        description:
          'Debe seleccionar uno o mas registros de ingresos para eliminar!!.',
          placement,
        icon: (<WarningOutlined style={{color: 'red',}}/>
        ),
      });
    };
  const eliminar=()=>{
    
    setOpeneliminaringreso(true)
    
    } 

  const detalleregistro=()=>{
        
      const ultimoElemento = selectedRowKeys[selectedRowKeys.length - 1];
      
      const detallesel=detalle.filter((item) => item.id ===ultimoElemento)
      setDetalleseleccioningreso(detallesel)
      setOpenregistroingreso(true)
      setModoedicioningreso(true)

  

    }
  const actualizar=()=>{
        
      const ultimoElemento = selectedRowKeys[selectedRowKeys.length - 1];
      
      const detallesel=detalle.filter((item) => item.id ===ultimoElemento)
      setDetalleseleccioningreso(detallesel)
      setOpenregistroingreso(true)
      setModoedicioningreso(false)



    }


  const mensajeregistrounico = (placement,accion) => {
      
      api.open({
          message: 'ERROR',
          
          description:
          `Para la ${accion}  ${mesajecantidadunica}`,
          placement,
          icon: (<WarningOutlined style={{color: 'red',}}/>
          ),
        });
      };

  const columns=[
      { title: 'Descripcion',dataIndex: 'NombreIngreso',key: 'Descripcion_i'},
      { title: 'Tipo',dataIndex: 'TipoIngreso',key: 'Tipo_i'},
      { title: 'Ingreso',
        dataIndex: 'monto_ingreso',
        key: 'Ingreso_i',
        render: (monto_ingreso) => (
          <span>
            Gs. {Number(monto_ingreso).toLocaleString('es-ES')}
          </span>
        ),
      },
      { title: 'Fecha Ingreso',dataIndex: 'fecha_ingreso',key: 'FechaGasto_i'},
      { title: 'Fecha Registro',dataIndex: 'fecha_registro',key: 'FechaRegistro_i'},
      { title: 'Anotacion',dataIndex: 'anotacion',key: 'Anotacion_i'},
    ]
   
    
  useEffect(() => {
        setSelectedRowKeys([])
        const cargardatos =   () => {

                
  
          setErroreliminacion(true)
          setErrorcantidadunica(true)
          setMesajecantidadunica('seleccione el registro')
          setModoedicioningreso(false)
          const registros=dataingresos
          
          if(Object.keys(registros).length>0){
            registros.forEach((elemento) => {
              
              elemento.key = elemento.id;
            })
            let totalingreso=0
            let cantingreso=0
            registros.forEach(({ monto_ingreso }) => {totalingreso += monto_ingreso,cantingreso+=1})
            setMontototalingreso(totalingreso)
            setCanttotalingreso(cantingreso)
            
            setDetalle(registros)
            
          }
          else{
            setDetalle([])
            setMontototalingreso(0)
            setCanttotalingreso(0)
            
          }
          
          
          
        };
    
        cargardatos();
      }, [dataingresos]);
    


  const start = () => {
        setLoading(true);
        
        setTimeout(() => {setSelectedRowKeys([]);setLoading(false);}, 1000);
      };

  const onSelectChange = (newSelectedRowKeys) => {
        
      if(newSelectedRowKeys.length>0){
        setErroreliminacion(false)
      }else{
        setErroreliminacion(true)
      }

      if(newSelectedRowKeys.length ===1){
        
        setErrorcantidadunica(false)
      }else{
        
          setErrorcantidadunica(true)
          if(newSelectedRowKeys.length > 1){
            setMesajecantidadunica('solo debe seleccionar un registro.')
          }
          else{
            setMesajecantidadunica('seleccionar el registro')
          }
        }
       setSelectedRowKeys(newSelectedRowKeys);
        
    };
  const rowSelection = { selectedRowKeys, onChange: onSelectChange,};
  const [api, contextHolder] = notification.useNotification();
  const handleOk = () => {
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
    };


    const imprimir=()=>{
      
      const titulomes =dataingresos[0]['NombreMesIngreso']
      const tituloanno = dataingresos[0]['AnnoIngreso']
      const titulotext ='INGRESOS DEL MES DE ' + titulomes.toUpperCase() + ' DEL ' + tituloanno
      
      const doc = new jsPDF();
      const fechaHora = new Date().toLocaleString();

      // Agregar la fecha y hora en la parte superior derecha del documento
      doc.setFontSize(8);
      doc.text(fechaHora, doc.internal.pageSize.getWidth() - 10, 10, { align: 'right' });
      const titulo = titulotext;

      // Calcular la posición Y del título en el centro de la página
      const yTitulo = 10; // Supongamos que el título estará a 20 unidades desde arriba

      // Calcular la posición X del título en el centro de la página
      const xTitulo = doc.internal.pageSize.getWidth() / 2;

      // Agregar el título al documento
      doc.setFontSize(14);
      doc.text(titulo, xTitulo, yTitulo, { align: "center"});
      const titleX = doc.internal.pageSize.getWidth() / 2; // Posición X del título
      const titleY = 10.5; // Posición Y del título
      const titleWidth = doc.getStringUnitWidth(titulo) * 12 / doc.internal.scaleFactor; // Ancho del título
      doc.setLineWidth(0.5); // Grosor de la línea
      doc.setDrawColor(182, 212, 212)
      doc.line(titleX - (titleWidth/1.7 ), titleY + 2, titleX + (titleWidth/1.7), titleY + 2); // Dibujar línea debajo del título


      let x = 10;
      let y = 25;
      let numeroPagina = 1
      const claves = [
          'NombreIngreso', 'fecha_ingreso', 'fecha_registro', 'monto_ingreso', 'anotacion'
        ];

       // Función para agregar una nueva fila con el número de fila y las claves
      doc.setFontSize(8)
      const agregarEncabezado = (fila, claves) => {
          
          
          let encabezado = ['N°', ...claves]; // Agregar 'N° Orden' como primer elemento del encabezado
          encabezado.forEach((clave, index) => {
              let encabezado = ['N°', ...claves]; // Agregar 'N° Orden' como primer elemento del encabezado
              encabezado.forEach((clave, index) => {
              doc.setLineWidth(0)
              doc.setDrawColor(182, 212, 212)
              doc.line(x,y - 4,  x + 180,y - 4  )
              doc.text(clave, x + (index === 0 ? 0 : index * 30), y); // Agregar el texto en la posición correspondiente
              
              doc.line(x, y + 2, x + 180, y + 2)
              });
      });
      };

      // Función para agregar valores para cada clave en la fila siguiente
      doc.setFontSize(8)
      const agregarValores = (datos, fila, claves) => {
          
          if(fila===1){
              y += 10;
          }else{
              y += 10;
          }
           // Incrementar la posición Y para la siguiente fila
          doc.text(`${fila}`, x, y); // Agregar el número de fila en la primera columna
          claves.forEach((clave, index) => {
              let multiplo=0
              if (index===0){
                  multiplo=10
              }else{
                  multiplo=30
              }
              
              const value = clave === 'monto_ingreso' ? numeral(datos[clave]).format('0,0') : datos[clave];
            
              doc.text(`${value}`, x + ((index + 1) * multiplo), y);
          });
      };

      
      doc.setFontSize(8)
      agregarEncabezado('', claves);

      // Agregar valores para cada clave en la fila siguiente
      doc.setFontSize(8)
      dataingresos.forEach((dato, index) => {
          if(index==0){
              doc.text(`Página ${numeroPagina}`, doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 10, { align: 'right' }); 
              doc.setLineWidth(0.5);
              doc.setDrawColor(182, 212, 212)
              doc.line(10, doc.internal.pageSize.getHeight() - 14, doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 14);
          }
          // Verificar si es necesario agregar una nueva página
          if (y > 250) { // Cambia este valor según el tamaño de la página y el margen inferior deseado
              doc.addPage(); // Agregar una nueva página
              y = 10; // Restablecer la posición Y
              agregarEncabezado('N°', claves); // Volver a agregar el encabezado en la nueva página
              numeroPagina++; // Incrementamos el número de página
              doc.text(`Página ${numeroPagina}`, doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 10, { align: 'right' }); 
              doc.setLineWidth(0.5); // Establecer el grosor de la línea
              doc.setDrawColor(182, 212, 212)
              doc.line(10, doc.internal.pageSize.getHeight() - 14, doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 14); // Agregar línea horizontal
              }
          agregarValores(dato, index + 1, claves); // El número de fila comienza desde 1
      });
      
      

    
      doc.save('archivo_ingreso.pdf');
      
  
  }

    return(
        <div className='principal-container-detalle-ingreso'>
          {contextHolder}
          <h6 style={{padding:'5px',margin:'0px'}}>REGISTROS DE INGRESOS DEL MES</h6>
          <div className="linea-vertical"></div>
          <div className='container-detalle-ingreso-datos'>

              <div className='contenedor-tabla-detalle-ingreso'>
                  <Table rowSelection={rowSelection} 
                    
                    className='contenido-tabla-detalle-ingreso'
                    size="small"
                    columns={columns} 
                    dataSource={detalle} 
                    pagination={false}
                    bordered
                  />

              </div>


              <div className='contenedor-resumen-detalle-ingreso'>

                <FormItem style={{paddingTop:'5px',paddingLeft:'50%'}}>
                      <Text strong>CANTIDAD REGISTROS: </Text>
                      <Text strong>   {Number(canttotalingreso).toLocaleString('es-ES')}</Text>
                        
                    </FormItem>

                    <FormItem style={{paddingTop:'5px'}}>
                        <Text strong>TOTAL INGRESOS: </Text>
                        <Text strong>GS. {Number(montototalingreso).toLocaleString('es-ES')}</Text>
                        
                    </FormItem>

              </div>


              <div className='contenedor-flex-botonera-detalle-ingreso'>

                  <Button type="primary" 
                          icon={<CheckOutlined /> } 
                          className='botonera'
                          onClick={ errorcantidadunica ? () => mensajeregistrounico('top','vista detalle') : detalleregistro}
                          > Detalle
                  </Button>

                  <Button type="primary" 
                          icon={<DeleteOutlined/>} 
                          danger 
                          className='botonera'
                          onClick={ erroreliminarcion ? () => mensajeControlEliminacion('top') : eliminar}
                          > 
                          Eliminar 
                  </Button>
                      
                  <Button type="primary" 
                          icon={<RetweetOutlined/> }  
                          onClick={ errorcantidadunica ? () => mensajeregistrounico('top','actualizacion') : actualizar}
                          className='botonera'
                          >
                            Actualizar
                  </Button>
                  <Button type="primary"  className='botonera' icon={<FilePdfOutlined/>} onClick={imprimir}  >Imprimir</Button>
                  <Button type="primary"  className='botonera' icon={<PlusCircleTwoTone/>} onClick={nuevo} >Agregar</Button>

              </div>


          </div>
          
          {openeliminaringreso &&( <ModalEliminarIngreso 
                                      openeliminaringreso={openeliminaringreso}
                                      setOpeneliminaringreso={setOpeneliminaringreso}
                                      setDataingresos={setDataingresos}
                                      selectedRowKeys={selectedRowKeys}
                                      setDataresumen={setDataresumen}
                                      setDatasaldos={setDatasaldos}
                                    ></ModalEliminarIngreso>)}

              {openregistroingreso &&( <ModalRegistroIngreso 
                                        openregistroingreso={openregistroingreso} 
                                        setOpenregistroingreso={setOpenregistroingreso} 
                                        setDataingresos={setDataingresos}
                                        setDataresumen={setDataresumen}
                                        detalleseleccioningreso={detalleseleccioningreso}
                                        modoedicioningreso={modoedicioningreso}
                                        setDatasaldos={setDatasaldos}
                                        
                                        ></ModalRegistroIngreso>)}
        </div>
    )


}
export default DetalleIngreso