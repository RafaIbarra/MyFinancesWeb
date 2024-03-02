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

function ModalRegistroCategoria({
    openregistrocategoria,setOpenregistrocategoria,
    detalleseleccioncategoria,modoedicioncategoria,
    cargarcomponentecategoria,setCargarcomponentecategoria
}
    
){
    const navigate=useNavigate()
    const [open, setOpen] = useState(openregistrocategoria);
    const [titulocategoria,setTitulocategoria]=useState('')

    const [codigocategoria, setCodigocategoria]=useState(0)
    
    const [nombrecategoria,setNombrecategoria]=useState('')

    const [valoresdefaultcategoria,setValoresdefaultcategoria]=useState([])
    
    

    const [modoactualizacioncategoria,setModoactualizacioncategoria]=useState(false)
    const [ready, setReady]=useState(false)

    const cargarvaloresdefault=()=>{
        
        if(Object.keys(detalleseleccioncategoria).length>0){
            
            setCodigocategoria(detalleseleccioncategoria[0]['id'])
            
            setNombrecategoria(detalleseleccioncategoria[0]['nombre_categoria'])
            
            
            setModoactualizacioncategoria(true)     
            setValoresdefaultcategoria(detalleseleccioncategoria)
            
            


            
            if(modoedicioncategoria===false){
            
                setTitulocategoria('ACTUALIZAR LA CATEGORIA')
            }
            else{
                setTitulocategoria('DETALLE DE LA CATEGORIA')
            }
    
    
        }else{
            setCodigocategoria(0)
            setTitulocategoria('AGREGAR UNA NUEVA CATEGORIA')
        }
    
        
      }

    const closemodal=()=>{
        setOpenregistrocategoria(false)
        setOpenregistrocategoria(false)
        setOpen(false)
        }
    const showModal = () => {
        setOpen(true);
        setOpenregistrocategoria(false)
        };
    const handleOk = () => {
        setOpen(false);
        setOpenregistrocategoria(false)
        };

    const handleCancel = () => {
        setOpen(false);
        setOpenregistrocategoria(false)
        };

    
    const cargar_nombre_categoria=(event)=>{
        setNombrecategoria(event.target.value)

        }

    const registro_categoria = async () => {
    
        const datosregistrar = {
            codigocategoria:codigocategoria,
            
            nombre:nombrecategoria
        

        };
        
        const endpoint='RegistroCategoria/'
        const result = await Generarpeticion(endpoint, 'POST', datosregistrar);
        
        const respuesta=result['resp']
        if (respuesta === 200) {
            await new Promise(resolve => setTimeout(resolve, 2000))
            const registros=result['data']
            
            setCargarcomponentecategoria(!cargarcomponentecategoria)
            setOpenregistrocategoria(false)
            
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

        const cargardatos =  async () => {


           
            cargarvaloresdefault()
            setReady(true)
            
            
        };
    
        cargardatos();
        }, []);


    if(ready){
        return(
            <div>
                <Modal
                
                open={open}
                title={titulocategoria}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                <>
                    {!modoedicioncategoria && (<Button onClick={closemodal}> Cancelar</Button>)}
                    {!modoedicioncategoria && ( <Button type="primary" onClick={registro_categoria}>Registrar</Button>)} 
                    {modoedicioncategoria && (<Button onClick={closemodal}> Cerrar</Button>)}
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
                        <Form.Item label="Cod Categoria"name="CodCategoria">
                                
                                <InputNumber 
                                    defaultValue={modoactualizacioncategoria ? valoresdefaultcategoria[0]['id'] : 0} 
                                    style={{width: '100%',}} disabled /> 
                        </Form.Item>

                        

                        
                        <Form.Item label="Nombre Categoria" name="NombreCategoria"
                                rules={[{
                                    required: true,
                                    message: 'Ingrese el nombre de la categoria!',
                                        },]}
                            >
                                <Input 
                                        placeholder="Nombre Categoria"
                                        onChange={cargar_nombre_categoria}
                                        disabled={modoedicioncategoria}
                                        defaultValue={modoactualizacioncategoria ? valoresdefaultcategoria[0]['nombre_categoria'] : ''} 
                                />
                            </Form.Item>

                        

                        {modoactualizacioncategoria && (
                            <Form.Item
                                label="Fecha Registro"
                                name="FechaRegistro"
                                disabled 
                                
                                >
                                
                                <InputNumber defaultValue={valoresdefaultcategoria[0]['fecha_registro'] }
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

export default ModalRegistroCategoria