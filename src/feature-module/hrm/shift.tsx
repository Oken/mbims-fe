/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useState } from 'react';
import { OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../core/img/imagewithbasebath.js';
import {
  Calendar,
  ChevronUp,
  Filter,
  PlusCircle,
  RotateCcw,
  StopCircle,
  Zap,
  Layout,
} from 'react-feather';
import Select from 'react-select';
import { DatePicker } from 'antd';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Table from '../../core/pagination/data-table.js';
import AddShift from '../../core/modals/hrm/add-shift.js';
import EditShift from '../../core/modals/hrm/edit-shift.js';
import { ColumnsType } from 'antd/es/table/interface.js';
import { useAppDispatch, useAppSelector } from '../../store/hooks/index.js';
import { toggleShowHeader } from '../../store/feature-slice/utils/index.js';
import { shiftlistdata } from '../../core/json/shiftlistdata.js';
import FeatherIcon from 'feather-icons-react';

const Shift = () => {
  const dataSource = shiftlistdata;
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.slices.showHeader);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };
  const [isLayoutVisible, setIsLayoutVisible] = useState(false);
  const handleLayoutClick = () => {
    setIsLayoutVisible(!isLayoutVisible);
  };

  const [, setSelectedDate] = useState(new Date());
  const handleDateChange = (date: SetStateAction<Date>) => {
    setSelectedDate(date);
  };

  const oldandlatestvalue = [
    { value: 'date', label: 'Sort by Date' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
  ];
  const status = [
    { value: 'Choose Status', label: 'Choose Status' },
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];
  const shift = [
    { value: 'Choose Shift', label: 'Choose Shift' },
    { value: 'Fixed', label: 'Fixed' },
    { value: 'Rotating', label: 'Rotating' },
    { value: 'Split', label: 'Split' },
    { value: 'On-Call', label: 'On-Call' },
    { value: 'Weekend', label: 'Weekend' },
  ];

  const renderTooltip = (props: TooltipProps) => (
    <Tooltip id="pdf-tooltip" {...props}>
      Pdf
    </Tooltip>
  );
  const renderExcelTooltip = (props: TooltipProps) => (
    <Tooltip id="excel-tooltip" {...props}>
      Excel
    </Tooltip>
  );
  const renderPrinterTooltip = (props: TooltipProps) => (
    <Tooltip id="printer-tooltip" {...props}>
      Printer
    </Tooltip>
  );
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
  const columns: ColumnsType<any> = [
    {
      title: 'Shift Name',
      dataIndex: 'shiftname',
      sorter: (a, b) => a.shiftname.length - b.shiftname.length,
    },

    {
      title: 'Time',
      dataIndex: 'time',
      sorter: (a, b) => a.time.length - b.time.length,
    },
    {
      title: 'Week Off',
      dataIndex: 'weekoff',
      sorter: (a, b) => a.weekoff.length - b.weekoff.length,
    },
    {
      title: 'Created On',
      dataIndex: 'createdon',
      sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text) => (
        <span className="badge badge-linesuccess">
          <Link to="#"> {text}</Link>
        </span>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },

    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: () => (
        <div className="action-table-data">
          <div className="edit-delete-action">
            <Link className="me-2 p-2" to="#" data-bs-toggle="modal" data-bs-target="#edit-units">
              <i data-feather="edit" className="feather-edit"></i>
            </Link>
            <Link className="confirm-text p-2" to="#">
              <i data-feather="trash-2" className="feather-trash-2" onClick={showConfirmationAlert}></i>
            </Link>
          </div>
        </div>
      ),
    },
  ];
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
          // className: "btn btn-success",
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
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Shift</h4>
                <h6>Manage your employees shift</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <li>
                <OverlayTrigger placement="top" overlay={renderTooltip}>
                  <Link to="">
                    <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
                  <Link to="" data-bs-toggle="tooltip" data-bs-placement="top">
                    <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderPrinterTooltip}>
                  <Link to="" data-bs-toggle="tooltip" data-bs-placement="top">
                    <i data-feather="printer" className="feather-printer" />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                  <Link to="" data-bs-toggle="tooltip" data-bs-placement="top">
                    <RotateCcw />
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
                      dispatch(toggleShowHeader());
                    }}
                  >
                    <ChevronUp />
                    <FeatherIcon icon="chevron-up" />
                  </Link>
                </OverlayTrigger>
              </li>
            </ul>
            <div className="page-btn">
              <Link to="#" className="btn btn-added" data-bs-toggle="modal" data-bs-target="#add-units">
                <PlusCircle className="me-2" />
                <FeatherIcon icon="plus-circle" className="me-2" />
                Add New Shift
              </Link>
            </div>
          </div>
          {/* /product list */}
          <div className="card table-list-card">
            <div className="card-body">
              <div className="table-top">
                <div className="search-set">
                  <div className="search-input">
                    <input type="text" placeholder="Search" className="form-control form-control-sm formsearch" />
                    <Link to="" className="btn btn-searchset">
                      <i data-feather="search" className="feather-search" />
                    </Link>
                  </div>
                </div>
                <div className="search-path">
                  <div className="d-flex align-items-center">
                    <Link to="" className={`btn btn-filter ${isFilterVisible ? 'setclose' : ''}`} id="filter_search">
                      <Filter className="filter-icon" onClick={toggleFilterVisibility} />
                      <span onClick={toggleFilterVisibility}>
                        <FeatherIcon icon="filter" className="filter-icon" />
                      </span>
                      <span onClick={toggleFilterVisibility}>
                        <ImageWithBasePath src="assets/img/icons/closes.svg" alt="img" />
                      </span>
                    </Link>
                    <div className={`layout-hide-box ${isLayoutVisible ? 'layout-show-box' : 'layout-hide-box'}`}>
                      <Link to="#" className="me-3 layout-box" onClick={handleLayoutClick}>
                        <Layout />
                        <FeatherIcon icon="layout" />
                      </Link>
                      {isLayoutVisible && (
                        <div className="layout-drop-item card">
                          <div className="drop-item-head">
                            <h5>Want to manage datatable?</h5>
                            <p>
                              Please drag and drop your column to reorder your table and enable see option as you want.
                            </p>
                          </div>
                          <ul>
                            <li>
                              <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                <span className="status-label">
                                  <i data-feather="menu" className="feather-menu" />
                                  Shop
                                </span>
                                <input type="checkbox" id="option1" className="check" defaultChecked />
                                <label htmlFor="option1" className="checktoggle">
                                  {' '}
                                </label>
                              </div>
                            </li>
                            <li>
                              <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                <span className="status-label">
                                  <i data-feather="menu" className="feather-menu" />
                                  Product
                                </span>
                                <input type="checkbox" id="option2" className="check" defaultChecked />
                                <label htmlFor="option2" className="checktoggle">
                                  {' '}
                                </label>
                              </div>
                            </li>
                            <li>
                              <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                <span className="status-label">
                                  <i data-feather="menu" className="feather-menu" />
                                  Reference No
                                </span>
                                <input type="checkbox" id="option3" className="check" defaultChecked />
                                <label htmlFor="option3" className="checktoggle">
                                  {' '}
                                </label>
                              </div>
                            </li>
                            <li>
                              <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                <span className="status-label">
                                  <i data-feather="menu" className="feather-menu" />
                                  Date
                                </span>
                                <input type="checkbox" id="option4" className="check" defaultChecked />
                                <label htmlFor="option4" className="checktoggle">
                                  {' '}
                                </label>
                              </div>
                            </li>
                            <li>
                              <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                <span className="status-label">
                                  <i data-feather="menu" className="feather-menu" />
                                  Responsible Person
                                </span>
                                <input type="checkbox" id="option5" className="check" defaultChecked />
                                <label htmlFor="option5" className="checktoggle">
                                  {' '}
                                </label>
                              </div>
                            </li>
                            <li>
                              <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                <span className="status-label">
                                  <i data-feather="menu" className="feather-menu" />
                                  Notes
                                </span>
                                <input type="checkbox" id="option6" className="check" defaultChecked />
                                <label htmlFor="option6" className="checktoggle">
                                  {' '}
                                </label>
                              </div>
                            </li>
                            <li>
                              <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                <span className="status-label">
                                  <i data-feather="menu" className="feather-menu" />
                                  Quantity
                                </span>
                                <input type="checkbox" id="option7" className="check" defaultChecked />
                                <label htmlFor="option7" className="checktoggle">
                                  {' '}
                                </label>
                              </div>
                            </li>
                            <li>
                              <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                <span className="status-label">
                                  <i data-feather="menu" className="feather-menu" />
                                  Actions
                                </span>
                                <input type="checkbox" id="option8" className="check" defaultChecked />
                                <label htmlFor="option8" className="checktoggle">
                                  {' '}
                                </label>
                              </div>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-sort">
                  <FeatherIcon icon="sliders" className="info-img" />
                  <Select
                    className="img-select"
                    classNamePrefix="react-select"
                    options={oldandlatestvalue}
                    placeholder="Newest"
                  />
                </div>
              </div>
              {/* /Filter */}
              <div
                className={`card${isFilterVisible ? ' visible' : ''}`}
                id="filter_inputs"
                style={{ display: isFilterVisible ? 'block' : 'none' }}
              >
                <div className="card-body pb-0">
                  <div className="row">
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <Zap className="info-img" />
                        <FeatherIcon icon="zap" className="info-img" />

                        <Select
                          className="img-select"
                          classNamePrefix="react-select"
                          options={shift}
                          placeholder="Newest"
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <div className="input-groupicon">
                          <Calendar className="info-img" />
                          <FeatherIcon icon="calender" className="info-img" />
                          <DatePicker
                            // selected={selectedDate}
                            onChange={handleDateChange}
                            type="date"
                            className="filterdatepicker"
                            // dateFormat="dd-MM-yyyy"
                            placeholder="Choose Date"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <StopCircle className="info-img" />
                        <FeatherIcon icon="stop-circle" className="info-img" />

                        <Select
                          className="img-select"
                          classNamePrefix="react-select"
                          options={status}
                          placeholder="Newest"
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12 ms-auto">
                      <div className="input-blocks">
                        <Link to="" className="btn btn-filters ms-auto">
                          {' '}
                          <i data-feather="search" className="feather-search" /> Search{' '}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Filter */}
              <div className="table-responsive">
                <Table columns={columns} dataSource={dataSource} />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
      <AddShift />
      <EditShift />
    </div>
  );
};

export default Shift;
