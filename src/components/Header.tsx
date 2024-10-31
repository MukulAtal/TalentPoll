// import { Link } from "react-router-dom";

// const Header = () => {
//     return (
//         <div className="header">
//             <div className="navbar flex justify-between">
//                 <img alt="Talentica" className="header-logo" src="https://www.talentica.com/wp-content/uploads/2021/09/Talentica-Logo.svg" height="50" width="150" />
//                 <div className="nav-items">
//                     <ul className="flex font-bold no-decor">
//                         <li className="p-4 no-decor">
//                             <Link to="/">Home</Link>
//                         </li>
//                         <li className="p-4 no-decor">
//                             <Link to="/about">About Us</Link>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Header;

import React from 'react';
import { Layout, Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const AppHeader: React.FC = () => {
    const navigate = useNavigate();

    const handleMenuClick = (e: MenuInfo) => {

        switch (e.key) {
            case 'home':
                navigate('/');
                break;
            case 'about':
                navigate('/about');
        }
    };

    return (
        <Header className='flex center justify-between bg-white'>
            <div className='flex center'>
                <img alt="Talentica" className="header-logo" src="https://www.talentica.com/wp-content/uploads/2021/09/Talentica-Logo.svg" height="50" width="150" />
            </div>
            <Menu
                className='bg-white menu-font p-4'
                mode="horizontal"
                onClick={handleMenuClick}
                items={[
                    { key: 'home', label: 'Home' },
                    { key: 'about', label: 'About' }
                ]}
            />
        </Header>
    );
};

export default AppHeader;
