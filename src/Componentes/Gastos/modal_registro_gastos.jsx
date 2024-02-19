import React, {useEffect, useState} from 'react';
import {Button,Form,Input,InputNumber,Radio,Modal } from 'antd';
import Generarpeticion from '../../peticiones/apipeticiones';

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

function ModalRegistroGasto({
    openregistrogasto,setOpenregistrogasto,
    detalleselecciongasto,modoediciongasto,
    cargarcomponentesgasto,setCargarcomponentesgasto
}){

    const [open, setOpen] = useState(openregistrogasto);
    const [titulogasto,setTitulogasto]=useState('')

    const [codigogasto, setCodigogasto]=useState(0)
    const [tipogasto,setTipogasto]=useState(0)
    const [categoriagasto,setCategoriagasto]=useState(0)
    const [nombregasto,setNombregasto]=useState('')

    const [valoresdefaultgasto,setValoresdefaultgasto]=useState([])
    const [marcatipogasto,setMarcatipogasto]=useState('0')
    const [marcacategoriagasto,setMarcacategoriagasto]=useState('0')

    const [modoactualizaciongasto,setModoactualizaciongasto]=useState(false)
    const [ready, setReady]=useState(false)

    const cargarvaloresdefault=()=>{
    
        if(Object.keys(detalleselecciongasto).length>0){
  
            setCodigogasto(detalleselecciongasto[0]['id'])
            // setTipoproducto(detalleselecciongasto[0]['tipoproducto'])
            setNombregasto(detalleselecciongasto[0]['nombre_gasto'])
            
            
            setModoactualizaciongasto(true)     
            setValoresdefaultgasto(detalleselecciongasto)
            setMarcatipogasto(detalleselecciongasto[0]['tipogasto'])
            setMarcacategoriagasto(detalleselecciongasto[0]['categoria'])


            
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

    const seleccioncategoria=(event)=>{
            const valor=parseInt(event.target.value)
            setCategoriagasto(valor)
            
            
        }
    const cargar_nombre_gasto=(event)=>{
        setNombregasto(event.target.value)

        }

    const registro_gasto = async () => {
    
        const datosregistrar = {
            codigoproducto:codigoproducto,
            tipoproducto:tipoproducto,
            nombre:nombreproducto
        

        };
        const endpoint='RegistroProductoFinanciero/'
        const result = await Generarpeticion(endpoint, 'POST', datosregistrar);
        
        const respuesta=result['resp']
        if (respuesta === 200) {
            await new Promise(resolve => setTimeout(resolve, 2000))
            const registros=result['data']
            
            setCargarcomponentesgasto(!cargarcomponentesgasto)
            setOpenregistrogasto(false)
            
        } else {
            
            
            // navigate('/');
        }
        };

    useEffect(() => {

        const cargardatos =  () => {
            
            
            
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

                        <Form.Item label="Categoria Gasto">
                            <Radio.Group onChange={seleccioncategoria} defaultValue={marcacategoriagasto}>
                            <Radio value="1" disabled={modoediciongasto}> Productos </Radio>
                            <Radio value="2" disabled={modoediciongasto} > Servicios </Radio>
                            </Radio.Group>
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