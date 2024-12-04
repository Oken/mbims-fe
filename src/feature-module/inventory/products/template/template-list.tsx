import { useEffect, useState, Fragment } from 'react';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Col, Form, FormInstance, Row, Select, Input, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Download, Upload, Plus, Filter, X } from 'react-feather';
import { ColumnsType } from 'antd/es/table';
import { all_routes } from '../../../../Router/all_routes';
import { ProductT, ProductCategoryT, ProductBrandT } from '../../../../types/product-types';
import CustomButton from '../../../components/button';
// import { fetchProducts, fetchProduct } from '../../../temp/standard-product-crud';

import {
  // Queries
  useGetProductTemplatesQuery,
  useGetProductCategoriesQuery,
  useGetProductBrandsQuery,

  // Mutations
  useDeleteProductMutation,

  // Selectors
  selectAllTemplates,
  selectTemplateById,
  selectAllCategories,
  selectAllBrands,
} from '../../../../store/feature-slice/products';
import './styles.scss';

const { Item: FormItem } = Form;
const Option = Select.Option;

const ProductList = () => {
  const route = all_routes;

  // Form instance for managing form state with hooks
  const [form] = Form.useForm<FormInstance>();

  const [productTemplates, setProductTemplates] = useState<ProductT[]>([]);
  const [categories, setCategories] = useState<ProductCategoryT[]>([]);
  const [brands, setBrands] = useState<ProductBrandT[]>([]);

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


  // Getter function
  const getCategoryName = (productId: number) => {
    const category = categories.find((category: ProductCategoryT) => {
      return category.id === productId;
    }) as ProductCategoryT;

    return category?.productCategoryName;
  }

  // Getter function
  const getBrandName = (brandId: number) => {
    const brand = brands.find((brand: ProductBrandT) => {
      return brand.id === brandId;
    }) as ProductBrandT;

    return brand?.brandName;
  }

  const {
    error: isProductTemplateError,
    isSuccess: isProductTemplateFetchingSuccess,
    isError: isProductTemplateFetchingError,
    isLoading: isProductTemplateFetching,
  } = useGetProductTemplatesQuery([]);
  const fetchedProductTemplates = useSelector(selectAllTemplates);
  const p = useSelector((state: any) => selectTemplateById(state, 1));

  // Memoized selector
  const fetchSingleTemplate = (id: number) => createSelector(
    [(state: any) => selectTemplateById(state, id)], // Input selector
    (product) => product // Result
  )

  console.log('fetchedProductTemplates: ', fetchedProductTemplates, '\nfetchSingleProduct(1) category P', p);

  const {
    // error: productCategoryError,
    isError: isProductCategoryFetchingError,
    isSuccess: isProductCategoryFetchingSuccess,
    isLoading: isProductCategoryFetching,
  } = useGetProductCategoriesQuery([]);
  const fetchedProductCategories = useSelector(selectAllCategories);

  const {
    // error: productBrandError,
    isError: isProductBrandFetchingError,
    isSuccess: isProductBrandFetchingSuccess,
    isLoading: isProductBrandFetching,
  } = useGetProductBrandsQuery([]);
  const fetchedProductBrands = useSelector(selectAllBrands);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        if (
          isProductTemplateFetchingSuccess
          && isProductCategoryFetchingSuccess
          && isProductBrandFetchingSuccess
        ) {
          console.log('fetchedProductTemplates: ', fetchedProductTemplates);
          setProductTemplates(fetchedProductTemplates);
          setCategories(fetchedProductCategories);
          setBrands(fetchedProductBrands);
          return;
        }

        if (
          isProductTemplateFetchingError
          || isProductCategoryFetchingError
          || isProductBrandFetchingError
        ) {
          console.log('productProductError', isProductTemplateError);
          throw isProductTemplateError;
        }
      } catch (err) {
        // setError('Failed to fetch products.');
        console.error('Failed to fetch products: ', err);
      }
    };

    loadProducts();
  }, [
    isProductTemplateFetching,
    isProductCategoryFetching,
    isProductBrandFetching,
    ]);

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
      title: 'Category',
      dataIndex: 'category',
      render: (_, product, index) => (
        <Fragment key={index}>
          <p>{getCategoryName(product.productCategoryId)}</p>
        </Fragment>
      ),
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      render: (_, product, index) => (
        <Fragment key={index}>
          <p>{product.sku}</p>
        </Fragment>
      ),
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      // sorter: (a, b) => a.price - b.price,
      render: (_, product, index) => (
        <Fragment key={index}>
          <p>{getBrandName(product.brandId)}</p>
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
              {/* Standard Product */}
              {product.type === 'SINGLE' ? (
                <>
                  <Link
                    className="me-2"
                    style={{ border: '1px solid #173F77' }}
                    to={`/template/standard/${product.id}`}
                  >
                    <FeatherIcon icon="eye" className="feather-view" />
                  </Link>
                  <Link
                    className="me-2"
                    style={{ border: '1px solid #173F77' }}
                    to={`/template/standard/${product.id}?edit=true`}
                  >
                    <FeatherIcon icon="edit" className="feather-edit" />
                  </Link>
                </>
              ) : ('')}

              {/* Composite product */}
              {product.type === 'COMPOSITE' ? (
                <>
                  <Link
                    className="me-2"
                    style={{ border: '1px solid #173F77' }}
                    to={`/template/composite/${product.id}`}
                  >
                    <FeatherIcon icon="eye" className="feather-view" />
                  </Link>
                  <Link
                    className="me-2"
                    style={{ border: '1px solid #173F77' }}
                    to={`/template/composite/${product.id}?edit=true`}
                  >
                    <FeatherIcon icon="edit" className="feather-edit" />
                  </Link>
                </>
              ) : ('')}

              {/* Variant product */}
              {product.type === 'VARIANT' ? (
                <>
                  <Link
                    className="me-2"
                    style={{ border: '1px solid #173F77' }}
                    to={`/template/variant/${product.id}`}
                  >
                    <FeatherIcon icon="eye" className="feather-view" />
                  </Link>
                  <Link
                    className="me-2"
                    style={{ border: '1px solid #173F77' }}
                    to={`/template/variant/${product.id}?edit=true`}
                  >
                    <FeatherIcon icon="edit" className="feather-edit" />
                  </Link>
                </>
              ) : ('')}

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

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div style={{ width: '100%' }}>
            <div className="add-item d-flex" style={{ width: '100%', marginBottom: 20 }}>
              <div className="page-title">
                <h4>Templates</h4>
                <h6>Manage your templates</h6>
              </div>
            </div>

            <div className="table-top">
              <Row
                gutter={40}
                style={{ width: '100%', margin: '0px 0px 20px 0px' }}
                justify={'space-between'}
              >
                <Col span={12} style={{ paddingLeft: 0 }}>
                  <div style={{ display: 'flex' }}>
                    <Input
                      placeholder='Enter product or category'
                      prefix={<SearchOutlined />}
                      style={{ width: 330, height: 42, marginRight: 10 }}
                    />
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
                <Col span={6} style={{ maxWidth: 'fit-content', paddingRight: 0 }}>
                  <CustomButton
                  backgroundColor="white"
                  textColor="#fff"
                  style={{ background: '#FF3B3B', color: '#fff', border: 'none' }}
                  className="search-button"
                  onClick={() => {
                    alert('Hello')
                  }}
                >
                  Delete All
                </CustomButton>
                </Col>
              </Row>
            </div>

            <Row gutter={40} style={{
              width: '100%',
              margin: '0px 0px 20px 0px',
            }}
            >
              <Col span={10} style={{ paddingLeft: 0 }}>
                <div style={{ fontWeight: 500 }}>
                  {productTemplates.length} templates
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {/* /product list */}
        {productTemplates.map((template, index) => (
          <div className="_card table-list-card" style={{ padding: 0 }} key={index}>
            <div className="_card-body">
              <div
                className="table-responsive"
                style={{
                  width: '100%',
                  // overflowX: 'scroll'
                }}
              >
                <Table columns={columns} dataSource={[template]} pagination={false} />
                <div className='template-note'>
                  <h6>Note</h6>
                  <p>A very easy way to create a nice product</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
