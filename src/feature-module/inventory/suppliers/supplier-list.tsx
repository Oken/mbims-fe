/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useState, Fragment, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { ColumnsType } from 'antd/es/table';
import { SupplierT } from '../../../types/product-types';
import FeatherIcon from 'feather-icons-react';
import { all_routes } from '../../../Router/all_routes';
import { createSelector } from 'reselect';

import { SearchOutlined } from '@ant-design/icons';
import { Col, Form, FormInstance, Row, Select, Input, Table } from 'antd';
import CustomButton from '../../components/button';
import { Download, Upload, Plus } from 'react-feather';
import {
  // Queries
  useGetProductSuppliersQuery,

  // Mutations
  useDeleteProductSupplierMutation,

  // Selectors
  selectAllSuppliers,
  selectSupplierById,
} from '../../../store/feature-slice/products';
import CustomModal, { CustomModalRef } from '../../../custom-modal';
import EditSupplierForm from '../../components/button/forms/suppliers/edit-supplier';
import AddSupplierForm from '../../components/button/forms/suppliers/add-supplier';


const { Item: FormItem } = Form;
const Option = Select.Option;

const SupplierList = () => {
  const route = all_routes;
  const [form] = Form.useForm<FormInstance>();
  const [suppliers, setSuppliers] = useState<SupplierT[]>([]);
  const [createdNewSupplier, setCreatedNewSupplier] = useState<boolean>(false);
  const [supplierToEdit, setSupplierToEdit] = useState<ProductBrandT | null>(null);

  // Modal
  const addSupplierModalRef = useRef<CustomModalRef>(null);
  const editSupplierModalRef = useRef<CustomModalRef>(null);

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

  const fetchSingleProductSupplier = (id: number) => createSelector(
    [(state: any) => selectSupplierById(state, id)], // Input selector
    (supplier) => supplier // Result
  )

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

  const openAddSupplierModal = () => {
    addSupplierModalRef.current?.openModal();
  };

  const closeAddSupplierModal = () => {
    addSupplierModalRef.current?.closeModal();
  };

  const openEditSupplierModal = () => {
    editSupplierModalRef.current?.openModal();
  };

  const closeEditSupplierModal = () => {
    editSupplierModalRef.current?.closeModal();
  };

  const columns: ColumnsType<SupplierT> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, supplier, index) => (
        <Fragment key={index}>
          <p style={{ width: 'fit-content', whiteSpace: 'nowrap' }}>
            {supplier.name}
          </p>
        </Fragment>
      ),
      width: 50,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      render: (_, supplier, index) => (
        <Fragment key={index}>
          <p style={{ width: 'fit-content' }}>
            {supplier.phone}
          </p>
        </Fragment>
      ),
      width: 50,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (_, supplier, index) => (
        <Fragment key={index}>
          <p style={{ width: 'fit-content' }}>
            {supplier.email}
          </p>
        </Fragment>
      ),
      width: 50,
    },
    {
      title: 'Country',
      dataIndex: 'country',
      render: (_, supplier, index) => (
        <Fragment key={index}>
          <span>
            {supplier.country}
          </span>
        </Fragment>
      ),
      width: 50,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'actions',
      render: (_, supplier, index) => (
        <Fragment key={index}>
          <div className="action-table-data">
            <div className="edit-delete-action" style={{ justifyContent: 'start' }}>
              <Link
                className="me-2"
                style={{ border: '1px solid #173F77' }}
                to={`${route.supplierdetail}/${supplier.id}`}
                // onClick={(e) => {
                //   // e.preventDefault();
                //   const singleProductSupplier = fetchSingleProductSupplier(supplier.id);
                //   console.log('Single Product Supplier: ', `${route.supplierdetail}/${supplier.id}`, singleProductSupplier);
                // }}
              >
                <FeatherIcon icon="eye" className="feather-view" />
              </Link>
              <Link
                className="me-2"
                style={{ border: '1px solid #173F77' }}
                to="#"
                onClick={() => {
                  setSupplierToEdit(supplier);
                  openEditSupplierModal();
                  setCreatedNewSupplier(false);
                }}
              >
                <FeatherIcon icon="edit" className="feather-edit" />
              </Link>
              <Link
                className="confirm-text"
                style={{ border: '1px solid #173F77' }}
                to="#"
                onClick={() => showConfirmationAlert(supplier.id)}
              >
                <FeatherIcon icon="trash-2" className="feather-trash-2" />
              </Link>
            </div>
          </div>
        </Fragment>
      ),
      width: 50,
    },
  ];

  return (
    <>
      <CustomModal
        ref={addSupplierModalRef}
        width={'600px'}
        content={<AddSupplierForm
          closeAddSupplierModal={closeAddSupplierModal}
          setCreatedNewSupplier={setCreatedNewSupplier}
        />}
      />
      <CustomModal
        ref={editSupplierModalRef}
        width={'600px'}
        content={<EditSupplierForm
          closeEditSupplierModal={closeEditSupplierModal}
          supplier={supplierToEdit}
          setCreatedNewSupplier={setCreatedNewSupplier}
        />}
      />
      <div className="page-wrapper" style={{ width: '100% !important', overflowX: 'hidden' }}>
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
            <Row gutter={40} style={{
              width: '100%',
              margin: '0px 0px 20px 0px',
            }}
            >
              <Col span={10} style={{ paddingLeft: 0 }}>
                <div style={{ fontWeight: 500 }}>
                  {suppliers.length} suppliers
                </div>
              </Col>
              <Col span={14} style={{ paddingRight: 0 }}>
                <Row gutter={40} style={{ width: '100%', margin: 0 }} justify={'end'}>
                  <Col style={{ maxWidth: 'fit-content' }}>
                    <CustomButton backgroundColor="white" textColor="#2D7DEE" className="search-button">
                      <Download className="me-2" />
                      Import Suppliers
                    </CustomButton>
                  </Col>
                  <Col style={{ maxWidth: 'fit-content', paddingRight: 0 }}>
                    <CustomButton
                      backgroundColor="#2D7DEE"
                      textColor="white"
                      className="search-button"
                      onClick={() => {
                        openAddSupplierModal();
                        setCreatedNewSupplier(false);
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
          <div className="card table-list-card"  style={{ padding: 0 }}>
            <div className="card-body">
              <div className="table-top">
                <Row
                  gutter={40}
                  style={{ width: '100%', margin: '0px 0px 20px 0px' }}
                  justify={'space-between'}
                >
                  <Col span={12} style={{ paddingLeft: 0 }}>
                    <div style={{ display: 'flex' }}>
                      {/* <div> */}
                      <Input
                        placeholder='Enter product name, sku or tag'
                        prefix={<SearchOutlined />}
                        style={{ width: 330, height: 42 }}
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
                        style={{ width: '100%', height: 42 }}
                        defaultValue="All Countries"
                      >
                        <Option value="All Countries" style={{ padding: '10px' }}>
                          All Countries
                        </Option>
                      </Select>
                    </div>
                  </Col>
                  <Col span={6} style={{ maxWidth: 'fit-content', paddingRight: 0 }}>
                    <div>
                      <CustomButton backgroundColor="white" textColor="#2D7DEE" className="search-button">
                        <Upload className="me-2" />
                        Export List
                      </CustomButton>
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={suppliers}
                  scroll={{ x: 'max-content' }}
                  // style={{ width: '90%' }}
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
