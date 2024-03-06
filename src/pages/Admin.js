import {React, useState, useEffect} from 'react';
import { Button, Form, Input, Space,Layout } from 'antd';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';


const {Content } = Layout;
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
};
const layoutStyle = {
  borderRadius:'20px',
  margin:'10rem auto',
  padding:'2rem',
  overflow: 'hidden',
  width: 'calc(50% - 8px)',
  maxWidth: 'calc(50% - 8px)',
  backgroundColor: 'rgb(60, 60, 60, 0.3)',
};
const SubmitButton = ({ form, children }) => {
  const history = useNavigate();
  const [submittable, setSubmittable] = useState(false);
  const handleClick = () => {
    const requestBody = JSON.stringify({
      username: form.getFieldValue('username'),
      password: form.getFieldValue('password')
    });

    // 设置请求头部
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // 设置请求选项
    const requestOptions = {
      method: 'POST',
      body: requestBody,
      headers: myHeaders
    };
    fetch("/api/admin/user/login", requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(result => {
      console.log(result);
        localStorage.setItem('token', result.data.token);
        history('/management');
    })
    .catch(error => console.error('Error:', error));
  }

  // Watch all values
  const values = Form.useWatch([], form);
  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);
  return (
    <Button type="primary" htmlType="submit" disabled={!submittable} onClick={handleClick}>
      {children}
    </Button>
  );
};

function Admin() {
  const [form] = Form.useForm();
  
  return (
    <>
    <NavBar></NavBar>
    <Layout style={layoutStyle}>
     
      <Content style={contentStyle}>
      <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
      <Form.Item
        name="username"
        label={<label style={{ color: "white" }}>Username</label>}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label={<label style={{ color: "white" }}>Password</label>}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password
              placeholder="input password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
      </Form.Item>
      <Form.Item>
        <Space>
          <SubmitButton form={form}>Submit</SubmitButton>
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
      </Content>
     
    </Layout>
    <Footer></Footer>
    
      
    </>
  )
}

export default Admin
