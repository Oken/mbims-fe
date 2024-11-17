import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLayoutChange } from '../store/action';
import ImageWithBasePath from '../core/img/imagewithbasebath';

const ThemeSettings = () => {
  const dispatch = useDispatch();

  const [show] = useState(false);
  const [layoutColor, setlayoutColor] = useState(localStorage.getItem('colorschema'));

  const [layoutView, setLayoutView] = useState(localStorage.getItem('layoutStyling'));

  const [layoutTheme, setLayoutTheme] = useState(localStorage.getItem('layoutThemeColors'));

  const showSettings = () => {
    // setShow(!show);
    return;
  };

  const DarkThemes = () => {
    localStorage.setItem('colorschema', 'dark_mode');
    setlayoutColor('dark_mode');
    document.documentElement.setAttribute('data-layout-mode', 'dark_mode');
  };

  const LightThemes = () => {
    localStorage.setItem('colorschema', 'light_mode');
    setlayoutColor('light_mode');
    document.documentElement.setAttribute('data-layout-mode', 'light_mode');
  };

  const DefaultStyle = () => {
    localStorage.setItem('layoutStyling', 'default');
    setLayoutView('default');
    dispatch(setLayoutChange('default'));
    document.documentElement.setAttribute('data-layout-style', 'default');
  };

  const LayoutBox = () => {
    localStorage.setItem('layoutStyling', 'box');
    setLayoutView('box');
    dispatch(setLayoutChange('box'));
    document.documentElement.setAttribute('data-layout-style', 'box');
  };
  const collapsedLayout = () => {
    localStorage.setItem('layoutStyling', 'collapsed');
    setLayoutView('collapsed');
    dispatch(setLayoutChange('collapsed'));
    document.documentElement.setAttribute('data-layout-style', 'collapsed');
  };

  const HorizontalLayout = () => {
    localStorage.setItem('layoutStyling', 'horizontal');
    setLayoutView('horizontal');
    dispatch(setLayoutChange('horizontal'));
    document.documentElement.setAttribute('data-layout-style', 'horizontal');
  };
  const modernLayout = () => {
    localStorage.setItem('layoutStyling', 'modern');
    setLayoutView('modern');
    dispatch(setLayoutChange('modern'));
    document.documentElement.setAttribute('data-layout-style', 'modern');
  };

  const LayoutGrey = () => {
    localStorage.setItem('layoutThemeColors', 'grey');
    setLayoutTheme('grey');
    document.documentElement.setAttribute('data-nav-color', 'grey');
  };

  const LayoutDark = () => {
    localStorage.setItem('layoutThemeColors', 'dark');
    setLayoutTheme('dark');
    document.documentElement.setAttribute('data-nav-color', 'dark');
  };
  const LayoutLight = () => {
    localStorage.setItem('layoutThemeColors', 'light');
    setLayoutTheme('light');
    document.documentElement.setAttribute('data-nav-color', 'light');
  };
  const ResetData = () => {
    localStorage.setItem('colorschema', 'light_mode');
    localStorage.setItem('layoutStyling', 'default');
    localStorage.setItem('layoutThemeColors', 'light');

    setlayoutColor('light_mode');
    setLayoutView('default');
    setLayoutTheme('light');

    document.documentElement.setAttribute('data-layout-mode', 'light_mode');
    document.documentElement.setAttribute('data-layout-style', 'default');
    document.documentElement.setAttribute('data-nav-color', 'light');
  };

  useEffect(() => {
    if (layoutColor) {
      document.documentElement.setAttribute('data-layout-mode', layoutColor);
    }

    if (layoutView) {
      document.documentElement.setAttribute('data-layout-style', layoutView);
    }

    if (layoutTheme) {
      document.documentElement.setAttribute('data-nav-color', layoutTheme);
    }
  }, [layoutColor, layoutTheme, layoutView]);
  return (
    <>
      {/* <Box component={'div'} className="customizer-links" id="setdata">
        <IconButton onClick={showSettings}>
          <Cog fontSize="medium" />
        </IconButton>
      </Box> */}

      <div
        className={show ? 'sidebar-settings nav-toggle show-settings' : 'sidebar-settings nav-toggle'}
        id="layoutDiv"
        // onclick="toggleClassDetail()"
      >
        <div className="sidebar-content sticky-sidebar-one">
          <div className="sidebar-header">
            <div className="sidebar-theme-title">
              <h5>Theme Customizer</h5>
              <p>Customize &amp; Preview in Real Time</p>
            </div>
            <div className="close-sidebar-icon d-flex">
              {/* <Link className="sidebar-refresh me-2" onclick="resetData()"> */}
              <Link to="" className="sidebar-refresh me-2" onClick={ResetData}>
                ⟳
              </Link>
              <Link className="sidebar-close" to="#" onClick={showSettings}>
                X
              </Link>
            </div>
          </div>
          <div className="sidebar-body p-0">
            <form id="theme_color" method="post">
              <div className="theme-mode mb-0">
                <div className="theme-body-main">
                  <div className="theme-head">
                    <h6>Theme Mode</h6>
                    <p>Enjoy Dark & Light modes.</p>
                  </div>
                  <div className="row">
                    <div className="col-xl-6 ere">
                      <div className="layout-wrap">
                        <div className="d-flex align-items-center">
                          <div className="status-toggle d-flex align-items-center me-2" onClick={LightThemes}>
                            <input
                              type="radio"
                              name="theme-mode"
                              id="light_mode"
                              className="check color-check stylemode lmode"
                              defaultValue="light_mode"
                              defaultChecked
                            />
                            <label htmlFor="light_mode" className="checktoggles">
                              <ImageWithBasePath src="/assets/img/theme/layout-light-mode.png" alt="img" />
                              <span className="theme-name">Light Mode</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 ere">
                      <div className="layout-wrap">
                        <div className="d-flex align-items-center">
                          <div className="status-toggle d-flex align-items-center me-2">
                            <input
                              type="radio"
                              name="theme-mode"
                              id="dark_mode"
                              className="check color-check stylemode"
                              defaultValue="dark_mode"
                            />
                            <label htmlFor="dark_mode" className="checktoggles">
                              <div onClick={DarkThemes}>
                                <ImageWithBasePath src="/assets/img/theme/layout-dark-mode.png" alt="img" />
                              </div>

                              <span className="theme-name">Dark Mode</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="theme-mode border-0">
                    <div className="theme-head">
                      <h6>Direction</h6>
                      <p>Select the direction for your app.</p>
                    </div>
                    <div className="row">
                      <div className="col-xl-6 ere">
                        <div className="layout-wrap">
                          <div className="d-flex align-items-center">
                            <div className="status-toggle d-flex align-items-center me-2">
                              <input
                                type="radio"
                                name="direction"
                                id="ltr"
                                className="check direction"
                                defaultValue="ltr"
                                defaultChecked
                              />
                              <label htmlFor="ltr" className="checktoggles">
                                <Link to="#">
                                  <ImageWithBasePath src="/assets/img/theme/layout-ltr.png" alt="" />
                                </Link>
                                <span className="theme-name">LTR</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 ere">
                        <div className="layout-wrap">
                          <div className="d-flex align-items-center">
                            <div className="status-toggle d-flex align-items-center me-2">
                              <input
                                type="radio"
                                name="direction"
                                id="rtl"
                                className="check direction"
                                defaultValue="rtl"
                              />
                              <label htmlFor="rtl" className="checktoggles">
                                <Link to="#" target="_blank">
                                  <ImageWithBasePath src="/assets/img/theme/layout-rtl.png" alt="" />
                                </Link>
                                <span className="theme-name">RTL</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="theme-mode border-0 mb-0">
                      <div className="theme-head">
                        <h6>Layout Mode</h6>
                        <p>Select the primary layout style for your app.</p>
                      </div>
                      <div className="row">
                        <div className="col-xl-6 ere">
                          <div className="layout-wrap">
                            <div className="d-flex align-items-center">
                              <div className="status-toggle d-flex align-items-center me-2" onClick={DefaultStyle}>
                                <input
                                  type="radio"
                                  name="layout"
                                  id="default_layout"
                                  className="check layout-mode"
                                  defaultValue="default"
                                />
                                <label htmlFor="default_layout" className="checktoggles">
                                  <ImageWithBasePath src="/assets/img/theme/layout-03.png" alt="img" />
                                  <span className="theme-name">Default</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6 ere">
                          <div className="layout-wrap">
                            <div className="d-flex align-items-center">
                              <div className="status-toggle d-flex align-items-center me-2" onClick={LayoutBox}>
                                <input
                                  type="radio"
                                  name="layout"
                                  id="box_layout"
                                  className="check layout-mode"
                                  defaultValue="box"
                                />
                                <label htmlFor="box_layout" className="checktoggles">
                                  <ImageWithBasePath src="/assets/img/theme/layout-03.png" alt="img" />
                                  <span className="theme-name">Centered Box</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6 ere">
                          <div className="layout-wrap">
                            <div className="d-flex align-items-center">
                              <div className="status-toggle d-flex align-items-center me-2" onClick={collapsedLayout}>
                                <input
                                  type="radio"
                                  name="layout"
                                  id="collapse_layout"
                                  className="check layout-mode"
                                  defaultValue="collapsed"
                                />
                                <label htmlFor="collapse_layout" className="checktoggles">
                                  <ImageWithBasePath src="/assets/img/theme/layout-02.png" alt="img" />
                                  <span className="theme-name">Collapsed</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6 ere">
                          <div className="layout-wrap">
                            <div className="d-flex align-items-center">
                              <div className="status-toggle d-flex align-items-center me-2" onClick={HorizontalLayout}>
                                <input
                                  type="radio"
                                  name="layout"
                                  id="horizontal_layout"
                                  className="check layout-mode"
                                  defaultValue="horizontal"
                                />
                                <label htmlFor="horizontal_layout" className="checktoggles">
                                  <ImageWithBasePath src="/assets/img/theme/layout-04.png" alt="" />
                                  <span className="theme-name">Horizontal</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6 ere">
                          <div className="layout-wrap">
                            <div className="d-flex align-items-center">
                              <div className="status-toggle d-flex align-items-center me-2" onClick={modernLayout}>
                                <input
                                  type="radio"
                                  name="layout"
                                  id="modern_layout"
                                  className="check layout-mode"
                                  defaultValue="modern"
                                />
                                <label htmlFor="modern_layout" className="checktoggles">
                                  <ImageWithBasePath src="/assets/img/theme/layout-01.png" alt="" />
                                  <span className="theme-name">Modern</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="nav_color">
                      <div className="theme-mode">
                        <div className="theme-head">
                          <h6>Navigation Colors</h6>
                          <p>Setup the color for the Navigation</p>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 ere">
                            <div className="layout-wrap">
                              <div className="d-flex align-items-center">
                                <div className="status-toggle d-flex align-items-center me-2">
                                  <input
                                    type="radio"
                                    name="nav_color"
                                    id="light_color"
                                    className="check nav-color"
                                    defaultValue="light"
                                  />
                                  <label htmlFor="light_color" className="checktoggles">
                                    <span className="theme-name" onClick={LayoutLight}>
                                      Light
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4 ere">
                            <div className="layout-wrap">
                              <div className="d-flex align-items-center">
                                <div className="status-toggle d-flex align-items-center me-2">
                                  <input
                                    type="radio"
                                    name="nav_color"
                                    id="grey_color"
                                    className="check nav-color"
                                    defaultValue="grey"
                                  />
                                  <label htmlFor="grey_color" className="checktoggles">
                                    <span className="theme-name" onClick={LayoutGrey}>
                                      Grey
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4 ere">
                            <div className="layout-wrap">
                              <div className="d-flex align-items-center">
                                <div className="status-toggle d-flex align-items-center me-2">
                                  <input
                                    type="radio"
                                    name="nav_color"
                                    id="dark_color"
                                    className="check nav-color"
                                    defaultValue="dark"
                                  />
                                  <label htmlFor="dark_color" className="checktoggles">
                                    <span className="theme-name" onClick={LayoutDark}>
                                      Dark
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sidebar-footer">
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="footer-preview-btn">
                        <button type="button" className="btn btn-secondary w-100" onClick={ResetData}>
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemeSettings;
