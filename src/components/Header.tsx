import React from 'react';
import { Button, Layout, Menu, Tooltip } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader: React.FC = () => {
    const navigate = useNavigate();
    const isLoggedIn = Boolean(localStorage.getItem('isAuthenticated'));

    const handleMenuClick = (e: MenuInfo) => {

        switch (e.key) {
            case 'home':
                navigate('/');
                break;
            case 'about':
                navigate('/about');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/');
    };

    return (
        <Header className='flex center justify-between bg-white'>
            <div className='flex center'>
                <img alt="Talentica" className="header-logo" src="https://www.talentica.com/wp-content/uploads/2021/09/Talentica-Logo.svg" height="50" width="150" />
            </div>
            { !isLoggedIn && (
                <Menu
                    className='bg-white menu-font p-4'
                    mode="horizontal"
                    onClick={handleMenuClick}
                    items={[
                        { key: 'home', label: 'Home' },
                        { key: 'about', label: 'About' }
                    ]}
                />
            )}
            { isLoggedIn && (
                <Tooltip title="Log out">
                    <Button
                        onClick={handleLogout}
                        icon={<LogoutOutlined />}
                        type="link"
                        className='ml-auto'
                    />
                </Tooltip>
            )}
        </Header>
    );
};

export default AppHeader;
