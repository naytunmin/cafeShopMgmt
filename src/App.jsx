import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './pages/Employee/EmplyeeList'; 
import EmployeeForm from './pages/Employee/EmployeeForm';
import CafeShopList from './pages/CafeShop/CafeShopList'; 
import CafeShopForm from './pages/CafeShop/CafeShopForm'; 
import Header from '../src/components/Header'; 
import { Layout } from 'antd';  
import './style.css';
const { Content } = Layout;

const App = () => {
  return (
    <Router>
    <Layout>
      <Header />
      <Content className="layout-content">
        <div className="layout-content-inner">
          <Routes>
            <Route path="/" element={<CafeShopList />} />
            <Route path="/cafe-form" element={<CafeShopForm />} />
            <Route path="/employee" element={<EmployeeList />} />
            <Route path="/employee-form" element={<EmployeeForm />} />
          </Routes>
        </div>
      </Content>
    </Layout>
  </Router>
  );
};

export default App;
