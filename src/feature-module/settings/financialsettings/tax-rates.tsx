/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useState } from 'react';
// import {
//   ChevronUp,
//   PlusCircle,
//   RotateCcw,
// } from "feather-icons-react/build/IconComponents";
import { OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { setToogleHeader } from '../../../store/action';
import AddTaxRates from '../../../core/modals/settings/add-tax-rates';
import EditTaxRates from '../../../core/modals/settings/edit-tax-rates';
import Table from '../../../core/pagination/data-table';
import SettingsSideBar from '../settingssidebar';
import { taxRatesData } from '../../../core/json/taxRates';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { ColumnsType } from 'antd/es/table';
import FeatherIcon from 'feather-icons-react';
const TaxRates = () => {
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
  const datas = taxRatesData;
  const [searchText, setSearchText] = useState('');

  const handleSearch = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchText(event.target.value);
  };

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

  // const filteredData = datas.filter((entry) => {
  //   return Object.keys(entry).some((key) => {
  //     return String(entry[key])
  //       .toLowerCase()
  //       .includes(searchText.toLowerCase());
  //   });
  // });

  const filteredData = datas.filter((entry) => {
    return Object.keys(entry).some((key) => {
      const value = entry[key as keyof typeof entry];
      return String(value).toLowerCase().includes(searchText.toLowerCase());
    });
  });

  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Tax rates%',
      dataIndex: 'taxRate',
      sorter: (a, b) => a.taxRate - b.taxRate,
    },
    {
      title: 'Created On',
      dataIndex: 'createdOn',
      // sorter: (a, b) => new Date(a.createdOn) - new Date(b.createdOn),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: () => (
        <div className="edit-delete-action action-table-data">
          <Link className="me-2 p-2" to="#" data-bs-toggle="modal" data-bs-target="#edit-tax">
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
                    <h4>Tax Rates</h4>
                  </div>
                  <div className="page-header bank-settings justify-content-end">
                    <div className="page-btn">
                      <Link to="#" className="btn btn-added" data-bs-toggle="modal" data-bs-target="#add-tax">
                        {/* <PlusCircle className="me-2" /> */}
                        <FeatherIcon icon="plus-circle" className="me-2" />
                        Add New Tax Rate
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
                          </div>
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
      <AddTaxRates />
      <EditTaxRates />
    </div>
  );
};

export default TaxRates;
