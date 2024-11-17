/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useState } from 'react';
// import { ChevronUp, RotateCcw } from "feather-icons-react/build/IconComponents";
import { OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { setToogleHeader } from '../../../store/action';
import SettingsSideBar from '../settingssidebar';
import ImageWithBasePath from '../../../core/img/imagewithbasebath';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import FeatherIcon from 'feather-icons-react';

const Appearance = () => {
  const [isActive, setIsActive] = useState(null);

  const setActive = (theme: SetStateAction<string | null>) => {
    setIsActive(theme as any);
  };

  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.slices.showHeader);

  const sizeOptions = [
    { value: 'small', label: 'Small - 85px' },
    { value: 'large', label: 'Large - 250px' },
  ];
  const fonts = [
    { value: 'Nunito', label: 'Nunito' },
    { value: 'Poppins', label: 'Poppins' },
  ];

  const renderRefreshTooltip = (props: TooltipProps) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Refresh
    </Tooltip>
  );
  const renderCollapseTooltip = (props: TooltipProps) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );

  return (
    <div>
      <div className="page-wrapper">
        <div className="content settings-content">
          <div className="page-header settings-pg-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Settings</h4>
                <h6>Manage your settings on portal</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <li>
                <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                  <Link to="" data-bs-toggle="tooltip" data-bs-placement="top">
                    {/* <RotateCcw /> */}
                    <FeatherIcon icon="rotate-ccw" />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                  <Link
                    to=""
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    id="collapse-header"
                    className={data ? 'active' : ''}
                    onClick={() => {
                      dispatch(setToogleHeader(!data));
                    }}
                  >
                    {/* <ChevronUp /> */}
                    <FeatherIcon icon="chevron-up" />
                  </Link>
                </OverlayTrigger>
              </li>
            </ul>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="settings-wrapper d-flex">
                <SettingsSideBar />
                <div className="settings-page-wrap">
                  <div className="setting-title">
                    <h4>Appearance</h4>
                  </div>
                  <div className="appearance-settings">
                    <div className="row">
                      <div className="col-xl-4 col-lg-12 col-md-4">
                        <div className="setting-info mb-4">
                          <h6>Select Theme</h6>
                          <p>Choose accent colour of website</p>
                        </div>
                      </div>
                      <div className="col-xl-8 col-lg-12 col-md-8">
                        <div className="theme-type-images d-flex align-items-center mb-4">
                          <div
                            className={`theme-image ${isActive === 'Light' ? 'active' : ''}`}
                            onClick={() => setActive('Light')}
                          >
                            <div className="theme-image-set">
                              <ImageWithBasePath src="assets/img/theme/theme-img-08.jpg" alt="Light Theme" />
                            </div>
                            <span>Light</span>
                          </div>
                          <div
                            className={`theme-image ${isActive === 'Dark' ? 'active' : ''}`}
                            onClick={() => setActive('Dark')}
                          >
                            <div className="theme-image-set">
                              <ImageWithBasePath src="assets/img/theme/theme-img-09.jpg" alt="Dark Theme" />
                            </div>
                            <span>Dark</span>
                          </div>
                          <div
                            className={`theme-image ${isActive === 'Automatic' ? 'active' : ''}`}
                            onClick={() => setActive('Automatic')}
                          >
                            <div className="theme-image-set">
                              <ImageWithBasePath src="assets/img/theme/theme-img-10.jpg" alt="Automatic Theme" />
                            </div>
                            <span>Automatic</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-4 col-lg-12 col-md-4">
                        <div className="setting-info mb-4">
                          <h6>Accent Color</h6>
                          <p>Choose accent colour of website</p>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-12 col-md-4">
                        <div className="theme-colors mb-4">
                          <ul>
                            <li>
                              <span
                                className={`themecolorset defaultcolor ${isActive === 'defaultcolor' ? 'active' : ''}`}
                                onClick={() => setActive('defaultcolor')}
                              ></span>
                            </li>
                            <li>
                              <span
                                className={`themecolorset theme-violet ${isActive === 'theme-violet' ? 'active' : ''}`}
                                onClick={() => setActive('theme-violet')}
                              ></span>
                            </li>
                            <li>
                              <span
                                className={`themecolorset theme-blue ${isActive === 'theme-blue' ? 'active' : ''}`}
                                onClick={() => setActive('theme-blue')}
                              ></span>
                            </li>
                            <li>
                              <span
                                className={`themecolorset theme-brown ${isActive === 'theme-brown' ? 'active' : ''}`}
                                onClick={() => setActive('theme-brown')}
                              ></span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-4 col-lg-12 col-md-4">
                        <div className="setting-info mb-4">
                          <h6>Expand Sidebar</h6>
                          <p>Choose accent colour of website</p>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-12 col-md-4">
                        <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                          <input type="checkbox" id="user1" className="check" defaultChecked />
                          <label htmlFor="user1" className="checktoggle">
                            {' '}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-4 col-lg-12 col-md-4">
                        <div className="setting-info mb-4">
                          <h6>Sidebar Size</h6>
                          <p>Select size of the sidebar to display</p>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-12 col-md-4">
                        <div className="localization-select">
                          <Select options={sizeOptions} classNamePrefix="react-select" placeholder="Select Size" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-4 col-lg-12 col-md-4">
                        <div className="setting-info mb-4">
                          <h6>Font Family</h6>
                          <p>Select font family of website</p>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-12 col-md-4">
                        <div className="localization-select">
                          <Select options={fonts} classNamePrefix="react-select" placeholder="Select Size" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
