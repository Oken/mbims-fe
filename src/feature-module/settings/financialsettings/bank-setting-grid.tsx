import { SetStateAction, useState } from 'react';
// import {
//   ChevronUp,
//   Edit,
//   Grid,
//   List,
//   PlusCircle,
//   RotateCcw,
//   Trash2,
// } from "feather-icons-react/build/IconComponents";
import { OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { setToogleHeader } from '../../../store/action';
import AddBankAccount from '../../../core/modals/settings/add-bank-account';
import EditBankAccount from '../../../core/modals/settings/edit-bank-account';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import SettingsSideBar from '../settingssidebar';
import { all_routes } from '../../../Router/all_routes';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import FeatherIcon from 'feather-icons-react';

const BankSettingGrid = () => {
  const [isActive, setIsActive] = useState('Karur vysya bank');

  const setActive = (theme: SetStateAction<string>) => {
    setIsActive(theme);
  };

  const route = all_routes;

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

  const MySwal = withReactContent(Swal);

  const showConfirmationAlert = () => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#00ff00',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonColor: '#ff0000',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          // className: 'btn btn-success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        });
      } else {
        MySwal.close();
      }
    });
  };

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
                <div className="settings-page-wrap w-50">
                  <div className="setting-title">
                    <h4>Bank Account</h4>
                  </div>
                  <div className="page-header bank-settings justify-content-end">
                    <Link to={route.banksettingslist} className="btn-list me-2">
                      {/* <List className="feather-user" /> */}
                      <FeatherIcon icon="list" className="feather-icon" />
                    </Link>
                    <Link to={route.banksettingslist} className="btn-grid active">
                      {/* <Grid className="feather-user" /> */}
                      <FeatherIcon icon="grid" className="feather-user" />
                    </Link>
                    <div className="page-btn">
                      <Link to="#" className="btn btn-added" data-bs-toggle="modal" data-bs-target="#add-account">
                        {/* <PlusCircle className="me-2" /> */}
                        <FeatherIcon icon="plus-circle" className="me-2" />
                        Add New Account
                      </Link>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xxl-4 col-xl-6 col-lg-12 col-sm-6">
                      <div
                        className={`bank-box  ${isActive === 'Karur vysya bank' ? 'active' : ''}`}
                        onClick={() => setActive('Karur vysya bank')}
                      >
                        <div className="bank-header">
                          <div className="bank-name">
                            <h6>Karur vysya bank</h6>
                            <p>**** **** 1982</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="bank-info">
                            <span>Holder Name</span>
                            <h6>John Smith</h6>
                          </div>
                          <div className="edit-delete-action bank-action-btn">
                            <Link className="me-2 p-2" to="#" data-bs-toggle="modal" data-bs-target="#edit-account">
                              {/* <Edit className="feather feather-edit" /> */}
                              <FeatherIcon icon="edit" className="feather feather-edit" />
                            </Link>
                            <Link onClick={showConfirmationAlert} className="confirm-text p-2" to="#">
                              {/* <Trash2 className="feather-trash-2" /> */}
                              <FeatherIcon icon="trash" className="feather-trash-2" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-xl-6 col-lg-12 col-sm-6">
                      <div
                        className={`bank-box ${isActive === 'Swiss Bank' ? 'active' : ''}`}
                        onClick={() => setActive('Swiss Bank')}
                      >
                        <div className="bank-header">
                          <div className="bank-name">
                            <h6>Swiss Bank</h6>
                            <p>**** **** 1796</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="bank-info">
                            <span>Holder Name</span>
                            <h6>Andrew</h6>
                          </div>
                          <div className="edit-delete-action bank-action-btn">
                            <Link className="me-2 p-2" to="#" data-bs-toggle="modal" data-bs-target="#edit-account">
                              {/* <Edit className="feather feather-edit" /> */}
                              <FeatherIcon icon="edit" className="feather feather-edit" />
                            </Link>
                            <Link onClick={showConfirmationAlert} className="confirm-text p-2" to="#">
                              {/* <Trash2 className="feather-trash-2" /> */}
                              <FeatherIcon icon="trash" className="feather-trash-2" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-xl-6 col-lg-12 col-sm-6">
                      <div
                        className={`bank-box ${isActive === 'HDFC' ? 'active' : ''}`}
                        onClick={() => setActive('HDFC')}
                      >
                        <div className="bank-header">
                          <div className="bank-name">
                            <h6>HDFC</h6>
                            <p>**** **** 1832</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="bank-info">
                            <span>Holder Name</span>
                            <h6>Mathew</h6>
                          </div>
                          <div className="edit-delete-action bank-action-btn">
                            <Link className="me-2 p-2" to="#" data-bs-toggle="modal" data-bs-target="#edit-account">
                              {/* <Edit className="feather feather-edit" /> */}
                              <FeatherIcon icon="edit" className="feather feather-edit-2" />
                            </Link>
                            <Link onClick={showConfirmationAlert} className="confirm-text p-2" to="#">
                              {/* <Trash2 className="feather-trash-2" /> */}
                              <FeatherIcon icon="trash" className="feather-trash-2" />
                            </Link>
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
      <AddBankAccount />
      <EditBankAccount />
    </div>
  );
};

export default BankSettingGrid;
