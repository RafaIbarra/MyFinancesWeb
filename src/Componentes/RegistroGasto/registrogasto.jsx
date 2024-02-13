import React from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
} from 'antd';
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

function RegistroGasto (){

    return(
        <div style={{ width:'100%'}}>
            <h3 className="info-title-Prin">REGISTRO DE GASTO</h3>
            <Form
                {...formItemLayout}
                variant="filled"
                style={{
                maxWidth: 600,
                }}
            >   
                <Form.Item
                    label="Tipo Gasto"
                    name="TipoGasto"
                    rules={[
                        {
                        required: true,
                        message: 'Please input!',
                        },
                    ]}
                    >
                    <Select />
                </Form.Item>

                <Form.Item
                    label="Categoria Gasto"
                    name="CategoriaGasto"
                    rules={[
                        {
                        required: true,
                        message: 'Please input!',
                        },
                    ]}
                    >
                    <Select />
                </Form.Item>

                <Form.Item
                    label="Nombre Gasto"
                    name="Input"
                    rules={[
                        {
                        required: true,
                        message: 'Please input!',
                        },
                    ]}
                    >
                    <Input />
                </Form.Item>


                <Form.Item
                wrapperCol={{
                    offset: 6,
                    span: 16,
                }}
                >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                </Form.Item>
            </Form>
          
        </div>
    )

}

export default RegistroGasto