/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useState } from 'react';
import { OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { Link } from 'react-router-dom';
import {
  Calendar,
  ChevronUp,
  Filter,
  PlusCircle,
  RotateCcw,
  Sliders,
  StopCircle,
  Zap,
} from 'react-feather';
import Select from 'react-select';
import { DatePicker } from 'antd';
import AddCategoryList from '../../core/modals/inventory/add-category-list';
import EditCategoryList from '../../core/modals/inventory/edit-category-list';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Table from '../../core/pagination/data-table';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { categorylist } from '../../core/json/categorylistdata';
import { ColumnsType } from 'antd/es/table';
import { toggleShowHeader } from '../../store/feature-slice/utils';
import FeatherIcon from 'feather-icons-react';

const CategoryList = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.slices.showHeader);
  // const dataSource = categorylist;
  const dataSource = categorylist;

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
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
  const category = [
    { value: 'chooseCategory', label: 'Choose Category' },
    { value: 'laptop', label: 'Laptop' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'shoe', label: 'Shoe' },
  ];
  const status = [
    { value: 'chooseStatus', label: 'Choose Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
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
      title: 'name',
      dataIndex: 'name',
      // sorter: (a, b) => a.category.length - b.category.length,
    },
    // {
    //   title: 'Category Slug',
    //   dataIndex: 'categoryslug',
    //   sorter: (a, b) => a.categoryslug.length - b.categoryslug.length,
    // },
    {
      title: 'Date Created',
      dataIndex: 'date-created',
      // sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   render: (text) => (
    //     <span className="badge badge-linesuccess">
    //       <Link to="#"> {text}</Link>
    //     </span>
    //   ),
    //   sorter: (a, b) => a.status.length - b.status.length,
    // },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'actions',
      render: () => (
        <div className="action-table-data">
          <div className="edit-delete-action">
            <Link className="me-2 p-2" to="#" data-bs-toggle="modal" data-bs-target="#edit-category">
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
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Categories</h4>
                <h6>Manage your categories</h6>
              </div>
            </div>
            <div>
              <div className="page-btn import">
                <CustomButton backgroundColor="white" textColor="#2D7DEE" className="search-button">
                  <Download className="me-2" />
                  Import
                </CustomButton>
              </div>
              <div className="page-btn import">
                <Link to="/add-products">
                  <CustomButton backgroundColor="#2D7DEE" textColor="white" className="add-button">
                    <Plus className="me-2" />
                    Add New Product
                  </CustomButton>
                </Link>
              </div>
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
                    <Filter className="filter-icon" onClick={toggleFilterVisibility} />
                    <span onClick={toggleFilterVisibility}>
                      <FeatherIcon icon="filter" className="filter-icon" />
                    </span>
                    <span onClick={toggleFilterVisibility}>
                      <ImageWithBasePath src="assets/img/icons/closes.svg" alt="img" />
                    </span>
                  </Link>
                </div>
                <div className="form-sort">
                  <Sliders className="info-img" />
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
                          options={category}
                          classNamePrefix="react-select"
                          placeholder="Choose Category"
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <Calendar className="info-img" />
                        <FeatherIcon icon="calender" className="info-img" />
                        <div className="input-groupicon">
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
                          options={status}
                          classNamePrefix="react-select"
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
              <div className="table-responsive">
                <Table columns={columns} dataSource={dataSource} />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
      <AddCategoryList />
      <EditCategoryList />
    </>
  );
};

export default CategoryList;
