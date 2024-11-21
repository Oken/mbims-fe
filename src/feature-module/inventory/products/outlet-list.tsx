import { useEffect, useState, useCallback } from 'react';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Col, Form, FormInstance, Row, Select, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Download, Upload, Plus, Filter, X } from 'react-feather';
import { ColumnsType } from 'antd/es/table';
import Brand from '../../../core/modals/inventory/brand';
import { all_routes } from '../../../Router/all_routes';
import Table from '../../../core/pagination/table';
import { ProductT, ProductCategoryT } from '../../../types/product-types';
import CustomButton from '../../components/button';
// import { fetchProducts, fetchProduct } from '../../../temp/standard-product-crud';

import {
  // Queries
  useGetProductsQuery,
  useGetProductCategoriesQuery,

  // Mutations
  useDeleteProductMutation,

  // Selectors
  selectAllProducts,
  selectProductById,
  selectAllCategories,
} from '../../../store/feature-slice/products';

const { Item: FormItem } = Form;
const Option = Select.Option;

const OutletList = () => {
  const route = all_routes;

  // Form instance for managing form state with hooks
  const [form] = Form.useForm<FormInstance>();
  const [expand, setExpand] = useState<boolean>(false);

  const [products, setProducts] = useState<ProductT[]>([]);
  const [categories, setCategories] = useState<ProductCategoryT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  // Handle form submission
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearch = (values: any) => {
    console.log('Received values of form:', values);
  };

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

  const [deleteProduct, {
    isLoading: isProductDeletionLoading,
    isError: isProductDeletionError,
    isSuccess: isProductDeletionSuccess,
    error: productDeletionError,
  }] = useDeleteProductMutation();

  const showConfirmationAlert = async (id: number) => {
    const result = await MySwal.fire({
      title: "<h3 style={{ color: 'black' }}>Are you sure?</h3>",
      text: 'You won’t be able to revert this action',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2D7DEE',
      cancelButtonColor: '#FF3B3B',
      padding: '20px 10px',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        // Wait for product deletion
        const deletedProduct = await deleteProduct(id);
        console.log('deletedProduct: ', deletedProduct);
      } catch (error) {
        console.error('Error deleting product:', error, productDeletionError);
        MySwal.fire('Error', 'Failed to delete the product.', 'error');
      }
    } else {
      MySwal.close();
    }
  };

  const getCategoryName = (productId: number) => {
    const category = categories.find((category: ProductCategoryT) => {
      return category.id === productId;
    }) as ProductCategoryT;

    return category?.productCategoryName;
  }

  // for deleting items
  useEffect(() => {
    const deletingProduct = async () => {
      // setLoading(true);
      if (isProductDeletionSuccess) {
        // Close any currently opened modal
        MySwal.close();
        // message message
        await MySwal.fire({
          title: 'Deleted!',
          text: 'Product has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        });
        return;
      }

      if (isProductDeletionLoading) {
        // Show deleting message
        await MySwal.fire({
          title: 'Please wait',
          text: 'Deleting...',
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
        });
      }
    };
    deletingProduct();
  }, [isProductDeletionLoading]);

  const {
    error: isProductError,
    isSuccess: isProductFetchingSuccess,
    isError: isProductFetchingError,
    isLoading: isProductFetching,
  } = useGetProductsQuery([]);
  const fetchedProducts = useSelector(selectAllProducts);
  const p = useSelector((state: any) => selectProductById(state, 1));

  // // Unmemoized selector
  // const fetchSingleProduct = useSelector((state: any) => {
  //   return (id: number) => selectProductById(state, id);
  // });

  // Memoized selector
  const fetchSingleProduct = (id: number) => createSelector(
    [(state: any) => selectProductById(state, id)], // Input selector
    (product) => product // Result
  )

  console.log('fetchedProducts: ', fetchedProducts, '\nfetchSingleProduct(1) category P', p);

  const {
    error: productCategoryError,
    isError: isProductCategoryFetchingError,
    isSuccess: isProductCategoryFetchingSuccess,
    isLoading: isProductCategoryFetching,
  } = useGetProductCategoriesQuery([]);
  const fetchedProductCategories = useSelector(selectAllCategories);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        if (isProductFetchingSuccess) {
          console.log('fetchedProducts: ', fetchedProducts);
          setProducts(fetchedProducts);
          return;
        }

        if (isProductFetchingError) {
          console.log('productProductError', isProductError);
          throw isProductError;
        }
      } catch (err) {
        // setError('Failed to fetch products.');
        console.error('Failed to fetch products: ', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [isProductFetching, fetchedProducts]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        if (isProductCategoryFetchingSuccess) {
          console.log('fetchedProducts: ', fetchedProductCategories);
          setCategories(fetchedProductCategories);
          return;
        }

        if (isProductCategoryFetchingError) {
          console.log('productCategoryError', productCategoryError);
          throw productCategoryError;
        }
      } catch (err) {
        console.error('Failed to fetch products: ', err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [isProductCategoryFetching]);

  const columns: ColumnsType<ProductT> = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      render: (_, product) => (
        <span className="productimgname">
          <Link
            to={`/product/${product.id}`}
            // onClick={() => fetchSingleProduct(product.id)}
          >
            {product.productName}
          </Link>
        </span>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      render: (_, product) => (
        <span className="">
          <p>{getCategoryName(product.productCategoryId)}</p>
        </span>
      ),
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      render: (_, product) => (
        <span className="">
          <p>{product.sku}</p>
        </span>
      ),
    },

    {
      title: 'Price',
      dataIndex: 'price',
      render: (_, product) => (
        <span className="">
          <p>{product.sellingPrice}</p>
        </span>
      ),
    },

    {
      title: 'Expiry Date',
      dataIndex: 'expiryDate',
      // sorter: (a, b) => a.price - b.price,
      render: (_, product) => (
        <span className="">
          <p>{product.expiryDate? String(product.expiryDate) : ''}</p>
        </span>
      ),
    },

    {
      title: 'In Stock',
      dataIndex: 'inStock',
      render: (_, product) => (
        <span className="">
          <p>{product.quantityOnHand ? product.quantityOnHand : ''}</p>
        </span>
      ),
    },

    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, product) => (
        <span
          style={{
            padding: '8px 20px',
            borderRadius: '25px',
            color: 'white',
            textTransform: 'capitalize',
            background: product.enabled ? '#06C270' : '#353F46',
          }}
        >
          {product.enabled ? 'active' : 'inactive'}
        </span>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, product) => (
        <div className="action-table-data">
          <div className="edit-delete-action">
            <div className="input-block add-lists"></div>
            <Link
              className="me-2"
              style={{ border: '1px solid #173F77' }}
              to={`/product/${product.id}`}
              onClick={(e) => {
                // e.preventDefault();
                const singleProduct = fetchSingleProduct(product.id);
                console.log('Single Product: ', singleProduct);
              }}
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
      ),
    },
  ];

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Product Outlet</h4>
            </div>
          </div>
          {/* <div className="page-btn import">
            <CustomButton backgroundColor="white" textColor="#2D7DEE" className="search-button">
              <Upload className="me-2" />
              Export
            </CustomButton>
          </div>
          <div className="page-btn import">
            <CustomButton backgroundColor="white" textColor="#2D7DEE" className="search-button">
              <Download className="me-2" />
              Import
            </CustomButton>
          </div> */}
          <div className="page-btn import">
            <Link to="/add-products">
              <CustomButton backgroundColor="#2D7DEE" textColor="white" className="add-button">
                <Plus className="me-2" />
                Add New Product
              </CustomButton>
            </Link>
          </div>
        </div>
        {/* /product list */}
        <div className="_card table-list-card">
          <div className="_card-body">
            <div className="table-top">
              <div className="_search-set">
                <div className="_search-input">
                  {/* <span className="btn _btn-searchset">
                    <i data-feather="search" className="feather-search" />
                  </span>
                  <input
                    type="text"
                    placeholder="Enter product name, sku or tag"
                    className="form-control form-control-sm formsearch"
                  /> */}
                  <Input
                    placeholder='Enter product name or category'
                    prefix={<SearchOutlined />}
                    style={{ width: 330, height: 38 }}
                  />
                </div>
                <CustomButton backgroundColor="#F45D01" textColor="#fff" className="search-button">
                  Search
                </CustomButton>
              </div>
              {/* <div className="search-path" onClick={toggle}>
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
              </div> */}
            </div>
            {/* <div>
              <Form form={form} name="advanced_search" className="ant-advanced-search-form" onFinish={handleSearch}>
                <Row gutter={20} style={{ marginBottom: 30 }}>
                  {getFields()}
                </Row>
              </Form></div>
            <div className="table-responsive" style={{ width: '100%', overflowX: 'scroll' }}>
              <Table columns={columns} dataSource={products} />
            </div> */}
          </div>
        </div>
        {/* /product list */}
        <Brand />
      </div>
    </div>
  );
};

export default OutletList;
