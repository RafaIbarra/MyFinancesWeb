import React, {useEffect, useState} from 'react';
import { Button, Table,Typography,notification,Space    } from 'antd';
import { DeleteOutlined,    RetweetOutlined  ,PlusCircleTwoTone,WarningOutlined,FilePdfOutlined,CheckOutlined } from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';
import numeral from 'numeral';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import './detalleegreso.css'
import ModalEliminarEgreso from './Modales/modal_eliminar_egreso'
import ModalRegistroEgreso from './Modales/modal_registro_egreso';
import GraficoEgresoso from './Grafico/graficoegresos';

import '../../../Componentes/estilosgenerales.css'
const { Text } = Typography;
function DetalleEgreso({dataegresos,setDataegresos,setDataresumen,setDatasaldos,
                        setImgresumen,setImgegresos,imgegresos})
{
    const [detalle,setDetalle]=useState(null)
    const [detalleseleccion,setDetalleseleccion]=useState([])

    const [openeliminaregreso, setOpeneliminaregreso] = useState(false);
    const [openregistroegreso, setOpenregistroegreso] = useState(false);
    
    const [loading, setLoading] = useState(false);
  
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [montototalegreso,setMontototalegreso]=useState(0)
    const [canttotalegreso,setcanttotalegreso]=useState(0)

    const [erroreliminarcion, setErroreliminacion]=useState(false)
    const [errorcantidadunica, setErrorcantidadunica]=useState(true)
    const [mesajecantidadunica, setMesajecantidadunica]=useState('')
    const [modoedicion,setModoedicion]=useState(false)
    const [categoriasagrupadas,setCategoriasagrupadas]=useState([])
    const [valoresseleccion,setValoresseleccion]=useState(0)
    const [cantidadseleccion,setCantidadseleccion]=useState(0)
    const columns=[
      
        { title: 'Descripcion',
          dataIndex: 'NombreGasto',
          key: 'DetalleEgreso_Descripcion',
          sorter: (a, b) => a.NombreGasto.localeCompare(b.NombreGasto),
          width: 230,
          
        },
        { title: 'Tipo',
          dataIndex: 'TipoGasto',
          key: 'DetalleEgreso_Tipo',
          filters: [
            {
              text: 'Ocasionales',
              value: 'Ocasionales',
            },
            {
              text: 'Fijo',
              value: 'Fijo',
            },
            
          ],
          onFilter: (value, record) => record.TipoGasto.indexOf(value) === 0,
        },
  
        { title: 'Categoria',
          dataIndex: 'CategoriaGasto', 
          key: 'DetalleEgreso_Categoria',
          filters: categoriasagrupadas.map(categoria => ({
            text: categoria,
            value: categoria,
          })),
  
          onFilter: (value, record) => record.CategoriaGasto.indexOf(value) === 0,
          sorter: (a, b) => a.CategoriaGasto.localeCompare(b.CategoriaGasto),
  
        },
  
        { title: 'Egreso',
          dataIndex: 'monto_gasto',
          key: 'DetalleEgreso_Egreso',
          sorter: (a, b) => a.monto_gasto - b.monto_gasto,
          render: (monto_gasto) => (
            <span>
              {/* Gs. {Number(monto_gasto).toLocaleString('es-ES')} */}
              Gs. {numeral(monto_gasto).format('0,0')}
            </span>
          ),
        },
        { title: 'Fecha Gasto',
          dataIndex: 'fecha_gasto',
          key: 'DetalleEgreso_FechaGasto',
          sorter: (a, b) => new Date(a.fecha_gasto) - new Date(b.fecha_gasto),
        }
        ,
  
        { title: 'Fecha Registro',
          dataIndex: 'fecha_registro',
          key: 'DetalleEgreso_FechaRegistro',
  
          sorter: (a, b) => new Date(a.fecha_registro) - new Date(b.fecha_registro),
        },
        
      ]
      
  
      
    useEffect(() => {
        
        const cargardatos =  () => {
            setSelectedRowKeys([])
            
            setErroreliminacion(true)
            setErrorcantidadunica(true)
            setMesajecantidadunica('seleccione el registro')
            setModoedicion(false)
            const registros=dataegresos

            if(Object.keys(registros).length>0){

            registros.forEach((elemento) => {
                
                elemento.key = elemento.id;
            })
            let totalgasto=0
            let cantgasto=0
            registros.forEach(({ monto_gasto }) => {totalgasto += monto_gasto,cantgasto+=1})
            setMontototalegreso(totalgasto)
            setcanttotalegreso(cantgasto)
            
            setDetalle(registros)
            const datos_categorias=[]
            const lista_categorias = registros.map(item => item.CategoriaGasto);
            lista_categorias.forEach(item => {
            
                if(lista_categorias.length===0){
                datos_categorias.push(item);

                }else {
                const existeValor = datos_categorias.some(elemento => elemento === item)
                if(!existeValor){
                    datos_categorias.push(item);
                }
                }
            })
            setCategoriasagrupadas(datos_categorias)

            }else{
            setDetalle([])
            setMontototalegreso(0)
            setcanttotalegreso(0)
            setCategoriasagrupadas([])
            
            }
            setSelectedRowKeys([])
        

        
        };
    
        cargardatos();
    }, [dataegresos]);



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
        const resultadoFiltrado = detalle.filter(item => newSelectedRowKeys.includes(item.id))
        
        let totalgastosel=0
        let cantgastosel=0
        resultadoFiltrado.forEach(({ monto_gasto }) => {totalgastosel += monto_gasto,cantgastosel+=1})
        
        setSelectedRowKeys(newSelectedRowKeys);
        setValoresseleccion(totalgastosel)
        setCantidadseleccion(cantgastosel)
        
    };

    const rowSelection = { selectedRowKeys, onChange: onSelectChange,};
    
    const [api, contextHolder] = notification.useNotification();

    const mensajeControlEliminacion = (placement) => {
    api.open({
        message: 'ERROR',
        
        description:
            'Debe seleccionar uno o mas registros de egresos para eliminar!!.',
            placement,
        icon: (<WarningOutlined style={{color: 'red',}}/>
        ),
        });
    };
    

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

    const eliminar=()=>{
        setOpeneliminaregreso(true)
    }

    const actualizar=()=>{
        
        const ultimoElemento = selectedRowKeys[selectedRowKeys.length - 1];
        
        const detallesel=detalle.filter((item) => item.id ===ultimoElemento)
        
        setDetalleseleccion(detallesel)
        setOpenregistroegreso(true)
        setModoedicion(false)

    }

    const detalleregistro=()=>{
        
        const ultimoElemento = selectedRowKeys[selectedRowKeys.length - 1];
        
        const detallesel=detalle.filter((item) => item.id ===ultimoElemento)
        
        setDetalleseleccion(detallesel)
        setOpenregistroegreso(true)
        setModoedicion(true)



    }

    const nuevo=()=>{
        setDetalleseleccion([])
        setOpenregistroegreso(true)
        setModoedicion(false)
    }

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        }, 2000);
    };

    
    
    const handleCancel = () => {
        
        setOpen(false);
    };
    const formatNumber = (number) => {
        return number.toLocaleString('es-ES');
      };
    const imprimir=()=>{
        let valoresordenados=dataegresos
        valoresordenados.sort((a, b) => {
            // Primero ordenar por CategoriaGasto
            if (a.CategoriaGasto < b.CategoriaGasto) return -1;
            if (a.CategoriaGasto > b.CategoriaGasto) return 1;
          
            // Si las CategoriaGasto son iguales, ordenar por NombreGasto
            if (a.NombreGasto < b.NombreGasto) return -1;
            if (a.NombreGasto > b.NombreGasto) return 1;
          
            return 0;
          });
        

        const titulomes =valoresordenados[0]['NombreMesEgreso']
        const tituloanno = valoresordenados[0]['AnnoEgreso']
        const titulotext ='GATOS DEL MES DE ' + titulomes.toUpperCase() + ' DEL ' + tituloanno
        
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
            'NombreGasto', 'fecha_gasto', 'CategoriaGasto', 'monto_gasto', 'fecha_registro'
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
                
                const value = clave === 'monto_gasto' ? numeral(datos[clave]).format('0,0') : datos[clave];
            
                doc.text(`${value}`, x + ((index + 1) * multiplo), y);
            });
        };

        
        doc.setFontSize(8)
        agregarEncabezado('', claves);

        // Agregar valores para cada clave en la fila siguiente
        doc.setFontSize(8)
        valoresordenados.forEach((dato, index) => {
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
        
        

      
        doc.save('archivo_gastos.pdf');

        

        
        
        // const wb = XLSX.utils.book_new();
        // const ws = XLSX.utils.json_to_sheet(valoresordenados);

        // // Agregar la hoja de cálculo al libro
        // XLSX.utils.book_append_sheet(wb, ws, 'Datos');

        // // Generar el archivo Excel
        // XLSX.writeFile(wb, 'datos.xlsx');
        
    
    }
    return(
        <div className='principal-container-detalle-egreso'>
            {contextHolder}
            <div className='container-detalle-egreso-datos'>

                <div className='contenedor-tabla-detalle-egreso'>
                        <Table rowSelection={rowSelection} 
                     
                        columns={columns} 
                        size="small"
                        dataSource={detalle} 
                        pagination={false}
                        bordered
                        className='contenido-tabla-detalle-egreso'
                    />
                </div>

                <div className='contenedor-resumen-detalle-egreso'>
                    <div>
                        <p style={{fontSize:'11px',fontStyle:'italic',paddingTop:'3px', fontWeight:'bold',marginBottom:'0px' }}>
                        {valoresseleccion > 0 ? `Total valor seleccionado Gs. ${Number(valoresseleccion).toLocaleString('es-ES')}` : ""}
                        </p>

                        <p style={{fontSize:'11px',fontStyle:'italic', fontWeight:'bold' }}>
                        {valoresseleccion > 0 ? `Cant Registros: ${Number(cantidadseleccion).toLocaleString('es-ES')}` : ""}
                        </p>

                    </div>
                    <FormItem style={{paddingTop:'5px'}}>
                        <Text style={{fontSize:'small'}} strong>CANTIDAD REGISTROS: </Text>
                        <Text style={{fontSize:'small'}}  strong>   {Number(canttotalegreso).toLocaleString('es-ES')}</Text>
                        
                    </FormItem>

                    <FormItem style={{paddingTop:'5px'}}>
                        <Text style={{fontSize:'small'}}  strong>TOTAL EGRESOS: </Text>
                        <Text style={{fontSize:'small'}}  strong>GS. {Number(montototalegreso).toLocaleString('es-ES')}</Text>
                        
                    </FormItem>
                    
                </div>
                    
                <div className='contenedor-flex-botonera-detalle-egreso'>
                    <Button type="primary" 
                                className='botonera'
                                icon={<CheckOutlined /> } 
                                onClick={ errorcantidadunica ? () => mensajeregistrounico('top','vista detalle') : detalleregistro}
                                > 
                                
                                Detalle
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
                                className='botonera'
                                icon={<RetweetOutlined/> } 
                                onClick={ errorcantidadunica ? () => mensajeregistrounico('top','actualizacion') : actualizar}
                                > 
                                
                                Actualizar
                        </Button>
                        <Button type="primary"  className='botonera' icon={<FilePdfOutlined/>} onClick={imprimir}  >Imprimir</Button>
                        <Button type="primary" className='botonera' icon={<PlusCircleTwoTone/>} onClick={nuevo} >Agregar</Button>
                </div>
            </div>
            <div className='container-detalle-egreso-imagen'>
                <GraficoEgresoso dataegresos={dataegresos} imgegresos={imgegresos}></GraficoEgresoso>
            </div>
            {openeliminaregreso &&( <ModalEliminarEgreso openeliminaregreso={openeliminaregreso} 
                                                      setOpeneliminaregreso={setOpeneliminaregreso} 
                                                      setDataegresos={setDataegresos} 
                                                      setDataresumen={setDataresumen}
                                                      setDatasaldos={setDatasaldos} 
                                                      selectedRowKeys={selectedRowKeys}
                                                      setImgresumen={setImgresumen}
                                                      setImgegresos={setImgegresos}
                                        ></ModalEliminarEgreso>)}

            {openregistroegreso &&( <ModalRegistroEgreso openregistroegreso={openregistroegreso} 
                                        setOpenregistroegreso={setOpenregistroegreso} 
                                        setDataegresos={setDataegresos} 
                                        setDataresumen={setDataresumen}
                                        setDatasaldos={setDatasaldos} 
                                        detalleseleccion={detalleseleccion}
                                        modoedicion={modoedicion}
                                        setImgresumen={setImgresumen}
                                        setImgegresos={setImgegresos}
                                      ></ModalRegistroEgreso>)}
        </div>
    )


}

export default DetalleEgreso