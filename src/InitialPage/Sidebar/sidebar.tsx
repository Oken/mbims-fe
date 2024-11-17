// Sidebar.tsx
import React from 'react';
import { ProductOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Menu as MenuAntD } from 'antd';
import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';

// Icons
import menu from '../../../public/assets/icons/sidebar-menu.svg';
import tag from '../../../public/assets/icons/sidebar-tag.svg';
import inventory from '../../../public/assets/icons/inventory-icon.svg';
import product from '../../../public/assets/icons/product-icon.svg';
import category from '../../../public/assets/icons/category-icon.svg';
import store from '../../../public/assets/icons/store-icon.svg';
import stock from '../../../public/assets/icons/stock-icon.svg';
import warehouse from '../../../public/assets/icons/warehouse-icon.svg';
import people from '../../../public/assets/icons/people-icon.svg';
import user from '../../../public/assets/icons/user-icon.svg';

const { Sider } = Layout;

// Define a type for Menu Item to enforce consistency
type MenuItem = Required<MenuProps>['items'][number];

// Utility function to create a menu item with link
const createMenuItem = (
  label: string,
  key: string,
  icon: React.ReactNode,
  path: string,
  children?: MenuItem[],
): MenuItem => ({
  key,
  icon,
  label: <Link to={path}>{label}</Link>,
  children,
});

// Sidebar items definition
const sideItems: MenuItem[] = [
  createMenuItem('Dashboard', 'dashboard', <img src={menu} alt="" width={10} height={10} />, '/admin-dashboard'),

  createMenuItem('Point of Sale', 'point-of-sale', <img src={tag} alt="" width={10} height={10} />, '#', []),

  createMenuItem('Inventory', 'inventory', <img src={inventory} alt="" width={10} height={10} />, '#', [
    createMenuItem('Products', 'products', <img src={product} alt="" width={10} height={10} />, '/product-list'),

    // createMenuItem('Create Product', 'create-product', <ProductOutlined />, '/add-products'),

    createMenuItem('Categories', 'categories', <img src={category} alt="" width={10} height={10} />, '/category-list'),

    // createMenuItem('Stores', 'stores', <img src={store} alt="" width={10} height={10} />, '/store-list'),

    createMenuItem('Brands', 'brands', <img src={store} alt="" width={10} height={10} />, '/brand-list'),

    createMenuItem('Templates', 'templates', <img src={store} alt="" width={10} height={10} />, '/template-list'),

    createMenuItem('Stocks Transfer', 'stocks-transfer', <img src={stock} alt="" width={10} height={10} />, '/stock-transfer'),

    // createMenuItem('Warehouse', 'warehouse', <img src={warehouse} alt="" width={10} height={10} />, '/warehouse'),
  ]),
  createMenuItem('Report', 'report', <img src={people} alt="" width={10} height={10} />, '/report'),

  createMenuItem('People', 'people', <img src={people} alt="" width={10} height={10} />, '#', []),

  createMenuItem('Store Setup', 'store-setup', <img src={people} alt="" width={10} height={10} />, '#', []),

  createMenuItem(
    'Users',
    'users',
    <img src={user} alt="" width={10} height={10} />,
    '/users',
  ),

  createMenuItem('Settings', 'settings', <SettingOutlined />, '/settings'),
];

interface HeaderProps {
  collapsed: boolean;
}

// Sidebar component
const Sidebar = ({ collapsed }: HeaderProps) => {
  return (
    <div className="sidebar" id="sidebar">
      <Sider
        width={230}
        style={{ background: 'white', padding: '10px 10px 10px 9px', width: '100%' }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <MenuAntD
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          defaultOpenKeys={['sell']}
          style={{ height: '100%', borderRight: 0, width: collapsed ? '60px' : '210px' }}
          items={sideItems}
        />
      </Sider>
    </div>
  );
};

export default Sidebar;
