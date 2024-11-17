/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, Routes, Outlet } from 'react-router-dom';
import Header from '../InitialPage/Sidebar/header';
// import Sidebar from '../InitialPage/Sidebar/side-bar';
import Sidebar from '../InitialPage/Sidebar/sidebar';
import { pagesRoute, posRoutes, publicRoutes } from './router.link';
import { useAppSelector } from '../store/hooks';
import ThemeSettings from '../InitialPage/theme-settings';

const HeaderLayout = () => {
  const data = useAppSelector((state: any) => state.slices.showHeader);
  return (
    <div className={`main-wrapper ${data ? 'header-collapse' : ''}`}>
      {/* <Loader /> */}
      <Header />
      <Sidebar />
      <Outlet />
      <ThemeSettings />
    </div>
  );
}

const Authpages = () => {
  const data = useAppSelector((state: any) => state.slices.showHeader);
  return (
    <div className={data ? 'header-collapse' : ''}>
      <Outlet />
      {/* <Loader /> */}
      <ThemeSettings />
    </div>
  );
}

const Pospages = () => (
  <div>
    <Header />
    <Outlet />
    {/* <Loader /> */}
    <ThemeSettings />
  </div>
);

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/pos" element={<Pospages />}>
          {posRoutes.map((route, id) => (
            <Route path={route.path} element={route.element} key={route.id} />
          ))}
        </Route>
        <Route path={'/'} element={<HeaderLayout />}>
          {publicRoutes.map((route, id) => (
            <Route path={route.path} element={route.element} key={route.id} />
          ))}
        </Route>

        <Route path={'/'} element={<Authpages />}>
          {pagesRoute.map((route, id) => (
            <Route path={route.path} element={route.element} key={route.id} />
          ))}
        </Route>
      </Routes>
    </div>
  );
};
export default AllRoutes;
