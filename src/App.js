import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import {React} from 'react';
import Admin from './pages/Admin'
import Mypage from './pages/Mypage';
import Hello from './pages/Hello';
import {Routes, Route } from "react-router-dom";
import { ConfigProvider, theme } from 'antd';



function App() {
 
  return (
    <div className="App">
       <ConfigProvider
    theme={{
      // 1. 单独使用暗色算法
      algorithm: theme.darkAlgorithm,

      // 2. 组合使用暗色算法与紧凑算法
      // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
    }}
  ></ConfigProvider>
      <Routes>
      <Route exact path="/" element={<Hello/>}/>
      <Route exact path="/kitchen" element={<Admin/>}/>
      <Route exact path="/management" element={<Mypage/>}/>
      </Routes>
    </div>
  );
}

export default App;
