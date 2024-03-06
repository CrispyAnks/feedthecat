import {React} from 'react';
import { Button,Modal,Form,Input,Select,InputNumber } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

function UserManageModal(props) {
    const [form] = Form.useForm();
    const handleClick = () => {
       
        const requestBody = JSON.stringify({
          id: props.modalType === 'add' ? null : props.userData.id,
          username: form.getFieldValue('username'),
          password: form.getFieldValue('password'),
          gender: form.getFieldValue('gender'),
          level: form.getFieldValue('level')
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
        fetch("/api/admin/user", requestOptions)
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
            title={props.modalType ==='manage' ? "Manage User Information" : "Add User"}
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
            <Form.Item label="Username" name='username'>
                <Input />
            </Form.Item>
            <Form.Item label="Password" name='password'>
                <Input.Password
                placeholder="input password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>
            
            <Form.Item label="Gender" name='gender'>
              <Select>
                <Select.Option value="cat">cat</Select.Option>
                <Select.Option value="kitty">kitty</Select.Option>
                <Select.Option value="unknown">unknown</Select.Option>
              </Select>
            </Form.Item> 
            <Form.Item label="Level" name='level'>
              <InputNumber />
            </Form.Item>
          </Form>
        </Modal>
      
    </>
  )
}

export default UserManageModal
