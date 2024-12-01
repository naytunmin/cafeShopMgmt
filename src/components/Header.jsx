import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const HeaderComponent = () => {
  const menuItems = [
    {
      key: '1',
      label: <Link to="/">Cafe Shop</Link>,
    },
    {
      key: '2',
      label: <Link to="/employee">Employee</Link>,
    },
  ];

  return (
    <Header className="header" style={{ padding: 0 }}>
      <div className="logo" style={{ float: 'left', marginRight: 20 }}>
        <div   style={{ height: '32px' }}></div>
      </div>
      <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }} items={menuItems} />
    </Header>
  );
};

export default HeaderComponent;
