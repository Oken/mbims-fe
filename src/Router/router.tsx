/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Header from '../InitialPage/Sidebar/header';
// import Sidebar from '../InitialPage/Sidebar/side-bar';
import Sidebar from '../InitialPage/Sidebar/sidebar';
import { pagesRoute, posRoutes, publicRoutes } from './router.link';
import { useSelector } from 'react-redux';
import ThemeSettings from '../InitialPage/theme-settings';
import { Layout } from 'antd';

const AllRoutes = () => {
  const data = useSelector((state: any) => state.slices.showHeader);
  const [collapsed, setCollapsed] = useState(false);
  const HeaderLayout = () => (
    <Layout className={`main-wrapper ${data ? 'header-collapse' : ''}`}>
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
      </Layout>
      <Sidebar collapsed={collapsed} />
      <Outlet />
    </Layout>
  );

  const Authpages = () => (
    <div className={data ? 'header-collapse' : ''}>
      <Outlet />
      {/* <Loader /> */}
      <ThemeSettings />
    </div>
  );

  const Pospages = () => (
    <div>
      <Header collapsed={collapsed} setCollapsed={setCollapsed} />
      <Outlet />
      {/* <Loader /> */}
      <ThemeSettings />
    </div>
  );

  // save collapsed state to local storage
  useEffect(() => {
    localStorage.setItem('collapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  return (
    <div>
      <Routes>
        <Route path="/pos" element={<Pospages />}>
          {posRoutes.map((route) => (
            <Route path={route.path} element={route.element} key={route.id} />
          ))}
        </Route>
        <Route path={'/'} element={<HeaderLayout />}>
          {publicRoutes.map((route) => (
            <Route path={route.path} element={route.element} key={route.id} />
          ))}
        </Route>

        <Route path={'/'} element={<Authpages />}>
          {pagesRoute.map((route) => (
            <Route path={route.path} element={route.element} key={route.id} />
          ))}
        </Route>
      </Routes>
    </div>
  );
};
export default AllRoutes;
