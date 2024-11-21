import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Col, Row, Button, Form, Input } from 'antd';
import FeatherIcon from 'feather-icons-react';
import {
  ProductT,
  ProductCategoryT,
  ProductSubcategoryT,
  ProductBrandT,
  UnitT,
  TaxesT,
  DiscountT,
  StoreT,
} from '../../types/product-types';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

import {
  // Queries
  useGetProductsQuery,
  useGetStoresQuery,
  useGetProductCategoriesQuery,
  useGetProductSubcategoriesQuery,
  useGetProductBrandsQuery,
  useGetProductDiscountsQuery,
  useGetTaxesQuery,
  useGetProductUnitsQuery,

  // Mutation
  useDeleteProductMutation,

  // Selectors
  selectProductById,
  selectAllStores,
  selectCategoryById,
  selectAllSubcategories,
  selectSubcategoryById,
  selectBrandById,
  selectDiscountById,
  selectTaxById,
  selectUnitById,
} from '../../store/feature-slice/products';
// import { fetchProduct } from '../../../temp/standard-product-crud';

// import './styles.scss';
import ImgForUse from '../../../../public/assets/img/img-05.jpg';
import { all_routes } from '../../Router/all_routes';

const { Item: FormItem } = Form;

const SupplierDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<ProductT | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const {
    isError: isProductFetchingError,
    isSuccess: isProductFetchingSuccess,
    isLoading: isProductFetching,
  } = useGetProductsQuery([]);
  const fetchedProduct = useSelector((state) => {
    return selectProductById(state, Number(id));
  });

  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (
          isProductFetchingSuccess
        ) {
          console.log('fetchedProduct: ', fetchedProduct);
          setProduct(fetchedProduct);
          return;
        }

        if (
          isProductFetchingError
        ) {
          throw 'Failed to fetch product';
        }
      } catch (err) {
        // setError('Failed to fetch product.');
        console.error('Failed to fetch product: ', err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [
    id,
    isProductFetching,
  ]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!product)
    return (
      <div>
        <h1>Something went wrong</h1>
      </div>
    );

  return (
    <ProductUtil
      product={product}
    />
  );
};

type ProductUtilT = {
  product: ProductT;
}

