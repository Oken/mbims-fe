import { MouseEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { Settings, User } from 'react-feather';
import { all_routes } from '../../Router/all_routes';
import { Image } from 'antd';

interface ElementRect {
  offsetWidth: number;
  offsetHeight: number;
}

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const Header = ({ collapsed, setCollapsed }: HeaderProps) => {
  const route = all_routes;

  const isElementVisible = (element: ElementRect): boolean => {
    return element.offsetWidth > 0 || element.offsetHeight > 0;
  };

  useEffect(() => {
    const handleMouseover = (event: MouseEvent) => {
      event.stopPropagation();

      const body = document.body;
      const toggleBtn = document.getElementById('toggle_btn');

      if (body.classList.contains('mini-sidebar') && toggleBtn && isElementVisible(toggleBtn)) {
        event.preventDefault();
      }
    };

    document.addEventListener('mouseover', handleMouseover as unknown as EventListener);

    return () => {
      document.removeEventListener('mouseover', handleMouseover as unknown as EventListener);
    };
  }, []);

  const sidebarOverlay = () => {
    document?.querySelector('.main-wrapper')?.classList?.toggle('slide-nav');
    document?.querySelector('.sidebar-overlay')?.classList?.toggle('opened');
    document?.querySelector('html')?.classList?.toggle('menu-opened');
  };

  const pathname = location.pathname;

  const exclusionArray = ['/reactjs/template/dream-pos/index-three', '/reactjs/template/dream-pos/index-one'];
  if (exclusionArray.indexOf(window.location.pathname) >= 0) {
    return '';
  }

  const handleSidebar = () => {
    // Toggle the mini-sidebar class on the body
    document.body.classList.toggle('mini-sidebar');

    // Update the collapsed state based on the current state
    setCollapsed(!collapsed);
  };

  return (
    <div className="header">
      {/* /Logo */}
      <Link id="mobile_btn" className="mobile_btn" to="#" onClick={sidebarOverlay}>
        <span className="bar-icon">
          <span />
          <span />
          <span />
        </span>
      </Link>
      {/* Logo */}
      <div className={`header-left ${collapsed ? '' : 'active'}`}>
        {collapsed ? (
          <Link to="/admin-dashboard" className="logo">
            <ImageWithBasePath width={30} src="assets/img/logo.svg" alt="img" />
          </Link>
        ) : (
          <Link to="/admin-dashboard" className="logo logo-normal">
            <ImageWithBasePath src="assets/img/logo.svg" alt="img" />
          </Link>
        )}
        <Link
          // id="toggle_btn"
          to="#"
          style={{
            display:
              pathname.includes('tasks') || pathname.includes('pos')
                ? 'none'
                : pathname.includes('compose')
                ? 'none'
                : '',
          }}
          onClick={handleSidebar}
        >
          {collapsed ? (
            <FeatherIcon icon="chevrons-right" className="feather-16" />
          ) : (
            <FeatherIcon icon="chevrons-left" className="feather-16" />
          )}
        </Link>
      </div>
      {/* Header Menu */}
      <ul className="nav user-menu" style={{ justifyContent: 'flex-end' }}>
        {/* /Notifications */}
        <li>
          <Link to="/general-settings">
            <FeatherIcon icon="settings" />
          </Link>
        </li>

        {/* Notifications */}
        <li>
          <Link to="#">
            <FeatherIcon icon="bell" />
          </Link>
        </li>

        <li className="nav-item dropdown has-arrow main-drop">
          <Link to="#" className="dropdown-toggle nav-link userset" data-bs-toggle="dropdown">
            <span className="user-info">
              <span className="user-letter" style={{ borderRadius: '50%' }}>
                <Image src="assets/img/profiles/avator1.jpg" alt="img" style={{ borderRadius: '50%' }} />
              </span>
              <span className="user-detail">
                <span className="user-name">Abdul Hassan</span>
                <span className="user-role">Super User</span>
              </span>
            </span>
          </Link>
          <div className="dropdown-menu menu-drop-user">
            <div className="profilename">
              <div className="profileset">
                <span className="user-img">
                  <ImageWithBasePath src="assets/img/profiles/avator1.jpg" alt="img" />
                  <span className="status online" />
                </span>
                <div className="profilesets">
                  <h6>Abdul Hassan</h6>
                  <h5>Super Admin</h5>
                </div>
              </div>
              <hr className="m-0" />
              <Link className="dropdown-item" to={route.profile}>
                <User className="me-2" /> My Profile
              </Link>
              <Link className="dropdown-item" to={route.generalsettings}>
                <Settings className="me-2" />
                Settings
              </Link>
              <hr className="m-0" />
              <Link className="dropdown-item logout pb-0" to="/signin">
                <ImageWithBasePath src="assets/img/icons/log-out.svg" alt="img" className="me-2" />
                Logout
              </Link>
            </div>
          </div>
        </li>
      </ul>

      {/* /Header Menu */}
    </div>
  );
};

export default Header;
