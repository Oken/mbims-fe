/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useState, Fragment, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { ColumnsType } from 'antd/es/table';
import { SupplierT } from '../../types/product-types';
import FeatherIcon from 'feather-icons-react';
import { all_routes } from '../../Router/all_routes';

import { SearchOutlined } from '@ant-design/icons';
import { Col, Form, FormInstance, Row, Select, Input, Table } from 'antd';
import CustomButton from '../components/button';
import { Download, Upload, Plus } from 'react-feather';
import {
  // Queries
  useGetProductSuppliersQuery,

  // Mutations
  useEditProductSupplierMutation,
  useDeleteProductSupplierMutation,

  // Selectors
  selectAllSuppliers,
  selectSupplierById,
} from '../../store/feature-slice/products';
import CustomModal, { CustomModalRef } from '../../custom-modal';

const { Item: FormItem } = Form;
const Option = Select.Option;

const SupplierList = () => {
  const route = all_routes;
  const [form] = Form.useForm<FormInstance>();
  const [suppliers, setSuppliers] = useState<SupplierT[]>([]);
  // const [createdNewBrand, setCreatedNewBrand] = useState<boolean>(false);
  // const [brandToEdit, setBrandToEdit] = useState<ProductBrandT[]>([]);

  const MySwal = withReactContent(Swal);

  const [deleteProductSupplier, {
    isLoading: isProductSupplierDeletionLoading,
    isError: isProductSupplierDeletionError,
    isSuccess: isProductSupplierDeletionSuccess,
    error: productSupplierDeletionError,
  }] = useDeleteProductSupplierMutation();

  const showConfirmationAlert = async (id: number) => {
    const result = await MySwal.fire({
      title: "<h3 style={{ color: 'black' }}>Delete this supplier?</h3>",
      text: 'You won\'t be able to revert this action',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#D5E5FC',
      cancelButtonColor: '#FF3B3B',
      padding: '20px 10px',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        // Wait for product deletion
        const deletedSupplier = await deleteProductSupplier(id);
        console.log('deletedSupplier: ', deletedSupplier);
      } catch (error) {
        console.error('Error deleting supplier:', error, productSupplierDeletionError);
      }
    } else {
      MySwal.close();
    }
  };

  // for deleting items
  useEffect(() => {
    const deletingProductSupplier = async () => {
      // setLoading(true);
      if (isProductSupplierDeletionSuccess) {
        // Close any currently opened modal
        MySwal.close();
        // message message
        await MySwal.fire({
          title: 'Deleted!',
          text: 'Supplier has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        });
        return;
      }

      if (isProductSupplierDeletionLoading) {
        // Show deleting message
        await MySwal.fire({
          title: 'Please wait',
          text: 'Deleting...',
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
        });
      }

      if (isProductSupplierDeletionError) {
        MySwal.fire('Error', 'Failed to delete the Supplier.', 'error');
      }
    };
    deletingProductSupplier();
  }, [isProductSupplierDeletionLoading]);

  const {
    error: productSupplierError,
    isError: isProductSupplierFetchingError,
    isSuccess: isProductSupplierFetchingSuccess,
    isLoading: isProductSupplierFetching,
  } = useGetProductSuppliersQuery([]);
  const fetchedProductSuppliers = useSelector(selectAllSuppliers);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        if (isProductSupplierFetchingSuccess) {
          console.log('fetchedProductSuppliers: ', fetchedProductSuppliers, '\nsuppliers: ', suppliers);
          setSuppliers(fetchedProductSuppliers);
          return;
        }

        if (isProductSupplierFetchingError) {
          console.log('productSupplierError', productSupplierError);
          throw productSupplierError;
        }
      } catch (err) {
        console.error('Failed to fetch products: ', err);
      }
    };

    loadCategories();
  }, [
    isProductSupplierFetching,
    // Update brand list after new is created or updated
    fetchedProductSuppliers,
  ]);

  const columns: ColumnsType<SupplierT> = [
    {
      title: 'name',
      dataIndex: 'name',
      render: (_, supplier, index) => (
        <Fragment key={index}>
          <span className="productimgname">
            {supplier.name}
          </span>
        </Fragment>
      ),
      width: 'auto',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      render: (_, supplier, index) => (
        <Fragment key={index}>
          <span className="productimgname">
            {supplier.phone}
          </span>
        </Fragment>
      ),
      width: 'auto',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (_, supplier, index) => (
        <Fragment key={index}>
          <span className="productimgname">
            {supplier.email}
          </span>
        </Fragment>
      ),
      width: 'auto',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      render: (_, supplier, index) => (
        <Fragment key={index}>
          <span className="productimgname">
            {supplier.country}
          </span>
        </Fragment>
      ),
      width: 'auto',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'actions',
      render: (_, supplier, index) => (
        <Fragment key={index}>
          <div className="action-table-data">
            <div className="edit-delete-action" style={{ justifyContent: 'start' }}>
              <Link className="me-2" style={{ border: '1px solid #173F77' }} to={route.supplierdetail}>
                <FeatherIcon icon="eye" className="feather-view" />
              </Link>
              <Link className="me-2 p-2" to="#" data-bs-toggle="modal" data-bs-target="#edit-brand">
                <i
                  data-feather="edit"
                  className="feather-edit"
                  onClick={() => {
                    // setBrandToEdit(brand);
                    // setCreatedNewBrand(false);
                  }}
                ></i>
              </Link>
              <Link className="confirm-text p-2" to="#">
                <i data-feather="trash-2" className="feather-trash-2" onClick={() => showConfirmationAlert(supplier.id)}></i>
              </Link>
            </div>
          </div>
        </Fragment>
      ),
      width: 'auto',
    },
  ];

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div>
            <Row style={{ width: '100%', marginBottom: 30 }}>
              <div className="add-item d-flex">
                <div className="page-title">
                  <h4>Supplier List</h4>
                  <h6>Manage your suppliers</h6>
                </div>
              </div>
            </Row>
            <Row gutter={40} style={{ width: '100%', marginBottom: 20, justifyItems: 'flex-end' }}>
              <Col span={10}>
                <div style={{ fontWeight: 500 }}>
                  {suppliers.length} suppliers
                </div>
              </Col>
              <Col span={14}>
                <Row gutter={40} style={{ width: '100%' }} justify={'end'}>
                  <Col span={12} style={{ maxWidth: 'fit-content' }}>
                    <CustomButton backgroundColor="white" textColor="#2D7DEE" className="search-button">
                      <Download className="me-2" />
                      Import Suppliers
                    </CustomButton>
                  </Col>
                  <Col span={12} style={{ maxWidth: 'fit-content' }}>
                    <CustomButton
                      backgroundColor="#2D7DEE"
                      textColor="white"
                      className="search-button"
                      onClick={() => {
                        // setCreatedNewBrand(false);
                      }}
                    >
                      <Plus className="me-2" />
                      Add Supplier
                    </CustomButton>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          {/* /product list */}
          <div className="card table-list-card">
            <div className="card-body">
              <div className="table-top">
                <Row gutter={40} style={{ width: '100%' }}>
                  <Col span={12}>
                    <div style={{ display: 'flex' }}>
                      {/* <div> */}
                      <Input
                        placeholder='Enter product name, sku or tag'
                        prefix={<SearchOutlined />}
                        style={{ width: 330, height: 38 }}
                      />
                      {/* </div> */}
                      <CustomButton backgroundColor="#F45D01" textColor="#fff" className="search-button">
                        Search
                      </CustomButton>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>
                      <Select
                        style={{ width: '100%', height: 38 }}
                      >
                        <Option value='6' style={{ padding: '10px' }} selected>
                          All Countries
                        </Option>
                      </Select>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>
                      <CustomButton backgroundColor="white" textColor="#2D7DEE" className="search-button">
                        <Upload className="me-2" />
                        Export List
                      </CustomButton>
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="table-responsive" style={{ width: '100% !important', overflowX: 'scroll' }}>
                <Table
                  columns={columns}
                  dataSource={suppliers}
                  scroll={{ x: 'max-content' }}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplierList;
