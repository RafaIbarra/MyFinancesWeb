import React, {useEffect, useState} from 'react';
import {Button,DatePicker,Form,Input,InputNumber,Select } from 'antd';
import Generarpeticion from '../../peticiones/apipeticiones';
import { FormatoFecha } from '../../Config/condfig';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';

const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
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
 


function RegistroEgreso (){
    const [fechaegreso, setFechaegreso] = useState(null);
    const[datosgastos,setDatosgastos]=useState(null)
    const[gasttosel,setGastosel]=useState(0)
    const[monto,setMonto]=useState(0)
    const[anotacion,setAnotacion]=useState('')

    const seleccionargasto=(value)=>{
        const valor= value;
        
        setGastosel(valor)

    }
    const seleccionarmonto=(value)=>{
        const valor= value;
        
        setMonto(valor)

    }
    const seleccionaranotacion=(event)=>{
        const valor= event.target.value;
        
        setAnotacion(valor)

    }
    const registrar_egreso = async () => {
        console.log(fechaegreso)
        // const formattedDesde = fechaegreso ? FormatoFecha(fechaegreso) : '';
        // console.log(formattedDesde)
        const datosregistrar = {
            gasto:gasttosel,
            monto:monto,
            fecha:fechaegreso,
            anotacion:anotacion,
            a:'d'

        };
        const endpoint='MisGastos/'
        const result = await Generarpeticion(endpoint, 'POST', body);
        
        const respuesta=result['resp']
        if (respuesta === 200) {
          setDatosgastos(result['data'])
          console.log(result['data'])
          
        } else {
          
          await new Promise(resolve => setTimeout(resolve, 2000));
          // navigate('/');
        }
      };
    useEffect(() => {
    
        const cargardatos = async () => {
          const body = {};
          const endpoint='MisGastos/'
          const result = await Generarpeticion(endpoint, 'POST', body);
          
          const respuesta=result['resp']
          if (respuesta === 200) {
            setDatosgastos(result['data'])
            console.log(result['data'])
            
          } else {
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            // navigate('/');
          }
        };
    
        cargardatos();
      }, []);

    return(
        <div style={{ width:'100%'}}>
            <h3 className="info-title-Prin">REGISTRO EGRESO</h3>
            <Form
                {...formItemLayout}
                variant="filled"
                style={{
                maxWidth: 600,
                }}
            >   
                <Form.Item label="Gasto"name="Gasto"
                            rules={[
                                {
                                required: true,
                                message: 'Please input!',
                                },
                            ]}
                >
                    <Select name="listagasto"
                            value={gasttosel}
                            onChange={seleccionargasto}
                    >
                         <option value="">Seleccionar gasto</option>
                         {datosgastos &&  datosgastos.map((g) => (
                             <option key={g.id} value={g.id}>
                                 {g.nombre_gasto}
                             </option>
                         ))}
                    </Select>
                    
                </Form.Item>
                
                

                    <Form.Item
                        label="Fecha Gasto"
                        name="DatePicker"
                        rules={[
                            {
                            required: true,
                            message: 'Please input!',
                            },
                        ]}
                        >
                        <DatePicker 
                            placeholder='Fecha Egreso'
                            dateFormat="yyyy-MM-dd"
                            onChange={(date) => setFechaegreso(dayjs(date, dateFormat))}
                            
                            >

                        </DatePicker>
                    </Form.Item>
                
            
                

                <Form.Item
                    label="Monto Egreso"
                    name="MontoEgreso"
                    rules={[
                        {
                        required: true,
                        message: 'Please input!',
                        },
                    ]}
                    >
                    <InputNumber
                        onChange={seleccionarmonto}
                        style={{
                        width: '100%',
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label="Anotacion"
                    name="Anotacion"
                    rules={[
                        {
                        required: false,
                        message: '',
                        },
                    ]}
                    >
                    <Input.TextArea onChange={seleccionaranotacion}/>
                </Form.Item>


                <Form.Item
                    wrapperCol={{
                        offset: 6,
                        span: 16,
                    }}
                    >
                   <Button type="primary" onClick={registrar_egreso}>Registrar</Button>
                </Form.Item>
            </Form>
          
        </div>
    )

}

export default RegistroEgreso