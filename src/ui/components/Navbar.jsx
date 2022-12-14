import { useAuth } from '../../context/AuthContext';
import { Link } from "react-router-dom";
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { AuthCart } from './CartItems/AuthCart';
import { Sidebar } from './Sidebar';
import { useState } from 'react';
import { Button, Drawer } from 'antd';
import img from '../../../assets/images/decoracion/logo-header.png'



export function Navbar() {
  
  const auth = useAuth();
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      
      <div className="container-fluid">
        <div className="header">
          <div className="logo">
            <img src={img} alt="logo sombrero y bigotes" />
            <Link to="/">Bon Appétit</Link>
          </div>
          <div className='item-login-logout'>
            { auth.user ? ( <div className='cart-menu'>
                                <AuthCart />
                            </div>)
                        : '' }
            <div className="mobileVisible">
                                  <Button type="primary" className='btn-second' onClick={showDrawer}>
                                  <MenuUnfoldOutlined />
                                  </Button>
                                </div>
            <Drawer title="Menú" placement="left" onClose={onClose} visible={visible} >
              <Sidebar />
            </Drawer>
          
          </div>                
        </div>
      </div>

    </>
  );
}