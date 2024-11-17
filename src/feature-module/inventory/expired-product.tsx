import { useState } from 'react';
import { OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../core/img/imagewithbasebath';

import FeatherIcon from 'feather-icons-react';
import Select from 'react-select';
import { Box } from 'react-feather';
import { DatePicker } from 'antd';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Table from '../../core/pagination/data-table';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { toggleShowHeader } from '../../store/feature-slice/utils';
import { ExpiredProductT } from '../../types/product-types';
import { ColumnsType } from 'antd/es/table';

const ExpiredProduct = () => {
  const dispatch = useAppDispatch();
  const { showHeader } = useAppSelector((state) => state.slices);
  const expiredProduct = useAppSelector((state) => state.products.expiredProducts);

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };
  // const [selectedDate, setSelectedDate] = useState(new Date());

  // const handleDateChange = (date: Date) => {
  //   setSelectedDate(date);
  // };

  const oldandlatestvalue = [
    { value: 'date', label: 'Sort by Date' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
  ];

  // const brands = [
  //   { value: 'chooseType', label: 'Choose Type' },
  //   { value: 'lenovo3rdGen', label: 'Lenovo 3rd Generation' },
  //   { value: 'nikeJordan', label: 'Nike Jordan' },
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

  const columns: ColumnsType<ExpiredProductT> = [
    {
      title: 'Product',
      dataIndex: 'product',
      render: (_, product) => (
        <span className="productimgname">
          <Link to="#" className="product-img stock-img">
            <ImageWithBasePath alt="" src={product.img} />
          </Link>
          {product.product}
        </span>
      ),
      // sorter: (a, b) => a.product.length - b.product.length,
      width: '5%',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      // sorter: (a, b) => a.sku.length - b.sku.length,
      render: (_, product) => (
        <span>
          <p>{product.sku}</p>
        </span>
      ),
    },
    {
      title: 'Manufactured Date',
      dataIndex: 'manufactureddate',
      // sorter: (a, b) => a.manufactureddate.length - b.manufactureddate.length,
      render: (_, product) => (
        <span className="">
          <p>{product.manufactured_date}</p>
        </span>
      ),
    },
    {
      title: 'Expired Date',
      dataIndex: 'expireddate',
      // sorter: (a, b) => a.expireddate.length - b.expireddate.length,
      render: (_, product) => (
        <span className="">
          <p>{product.expired_date}</p>
        </span>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: () => (
        <div className="action-table-data">
          <div className="edit-delete-action">
            <Link className="me-2 p-2" to="#">
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
              <h4>Expired Products</h4>
              <h6>Manage your expired products</h6>
            </div>
          </div>
          <ul className="table-top-head">
            <li>
              <OverlayTrigger placement="top" overlay={renderTooltip}>
                <Link to="#">
                  <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
                <Link to="#" data-bs-toggle="tooltip" data-bs-placement="top">
                  <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={renderPrinterTooltip}>
                <Link to="#" data-bs-toggle="tooltip" data-bs-placement="top">
                  <i data-feather="printer" className="feather-printer" />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                <Link to="#" data-bs-toggle="tooltip" data-bs-placement="top">
                  <FeatherIcon icon="rotate-ccw" />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                <Link
                  to="#"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  id="collapse-header"
                  className={showHeader ? 'active' : ''}
                  onClick={() => {
                    dispatch(toggleShowHeader());
                  }}
                >
                  <FeatherIcon icon="chevron-up" />
                </Link>
              </OverlayTrigger>
            </li>
          </ul>
        </div>

        {/* /product list */}
        <div className="card table-list-card">
          <div className="card-body">
            <div className="table-top">
              <div className="search-set">
                <div className="search-input">
                  <input type="text" placeholder="Search" className="form-control form-control-sm formsearch" />
                  <Link to="#" className="btn btn-searchset">
                    <i data-feather="search" className="feather-search" />
                  </Link>
                </div>
              </div>
              <div className="search-path">
                <div className="d-flex align-items-center">
                  <Link to="#" className={`btn btn-filter ${isFilterVisible ? 'setclose' : ''}`} id="filter_search">
                    <span onClick={toggleFilterVisibility}>
                      <FeatherIcon icon="filter" className="filter-icon" />
                    </span>
                    <span>
                      <ImageWithBasePath src="assets/img/icons/closes.svg" alt="img" />
                    </span>
                  </Link>
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
            <div
              className={`card${isFilterVisible ? ' visible' : ''}`}
              id="filter_inputs"
              style={{ display: isFilterVisible ? 'block' : 'none' }}
            >
              <div className="card-body pb-0">
                <div className="row">
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="input-blocks">
                      <Box className="info-img" />

                      <Select
                        className="img-select"
                        // options={brands}
                        classNamePrefix="react-select"
                        placeholder="Choose Type"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="input-blocks">
                      <div className="input-groupicon">
                        <FeatherIcon icon="calender" className="info-image" />
                        <DatePicker
                          // value={selectedDate}
                          // onChange={handleDateChange}
                          className="filterdatepicker"
                          format="dd-MM-yyyy"
                          placeholder="Choose Date"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12 ms-auto">
                    <div className="input-blocks">
                      <Link to="#" className="btn btn-filters ms-auto">
                        <i data-feather="search" className="feather-search" /> Search{' '}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <Table columns={columns} dataSource={expiredProduct} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpiredProduct;
