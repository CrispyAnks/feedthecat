import React, { useState, useEffect } from 'react';
import { Button,Table, Modal,Form,Input,Select,InputNumber } from 'antd';
import GoodsManageModal from './GoodsManageModal';

function GoodsManage() {
  const columns = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (   <>            
        <Button type="dashed" onClick={() => openModal('manage', record)} style={{marginRight:'1rem', marginBottom:'1rem'}} modalType={modalType}>Manage</Button>
        <Button danger onClick={() => handleDelete(record.key)}>Delete</Button>
        </> 
      ),
    },
  ];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [dishData, setDishData] = useState({});
  const tableParams = {page: 1, pageSize: 10};
  const openModal = (modal, record) => {
    setModalType(modal); 
    setIsModalVisible(true); 
    setDishData(record);
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

    fetch("/api/admin/dish/" + id, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
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
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(tableParams)
    };
    setLoading(true);

    fetch("/api/admin/dish/page", requestOptions)
      .then(response => response.json())
      .then(result => {
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
          <GoodsManageModal visible={isModalVisible} onClose={setIsModalVisible} modalType={modalType} dishData={dishData}/>
    </>
  )
}

export default GoodsManage
