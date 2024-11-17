/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Table from '../../core/pagination/data-table';
import AddWarrenty from '../../core/modals/inventory/add-warrenty';
import EditWarrenty from '../../core/modals/inventory/edit-warrenty';
// import {
//   ChevronUp,
//   Clock,
//   Filter,
//   PlusCircle,
//   RotateCcw,
//   Sliders,
//   StopCircle,
// } from 'feather-icons-react/build/IconComponents';
import Select from 'react-select';
import { OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import withReactContent from 'sweetalert2-react-content';
import { warrentydata } from '../../core/json/waarrentydata';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleShowHeader } from '../../store/feature-slice/utils';
import { ColumnsType } from 'antd/es/table';
import FeatherIcon from 'feather-icons-react';

const Warranty = () => {
  const dataSource = warrentydata;
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.slices.showHeader);

  const oldandlatestvalue = [
    { value: 'date', label: 'Sort by Date' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
  ];
  const duration = [
    { value: 'Choose Duration', label: '>Choose Duration' },
    { value: '3 Months', label: '3 Months' },
    { value: '6 Months', label: '6 Months' },
    { value: '1 Year', label: '1 Year' },
  ];

  const status = [
    { value: 'choose Status', label: 'Choose Status' },
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };
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
      width: '10px',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      sorter: (a, b) => a.description.length - b.description.length,
      width: '10px',
    },

    {
      title: 'Duration',
      dataIndex: 'duration',
      sorter: (a, b) => a.duration.length - b.duration.length,
      width: '10px',
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
            <Link className="confirm-text p-2" to="#" onClick={showConfirmationAlert}>
              <i data-feather="trash-2" className="feather-trash-2"></i>
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
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Warranty</h4>
              <h6>Manage your warranty</h6>
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
          <div className="page-btn">
            <Link to="#" className="btn btn-added" data-bs-toggle="modal" data-bs-target="#add-units">
              {/* <PlusCircle className="me-2" /> */}
              <FeatherIcon icon="plus-circle" className="me-2" />
              Add New Warranty
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
                <Link to="" className={`btn btn-filter ${isFilterVisible ? 'setclose' : ''}`} id="filter_search">
                  {/* <Filter className="filter-icon" onClick={toggleFilterVisibility} /> */}
                  <span onClick={toggleFilterVisibility}>
                    <FeatherIcon icon="filter" className="filter-name" />
                  </span>
                  <span onClick={toggleFilterVisibility}>
                    <ImageWithBasePath src="assets/img/icons/closes.svg" alt="img" />
                  </span>
                </Link>
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
              style={{ display: isFilterVisible ? 'block' : 'none' }}
            >
              <div className="card-body pb-0">
                <div className="row">
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="input-blocks">
                      {/* <Clock className="info-img" /> */}
                      <FeatherIcon icon="clock" className="info-img" />

                      <Select
                        className="img-select"
                        classNamePrefix="react-select"
                        options={duration}
                        placeholder="Choose Brand"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="input-blocks">
                      {/* <StopCircle className="info-img" /> */}
                      <FeatherIcon icon="stop-circle" className="info-img" />
                      <Select
                        className="img-select"
                        classNamePrefix="react-select"
                        options={status}
                        placeholder="Choose Brand"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12 ms-auto">
                    <div className="input-blocks">
                      <a className="btn btn-filters ms-auto">
                        {' '}
                        <i data-feather="search" className="feather-search" /> Search{' '}
                      </a>
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
      <AddWarrenty />
      <EditWarrenty />
    </div>
  );
};

export default Warranty;
