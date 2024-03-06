import {React} from 'react';
import { Button,Modal,Form,Input,Select,InputNumber } from 'antd';

function GoodsManageModal(props) {
    const [form] = Form.useForm();
    const handleClick = () => {
       
        const requestBody = JSON.stringify({
          key: props.modalType === 'add' ? null : props.dishData.key,
          name: form.getFieldValue('name'),
          type: form.getFieldValue('type'),
          price: form.getFieldValue('price'),
          description: form.getFieldValue('description'), 
        });
    
        // 设置请求头部
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", localStorage.getItem('token'));

        // 设置请求选项
        const requestOptions = {
          method: props.modalType === 'add' ? 'POST':'PUT',
          body: requestBody,
          headers: myHeaders
        };
        fetch("/api/admin/dish", requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(result => {
            console.log(result);
            props.onClose(false);
        })
        .catch(error => console.error('Error:', error));
      }
  return (
    <>
        <Modal
            title={props.modalType ==='manage' ? "Manage Menu" : "Add Dish"}
            centered
            open={props.visible}
            onOk={() => props.onClose(false)}
            onCancel={() => props.onClose(false)}
            width={1000}
            footer={[
              <Button key="back" onClick={() => props.onClose(false)}>
                Return
              </Button>,
              <Button key="submit" type="primary" loading={false} onClick={() => handleClick()}>
                Submit
              </Button>,
            ]}
        >
            <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            form={form}
            >
            
          <Form.Item label="Name" name='name'>
              <Input />
            </Form.Item>
            <Form.Item label="Type" name='type'>
              <Select>
                <Select.Option value="1">Fruit</Select.Option>
                <Select.Option value="2">Meat</Select.Option>
                <Select.Option value="3">Drinks</Select.Option>
              </Select>
            </Form.Item> 
            <Form.Item label="Price" name='price'>
              <InputNumber />
            </Form.Item>
            <Form.Item label="Description" name='description'>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      
    </>
  )
}

export default GoodsManageModal
