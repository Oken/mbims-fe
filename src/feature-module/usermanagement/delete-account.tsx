/* eslint-disable @typescript-eslint/no-explicit-any */
import { OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
// import { ChevronUp, RotateCcw } from "feather-icons-react/build/IconComponents";
import { Printer, Sliders } from 'react-feather';
import Select from 'react-select';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Table from '../../core/pagination/data-table';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteaccountdata } from '../../core/json/deleteaccount';
import { ColumnsType } from 'antd/es/table';
import { toggleShowHeader } from '../../store/feature-slice/utils';
import FeatherIcon from 'feather-icons-react';

const DeleteAccount = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.slices.showHeader);
  const dataSource = deleteaccountdata;

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
  const oldandlatestvalue = [
    { value: 'date', label: 'Sort by Date' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
  ];

  const columns: ColumnsType<any> = [
    {
      title: 'User Name',
      dataIndex: 'username',
      render: (text, record) => (
        <span className="userimgname">
          <Link to="/profile">
            <ImageWithBasePath alt="" src={record.img} className="product-img" />
          </Link>
          <Link to="/profile">{text}</Link>
        </span>
      ),
      sorter: (a, b) => a.username.length - b.username.length,
    },

    {
      title: 'Requisition Date',
      dataIndex: 'requisitiondate',
      sorter: (a, b) => a.requisitiondate.length - b.requisitiondate.length,
    },
    {
      title: 'Delete Requisition Date',
      dataIndex: 'deleterequisitiondate',
      sorter: (a, b) => a.deleterequisitiondate.length - b.deleterequisitiondate.length,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: () => (
        <div className="action-table-data">
          <div className="edit-delete-action">
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
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Delete Account Request</h4>
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
                    <Printer />
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
          </div>
          {/* /product list */}
          <div className="card table-list-card">
            <div className="card-body pb-0">
              <div className="table-top table-top-two">
                <div className="search-set">
                  <div className="search-input">
                    <input type="text" placeholder="Search" className="form-control form-control-sm formsearch" />
                    <Link to="" className="btn btn-searchset">
                      <i data-feather="search" className="feather-search" />
                    </Link>
                  </div>
                </div>
                <div className="search-path d-flex align-items-center search-path-new">
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
              </div>
              <div className="table-responsive">
                <Table columns={columns} dataSource={dataSource} />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
