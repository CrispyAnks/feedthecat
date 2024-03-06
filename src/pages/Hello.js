import Banner from '../components/Banner';
import NavBar from '../components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Projects from '../components/Projects';
import Footer from '../components/Footer';
import 'animate.css';
import {React, useEffect, useState} from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { FloatButton, Modal } from 'antd';
import { Table, Flex, Button } from 'antd';

function Hello() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Flex style={{width: '100%'}} justify={'center'} align={'center'}>          
            <Button type="dashed" shape="circle" onClick={() => addToCart(record)}>+</Button>
            <div style={{margin:'10px'}}>{record.number}</div>
            <Button type="dashed" shape="circle" onClick={() => removeFromCart(record)}>-</Button>
      </Flex>
      ),
    },
  ];
  const [data, setData] = useState([ ]);
  const [lan, setLan] = useState('eng');
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState({
    id : sessionStorage.getItem('userId'),
    index : 0,
  });
  
  const addToCart = (product) => {
    const updatedData = data.map((item) => {
      if (item.key === product.key) {
        return { ...item, number: item.number + 1 };
      }
      return item;
    });
    setData(updatedData);
    handleAdd(product)
  };

  const removeFromCart = (product) => {
    const updatedData = data.map((item) => {
      if (item.key === product.key && item.number > 0) {
        return { ...item, number: item.number - 1 };
      }
      return item;
    });
    setData(updatedData);
    handleMinus(product);
  };

  const setLanguage = () => {
    if(lan === 'jpn'){
      setLan('eng');
      console.log(lan);
    }else{
      setLan('jpn');
      console.log(lan);
    }    
  }

  const fetchData = async () => {
    try {
      // 获取 /api/user/dish/list 的数据
      const dishResponse = await fetch('/api/user/dish/list');
      const dishData = await dishResponse.json();
      // 获取 /api/user/shopping/list 的数据
      const shoppingResponse = await fetch('/api/user/shopping/list/' + sessionStorage.getItem('userId'));
      const shoppingData = await shoppingResponse.json();

      const CatResponse = await fetch('/api/user/dish/cat/' + sessionStorage.getItem('userId'));
      const catData = await CatResponse.json();
      
      // 处理数据并更新 state
      const updatedData = dishData.data.map(dishItem => {
        if (shoppingData.data[0] !== null) {
          const matchingShoppingItem = shoppingData.data.find(shoppingItem => shoppingItem.dishId === dishItem.key);
          // 如果找到了匹配的购物项，更新 dishItem 的 number 属性
          if (matchingShoppingItem) {
            return {
              ...dishItem,
              number: matchingShoppingItem.number
            };
          }
        }
        // 没有找到匹配的购物项，则保持不变
        return dishItem;
      });
  
      // 更新 state
      setData(updatedData);
      if(catData.data != null){setCat(catData.data);}
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const handleAdd = (record) => {
    var raw = JSON.stringify({
      "id": sessionStorage.getItem('userId'),
      "dishId": record.key,
    });
    

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
   
    var requestOptions = {
      method: 'POST',
      body: raw,
      headers: myHeaders  
    };

    fetch("/api/user/shopping/add", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result.code)
      })
      .catch(error => console.log('error', error));
  }

  const handleMinus = (record) => {
    var raw = JSON.stringify({
      "id": sessionStorage.getItem('userId'),
      "dishId": record.key,
    });
    console.log(raw)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
   
    var requestOptions = {
      method: 'POST',
      body: raw,
      headers: myHeaders  
    };

    fetch("/api/user/shopping/minus", requestOptions)
      .then(response => response.json())
      .then(result => {
       console.log(result)
        
      })
      .catch(error => console.log('error', error));
  }

  const submitOrder = async() => {
    var raw = JSON.stringify({
      "userId": sessionStorage.getItem('userId'),
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
   
    var requestOptions = {
      method: 'POST',
      body: raw,
      headers: myHeaders  
    };

    await fetch("/api/user/order/submit", requestOptions)
      .then(response => response.json())
      .then(result => {
       setData(data.map(item => ({
        ...item,
        number: 0
      })));
       setCat({
        ...cat,
        index: result.data.index
       });
       
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    fetchData();
  },[])

  useEffect(() => {
    if(sessionStorage.getItem('userId') == null){
    const id = Math.random().toString(36).substring(7);
    sessionStorage.setItem('userId', id);}
  },[])

  return (
    <>
      <NavBar onClick={setLanguage} lan={lan}/>
      <Banner lan={lan} index={cat.index}/>
      <Projects lan={lan} data={data} addToCart={addToCart} removeFromCart={removeFromCart}/>
      {Array.isArray(data) && <FloatButton shape="circle" badge={{ count: data.reduce((total, currentItem) => total + currentItem.number, 0), overflowCount: 999 }} icon={<ShoppingCartOutlined />} onClick={() => setOpen(true)}/>}
      <Modal
        title="Shopping Cart"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            Return
          </Button>,
          
          <Button key="submit" type="primary" loading={false} onClick={() => submitOrder()}>
            Submit
          </Button>,
        ]}
      >
        <br/>
        {Array.isArray(data) &&<Table columns={columns} dataSource={data.filter(item => item.number > 0)} />}
      </Modal>
      <Footer lan={lan}/>
    </>
  );
}

export default Hello;
