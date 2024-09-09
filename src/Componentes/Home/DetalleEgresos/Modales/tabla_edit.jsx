import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table,InputNumber,Typography } from 'antd';
import './tabla_edit.css'
import numeral from 'numeral';
import FormItem from 'antd/es/form/FormItem';
const { Text } = Typography;
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }


  }, [editing]);


  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingInlineEnd: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};





const EditTable = ({detallemedios,setDetallemedios,monto}) => {
  const [total,setTotal]=useState(monto)
  const [dataSource, setDataSource] = useState(detallemedios);
  const [count, setCount] = useState(2);

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: 'Codigo',
      dataIndex: 'id',
      width: '10%',
      
    },
    {
      title: 'Medio',
      dataIndex: 'nombre_medio',
    },
    {
      title: 'Monto',
      dataIndex: 'monto',
       
      editable: true,
      render: (monto) => (
        <span>
          {/* Gs. {Number(monto_gasto).toLocaleString('es-ES')} */}
          Gs. {numeral(monto).format('0,0')}
        </span>
      ),
    },
    
  ];




  const formatearValor = (value) => {
  
    return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
    };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };



  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
    const totalgasto = newData.reduce((acc, item) => acc +  parseFloat(item.monto), 0);
    setDetallemedios(newData)
    setTotal(totalgasto)
     
  };


  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });



  return (
    <div>

        <div className='contenedor-tabla-medios'>
        
        <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            size="small"
            className='contenido-tabla-detalle-medios'
        />
        </div>
        
        <div style={{marginLeft:'45%',marginRight:'0%',padding:'0',backgroundColor:' rgb(248, 251, 250)'}}>
            <FormItem>
            <Text style={{ fontSize: 'small' }} strong>TOTAL GASTOS: </Text>
            <Text style={{ fontSize: 'small' }} strong>GS. {Number(total).toLocaleString('es-ES')}</Text>
            </FormItem>
        </div>
                      
    </div>
  );
};
export default EditTable;