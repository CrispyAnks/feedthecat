
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  RestOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate } from 'react-router';
import GoodsManage from '../components/GoodsManage';
import UserManage from '../components/UserManage';


function Mypage() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState('1');
  const { Header, Sider, Content } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navi = useNavigate();
  const handleClick = (e) =>{
    console.log(e)
    if(e.key === '3'){
      localStorage.removeItem('token');  
      navi('/');
    }
  }
  const handleSelect = (e) => {
    if(e.key === '2'){
      setSelectedMenuKey(e.key);
    }
    if(e.key === '1'){
      setSelectedMenuKey(e.key);
    }
  }
  const renderContent = () => {
    switch (selectedMenuKey) {
      case '1':
        return <UserManage/>;
      case '2':
        return <GoodsManage />;
      case '3':
        return <div>Content for Exit</div>;
      default:
        return null;
    }
  };
  return (
    <>
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Admin',
            },
            {
              key: '2',
              icon: <RestOutlined />,
              label: 'Menu',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'Exit',
            },
          ]}
          onClick={handleClick}
          onSelect={handleSelect}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            maxHeight:'100%',
            padding: '2rem',
            margin:'2rem',
            minHeight: 280,
            minWidth: 500,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <br/><br/>
         {renderContent()}
        </Content>
      </Layout>
    </Layout>
      
    </>
  )
}

export default Mypage
