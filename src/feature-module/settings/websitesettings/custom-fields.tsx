/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useState } from 'react';
// import {
//   ChevronUp,
//   Edit2,
//   PlusCircle,
//   RotateCcw,
//   Sliders,
//   StopCircle,
//   Zap,
// } from "feather-icons-react/build/IconComponents";
import { OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../../core/img/imagewithbasebath';
import { Filter } from 'react-feather';
import Select from 'react-select';
import AddCustomFields from '../../../core/modals/settings/add-custom-fields';
import EditCustomFields from '../../../core/modals/settings/edit-custom-fields';
import SettingsSideBar from '../settingssidebar';
import { customFieldsData } from '../../../core/json/customFields';
import Table from '../../../core/pagination/data-table';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { ColumnsType } from 'antd/es/table';
import FeatherIcon from 'feather-icons-react';
import { toggleShowHeader } from '../../../store/feature-slice/utils';

const CustomFields = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.slices.showHeader);

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };
  const oldandlatestvalue = [
    { value: 'date', label: 'Sort by Date' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
  ];
  const options = [
    { value: 'chooseModule', label: 'Choose Module' },
    { value: 'expense', label: 'Expense' },
    { value: 'transaction', label: 'Transaction' },
  ];
  const fields = [
    { value: 'chooseFields', label: 'Choose Fields' },
    { value: 'expense', label: 'Expense' },
    { value: 'transaction', label: 'Transaction' },
  ];
  const status = [
    { value: 'chooseStatus', label: 'Choose Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
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

  const datas = customFieldsData;
  const [searchText, setSearchText] = useState('');

  const handleSearch = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchText(event.target.value);
  };

  const filteredData = datas.filter((entry: { [key: string]: string }) => {
    return Object.keys(entry).some((key) => {
      return String(entry[key]).toLowerCase().includes(searchText.toLowerCase());
    });
  });
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
  const columns: ColumnsType<any> = [
    {
      title: 'Module',
      dataIndex: 'module',
      sorter: (a, b) => a.module.length - b.module.length,
    },
    {
      title: 'Label',
      dataIndex: 'label',
      sorter: (a, b) => a.label.length - b.label.length,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      sorter: (a, b) => a.type.length - b.type.length,
    },
    {
      title: 'Default Value',
      dataIndex: 'defaultValue',
      sorter: (a, b) => a.defaultValue.length - b.defaultValue.length,
    },
    {
      title: 'Required',
      dataIndex: 'required',
      sorter: (a, b) => a.required.length - b.required.length,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.length - b.status.length,
      render: () => <span className="badge badge-linesuccess">Active</span>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: () => (
        <div className="edit-delete-action action-table-data">
          <Link className="me-2 p-2" to="#" data-bs-toggle="modal" data-bs-target="#edit-custom-field">
            <i data-feather="edit" className="feather-edit" />
          </Link>
          <Link className="confirm-text p-2" to="#" onClick={showConfirmationAlert}>
            <i data-feather="trash-2" className="feather-trash-2" />
          </Link>
        </div>
      ),
    },
  ];

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
                      dispatch(toggleShowHeader());
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
                    <h4>Custom Fields</h4>
                  </div>
                  <div className="page-header justify-content-end">
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
                          <Link to="">
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
                    </ul>
                    <div className="page-btn">
                      <Link to="#" className="btn btn-added" data-bs-toggle="modal" data-bs-target="#add-custom-field">
                        {/* <PlusCircle className="me-2" /> */}
                        <FeatherIcon icon="plus-circle" className="me-2" />
                        Add New Field
                      </Link>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card table-list-card">
                        <div className="card-body">
                          <div className="table-top">
                            <div className="search-set">
                              <div className="search-input">
                                <input
                                  type="search"
                                  className="form-control form-control-sm"
                                  placeholder="Search"
                                  aria-controls="DataTables_Table_0"
                                  value={searchText}
                                  onChange={handleSearch}
                                />
                                <Link to="" className="btn btn-searchset">
                                  <i data-feather="search" className="feather-search" />
                                </Link>
                              </div>
                            </div>
                            <div className="search-path">
                              <div className="d-flex align-items-center">
                                <Link
                                  to=""
                                  className={`btn btn-filter ${isFilterVisible ? 'setclose' : ''}`}
                                  id="filter_search"
                                >
                                  <Filter className="filter-icon" onClick={toggleFilterVisibility} />
                                  <span onClick={toggleFilterVisibility}>
                                    <ImageWithBasePath src="assets/img/icons/closes.svg" alt="img" />
                                  </span>
                                </Link>
                                <div className="layout-hide-box">
                                  <Link to="#" className="me-3 layout-box">
                                    <i data-feather="layout" className="feather-search" />
                                  </Link>
                                  <div className="layout-drop-item card">
                                    <div className="drop-item-head">
                                      <h5>Want to manage datatable?</h5>
                                      <p>
                                        Please drag and drop your column to reorder your table and enable see option as
                                        you want.
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
                                </div>
                              </div>
                            </div>
                            <div className="form-sort">
                              {/* <Sliders className="info-img" /> */}
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
                            style={{
                              display: isFilterVisible ? 'block' : 'none',
                            }}
                          >
                            <div className="card-body pb-0">
                              <div className="row">
                                <div className="col-lg-3 col-sm-6 col-12">
                                  <div className="input-blocks">
                                    {/* <Zap className="info-img" /> */}
                                    <FeatherIcon icon="zap" className="info-img" />
                                    <Select
                                      className="img-select"
                                      options={options}
                                      classNamePrefix="react-select"
                                      placeholder="Choose a Module"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-3 col-sm-6 col-12">
                                  <div className="input-blocks">
                                    {/* <Edit2 className="info-img" /> */}
                                    <FeatherIcon icon="edit" className="info-img" />
                                    <Select
                                      className="img-select"
                                      options={fields}
                                      classNamePrefix="react-select"
                                      placeholder="Choose a Field"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-3 col-sm-6 col-12">
                                  <div className="input-blocks">
                                    {/* <StopCircle className="info-img" /> */}
                                    <FeatherIcon icon="stop-circle" className="info-img" />
                                    <Select
                                      className="img-select"
                                      options={status}
                                      classNamePrefix="react-select"
                                      placeholder="Choose a Status"
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
                            <Table columns={columns} dataSource={filteredData} />
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
      <AddCustomFields />
      <EditCustomFields />
    </div>
  );
};

export default CustomFields;
