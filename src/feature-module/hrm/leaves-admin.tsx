/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { Filter, Layout, Sliders, ChevronUp, RotateCcw } from 'react-feather';
import Table from '../../core/pagination/data-table';
import { all_routes } from '../../Router/all_routes';
import Select from 'react-select';
import { Tag } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ColumnsType } from 'antd/es/table';

import { leavesadmindata } from '../../core/json/leavesadmin';
import { toggleShowHeader } from '../../store/feature-slice/utils';
import FeatherIcon from 'feather-icons-react';

const LeavesAdmin = () => {
  const options = [
    { value: 'sortByDate', label: 'Sort By Date' },
    { value: 'Newest', label: 'Newest' },
    { value: 'Oldest', label: 'Oldest' },
  ];
  const options2 = [
    { value: 'Approved', label: 'Approved' },
    { value: 'Rejected', label: 'Rejected' },
  ];

  const route = all_routes;

  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.slices.showHeader);
  const dataSource = leavesadmindata;

  // const [isFilterVisible, setIsFilterVisible] = useState(false);
  // const toggleFilterVisibility = () => {
  //     setIsFilterVisible((prevVisibility) => !prevVisibility);
  // };
  const [isLayoutVisible, setIsLayoutVisible] = useState(false);
  const handleLayoutClick = () => {
    setIsLayoutVisible(!isLayoutVisible);
  };

  // const oldandlatestvalue = [
  //     { value: 'date', label: 'Sort by Date' },
  //     { value: 'newest', label: 'Newest' },
  //     { value: 'oldest', label: 'Oldest' },
  // ];

  // const employee = [
  //     { value: 'Choose Employee', label: 'Choose Employee' },
  //     { value: 'Mitchum Daniel', label: 'Mitchum Daniel' },
  //     { value: 'Susan Lopez', label: 'Susan Lopez' },
  //     { value: 'Robert Grossman', label: 'Robert Grossman' },
  //     { value: 'Janet Hembre', label: 'Janet Hembre' },
  // ];
  // const leavetype = [
  //     { value: 'Choose Type', label: 'Choose Type' },
  //     { value: 'Sick Leave', label: 'Sick Leave' },
  //     { value: 'Maternity', label: 'Maternity' },
  //     { value: 'Vacation', label: 'Vacation' },
  // ];
  // const leavestatus = [
  //     { value: 'Choose Status', label: 'Choose Status' },
  //     { value: 'Approved', label: 'Approved' },
  //     { value: 'Rejected', label: 'Rejected' },
  // ];

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
      title: 'Emp Name',
      dataIndex: 'empname',
      sorter: (a, b) => a.empname.length - b.empname.length,
    },
    {
      title: 'Emp Id',
      dataIndex: 'empid',
      sorter: (a, b) => a.empid.length - b.empid.length,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      sorter: (a, b) => a.type.length - b.type.length,
    },
    {
      title: 'From Date',
      dataIndex: 'fromdate',
      sorter: (a, b) => a.fromdate.length - b.fromdate.length,
    },
    {
      title: 'To Date',
      dataIndex: 'todate',
      sorter: (a, b) => a.todate.length - b.todate.length,
    },
    {
      title: 'Days/Hours',
      dataIndex: 'days/hours',
      sorter: (a, b) => a.days.length - b.days.length,
    },
    {
      title: 'Shift',
      dataIndex: 'shift',
      sorter: (a, b) => a.shift.length - b.shift.length,
    },
    {
      title: 'Applied On',
      dataIndex: 'appliedon',
      sorter: (a, b) => a.appliedon.length - b.appliedon.length,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        if (text === 'Approved') {
          return <Tag className="badges status-badge">{text}</Tag>;
        } else if (text === 'Rejected') {
          return <Tag className="badges unstatus-badge">{text}</Tag>;
        } else if (text === 'Approve\n    Rejected') {
          return <Select classNamePrefix="react-select" options={options2} placeholder="Approved" />;
        } else {
          return null;
        }
      },
    },
  ];
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Leaves</h4>
                <h6>Manage your Leaves</h6>
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
              <Link to={route.leavestype} className="btn btn-added">
                Leave type
              </Link>
            </div>
          </div>
          {/* /product list */}
          <div className="card table-list-card">
            <div className="card-body pb-0">
              <div className="table-top">
                <div className="input-blocks search-set mb-0">
                  {/* <div class="total-employees">
                                          <h6><i data-feather="users" class="feather-user"></i>Total Employees <span>21</span></h6>
                                      </div> */}
                  <div className="search-input">
                    <input type="text" placeholder="Search" className="form-control form-control-sm formsearch" />
                    <Link to="" className="btn btn-searchset">
                      <i data-feather="search" className="feather-search" />
                    </Link>
                  </div>
                </div>
                <div className="search-path">
                  <div className="d-flex align-items-center">
                    <Link to="" className="btn btn-filter" id="filter_search">
                      <Filter className="filter-icon" />
                    </Link>
                    <div className={`layout-hide-box ${isLayoutVisible ? 'layout-show-box' : 'layout-hide-box'}`}>
                      <Link to="#" className="me-3 layout-box" onClick={handleLayoutClick}>
                        <Layout />
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
                  <Sliders className="info-img" />
                  <Select
                    className="img-select"
                    classNamePrefix="react-select"
                    options={options}
                    placeholder="Sort By Date"
                  />
                </div>
              </div>
              {/* /Filter */}
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
  );
};

export default LeavesAdmin;
