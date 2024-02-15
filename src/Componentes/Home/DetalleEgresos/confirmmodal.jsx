import React, {useEffect, useState} from 'react';
import { Button, Modal, Space } from 'antd';
import { DeleteOutlined,    RetweetOutlined  ,PlusCircleTwoTone  } from '@ant-design/icons';
function Modalconfirm({openmodalconfirm,setOpenmodalconfirm}){

  const [open, setOpen] = useState(openmodalconfirm);

  const showModal = () => {
    setOpen(true);
    setOpenmodalconfirm(false)
  };
  const handleOk = () => {
    setOpen(false);
    setOpenmodalconfirm(false)
  };
  const handleCancel = () => {
    setOpen(false);
    setOpenmodalconfirm(false)
  };
    
    const closemodal=()=>{
        setOpenmodalconfirm(false)
        setOpenmodalconfirm(false)
    }
    return(
        <div >

            <Modal
            icon={<DeleteOutlined/>} 
            open={open}
            title="ELIMINAR REGISTROS"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={(_, { OkBtn, CancelBtn }) => (
            <>
                <Button onClick={closemodal}> Cancelar</Button>
                <Button onClick={closemodal}> Eliminar</Button>
                {/* <CancelBtn />
                <OkBtn /> */}
            </>
            )}
        >
            <p> Desea eliminar los registros</p>
        </Modal>
        </div>
    )

}

export default Modalconfirm