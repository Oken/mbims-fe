// import { ChevronUp, RotateCcw } from 'feather-icons-react/build/IconComponents';
import { OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { setToogleHeader } from '../../../store/action';
import SettingsSideBar from '../settingssidebar';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import FeatherIcon from 'feather-icons-react';

const Preference = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.slices.showHeader);

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
                    <h4>Preference</h4>
                  </div>
                  <div className="row">
                    <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                      <div className="connected-app-card">
                        <ul>
                          <li>
                            <div className="security-type">
                              <div className="security-title">
                                <h5>Maintenance Mode</h5>
                              </div>
                            </div>
                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                              <input type="checkbox" id="user1" className="check" defaultChecked />
                              <label htmlFor="user1" className="checktoggle">
                                {' '}
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                      <div className="connected-app-card">
                        <ul>
                          <li>
                            <div className="security-type">
                              <div className="security-title">
                                <h5>Copoun</h5>
                              </div>
                            </div>
                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                              <input type="checkbox" id="user2" className="check" defaultChecked />
                              <label htmlFor="user2" className="checktoggle">
                                {' '}
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                      <div className="connected-app-card">
                        <ul>
                          <li>
                            <div className="security-type">
                              <div className="security-title">
                                <h5>Offers</h5>
                              </div>
                            </div>
                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                              <input type="checkbox" id="user3" className="check" defaultChecked />
                              <label htmlFor="user3" className="checktoggle">
                                {' '}
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                      <div className="connected-app-card">
                        <ul>
                          <li>
                            <div className="security-type">
                              <div className="security-title">
                                <h5>MultiLanguage</h5>
                              </div>
                            </div>
                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                              <input type="checkbox" id="user4" className="check" defaultChecked />
                              <label htmlFor="user4" className="checktoggle">
                                {' '}
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                      <div className="connected-app-card">
                        <ul>
                          <li>
                            <div className="security-type">
                              <div className="security-title">
                                <h5>Multicurrency</h5>
                              </div>
                            </div>
                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                              <input type="checkbox" id="user5" className="check" defaultChecked />
                              <label htmlFor="user5" className="checktoggle">
                                {' '}
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                      <div className="connected-app-card">
                        <ul>
                          <li>
                            <div className="security-type">
                              <div className="security-title">
                                <h5>SMS</h5>
                              </div>
                            </div>
                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                              <input type="checkbox" id="user6" className="check" defaultChecked />
                              <label htmlFor="user6" className="checktoggle">
                                {' '}
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                      <div className="connected-app-card">
                        <ul>
                          <li>
                            <div className="security-type">
                              <div className="security-title">
                                <h5>Stores</h5>
                              </div>
                            </div>
                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                              <input type="checkbox" id="user7" className="check" defaultChecked />
                              <label htmlFor="user7" className="checktoggle">
                                {' '}
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                      <div className="connected-app-card">
                        <ul>
                          <li>
                            <div className="security-type">
                              <div className="security-title">
                                <h5>Warehouses</h5>
                              </div>
                            </div>
                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                              <input type="checkbox" id="user8" className="check" defaultChecked />
                              <label htmlFor="user8" className="checktoggle">
                                {' '}
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                      <div className="connected-app-card">
                        <ul>
                          <li>
                            <div className="security-type">
                              <div className="security-title">
                                <h5>Barcode</h5>
                              </div>
                            </div>
                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                              <input type="checkbox" id="user9" className="check" defaultChecked />
                              <label htmlFor="user9" className="checktoggle">
                                {' '}
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                      <div className="connected-app-card">
                        <ul>
                          <li>
                            <div className="security-type">
                              <div className="security-title">
                                <h5>QR Code</h5>
                              </div>
                            </div>
                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                              <input type="checkbox" id="user10" className="check" defaultChecked />
                              <label htmlFor="user10" className="checktoggle">
                                {' '}
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                      <div className="connected-app-card">
                        <ul>
                          <li>
                            <div className="security-type">
                              <div className="security-title">
                                <h5>HRMS</h5>
                              </div>
                            </div>
                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                              <input type="checkbox" id="user11" className="check" defaultChecked />
                              <label htmlFor="user11" className="checktoggle">
                                {' '}
                              </label>
                            </div>
                          </li>
                        </ul>
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

export default Preference;
