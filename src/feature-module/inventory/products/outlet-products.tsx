/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useState, Fragment, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { ColumnsType } from 'antd/es/table';
import { OutletT, ProductT, ProductCategoryT } from '../../../types/product-types';
import { SearchOutlined, RightOutlined } from '@ant-design/icons';

import { Col, Form, FormInstance, Row, Select, Input, Table } from 'antd';
import CustomButton from '../../components/button';
import { Download, Upload, Plus, Filter, X } from 'react-feather';
import FeatherIcon from 'feather-icons-react';
import {
  // Queries
  useGetOutletsQuery,
  useGetProductCategoriesQuery,

  // Mutations
  useDeleteOutletMutation,

  // Selectors
  selectAllOutlets,
  selectAllCategories,
} from '../../../store/feature-slice/products';
import CustomModal, { CustomModalRef } from '../../../custom-modal';
import EditOutletForm from '../../components/button/forms/outlets/edit-outlet';

const { Item: FormItem } = Form;
const Option = Select.Option;

const OutletProduct = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm<FormInstance>();
  const [expand, setExpand] = useState<boolean>(false);

  const [showSearchResult, setShowSearchResult] = useState<boolean>(false);;
  const [outlets, setOutlets] = useState<OutletT[]>([])
  const [editedOutlet, setEditedOutlet] = useState<boolean>(false);
  const [outletToEdit, setOutletToEdit] = useState<OutletT | null>(null);
  const [productSearchResult, setProductSearchResult] = useState<ProductT[]>([]);
  const [categories, setCategories] = useState<ProductCategoryT[]>([]);

  const editOutletModalRef = useRef<CustomModalRef>(null);

  // Toggle expand/collapse state
  const toggle = () => {
    setExpand(!expand);
  };

  const getFields = () => {

    return (
      <>
        <Col xs={12} md={6} style={{ display: expand ? 'block' : 'none' }}>
          <FormItem>
            <label style={{ padding: '5px 0 10px 20px' }}>Product Type</label>
            <FormItem noStyle name={`productType`}>
              <Select placeholder="Select a products type" style={{ height: 56.5, width: '100%' }}>
                <Option value="Standard Product" style={{ padding: '10px' }}>
                  Standard Product
                </Option>
                <Option value="Variant Product" style={{ padding: '10px' }}>
                  Variant Product
                </Option>
                <Option value="Composite Product" style={{ padding: '10px' }}>
                  Composite Product
                </Option>
              </Select>
            </FormItem>
          </FormItem>
        </Col>
        <Col xs={12} md={6} style={{ display: expand ? 'block' : 'none' }}>
          <FormItem>
            <label style={{ padding: '5px 0 10px 20px' }}>Category</label>
            <FormItem noStyle name={`productCategory`}>
              <Select placeholder="Select a category" style={{ height: 56.5, width: '100%' }}>
                <Option value="male" style={{ padding: '10px' }}>
                  Male
                </Option>
                <Option value="female" style={{ padding: '10px' }}>
                  Female
                </Option>
              </Select>
            </FormItem>
          </FormItem>
        </Col>
        <Col xs={12} md={6} style={{ display: expand ? 'block' : 'none' }}>
          <FormItem>
            <label style={{ padding: '5px 0 10px 20px' }}>Store</label>
            <FormItem noStyle name={`stores`}>
              <Select placeholder="Select a stores" defaultValue={'all-store'} style={{ height: 56.5, width: '100%' }}>
                <Option value="all-store" style={{ padding: '10px' }}>
                  All Stores
                </Option>
                <Option value="abuja" style={{ padding: '10px' }}>
                  Abuja
                </Option>
                <Option value="kano" style={{ padding: '10px' }}>
                  Kano
                </Option>
              </Select>
            </FormItem>
          </FormItem>
        </Col>
        <Col xs={12} md={6} style={{ display: expand ? 'block' : 'none' }}>
          <FormItem>
            <label style={{ padding: '5px 0 10px 20px' }}>Status</label>
            <FormItem noStyle name={`productStatus`}>
              <Select placeholder="Select a status" defaultValue={'All'} style={{ height: 56.5, width: '100%' }}>
                <Option value="active" style={{ padding: '10px' }}>
                  Active
                </Option>
                <Option value="Inactive" style={{ padding: '10px' }}>
                  Inactive
                </Option>
              </Select>
            </FormItem>
          </FormItem>
        </Col>
        <Col xs={12} md={6} style={{ display: expand ? 'block' : 'none' }}>
          <FormItem>
            <label style={{ padding: '5px 0 10px 20px' }}>Inventory</label>
            <FormItem noStyle name={`inventoryLevel`}>
              <Select placeholder="Select inventory level" style={{ height: 56.5, width: '100%' }}>
                <Option value="low stock" style={{ padding: '10px' }}>
                  Low Stock
                </Option>
                <Option value="out of stock" style={{ padding: '10px' }}>
                  Out of stock
                </Option>
              </Select>
            </FormItem>
          </FormItem>
        </Col>
        <Col xs={12} md={6} style={{ display: expand ? 'block' : 'none' }}>
          <FormItem name={`field`}>
            <label style={{ padding: '5px 0 10px 20px' }}>Brand</label>
            <FormItem noStyle name={`brand`}>
              <Select placeholder="Select a brand" style={{ height: 56.5, width: '100%' }}>
                <Option value="Brand A" style={{ padding: '10px' }}>
                  Brand A
                </Option>
                <Option value="Brand B" style={{ padding: '10px' }}>
                  Brand B
                </Option>
              </Select>
            </FormItem>
          </FormItem>
        </Col>
        <Col xs={12} md={6} style={{ display: expand ? 'block' : 'none' }}>
          <FormItem>
            <label style={{ padding: '5px 0 10px 20px' }}>Supplier</label>
            <FormItem noStyle name={`supplier`}>
              <Select placeholder="Select a supplier" style={{ height: 56.5, width: '100%' }}>
                <Option value="Supplier A" style={{ padding: '10px' }}>
                  Supplier A
                </Option>
                <Option value="Supplier B" style={{ padding: '10px' }}>
                  Supplier B
                </Option>
              </Select>
            </FormItem>
          </FormItem>
        </Col>
      </>
    );
  };

  const MySwal = withReactContent(Swal);

  const [deleteOutlet, {
    isLoading: isOutletDeletionLoading,
    isError: isOutletDeletionError,
    isSuccess: isOutletDeletionSuccess,
    error: outletDeletionError,
  }] = useDeleteOutletMutation();

  const showConfirmationAlert = async (id: number) => {
    const result = await MySwal.fire({
      title: "<h3 style={{ color: 'black' }}>Delete this outlet?</h3>",
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
        const deletedOutlet = await deleteOutlet(id);
        console.log('deletedOutlet: ', deletedOutlet);
      } catch (error) {
        console.error('Error deleting outlet:', error, outletDeletionError);
      }
    } else {
      MySwal.close();
    }
  };

  // for deleting items
  useEffect(() => {
    const deletingOutlet = async () => {
      // setLoading(true);
      if (isOutletDeletionSuccess) {
        // Close any currently opened modal
        MySwal.close();
        // message message
        await MySwal.fire({
          title: 'Deleted!',
          text: 'Outlet has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        });
        return;
      }

      if (isOutletDeletionLoading) {
        // Show deleting message
        await MySwal.fire({
          title: 'Please wait',
          text: 'Deleting...',
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
        });
      }

      if (isOutletDeletionError) {
        MySwal.fire('Error', 'Failed to delete the outlet.', 'error');
      }
    };
    deletingOutlet();
  }, [isOutletDeletionLoading]);

  const getCategoryName = (productId: number) => {
    const category = categories.find((category: ProductCategoryT) => {
      return category.id === productId;
    }) as ProductCategoryT;

    return category?.productCategoryName;
  }

  const {
    error: outletError,
    isError: isOutletFetchingError,
    isSuccess: isOutletFetchingSuccess,
    isLoading: isOutletFetching,
  } = useGetOutletsQuery([]);
  const fetchedOutlets = useSelector(selectAllOutlets);

  const {
    // error: productCategoryError,
    isError: isProductCategoryFetchingError,
    isSuccess: isProductCategoryFetchingSuccess,
    isLoading: isProductCategoryFetching,
  } = useGetProductCategoriesQuery([]);
  const fetchedProductCategories = useSelector(selectAllCategories);

  useEffect(() => {
    const loadOutlets = async () => {
      try {
        if (
          isOutletFetchingSuccess
          && isProductCategoryFetchingSuccess
        ) {
          console.log('fetchedOutlets: ', fetchedOutlets, '\noutlets: ', outlets);
          setOutlets(fetchedOutlets);
          setCategories(fetchedProductCategories);
          return;
        }

        if (
          isOutletFetchingError
          || isProductCategoryFetchingError
        ) {
          console.log('outletError', outletError);
          throw outletError;
        }
      } catch (err) {
        console.error('Failed to fetch outlet: ', err);
      }
    };

    loadOutlets();
  }, [
    isOutletFetching,
    isProductCategoryFetching
  ]);

  const openEditOutletModal = () => {
    editOutletModalRef.current?.openModal();
  };

  const closeEditOutletModal = () => {
    editOutletModalRef.current?.closeModal();
  };

  const columns: ColumnsType<ProductT> = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      render: (_, product, index) => (
        <Fragment key={index}>
          <p>
            {product.productName}
          </p>
        </Fragment>
      ),
    },
    {
      title: 'Outlet',
      dataIndex: 'outlet',
      render: (_, product, index) => (
        <Fragment key={index}>
          {/* <p>{getCategoryName(product.productCategoryId)}</p> */}
        </Fragment>
      ),
    },
    {
      title: 'Product Type',
      dataIndex: 'product-type',
      render: (_, product, index) => (
        <Fragment key={index}>
          <p>{product.type}</p>
        </Fragment>
      ),
    },
    {
      title: 'Catagory',
      dataIndex: 'catagory',
      render: (_, product, index) => (
        <Fragment key={index}>
          <p>{getCategoryName(product.productCategoryId)}</p>
        </Fragment>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (_, product, index) => (
        <Fragment key={index}>
          <p>{product.sellingPrice}</p>
        </Fragment>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, product, index) => (
        <Fragment key={index}>
          <div className="action-table-data">
            <div className="edit-delete-action" style={{ justifyContent: 'start' }}>
              <Link
                className="me-2"
                style={{ border: '1px solid #173F77' }}
                to={`/product/${product.id}`}
              >
                <FeatherIcon icon="eye" className="feather-view" />
              </Link>
              <Link className="me-2" style={{ border: '1px solid #173F77' }} to={route.editproduct}>
                <FeatherIcon icon="edit" className="feather-edit" />
              </Link>
              <Link
                className="confirm-text"
                style={{ border: '1px solid #173F77' }}
                to="#"
                onClick={() => showConfirmationAlert(product.id)}
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
        ref={editOutletModalRef}
        width={'800px'}
        content={<EditOutletForm
          closeEditOutletModal={closeEditOutletModal}
          outlet={outletToEdit}
          setEditedOutlet={setEditedOutlet}
        />}
      />
      <div className="page-wrapper">
        <div className="content">
          <div>
            <Row gutter={40} style={{
              width: '100%',
              margin: '0px 0px 20px 0px',
            }}
            >
              <Col span={10} style={{ paddingLeft: 0 }}>
                <div className="page-title">
                  <h4>Outlets</h4>
                  {/* <h6>Manage your categories</h6> */}
                </div>
              </Col>
              <Col span={14} style={{ paddingRight: 0 }}>
                <Row
                  gutter={40}
                  style={{ width: '100%', margin: '0px 0px 20px 0px' }} justify={'end'}
                >
                  <Col style={{ maxWidth: 'fit-content', paddingRight: 0 }}>
                    <CustomButton
                      backgroundColor="#2D7DEE"
                      textColor="white"
                      className="search-button"
                      onClick={() => {
                        navigate('/add-products')
                      }}
                    >
                      <Plus className="me-2" />
                      Add New Product
                    </CustomButton>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <div>
            <div className="table-top">
              <div className="_search-set">
                <div className="_search-input">
                  <Input
                    placeholder='Enter product name, sku or tag'
                    prefix={<SearchOutlined />}
                    style={{ width: 330, padding: 8.5 }}
                  />
                </div>
                <CustomButton backgroundColor="#F45D01" textColor="#fff" className="search-button">
                  Search
                </CustomButton>
              </div>
              {showSearchResult ? (
                <div className="search-path" onClick={toggle}>
                  {expand ? (
                    <CustomButton
                      backgroundColor="white"
                      textColor="#fff"
                      style={{ background: '#FF3B3B', color: '#fff', borderColor: 'none' }}
                      className="search-button"
                    >
                      <X />
                    </CustomButton>
                  ) : (
                    <CustomButton backgroundColor="white" textColor="#F45D01" className="search-button">
                      <Filter className="me-2" /> Filter
                    </CustomButton>
                  )}
                </div>
              ) : ('')}
            </div>
          </div>
          {showSearchResult ? (
            <div>
              <Form
                form={form}
                name="advanced_search"
                className="ant-advanced-search-form"
              // onFinish={handleSearch}
              >
                <Row gutter={20} style={{ marginBottom: 30 }}>
                  {getFields()}
                </Row>
              </Form>
            </div>
          ) : ('')}

          {/* /product list */}
          {showSearchResult ? (
            <div>
              {
                productSearchResult.map((product, index) => (
                  <div className="_card table-list-card" style={{ padding: 0 }} key={index}>
                    <div className="_card-body">
                      <div
                        className="table-responsive"
                        style={{
                          width: '100%',
                          // overflowX: 'scroll'
                        }}
                      >
                        <Table columns={columns} dataSource={[product]} pagination={false} />
                        <div className='template-note'>
                          <h6>Note</h6>
                          <p>A very easy way to create a nice product</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          ) : (
            <div>
                {outlets.map((outlet, index) => (
                  <div className="card table-list-card" key={index} style={{ padding: 0 }}>
                    <div className="card-body">
                      <div className="table-responsive">
                        <Row
                          gutter={40}
                          style={{
                            width: '100%',
                            margin: '0px',
                          }}
                          justify={'space-between'}
                        >
                          <Col span={22} style={{ padding: 0 }}>
                            <Row
                              gutter={40}
                              style={{
                                width: '100%',
                                margin: '0px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start'
                              }}
                            >
                              <Col style={{ width: '100%', padding: 0 }}>
                                <h5 style={{ fontWeight: 600}}>{outlet.outletName}</h5>
                              </Col>
                              <Col style={{ width: '100%', padding: 0 }}>
                                Products
                              </Col>
                            </Row>
                          </Col>
                          <Col
                            style={{
                              maxWidth: 'fit-content',
                              paddingRight: 0,
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <div style={{ fontWeight: 500 }}>
                              <Row
                                gutter={40}
                                style={{
                                  width: '100%',
                                  margin: '0px',
                                  alignItems: 'center',
                                }}
                                justify={'center'}
                              >
                                <Col style={{ width: 'fit-content', padding: 0 }}>
                                  <RightOutlined />
                                </Col>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OutletProduct;