const ProductUtil = ({
  product
}: ProductUtilT) => {
  const navigate = useNavigate();
  const route = all_routes;

  // const [product, setProduct] = useState<ProductT | null>(null);
  const [category, setCategory] = useState<ProductCategoryT | null>(null);
  const [subcategory, setSubcategory] = useState<ProductSubcategoryT | null>(null);
  const [brand, setBrand] = useState<ProductBrandT | null>(null);
  const [discount, setDiscount] = useState<DiscountT | null>(null);
  const [tax, setTax] = useState<TaxesT | null>(null);
  const [unit, setUnit] = useState<UnitT | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const {
    isError: isStoreFetchingError,
    isSuccess: isStoreFetchingSuccess,
    isLoading: isStoreFetching,
  } = useGetStoresQuery([]);
  const fetchedStores = useSelector(selectAllStores);

  const {
    data: productCat,
    isError: isProductCategoryFetchingError,
    isSuccess: isProductCategoryFetchingSuccess,
    isLoading: isProductCategoryFetching,
  } = useGetProductCategoriesQuery([]);

  const fetchedProductCategory = useSelector((state) => {
    return selectCategoryById(state, product.productCategoryId);
  });

  const {
    isError: isProductSubcategoryFetchingError,
    isSuccess: isProductSubcategoryFetchingSuccess,
    isLoading: isProductSubcategoryFetching,
  } = useGetProductSubcategoriesQuery([]);

  const fetchedProductSubcategories = useSelector(selectAllSubcategories);

  const fetchedProductSubcategory = useSelector((state) => {
    return selectSubcategoryById(state, product.subCategoryId);
  });

  const {
    isError: isProductBrandFetchingError,
    isSuccess: isProductBrandFetchingSuccess,
    isLoading: isProductBrandFetching,
  } = useGetProductBrandsQuery([]);
  const fetchedProductBrand = useSelector((state) => {
    return selectBrandById(state, product.brandId);
  });

  const {
    isError: isProductDiscountFetchingError,
    isSuccess: isProductDiscountFetchingSuccess,
    isLoading: isProductDiscountFetching,
  } = useGetProductDiscountsQuery([]);
  const fetchedProductDiscount = useSelector((state) => {
    return selectDiscountById(state, product.discountId);
  });

  const {
    isError: isProductTaxFetchingError,
    isSuccess: isProductTaxFetchingSuccess,
    isLoading: isProductTaxFetching,
  } = useGetTaxesQuery([]);
  const fetchedTax = useSelector((state) => {
    return selectTaxById(state, product.taxId);
  });

  const {
    isError: isProductUnitFetchingError,
    isSuccess: isProductUnitFetchingSuccess,
    isLoading: isProductUnitFetching,
  } = useGetProductUnitsQuery([]);
  const fetchedProductUnit = useSelector((state) => {
    return selectUnitById(state, product.unitId);
  });

  useEffect(() => {
    const loadProductUtils = async () => {
      try {
        if (
          isStoreFetchingSuccess
          && isProductCategoryFetchingSuccess
          && isProductSubcategoryFetchingSuccess
          && isProductBrandFetchingSuccess
          && isProductDiscountFetchingSuccess
          && isProductTaxFetchingSuccess
          && isProductUnitFetchingSuccess
        ) {
          console.log('product cat: ', productCat);
          console.log('product: ', product);
          console.log('fetchedProductSubcategory: ', fetchedProductSubcategory, fetchedProductSubcategories);
          setCategory(fetchedProductCategory);
          setSubcategory(fetchedProductSubcategory);
          setBrand(fetchedProductBrand);
          setDiscount(fetchedProductDiscount);
          setTax(fetchedTax);
          setUnit(fetchedProductUnit);

          // Get stores for this product
          if (product.storeIds) {
            const storeIds = product.storeIds;
            const productStores = fetchedStores.find((store: StoreT, _) => {
              for (let storeId of storeIds) {
                if (store.id === storeId) return true;
              }
            });

            console.log('productStores: ', productStores);
          }
          return;
        }

        if (
          isStoreFetchingError
          && isProductCategoryFetchingError
          && isProductSubcategoryFetchingError
          && isProductBrandFetchingError
          && isProductDiscountFetchingError
          && isProductTaxFetchingError
          && isProductUnitFetchingError
        ) {
          throw 'Failed to fetch product';
        }
      } catch (err) {
        // setError('Failed to fetch product.');
        console.error('Failed to fetch product: ', err);
      } finally {
        setLoading(false);
      }
    };

    loadProductUtils();
  }, [
    isProductCategoryFetching,
    isStoreFetching,
    isProductSubcategoryFetching,
    isProductBrandFetching,
    isProductDiscountFetching,
    isProductTaxFetching,
    isProductUnitFetching,
  ]);

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
      text: 'You won\'t be able to revert this action',
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
        setDeleting(true);
        const deletedProduct = await deleteProduct(id);
        console.log('deletedProduct: ', deletedProduct);
      } catch (error) {
        console.error('Error deleting product:', error, productDeletionError);
        MySwal.fire('Error', 'Failed to delete the product.', 'error');
      } finally {
        setDeleting(false);
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

        // Go back
        navigate(-1);

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

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  // if (!category)
  //   return (
  //     <div>
  //       <h1>Something went wrong</h1>
  //     </div>
  //   );

  return (
    <div className="page-wrapper" style={{ background: '#F6F9FE', height: '100%' }}>
      <div className="content" style={{ paddingBottom: '20px' }}>
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Supplier Details</h4>
            </div>
          </div>
          <ul className="table-top-head">
            <li>
              <div className="page-btn">
                <Button
                  style={{ background: '#868B90', padding: '16px' }}
                  type="primary"
                  onClick={() => navigate(-1)}
                >
                  <FeatherIcon icon="arrow-left" />
                  Back
                </Button>
              </div>
            </li>
            <li>
              <div className="page-btn">
                <Button
                  style={{ backgroundColor: 'red', height: 40, marginLeft: 15 }}
                  type="primary"
                  loading={deleting}
                  onClick={() => showConfirmationAlert(product.id)}
                >
                  Delete
                </Button>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <Row gutter={40}>
            <Col span={12}>
              <FormItem>
                <label style={{ paddingBottom: '8px' }}>
                  Supplier Name
                </label>
                <FormItem
                  name="supplierName"
                >
                  <Input
                    style={{ padding: '16px' }}
                    value={productSupplierName}
                    disabled
                  />
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem name="phoneNumber" label="Phone No">
                <Input style={{ padding: '16px' }} disabled />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={40}>
            <Col span={12}>
              <FormItem>
                <label style={{ paddingBottom: '8px' }}>
                  Email Address
                </label>
                <FormItem
                  name="email"
                >
                  <Input
                    style={{ padding: '16px' }}
                    value={productSupplierName}
                    disabled
                  />
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem name="address" label="Address">
                <Input style={{ padding: '16px' }} disabled />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={40}>
            <Col span={12}>
              <FormItem>
                <label style={{ paddingBottom: '8px' }}>
                  City
                </label>
                <FormItem
                  name="city"
                >
                  <Input
                    style={{ padding: '16px' }}
                    value={productSupplierName}
                    disabled
                  />
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem name="country" label="Country">
                <Input style={{ padding: '16px' }} disabled />
              </FormItem>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default SupplierDetail;
