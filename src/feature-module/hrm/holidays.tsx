/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useState } from 'react';
import { OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../core/img/imagewithbasebath.tsx';
import { FileText, Filter, Layout, PlusCircle, Sliders, StopCircle, Users, ChevronUp, RotateCcw } from 'react-feather';
import Select from 'react-select';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Table from '../../core/pagination/data-table.tsx';
import AddHolidays from '../../core/modals/hrm/add-holidays.js';
import EditHolidays from '../../core/modals/hrm/edit-holidays.js';
// import { leavedata } from "../../core/json/leavesdata.js";
import { leavedata } from '../../core/json/leavesdata.ts';
import { ColumnsType } from 'antd/es/table/interface';
import { useAppDispatch, useAppSelector } from '../../store/hooks/index.ts';
import FeatherIcon from 'feather-icons-react';
import { toggleShowHeader } from '../../store/feature-slice/utils/index.ts';

type DataEntry = {
  [key: string]: any;
};

const Holidays = () => {
  const datas: DataEntry[] = leavedata;

  const [searchText, setSearchText] = useState('');

  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchText(e.target.value);
  };

  const filteredData = datas.filter((entry) => {
    return Object.keys(entry).some((key: string) => {
      return String(entry[key] as any)
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });
  });

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
  const oldandlatestvalue = [
    { value: 'date', label: 'Sort by Date' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
  ];
  const hod = [
    { value: 'Choose HOD', label: 'Choose HOD' },
    { value: 'Mitchum Daniel', label: 'Mitchum Daniel' },
    { value: 'Susan Lopez', label: 'Susan Lopez' },
  ];
  const status = [
    { value: 'Choose Status', label: 'Choose Status' },
    { value: 'Mitchum Daniel', label: 'Mitchum Daniel' },
    { value: 'Susan Lopez', label: 'Susan Lopez' },
  ];

  const holidays = [
    { value: 'Choose Holiday', label: 'Choose Holiday' },
    { value: 'UI/UX', label: 'UI/UX' },
    { value: 'HR', label: 'HR' },
    { value: 'Admin', label: 'Admin' },
    { value: 'Engineering', label: 'Engineering' },
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
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'date',
      dataIndex: 'date',
      sorter: (a, b) => a.date.length - b.date.length,
    },
    {
      title: 'duration',
      dataIndex: 'duration',
      sorter: (a, b) => a.duration.length - b.duration.length,
    },
    {
      title: 'createdon',
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
            <Link className="me-2 p-2" to="#" data-bs-toggle="modal" data-bs-target="#edit-department">
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
                <h4>Holiday</h4>
                <h6>Manage your Holiday</h6>
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
              <Link to="" className="btn btn-added" data-bs-toggle="modal" data-bs-target="#add-department">
                <PlusCircle className="me-2" />
                Add New Holiday
              </Link>
            </div>
          </div>
          {/* /product list */}
          <div className="card table-list-card">
            <div className="card-body pb-0">
              <div className="table-top">
                <div className="input-blocks search-set mb-0">
                  <div className="search-input">
                    <Link to="#" className="btn btn-searchset">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-search"
                      >
                        <circle cx={11} cy={11} r={8} />
                        <line x1={21} y1={21} x2="16.65" y2="16.65" />
                      </svg>
                    </Link>
                    <div id="DataTables_Table_0_filter" className="dataTables_filter">
                      <label>
                        {' '}
                        <input
                          type="search"
                          className="form-control form-control-sm"
                          placeholder="Search"
                          aria-controls="DataTables_Table_0"
                          value={searchText}
                          onChange={handleSearch}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="search-path d-flex align-items-center search-path-new">
                  <Link to="" className={`btn btn-filter ${isFilterVisible ? 'setclose' : ''}`} id="filter_search">
                    <Filter className="filter-icon" onClick={toggleFilterVisibility} />
                    <span onClick={toggleFilterVisibility}>
                      <ImageWithBasePath src="assets/img/icons/closes.svg" alt="img" />
                    </span>
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
                <div className="form-sort">
                  <Sliders className="info-img" />
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
                        <FileText className="info-img" />

                        <Select
                          className="img-select"
                          classNamePrefix="react-select"
                          options={holidays}
                          placeholder="Choose Holiday"
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <Users className="info-img" />
                        <Select
                          className="img-select"
                          classNamePrefix="react-select"
                          options={hod}
                          placeholder="Choose Holiday"
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <StopCircle className="info-img" />

                        <Select
                          className="img-select"
                          classNamePrefix="react-select"
                          options={status}
                          placeholder="Choose Status"
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
              {/* product list */}
              <div className="table-responsive">
                <Table columns={columns} dataSource={filteredData} />
              </div>
              {/* /product list */}
            </div>
          </div>
        </div>
      </div>
      <AddHolidays />
      <EditHolidays />
    </div>
  );
};

export default Holidays;
