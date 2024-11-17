// import { ChevronUp, Mail, RotateCcw, Settings } from 'feather-icons-react/build/IconComponents'
import { Link } from 'react-router-dom';
import NexmoConfig from '../../../core/modals/settings/nexmo-config';
import TwilioConfig from '../../../core/modals/settings/twilio-config';
import TwoFactorConfig from '../../../core/modals/settings/two-factor-config';
import { OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap';
import { setToogleHeader } from '../../../store/action';
import SettingsSideBar from '../settingssidebar';
import ImageWithBasePath from '../../../core/img/imagewithbasebath';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import FeatherIcon from 'feather-icons-react';

const SmsGateway = () => {
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
                    <h4>SMS Gateways</h4>
                  </div>
                  <div className="page-header text-end justify-content-end">
                    <Link to="#" className="btn-added btn-primary">
                      {/* <Mail className="me-2" /> */}
                      <FeatherIcon icon="mail" className="me-2" />
                      Send test email
                    </Link>
                  </div>
                  <div className="row">
                    <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6 d-flex">
                      <div className="connected-app-card d-flex w-100">
                        <ul className="w-100 d-flex justify-content-between align-items-center">
                          <li className="gateway-icon mb-0">
                            <ImageWithBasePath src="assets/img/icons/sms-icon-01.svg" alt="" />
                          </li>
                          <li className="setting-gateway d-flex align-items-center">
                            <Link to="" data-bs-toggle="modal" data-bs-target="#nexmo-config">
                              {/* <Settings className="me-2" /> */}
                              <FeatherIcon icon="settings" className="me-2" />
                            </Link>
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
                    <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6 d-flex">
                      <div className="connected-app-card d-flex w-100">
                        <ul className="w-100 d-flex justify-content-between align-items-center">
                          <li className="gateway-icon mb-0">
                            <ImageWithBasePath src="assets/img/icons/sms-icon-02.svg" alt="" />
                          </li>
                          <li className="setting-gateway d-flex align-items-center">
                            <Link to="" data-bs-toggle="modal" data-bs-target="#factor-config">
                              {/* <Settings className="me-2" /> */}
                              <FeatherIcon icon="settings" className="me-2" />
                            </Link>
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
                    <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6 d-flex">
                      <div className="connected-app-card d-flex w-100">
                        <ul className="w-100 d-flex justify-content-between align-items-center">
                          <li className="gateway-icon mb-0">
                            <ImageWithBasePath src="assets/img/icons/sms-icon-03.svg" alt="" />
                          </li>
                          <li className="setting-gateway d-flex align-items-center">
                            <Link to="" data-bs-toggle="modal" data-bs-target="#twilio-config">
                              {/* <Settings className="me-2" /> */}
                              <FeatherIcon icon="setting" className="me-2" />
                            </Link>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NexmoConfig />
      <TwoFactorConfig />
      <TwilioConfig />
    </div>
  );
};

export default SmsGateway;
