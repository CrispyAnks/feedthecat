import {React, useEffect, useState } from 'react';
import { Button,Table} from 'antd';
import UserManageModal from './UserManageModal';


function UserManage() {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (   <>            
            <Button type="dashed" onClick={() => openModal('manage', record)} style={{marginRight:'1rem', marginBottom:'1rem'}} modalType={modalType}>Manage</Button>
            <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
            </> 
      ),
    },
  ];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [userData, setUserData] = useState({});
  const tableParams = {page: 1, pageSize: 10};
  const openModal = (modal, record) => {
    setModalType(modal); 
    setIsModalVisible(true); 
    setUserData(record);
  }
  const handleDelete = (id) => {
    var myHeaders = new Headers();
    const token = localStorage.getItem('token')
    myHeaders.append("Authorization", token);
    myHeaders.append( 'Content-Type', 'application/json');
    
    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
    };
    setLoading(true);

    fetch("/api/admin/user/" + id, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        fetchData();
        setLoading(false);
      })
      .catch(error => console.log('error', error));
  }
  const fetchData = () => {
    var myHeaders = new Headers();
    const token = localStorage.getItem('token')
    myHeaders.append("Authorization", token);
    myHeaders.append( 'Content-Type', 'application/json');
    
    const requestOptions = {
      method: 'POST', // 或者 'GET'，根据你的需求选择
      headers: myHeaders,
      body: JSON.stringify(tableParams)
    };
    setLoading(true);

    fetch("/api/admin/user/page", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result.data)
        setData(result.data.records);
        setLoading(false);
      })
      .catch(error => console.log('error', error));
  }
  useEffect(() => {
    fetchData();
  },[isModalVisible]);
  
  
  return (
    <>
     <Button type="primary" onClick={() => openModal('add')}>New</Button>
      <br/><br/>
      <Table columns={columns} dataSource={data} loading={loading}/>
      <br/><br/><br/>
      <UserManageModal visible={isModalVisible} onClose={setIsModalVisible} modalType={modalType} userData={userData}/>
    </>
  )
}

export default UserManage
