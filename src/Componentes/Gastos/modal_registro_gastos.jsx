import React, {useEffect, useState} from 'react';
import {Button,Form,Input,InputNumber,Radio,Modal,Typography,notification,Select } from 'antd';
import Generarpeticion from '../../peticiones/apipeticiones';
import { Navigate, useNavigate } from "react-router-dom";
import { WarningOutlined} from '@ant-design/icons';
const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };
const { Text } = Typography;
function ModalRegistroGasto({
    openregistrogasto,setOpenregistrogasto,
    detalleselecciongasto,modoediciongasto,
    cargarcomponentesgasto,setCargarcomponentesgasto
}){
    const navigate=useNavigate()
    const [open, setOpen] = useState(openregistrogasto);
    const [titulogasto,setTitulogasto]=useState('')

    const [codigogasto, setCodigogasto]=useState(0)
    const [tipogasto,setTipogasto]=useState(0)
    const [categoriagasto,setCategoriagasto]=useState(0)
    const [nombregasto,setNombregasto]=useState('')

    const [listacategorias,setListacategorias]=useState([])

    const [valoresdefaultgasto,setValoresdefaultgasto]=useState([])
    const [marcatipogasto,setMarcatipogasto]=useState('0')
    

    const [modoactualizaciongasto,setModoactualizaciongasto]=useState(false)
    const [ready, setReady]=useState(false)

    const cargarvaloresdefault=()=>{
    
        if(Object.keys(detalleselecciongasto).length>0){
            
            setCodigogasto(detalleselecciongasto[0]['id'])
            setTipogasto(detalleselecciongasto[0]['tipogasto'])
            setCategoriagasto(detalleselecciongasto[0]['categoria'])
            setNombregasto(detalleselecciongasto[0]['nombre_gasto'])
            
            
            setModoactualizaciongasto(true)     
            setValoresdefaultgasto(detalleselecciongasto)
            setMarcatipogasto(detalleselecciongasto[0]['tipogasto'].toString())
            


            
            if(modoediciongasto===false){
            
                setTitulogasto('ACTUALIZAR EL GASTO')
            }
            else{
                setTitulogasto('DETALLE DEL GASTO')
            }
    
    
        }else{
            setCodigogasto(0)
            setTitulogasto('AGREGAR UN NUEVO GASTO')
        }
    
        
      }

    const closemodal=()=>{
        setOpenregistrogasto(false)
        setOpenregistrogasto(false)
        setOpen(false)
        }
    const showModal = () => {
        setOpen(true);
        setOpenregistrogasto(false)
        };
    const handleOk = () => {
        setOpen(false);
        setOpenregistrogasto(false)
        };

    const handleCancel = () => {
        setOpen(false);
        setOpenregistrogasto(false)
        };

    const selecciontipogasto=(event)=>{
            const valor=parseInt(event.target.value)
            setTipogasto(valor)
            
            
        }

    const seleccioncategoria=(value)=>{
            const valor=parseInt(value)
            setCategoriagasto(valor)
            
            
        }
    const cargar_nombre_gasto=(event)=>{
        setNombregasto(event.target.value)

        }

    const registro_gasto = async () => {
    
        const datosregistrar = {
            codigogasto:codigogasto,
            tipogasto:tipogasto,
            categoria:categoriagasto,
            nombre:nombregasto
        

        };
        
        const endpoint='RegistroGasto/'
        const result = await Generarpeticion(endpoint, 'POST', datosregistrar);
        
        const respuesta=result['resp']
        if (respuesta === 200) {
            
            const registros=result['data']
            
            setCargarcomponentesgasto(!cargarcomponentesgasto)
            setOpenregistrogasto(false)
            
        } else if(respuesta === 403 || respuesta === 401){
            
            navigate('/Closesesion')

        }else {
            
            mostrarmensajeerror('top',result['data']['error'])
          }
    };

    const mostrarmensajeerror = (placement,mensaje) => {
        api.open({
            message: 'ERROR',
            description: ` ${mensaje}`,
            placement,
            icon: (<WarningOutlined style={{color: 'red',}}/>
            ),
            });
        };
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {

        const cargardatos = async () => {
            
            
            const body = {};
            const endpoint='MisCategorias/'
            const result = await Generarpeticion(endpoint, 'POST', body);

            const respuesta=result['resp']
            if (respuesta === 200) {
                
                setListacategorias(result['data'])
                cargarvaloresdefault()
                setReady(true)
            } else if(respuesta === 403 || respuesta === 401){
            
                navigate('/')
    
                }
            
        };
    
        cargardatos();
        }, []);

    if(ready){
        return(
            <div>
                <Modal
                
                open={open}
                title={titulogasto}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                <>
                    {!modoediciongasto && (<Button onClick={closemodal}> Cancelar</Button>)}
                    {!modoediciongasto && ( <Button type="primary" onClick={registro_gasto}>Registrar</Button>)} 
                    {modoediciongasto && (<Button onClick={closemodal}> Cerrar</Button>)}
                </>
                )}
                >

                    <Form
                        {...formItemLayout}
                        variant="filled"
                        style={{
                        maxWidth: 600,
                        }}
                    >   
                        <Form.Item>

                            {contextHolder}
                        </Form.Item>
                        <Form.Item label="Cod Gasto"name="CodGasto">
                                
                                <InputNumber 
                                    defaultValue={modoactualizaciongasto ? valoresdefaultgasto[0]['id'] : 0} 
                                    style={{width: '100%',}} disabled /> 
                        </Form.Item>

                        <Form.Item label="Tipo Gasto">
                            <Radio.Group onChange={selecciontipogasto} defaultValue={marcatipogasto}>
                            <Radio value="1" disabled={modoediciongasto}> Fijo </Radio>
                            <Radio value="2" disabled={modoediciongasto} > Ocasionales </Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item label="Categorias"name="Categorias"
                                   rules={[
                                       {
                                       required: true,
                                       message: 'Favor seleccione!',
                                       },
                                   ]}
                       >
                           <Select 
                                name="listacategoria" 
                                // value={categoriasel}
                                disabled={modoediciongasto}
                                defaultValue={modoactualizaciongasto ? valoresdefaultgasto[0]['DescripcionCategoriaGasto'] : ''} 
                                onChange={seleccioncategoria}
                                >
                               <Select.Option  value="">Seleccionar categoria</Select.Option>
                               {listacategorias &&  listacategorias.map((g) => (
                                   <Select.Option key={g.nombre_categoria+g.id } value={g.id}>
                                       {g.nombre_categoria}
                                   </Select.Option>
                               ))}
                           </Select>
                           
                       </Form.Item>

                        
                        <Form.Item label="Nombre Gastos" name="NombreGasto"
                                rules={[{
                                    required: true,
                                    message: 'Ingrese el nombre del gasto!',
                                        },]}
                            >
                                <Input 
                                        placeholder="Nombre Gastos"
                                        onChange={cargar_nombre_gasto}
                                        disabled={modoediciongasto}
                                        defaultValue={modoactualizaciongasto ? valoresdefaultgasto[0]['nombre_gasto'] : ''} 
                                />
                            </Form.Item>

                        

                        {modoactualizaciongasto && (
                            <Form.Item
                                label="Fecha Registro"
                                name="FechaRegistro"
                                disabled 
                                
                                >
                                
                                <InputNumber defaultValue={valoresdefaultgasto[0]['fecha_registro'] }
                                    style={{width: '100%',}} disabled /> 
                                </Form.Item>

                            )
                            }


                        


                    </Form>

                </Modal>



            
            </div>

        )
        }


}

export default ModalRegistroGasto