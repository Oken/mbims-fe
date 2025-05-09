/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useState, Fragment, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { ColumnsType } from 'antd/es/table';
import { ProductBrandT } from '../../../types/product-types';

import { SearchOutlined } from '@ant-design/icons';
import { Col, Form, FormInstance, Row, Select, Input, Table } from 'antd';
import CustomButton from '../../components/button';
import { Download, Upload, Plus } from 'react-feather';
import FeatherIcon from 'feather-icons-react';
import {
  // Queries
  useGetProductBrandsQuery,

  // Mutations
  useDeleteBrandMutation,

  // Selectors
  selectAllBrands,
} from '../../../store/feature-slice/products';
import CustomModal, { CustomModalRef } from '../../../custom-modal';
import EditBrandForm from '../../components/button/forms/brands/edit-brand';
import AddBrandForm from '../../components/button/forms/brands/add-brand';

const { Item: FormItem } = Form;
const Option = Select.Option;

const BrandList = () => {
  const [form] = Form.useForm<FormInstance>();
  const [brands, setBrands] = useState<ProductBrandT[]>([])
  const [createdNewBrand, setCreatedNewBrand] = useState<boolean>(false);
  const [brandToEdit, setBrandToEdit] = useState<ProductBrandT | null>(null);

  const addBrandModalRef = useRef<CustomModalRef>(null);
  const editBrandModalRef = useRef<CustomModalRef>(null);

  const MySwal = withReactContent(Swal);

  const [deleteBrand, {
    isLoading: isBrandDeletionLoading,
    isError: isBrandDeletionError,
    isSuccess: isBrandDeletionSuccess,
    error: brandDeletionError,
  }] = useDeleteBrandMutation();

  const showConfirmationAlert = async (id: number) => {
    const result = await MySwal.fire({
      title: "<h3 style={{ color: 'black' }}>Delete this brand?</h3>",
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
        const deletedBrand = await deleteBrand(id);
        console.log('deletedBrand: ', deletedBrand);
      } catch (error) {
        console.error('Error deleting brand:', error, brandDeletionError);
      }
    } else {
      MySwal.close();
    }
  };

  // for deleting items
  useEffect(() => {
    const deletingProduct = async () => {
      // setLoading(true);
      if (isBrandDeletionSuccess) {
        // Close any currently opened modal
        MySwal.close();
        // message message
        await MySwal.fire({
          title: 'Deleted!',
          text: 'Brand has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        });
        return;
      }

      if (isBrandDeletionLoading) {
        // Show deleting message
        await MySwal.fire({
          title: 'Please wait',
          text: 'Deleting...',
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
        });
      }

      if (isBrandDeletionError) {
        MySwal.fire('Error', 'Failed to delete the brand.', 'error');
      }
    };
    deletingProduct();
  }, [isBrandDeletionLoading]);

  const {
    error: productBrandError,
    isError: isProductBrandFetchingError,
    isSuccess: isProductBrandFetchingSuccess,
    isLoading: isProductBrandFetching,
  } = useGetProductBrandsQuery([]);
  const fetchedProductBrands = useSelector(selectAllBrands);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        if (isProductBrandFetchingSuccess) {
          console.log('fetchedProductBrands: ', fetchedProductBrands, '\nbrands: ', brands);
          setBrands(fetchedProductBrands);
          return;
        }

        if (isProductBrandFetchingError) {
          console.log('productBrandError', productBrandError);
          throw productBrandError;
        }
      } catch (err) {
        console.error('Failed to fetch products: ', err);
      }
    };

    loadCategories();
  }, [
    isProductBrandFetching,
    // Update brand list after new is created or updated
    fetchedProductBrands,
    createdNewBrand,
  ]);

  const openAddBrandModal = () => {
    addBrandModalRef.current?.openModal();
  };

  const closeAddBrandModal = () => {
    addBrandModalRef.current?.closeModal();
  };

  const openEditBrandModal = () => {
    editBrandModalRef.current?.openModal();
  };

  const closeEditBrandModal = () => {
    editBrandModalRef.current?.closeModal();
  };

  const columns: ColumnsType<ProductBrandT> = [
    {
      title: 'name',
      dataIndex: 'name',
      render: (_, brand, index) => (
        <Fragment key={index}>
          <span className="productimgname">
            {brand.brandName}
          </span>
        </Fragment>
      ),
    },
    {
      title: 'Date Created',
      dataIndex: 'date-created',
      render: (_, _brand, index) => (
        <Fragment key={index}>
          <span className="productimgname">
          </span>
        </Fragment>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'actions',
      render: (_, brand, index) => (
        <Fragment key={index}>
          <div className="action-table-data">
            <div className="edit-delete-action" style={{ justifyContent: 'start' }}>
              <Link
                className="me-2"
                style={{ border: '1px solid #173F77' }}
                to="#"
                onClick={() => {
                  setBrandToEdit(brand);
                  openEditBrandModal();
                  setCreatedNewBrand(false);
                }}
              >
                <FeatherIcon icon="edit" className="feather-edit" />
              </Link>
              <Link
                className="confirm-text"
                style={{ border: '1px solid #173F77' }}
                to="#"
                onClick={() => showConfirmationAlert(brand.id)}
              >
                <FeatherIcon icon="trash-2" className="feather-trash-2" />
              </Link>
            </div>
          </div>
        </Fragment>
      ),
    },
  ];

  return (
    <>
      <CustomModal
        ref={addBrandModalRef}
        width={'400px'}
        content={<AddBrandForm
          closeAddBrandModal={closeAddBrandModal}
          brandName={''}
          setCreatedNewBrand={setCreatedNewBrand}
        />}
      />
      <CustomModal
        ref={editBrandModalRef}
        width={'400px'}
        content={<EditBrandForm
          closeEditBrandModal={closeEditBrandModal}
          brand={brandToEdit}
          setCreatedNewBrand={setCreatedNewBrand}
        />}
      />
      <div className="page-wrapper">
        <div className="content">
          <div>
            <Row style={{ width: '100%', marginBottom: 30 }}>
              <div className="add-item d-flex">
                <div className="page-title">
                  <h4>Brands</h4>
                  <h6>Manage your brands</h6>
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
                  {brands.length} brands
                </div>
              </Col>
              <Col span={14} style={{ paddingRight: 0 }}>
                <Row
                  gutter={40}
                  style={{
                    width: '100%',
                    margin: '0px 0px 20px 0px',
                  }}
                  justify={'end'}
                >
                  <Col style={{ maxWidth: 'fit-content' }}>
                    <CustomButton backgroundColor="white" textColor="#2D7DEE" className="search-button">
                      <Download className="me-2" />
                      Import Brands
                    </CustomButton>
                  </Col>
                  <Col style={{ maxWidth: 'fit-content', paddingRight: 0 }}>
                    <CustomButton
                      backgroundColor="#2D7DEE"
                      textColor="white"
                      className="search-button"
                      onClick={() => {
                        openAddBrandModal();
                        setCreatedNewBrand(false);
                      }}
                    >
                      <Plus className="me-2" />
                      Add Brand
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
                <Row
                  gutter={40}
                  style={{ width: '100%', margin: '0px 0px 20px 0px' }}
                  justify={'space-between'}
                >
                  <Col span={12}>
                    <div style={{ display: 'flex' }}>
                      {/* <div> */}
                      <Input
                        placeholder='Enter product name, sku or tag'
                        prefix={<SearchOutlined />}
                        style={{ width: 330, height: 42 }}
                      />
                      {/* </div> */}
                      <CustomButton
                        backgroundColor="#F45D01"
                        textColor="#fff"
                        className="search-button"
                      // style={{ height: 42 }}
                      >
                        Search
                      </CustomButton>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>
                      <Select
                        style={{ width: '100%', height: 42 }}
                        defaultValue="Last 6 Months"
                      >
                        <Option value='Last 6 Months' style={{ padding: '10px' }} selected>
                          Last 6 Months
                        </Option>
                      </Select>
                    </div>
                  </Col>
                  <Col span={6} style={{ maxWidth: 'fit-content', paddingRight: 0 }}>
                    <CustomButton backgroundColor="white" textColor="#2D7DEE" className="search-button">
                      <Upload className="me-2" />
                      Export List
                    </CustomButton>
                  </Col>
                </Row>
              </div>

              <div className="table-responsive">
                <Table columns={columns} dataSource={brands} />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
    </>
  );
};

export default BrandList;
