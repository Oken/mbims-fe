/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Fragment,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import FeatherIcon from 'feather-icons-react';
import {
  Col,
  Form,
  Input,
  Row,
  Select,
  Checkbox,
  Button,
  Space,
  Switch,
  Upload,
  message,
  InputRef,
  RefSelectProps,
  DatePicker,
} from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload';
import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import '../common.scss';
// import './styles.scss';
import CustomModal, { CustomModalRef } from '../../../../../custom-modal';

import {
  // Queries
  useGetProductCategoriesQuery,
  useGetProductBrandsQuery,
  useGetProductDiscountsQuery,
  useGetStoresQuery,
  useGetOutletsQuery,
  useGetProductSuppliersQuery,
  useGetTaxesQuery,
  useGetProductUnitsQuery,

  // Mutations
  useAddNewProductMutation,

  // Selectors
  selectAllCategories,
  selectCategoryById,
  selectAllBrands,
  selectAllDiscounts,
  selectAllStores,
  selectAllOutlets,
  selectAllSuppliers,
  selectAllTaxes,
  selectAllUnits,
} from '../../../../../store/feature-slice/products';

import SelectOutlet from '../../../../components/button/forms/outlets/select-outlet.tsx';
import AddCategoryForm from '../../../../components/button/forms/categories/add-category';
import AddSupplierForm from '../../../../components/button/forms/suppliers/add-supplier';
import AddDiscountForm from '../../../../components/button/forms/discounts/add-discount';
import AddTaxForm from '../../../../components/button/forms/taxes/add-tax';

import {
  DiscountT,
  ProductBrandT,
  ProductCategoryT,
  SelectOptionT,
  SupplierT,
  TaxesT,
  UnitType,
} from '../../../../../types/product-types';
import { beforeUpload, uploadButton, } from '../../../../../upload/images';
// import { getBase64 } from '../../../../utils';
import { useSKUBarcodeGenerator } from '../../../../../hooks/useSKUBarcodeGenerator';
// import { useImageUpload } from '../../../../hooks/useUploadImage';
import { useExpiryDate } from '../../../../../hooks/useExpiryDate';
import Algebra from '../../../../../style/icons/site-icons-component/algebra.tsx';
import TagRender from '../../../../components/button/utils/tag-render';
import CustomTagRenderProvider
  from '../../../../components/button/utils/context/tagrender-context.tsx';
// import { flushSync } from 'react-dom';
// import { privateDecrypt } from 'crypto';

const { Item: FormItem } = Form;
const { TextArea } = Input;
const Option = Select.Option;

// Add Standard Product component
const AddStandardProduct = () => {
  const navigate = useNavigate();
  const inputRef = useRef<InputRef>(null);

  const categorySelectRef = useRef<RefSelectProps>(null);
  const outletSelectRef = useRef<RefSelectProps>(null);
  const supplierSelectRef = useRef<RefSelectProps>(null);

  const handleCategoryBlur = () => {
    if (categorySelectRef.current) {
      categorySelectRef.current.blur();
      categorySelectRef.current.focus();
    }
  }

  const handleOutletSelectBlur = () => {
    if (outletSelectRef.current) {
      outletSelectRef.current.blur();
      outletSelectRef.current.focus();
    }
  }

  const handleSupplierBlur = () => {
    if (supplierSelectRef.current) {
      supplierSelectRef.current.blur();
      supplierSelectRef.current.focus();
    }
  }

  // Modal References
  const selectOutletModalRef = useRef<CustomModalRef>(null);
  const addCategoryModalRef = useRef<CustomModalRef>(null);
  const addSupplierModalRef = useRef<CustomModalRef>(null);
  const discountModalRef = useRef<CustomModalRef>(null);
  const taxModalRef = useRef<CustomModalRef>(null);

  const [loading, setLoading] = useState(false);

  // Outlets
  const [storeData, setStoreData] = useState<any[]>([]); // Fetched data
  const [outletData, setOutletData] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]); // From select store modal
  const [outlets, setOutlets] = useState<any[]>([]); // From select outlet modal
  const [storesIds, setStoresIds] = useState<number[]>([]); // From select store modal
  const [outletsIds, setOutletsIds] = useState<number[]>([]); // From select outlet modal
  const [brandItems, setBrandItems] = useState<ProductBrandT[]>([]);
  const [units, setUnits] = useState<UnitType[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierT[]>([]);
  const [supplierId, setSupplierId] = useState<number>(0);
  const [selectedSuppliers, setSelectedSuppliers] = useState<any[]>([]);

  // Categories, Brands, Suppliers, Discounts, and Taxes
  const [categoryItems, setCategoryItems] = useState<ProductCategoryT[]>([]);
  const [createdNewCategory, setCreatedNewCategory] = useState<boolean>(false);
  const [createdNewSupplier, setCreatedNewSupplier] = useState<boolean>(false);
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [supplierSearchTerm, setSupplierSearchTerm] = useState('');
  const [
    filteredCategoryList,
    setFilteredCategoryList
  ] = useState<SelectOptionT[]>([]);
  const [
    filteredSupplierList,
    setFilteredSupplierList
  ] = useState<SelectOptionT[]>([]);
  const [isCategorySelectOpen, setIsCategorySelectOpen] = useState(false);
  const [isSupplierSelectOpen, setIsSupplierSelectOpen] = useState(false);
  const [isOutletSelectOpen, setIsOutletSelectOpen] = useState(false);
  const [discounts, setDiscounts] = useState<DiscountT[]>([]);
  const [taxes, setTaxes] = useState<TaxesT[]>([]);
  const [expiryDay, setExpiryDay] = useState<string>('');
  const [expiryMonth, setExpiryMonth] = useState<string>('');
  const [expiryYear, setExpiryYear] = useState<string>('');

  // Product Info States
  const [productName, setProductName] = useState<string>('');
  // const [productSKU, setProductSKU] = useState<string>('');
  // const [barcode, setBarcode] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [productSellingPrice, setProductSellingPrice] = useState<number>(0);
  const [costPrice, setCostPrice] = useState<number>(0);

  const [productCategoryId, setProductCategoryId] = useState<number>(0);
  const [brandId, setBrandId] = useState<number | null>(null);
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);
  const [selectTaxId, setSelectedTaxId] = useState<number | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>();
  const [soldOnPOS, setSoldOnPOS] = useState<boolean>(true);
  const [inventoryTracking, setInventoryTracking] = useState<boolean>(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);

  const [allOutlets, setAllOutlets] = useState<boolean>(false);
  const [price, setPrice] = useState<string>('');
  const [inStock, setInStock] = useState<string>('');
  const [lowStockAlert, setLowStockAlert] = useState<string>('');
  const [selectDiscountId, setSelectedDiscountId] = useState<number | null>(null);

  const { productSKU, barcode } = useSKUBarcodeGenerator(
    productName,
    productCategoryId,
    categoryItems
  );

  const [imageList, setImageList] = useState<UploadFile[]>([]);

  const { expiryDate, updateExpiryComponent } = useExpiryDate();

  // temp states
  const [markUp, setMarkUp] = useState<string>('');
  const [margin, setMargin] = useState<string>('');
  const [hasExpiryDate, setHasExpiryDate] = useState<boolean>(false);
  const [applyAllDiscount, setApplyAllDiscount] = useState<boolean>(false);
  const [isTaxable, setIsTaxable] = useState<boolean>(false);
  const [saveAsTemplate, setSaveAsTemplate] = useState<boolean>(false);

  // Remove price from custom outlets for variant products
  const [removeOutletModalPrice, setRemoveOutletModalPrice] = useState<boolean>(false);

  // Handle Image Upload
  const handleImageChange: UploadProps['onChange'] = ({ fileList: newImageList }) => {
    console.log('Image List: ', newImageList);
    setImageList(newImageList);
  }

  const [form] = Form.useForm();

  const handleSuppliersKeyDown = (event: any) => {
    // Prevent tag deletion on backspace when search term is empty
    console.log('event.target: ', event.target.value);
    // const searchInput = event.target;
    // if (event.key === "Backspace" && !searchInput.value) {
    event.stopPropagation();
    // }
  };

  const [addNewProduct, {
    isLoading: isProductCreationLoading,
    isError: isProductCreationError,
    isSuccess: isProductCreationSuccess,
    error: productCreationError,
  }] = useAddNewProductMutation();

  const onFinish = async (values: any) => {
    try {
      console.log('form values: ', values, '\nselectedSupplierId: ', selectedSupplierId);
      console.log('storesIds', storesIds, '\nproductSKU: ', productSKU, '\nbarcode: ', barcode);
      // Create a new FormData instance
      let data = new FormData();

      const productImages = imageList.map((image) => image.originFileObj as RcFile);

      console.log('productImages: ', productImages);

      const outletData = values.finalOutlets ?
        values.finalOutlets.map((outlet: any, _: number) => {
          return ({
            outletId: outlet.outletId,
            // Default
            quantityOnHand: 100,
            quantityAlert: 20,
            outletPrice: outlet.outletPrice,

            // All Outlet
            ...(values.inventoryTracking && !allOutlets ? {
              quantityOnHand: outlet.inStock,
              quantityAlert: outlet.lowStockAlert,
            } : {}),
            reorderQuantity: 10,
          })
        }) : null;

      console.log('Gathered outlets: ', outletData);

      // Append the product data as a JSON string
      const productData = {
        productName: values.productName,
        sku: values.sku || productSKU,
        sellingType: values.sellingType || 'retail',
        barcode: values.barcode || barcode,
        productDescription: values.productDescription,
        composite: false,
        sellingPrice: values.sellingPrice,
        costPrice: values.costPrice,
        type: 'SINGLE',
        productCategoryId: values.productCategoryId,
        productCategoryName: 'Anything',
        subCategoryId: 1,
        brandId: values.brandId || null,
        unitId: values.unitId || null,
        tags: values.tags || [],
        enabled: values.isPointOfSale,
        outletProducts: outletData,
        inventoryTracking: values.inventoryTracking,
        discountId: (applyAllDiscount && values.discountId) ? values.discountId : null,
        taxId: (isTaxable && values.taxId) ? values.taxId : null,
        expiryDate: (hasExpiryDate && expiryDate) ? expiryDate : null,
        // supplierIds: values.supplierId? [values.supplierId] : null,
        addToAllOutlets: allOutlets ? true : false,
        template: values.saveAsTemplate ? values.saveAsTemplate : false,
      };

      data.append('product', JSON.stringify(productData));

      productImages.forEach((image: File) => {
        data.append('productImages', image);
      })

      // // If there is an image, append it to FormData
      // if (imageUrl) {
      //   data.append('productImages', imageUrl);
      // }

      console.log('productData: ', productData);
      console.log('data: ', [...data.entries()]);
      // return;

      const resProduct = addNewProduct(data);

      console.log('Product created:', resProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      message.error('Failed to create product.');
    }
  };

  useEffect(() => {
    const productCreated = async () => {
      if (isProductCreationSuccess) {
        message.success('Product created successfully!');
        return;
      }

      if (isProductCreationError) {
        // An error occurred
        console.error('Error creating product:', productCreationError);
        message.error('Failed to create product.');
      }
    }

    productCreated();
  }, [isProductCreationLoading]);

  // create handleSubmit function here
  /*const handleSubmit = async () => {
    let data = new FormData();
    // setLoading(true);
    try {
      const productData = collectProductData();

      data.append('product', JSON.stringify(productData));

      // If there is an image, append it to FormData
      if (imageUrl) {
        data.append('productImages', imageUrl);
      }

      console.log(productData);
      console.log(productData);
      console.log(data);

      // Configure axios request
      const config = {
        method: 'post',
        url: `http://192.168.43.112:9100/api/v1/products`,
        // headers: {
        //   ...data.getHeaders(), // This helps axios set the proper headers for multipart form data
        // },
        data: data,
      };

      // Make the API request
      const response = await axios.request(config);

      console.log('Product created:', response.data);
      alert('done');
      message.success('Product created successfully!');

      // const product = {
      //   'product': productData,
      //   // 'productImages': imageUrl,
      // }

      // console.log('product: ', data);
      const resProduct = await addNewProduct(data);

      if (isProductCreationError) {
        throw productCreationError;
      }

      // message.success(`${resProduct.productName} created successfully`);

      console.log('resProduct: ', resProduct);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };*/

  // useEffect(() => {
  //   const productCreated = async () => {
  //     if (isProductCreationSuccess) {
  //       message.success('Store added successfully');
  //     }

  //     if (isProductCreationError) {
  //       message.error('Error creating product');
  //     }
  //   }

  //   productCreated();
  // }, [isProductCreationLoading]);

  const handleCategorySearch = (e: any) => {
    const event = e.target as HTMLInputElement
    const val = event.value;
    setCategorySearchTerm(event.value);

    if (val == '') return;

    searchCategory(val);
  }

  const handleSupplierSearch = (e: any) => {
    const event = e.target as HTMLInputElement
    const val = event.value;
    setSupplierSearchTerm(event.value);

    if (val == '') return;

    searchSupplier(val);
  }

  const openAddCategoryModal = () => {
    addCategoryModalRef.current?.openModal();
  };

  const closeAddCategoryModal = () => {
    addCategoryModalRef.current?.closeModal();
  };

  const openAddSupplierModal = () => {
    addSupplierModalRef.current?.openModal();
  };

  const closeAddSupplierModal = () => {
    addSupplierModalRef.current?.closeModal();
  };

  // Add discount
  const openDiscountModal = () => {
    discountModalRef.current?.openModal();
  };

  const closeDiscountModal = () => {
    discountModalRef.current?.closeModal();
  };

  // Add tax
  const openTaxModal = () => {
    taxModalRef.current?.openModal();
  };

  const closeTaxModal = () => {
    taxModalRef.current?.closeModal();
  };

  // const calculateMarkup = (costPrice: number, sellingPrice: number) => {
  //   const costP: number = costPrice ? costPrice : 0;
  //   const sellP: number = sellingPrice ? sellingPrice : 0;

  //   console.log('costP: ', costP, 'costPrice ', costPrice, 'sellP', sellP, 'sellingPrice', sellingPrice)

  //   const diff = sellP - costP;

  //   const div = diff / costP;

  //   const markup = div * 100;

  //   console.log('markup: ', markup);

  //   setMarkup(markup.toFixed(2));
  // }

  // const calculateMargin = (costPrice: number, sellingPrice: number) => {
  //   const costP: number = costPrice ? costPrice : 0;
  //   const sellP: number = sellingPrice ? sellingPrice : 0;

  //   const margin = ((sellP - costP) / sellP) * 100;

  //   setMargin(margin.toFixed(2));
  // }

  const handlePriceChange = () => {
    const { costPrice, sellingPrice } = form.getFieldsValue(['costPrice', 'sellingPrice']);

    // Set the selling price
    if (sellingPrice) {
      setProductSellingPrice(Number(sellingPrice));
    }

    if (costPrice && sellingPrice) {
      const markup = ((sellingPrice - costPrice) / costPrice) * 100;
      const margin = ((sellingPrice - costPrice) / sellingPrice) * 100;

      form.setFieldsValue({
        markUp: markup.toFixed(2), // Limit to 2 decimal places
        margin: margin.toFixed(2),
      });
    }
  };

  // Reflect the selling price on the `price` of all outlets
  useEffect(() => {
    form.setFieldsValue({ price: productSellingPrice });
  }, [
    productSellingPrice,
    inventoryTracking
  ])

  // Expiry Date Calculation
  useEffect(() => {
    updateExpiryComponent('expiryDay', `${expiryDay}`);
    updateExpiryComponent('expiryMonth', `${expiryMonth}`);
    updateExpiryComponent('expiryYear', `${expiryYear}`);
  }, [expiryDay, expiryMonth, expiryYear]);

  const {
    // data: categoryData,
    error: productCategoryError,
    isError: isProductCategoryFetchingError,
    isSuccess: isProductCategoryFetchingSuccess,
    isLoading: isProductCategoryFetching,
    // refetch: refetchProductCategories,
  } = useGetProductCategoriesQuery([]);
  const fetchedProductCategories = useSelector(selectAllCategories);

  const productCategory = useSelector((state) => {
    return selectCategoryById(state, 1);
  });
  // console.log('categoryData: ', categoryData);
  // console.log('RTK categories: ', fetchedProductCategories, '\nSingle category', productCategory);

  // Update the category list after creating a new category
  const searchCategory = (searchTerm: string) => {
    const filtered = categoryItems.filter(
      option => option.productCategoryName.toLowerCase().startsWith(searchTerm.toLowerCase())
    )

    const filteredCategoryList = filtered.map((item: ProductCategoryT) => ({
      value: item.id,
      label: item.productCategoryName,
    }));

    setFilteredCategoryList(filteredCategoryList);
  }

  // Update the category list after creating a new category
  useEffect(() => {

    console.log('productSKU: ', productSKU, '\nbarcode: ', barcode);
    console.log('categoryItems after refetch: ', categoryItems, fetchedProductCategories);
    setCategoryItems(fetchedProductCategories);

    if (createdNewCategory) {
      setIsCategorySelectOpen((prev) => !prev);
      searchCategory(categorySearchTerm);
    }
  }, [
    fetchedProductCategories,
    categoryItems,
    createdNewCategory,
  ]);

  const {
    isError: isProductSupplierFetchingError,
    isSuccess: isProductSupplierFetchingSuccess,
    isLoading: isProductSupplierFetching,
  } = useGetProductSuppliersQuery([]);
  const fetchedProductSuppliers = useSelector(selectAllSuppliers);

  // Update the supplier list after creating a new category
  const searchSupplier = (searchTerm: string) => {
    console.log('searchSupplier suppliers: ', suppliers);
    const filtered = suppliers.filter(
      option => option.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    )

    const filteredSupplierList = filtered.map((item: SupplierT) => ({
      value: item.id,
      label: item.name,
    }));

    setFilteredSupplierList(filteredSupplierList);
  }

  // Update the supplier list after creating a new category
  useEffect(() => {

    console.log('productSKU: ', productSKU, '\nbarcode: ', barcode);
    console.log('categoryItems after refetch: ', categoryItems, fetchedProductCategories);
    setCategoryItems(fetchedProductCategories);

    if (createdNewSupplier) {
      setIsSupplierSelectOpen((prev) => !prev);
      searchSupplier(supplierSearchTerm);
    }
  }, [
    fetchedProductSuppliers,
    suppliers,
    createdNewSupplier,
  ]);

  const {
    isError: isProductBrandFetchingError,
    isSuccess: isProductBrandFetchingSuccess,
    isLoading: isProductBrandFetching,
  } = useGetProductBrandsQuery([]);
  const fetchedProductBrands = useSelector(selectAllBrands);

  const {
    isError: isProductDiscountFetchingError,
    isSuccess: isProductDiscountFetchingSuccess,
    isLoading: isProductDiscountFetching,
  } = useGetProductDiscountsQuery([]);
  const fetchedProductDiscounts = useSelector(selectAllDiscounts);

  const {
    isError: isStoreFetchingError,
    isSuccess: isStoreFetchingSuccess,
    isLoading: isStoreFetching,
  } = useGetStoresQuery([]);
  const fetchedStores = useSelector(selectAllStores);

  const {
    isError: isOutletFetchingError,
    isSuccess: isOutletFetchingSuccess,
    isLoading: isOutletFetching,
  } = useGetOutletsQuery([]);
  const fetchedOutlets = useSelector(selectAllOutlets);

  const {
    isError: isTaxFetchingError,
    isSuccess: isTaxFetchingSuccess,
    isLoading: isTaxFetching,
  } = useGetTaxesQuery([]);
  const fetchedTaxes = useSelector(selectAllTaxes);

  const {
    isError: isProductUnitFetchingError,
    isSuccess: isProductUnitFetchingSuccess,
    isLoading: isProductUnitFetching,
  } = useGetProductUnitsQuery([]);
  const fetchedProductUnits = useSelector(selectAllUnits);

  useEffect(() => {
    console.log('We!');
    const loadData = async () => {
      console.log('We are');
      try {
        if (
          isProductCategoryFetchingSuccess
          && isProductBrandFetchingSuccess
          && isProductDiscountFetchingSuccess
          && isStoreFetchingSuccess
          && isOutletFetchingSuccess
          && isProductSupplierFetchingSuccess
          && isTaxFetchingSuccess
          && isProductUnitFetchingSuccess
        ) {
          console.log('We are here! ', fetchedOutlets);
          setCategoryItems(fetchedProductCategories);
          setBrandItems(fetchedProductBrands);
          setSuppliers(fetchedProductSuppliers);
          setDiscounts(fetchedProductDiscounts);
          setTaxes(fetchedTaxes);
          setStoreData(fetchedStores);
          setOutletData(fetchedOutlets);
          setUnits(fetchedProductUnits);
          console.log('brands: ', brandItems);
          console.log('suppliers: ', suppliers);
          console.log('storeData: ', storeData);
          console.log('outletData: ', outletData);
        }

        if (
          isProductCategoryFetchingError
          || isProductBrandFetchingError
          || isProductDiscountFetchingError
          || isStoreFetchingError
          || isOutletFetchingError
          || isProductSupplierFetchingError
          || isTaxFetchingError
          || isProductUnitFetchingError
        ) {
          console.log('productCategoryError', productCategoryError);
          throw productCategoryError;
        }
      } catch (error) {
        console.log('An error occurred!', error);
      }
    }

    loadData();
  }, [
    isProductCategoryFetching,
    isProductBrandFetching,
    isProductDiscountFetching,
    isStoreFetching,
    isOutletFetching,
    isProductSupplierFetching,
    isTaxFetching,
    isProductUnitFetching,
  ]);

  // Select Modal functions
  const openSelectOutletModal = () => {
    selectOutletModalRef.current?.openModal();
  };

  const closeSelectOutlet = () => {
    selectOutletModalRef.current?.closeModal();
  };

  // Select Change Handler
  const handleSelectChange = (value: string) => {
    setIsOutletSelectOpen(false);
    if (value === 'All Outlets') {
      setAllOutlets(true);
      handleOutletSelectBlur();
      return;
    }

    if (value === 'Custom Outlets') {
      setAllOutlets(false);
      openSelectOutletModal();
      handleOutletSelectBlur();
      return;
    }
  };

  const handleTagsChange = (value: string[]) => {
    setTags(value);
  };

  const addNewCategory = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsCategorySelectOpen(false);
    setCreatedNewCategory(false);
    openAddCategoryModal();
    handleCategoryBlur();
  };

  const addNewSupplier = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSupplierSelectOpen(false);
    setCreatedNewSupplier(false);
    openAddSupplierModal();
    handleSupplierBlur();
  };

  const addNewDiscount = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openDiscountModal();
  };

  const addNewTax = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openTaxModal();
  };

  return (
    <Fragment>
      <CustomModal
        ref={selectOutletModalRef}
        width={'800px'}
        content={
          <SelectOutlet
            allOutlets={allOutlets}
            setAllOutlets={setAllOutlets}
            setOutletsIds={(value: number[] | null) => setOutletsIds(value ?? [])}
            setOutlets={setOutlets}
            closeSelectOutlet={closeSelectOutlet}
            trackInventory={inventoryTracking}
            removeOutletModalPrice={removeOutletModalPrice}
          />
        }
      />

      {loading && <div className="loading">Loading...</div>}

      <CustomModal
        ref={discountModalRef}
        width={'700px'}
        content={<AddDiscountForm closeDiscountModal={closeDiscountModal} />}
      />

      <CustomModal
        ref={taxModalRef}
        width={'700px'}
        content={<AddTaxForm closeTaxModal={closeTaxModal} />}
      />

      <CustomModal
        ref={addCategoryModalRef}
        width={'400px'}
        content={<AddCategoryForm
          closeAddCategoryModal={closeAddCategoryModal}
          categoryName={categorySearchTerm}
          setCreatedNewCategory={setCreatedNewCategory}
        />}
      />

      <CustomModal
        ref={addSupplierModalRef}
        width={'800px'}
        content={<AddSupplierForm
          closeAddSupplierModal={closeAddSupplierModal}
          setCreatedNewSupplier={setCreatedNewSupplier}
        />}
      />

      <div className="page-wrapper" style={{ background: '#F6F9FE', height: '100%' }}>
        <div className="content" style={{ paddingBottom: '20px' }}>
          <Form
            form={form}
            onFinish={onFinish}
          >
            <div className="page-header">
              <div className="add-item d-flex">
                <div className="page-title">
                  <h4>New Product</h4>
                  <h6>Create new product</h6>
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
                      style={{ padding: '16px' }}
                      type="primary"
                      htmlType="submit"
                      loading={isProductCreationLoading}
                    >
                      Save
                    </Button>
                  </div>
                </li>
              </ul>
            </div>

            <div
              className="_card"
              style={{ border: 'none', borderRadius: '20px', boxShadow: '0px 4px 4px 0px #173F7733' }}
            >
              <div className="card-body">
                <div className="accordion-card-one accordion" id="accordionExample">
                  <div className="accordion-item">
                    <div className="accordion-header" id="headingOne">
                      <div
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-controls="collapseOne"
                      >
                        <h5>
                          <span>Product Information</span>
                        </h5>
                      </div>
                    </div>
                    <Row gutter={40}>
                      {/* Product Name */}
                      <Col xs={24} md={12}>
                        <FormItem>
                          <label style={{ padding: '5px 0 10px 20px' }}>
                            Product Name <span style={{ color: 'red' }}>*</span>
                          </label>
                          <FormItem
                            name="productName"
                            noStyle
                            rules={[{
                              required: true,
                              message: 'Product name is required'
                            }]}
                          >
                            <Input
                              type="text"
                              value={productName}
                              onChange={(e) => setProductName(e.target.value)}
                              placeholder="Enter product name"
                              style={{ padding: '16px' }}
                            />
                          </FormItem>
                        </FormItem>
                      </Col>

                      {/* SKU */}
                      <Col xs={24} md={12}>
                        <FormItem>
                          <label style={{ padding: '5px 0 10px 20px' }}>
                            SKU
                          </label>
                          <FormItem
                            name="sku"
                            noStyle
                          >
                            <Input
                              type="text"
                              value={productSKU}
                              // disabled
                              placeholder="SKU"
                              style={{ padding: '16px' }}
                            />
                          </FormItem>
                          <p style={{ padding: '4px 0 10px 20px', fontSize: '12px', color: '#868B90' }}>
                            Automatically generated if not entered
                          </p>
                        </FormItem>
                      </Col>

                      {/* Category */}
                      <Col xs={24} md={12}>
                        <FormItem>
                          <label style={{ padding: '5px 0 10px 20px' }}>
                            Category <span style={{ color: 'red' }}>*</span>
                          </label>
                          <FormItem
                            name="productCategoryId"
                            noStyle
                            rules={[{
                              required: true,
                              message: 'Category is required'
                            }]}
                          >
                            <Select
                              ref={categorySelectRef}
                              style={{ height: 56.5 }}
                              placeholder="Select a category"
                              transitionName=""
                              dropdownStyle={{ animation: 'none !important' }}
                              // value={productCategoryId}
                              onChange={(value) => setProductCategoryId(value)}
                              optionFilterProp="label"
                              onSelect={handleCategoryBlur}
                              options={filteredCategoryList}
                              open={isCategorySelectOpen}
                              onDropdownVisibleChange={(open) => setIsCategorySelectOpen(open)}
                              dropdownRender={(menu) => (
                                <div style={{ padding: '5px' }}>
                                  <Input
                                    type="text"
                                    placeholder="Search"
                                    style={{ padding: '10px' }}
                                    value={categorySearchTerm}
                                    onInput={handleCategorySearch}
                                  />
                                  {menu}
                                  {categorySearchTerm ? (
                                    <Button
                                      type="text"
                                      icon={<PlusOutlined />}
                                      style={{ color: '#2D7DEE', margin: '10px 0' }}
                                      onClick={addNewCategory}
                                    >
                                      Add "{categorySearchTerm}" as new category
                                    </Button>
                                  ) : ("")}
                                </div>
                              )}
                              notFoundContent={
                                categorySearchTerm ? (
                                  <div style={{ textAlign: 'center', margin: '5px' }} >
                                    <div>No results match "{categorySearchTerm}"</div>
                                  </div>
                                ) : (
                                  <div style={{ textAlign: 'center', margin: '5px' }} >
                                    <div>No data</div>
                                  </div>
                                )
                              }
                            />
                          </FormItem>
                        </FormItem>
                      </Col>

                      {/* Brand */}
                      <Col xs={24} md={12}>
                        <FormItem>
                          <label style={{ padding: '5px 0 10px 20px' }}>Brand</label>
                          <FormItem name="brandId" noStyle>
                            <Select
                              placeholder="Pick brand"
                              style={{ height: 56.5 }}
                              onChange={(value) => setBrandId(value)}
                            >
                              {brandItems.map((brandItem: ProductBrandT) => (
                                <Option key={brandItem.id} value={brandItem.id} style={{ padding: '10px' }}>
                                  {brandItem.brandName}
                                </Option>
                              ))}
                            </Select>
                          </FormItem>
                        </FormItem>
                      </Col>

                      {/* Tags */}
                      <Col xs={24} md={12}>
                        <FormItem>
                          <label style={{ padding: '5px 0 10px 20px' }}>Tags</label>
                          <CustomTagRenderProvider plainDelete={true}>
                            <FormItem name={`tags`} noStyle>
                              {/* A Context Provider for controlling tag delete icon */}
                              <Select
                                mode="tags"
                                style={{ width: '100%', height: 56.5 }}
                                tagRender={TagRender}
                                placeholder="Tags Mode"
                                onChange={handleTagsChange}
                                options={tags.map((tag) => ({ value: tag, label: tag }))}
                              />
                            </FormItem>
                          </CustomTagRenderProvider>
                        </FormItem>
                      </Col>

                      {/* Bar Code */}
                      <Col xs={24} md={12}>
                        <FormItem>
                          <label style={{ padding: '5px 0 10px 20px' }}>Barcode</label>
                          <FormItem name="barcode" noStyle>
                            <Input
                              type="text"
                              // value={barcode}
                              // disabled
                              id="barcode"
                              placeholder="Barcode"
                              style={{ padding: '16px' }}
                            />
                          </FormItem>
                          <p style={{ padding: '4px 0 10px 20px', fontSize: '12px', color: '#868B90' }}>
                            Automatically generated if not entered
                          </p>
                        </FormItem>
                      </Col>

                      {/* Unit of Measurement */}
                      <Col xs={24} md={12}>
                        <FormItem>
                          <label style={{ padding: '5px 0 10px 20px' }}>
                            Unit of Measurement <span style={{ color: 'red' }}>*</span>
                          </label>
                          <FormItem name="unitId" noStyle>
                            <Select
                              placeholder="Select Unit"
                              style={{ height: 56.5 }}
                              onChange={(value) => setSelectedUnitId(value)}
                            >
                              {units.map((unit: UnitType) => (
                                <Option
                                  key={unit.id}
                                  value={unit.id}
                                  style={{ padding: '10px', textTransform: 'capitalize' }}
                                >
                                  {unit.unitName}
                                </Option>
                              ))}
                            </Select>
                          </FormItem>
                        </FormItem>
                      </Col>

                      {/* Suppliers */}
                      <Col xs={24} md={12}>
                        <FormItem>
                          <label style={{ padding: '5px 0 10px 20px' }}>Suppliers</label>
                          <CustomTagRenderProvider plainDelete={true}>
                            <FormItem name={`supplierId`} noStyle>
                              {/* A Context Provider for controlling tag delete icon */}
                              <Select
                                ref={supplierSelectRef}
                                mode="multiple"
                                style={{ height: 56.5 }}
                                // value={selectedSuppliers}
                                tagRender={TagRender}
                                placeholder="Select a suppliers"
                                transitionName=""
                                dropdownStyle={{ animation: 'none !important' }}
                                // onChange={(value) => setSelectedSuppliers([
                                //   ...selectedSuppliers,
                                //   value,
                                // ])}
                                // onChange={(value) => {
                                //   console.log('Value of supply is: ', value, filteredSupplierList);
                                //   form.setFieldValue('supplierId', value);
                                // }}
                                // onInput={(value) => {
                                //   console.log('Value of supply is: ', value);
                                //   form.setFieldValue('supplierId', value);
                                // }}
                                optionFilterProp="label"
                                onSelect={handleSupplierBlur}
                                options={filteredSupplierList}
                                open={isSupplierSelectOpen}
                                onDropdownVisibleChange={(open) => setIsSupplierSelectOpen(open)}
                                showSearch={false}
                                dropdownRender={(menu) => (
                                  <div style={{ padding: '5px' }}>
                                    <Input
                                      type="text"
                                      placeholder="Search"
                                      style={{ padding: '10px' }}
                                      value={supplierSearchTerm}
                                      onInput={handleSupplierSearch}
                                      onKeyDown={handleSuppliersKeyDown} // Capture keydown events
                                    />
                                    {menu}
                                    {supplierSearchTerm ? (
                                      <Button
                                        type="text"
                                        icon={<PlusOutlined />}
                                        style={{ color: '#2D7DEE', margin: '10px 0' }}
                                        onClick={addNewSupplier}
                                      >
                                        Add "{supplierSearchTerm}" as new supplier
                                      </Button>
                                    ) : ("")}
                                  </div>
                                )}
                                notFoundContent={
                                  supplierSearchTerm ? (
                                    <div style={{ textAlign: 'center', margin: '5px' }} >
                                      <div>No results match "{supplierSearchTerm}"</div>
                                    </div>
                                  ) : (
                                    <div style={{ textAlign: 'center', margin: '5px' }} >
                                      <div>No data</div>
                                    </div>
                                  )
                                }
                              />
                            </FormItem>
                          </CustomTagRenderProvider>
                        </FormItem>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={24}>
                        <FormItem>
                          <label style={{ padding: '5px 0 10px 20px' }}>Product Description</label>
                          <FormItem noStyle name={`productDescription`}>
                            <TextArea
                              rows={6}
                              maxLength={60}
                              onChange={(e) => setProductDescription(e.target.value)}
                              value={productDescription}
                            />
                          </FormItem>
                          <p style={{ padding: '4px 0 10px 20px', fontSize: '12px', color: '#868B90' }}>
                            Maximun of 60 charracters
                          </p>
                        </FormItem>
                      </Col>
                    </Row>

                    {/* <Checkbox /> <span>Product to be sold on the point of sale</span> */}
                    <Row>
                      <Col span={24}>
                        <FormItem>
                          <Space direction="horizontal" style={{ margin: '10px 0' }}>
                            <FormItem
                              name="isPointOfSale"
                              initialValue={soldOnPOS}
                              valuePropName="checked"
                              noStyle
                            >
                              <Switch
                                checkedChildren={<CheckOutlined />}
                                onChange={(value) => setSoldOnPOS(value)}
                                unCheckedChildren={<CloseOutlined />}
                              />
                            </FormItem>
                            <span>Product to be sold on the point of sale</span>
                          </Space>
                        </FormItem>
                      </Col>
                    </Row>

                    {/* Prices */}
                    <div style={{ border: '1px dashed black', padding: '10px', marginTop: '10px' }}>
                      <p style={{ fontWeight: 600, display: 'inline' }}>Prices</p>
                      <Row gutter={20} style={{ margin: '10px 0' }}>
                        <Col xs={12} md={6}>
                          <FormItem>
                            <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>
                              Cost Price <span style={{ color: 'red' }}>*</span>
                            </label>
                            <FormItem
                              name="costPrice"
                              rules={[{ required: true, message: 'Cost price is required' }]}
                              noStyle
                            >
                              <Input
                                type="text"
                                // value={costPrice}
                                onChange={handlePriceChange}
                                prefix="₦"
                                style={{ padding: '16px' }}
                              />
                            </FormItem>
                          </FormItem>
                        </Col>
                        <Col xs={12} md={6}>
                          <FormItem>
                            <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>
                              Selling Price <span style={{ color: 'red' }}>*</span>
                            </label>
                            <FormItem
                              name="sellingPrice"
                              rules={[{ required: true, message: 'Selling price is required' }]}
                              noStyle
                            >
                              <Input
                                type="text"
                                // value={sellingPrice}
                                onChange={handlePriceChange}
                                prefix="₦"
                                style={{ padding: '16px' }}
                              />
                            </FormItem>
                          </FormItem>
                        </Col>
                        <Col xs={12} md={6}>
                          <FormItem>
                            <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>Markup</label>
                            <FormItem name="markUp" noStyle>
                              <Input
                                type="text"
                                value={markUp}
                                // onChange={(e) => setMarkup(e.target.value)}
                                style={{ padding: '16px' }}
                                prefix={<Algebra />}
                              />
                            </FormItem>
                          </FormItem>
                        </Col>
                        <Col xs={12} md={6}>
                          <FormItem>
                            <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>Margin</label>
                            <FormItem name="margin" noStyle>
                              <Input
                                type="text"
                                value={margin}
                                // onChange={(e) => setMargin(Number(e.target.value))}
                                style={{ padding: '16px' }}
                                prefix={<Algebra />}
                              />
                            </FormItem>
                          </FormItem>
                        </Col>
                      </Row>
                    </div>

                    <Space direction="horizontal" style={{ margin: '20px 0' }}>
                      <FormItem
                        name="inventoryTracking"
                        noStyle
                        valuePropName="checked"
                        initialValue={inventoryTracking}
                      >
                        <Switch
                          checkedChildren={<CheckOutlined />}
                          onChange={(value) => setInventoryTracking(value)}
                          unCheckedChildren={<CloseOutlined />}
                        />
                      </FormItem>

                      <span>Track Inventory</span>
                    </Space>

                    {/* outlet */}
                    <div>
                      {inventoryTracking ? (
                        <div>
                          {/* If at least a outlet is selected; Custom outlets */}
                          {outlets.length > 0 ? (
                            <div style={{ border: '1px dashed black', padding: '10px', marginTop: '10px' }}>
                              <p style={{ fontWeight: 600, display: 'inline' }}>Outlets</p>

                              <Row gutter={20} style={{ margin: '10px 0' }} justify={'space-between'}>
                                {outlets.map((outlet, index) => (
                                  <Fragment key={outlet.outletId}>
                                    <Col xs={12} md={6}>
                                      <FormItem>
                                        <label style={{ padding: '5px 0 10px 20px', fontSize: '12px' }}>Outlet</label>
                                        {/* outletId */}
                                        <FormItem
                                          name={['finalOutlets', index, 'outletId']}
                                          initialValue={outlet.outletId}
                                          hidden
                                        >
                                          <Input
                                            type="text"
                                          />
                                        </FormItem>

                                        {/* Outlet Name */}
                                        <FormItem
                                          name={['finalOutlets', index, 'outletName']}
                                          initialValue={outlet.outletName}
                                        >
                                          <Input
                                            type="text"
                                            placeholder="Outlet Name"
                                            style={{ padding: '16px' }}
                                            readOnly
                                          />
                                        </FormItem>
                                      </FormItem>
                                    </Col>
                                    <Col xs={12} md={6}>
                                      <FormItem>
                                        <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>
                                          In Stock
                                        </label>
                                        <FormItem
                                          name={['finalOutlets', index, 'inStock']}
                                          initialValue={outlet.inStock}
                                        >
                                          <Input
                                            type="number"
                                            style={{ padding: '16px' }}
                                          />
                                        </FormItem>
                                      </FormItem>
                                    </Col>
                                    <Col xs={12} md={6}>
                                      <FormItem>
                                        <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>Low Stock Alert</label>
                                        <FormItem
                                          name={['finalOutlets', index, 'lowStockAlert']}
                                          initialValue={outlet.lowStockAlert}
                                        >
                                          <Input
                                            type="number"
                                            style={{ padding: '16px' }}
                                          />
                                        </FormItem>
                                      </FormItem>
                                    </Col>
                                    <Col xs={12} md={6}>
                                      <FormItem>
                                        <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>Price</label>
                                        <FormItem
                                          name={['finalOutlets', index, 'outletPrice']}
                                          initialValue={outlet.price}
                                        >
                                          <Input
                                            type="number"
                                            style={{ padding: '16px' }}
                                            prefix="₦"
                                          />
                                        </FormItem>
                                      </FormItem>
                                    </Col>
                                  </Fragment>
                                ))}
                              </Row>

                              <Button
                                type="text"
                                icon={<PlusOutlined />}
                                style={{ color: '#F45D01', marginBottom: '10px' }}
                                onClick={openSelectOutletModal}
                              >
                                Add item
                              </Button>
                            </div>
                          ) : (
                            <Row gutter={20} style={{ margin: '10px 0' }}>
                              <Col xs={12} md={6}>
                                <FormItem>
                                  <label style={{ padding: '5px 0 10px 20px' }}>Outlets</label>
                                  <FormItem
                                    // name={['finalOutlets', 0, 'selectType']}
                                    name={'selectType'}
                                    rules={[{
                                      required: true,
                                      message: 'Outlet is required'
                                    }]}
                                  >
                                    <Select
                                      ref={outletSelectRef}
                                      transitionName=""
                                      dropdownStyle={{ animation: 'none !important' }}
                                      optionFilterProp="label"
                                      onSelect={handleOutletSelectBlur}
                                      placeholder="Select outlet"
                                      style={{ height: 56.5 }}
                                      onChange={handleSelectChange}
                                      open={isOutletSelectOpen}
                                      onDropdownVisibleChange={
                                        (open) => setIsOutletSelectOpen(open)
                                      }
                                    >
                                      <Option value="All Outlets" style={{ padding: '12px' }}>
                                        All Outlet
                                      </Option>
                                      <Option value="Custom Outlets" style={{ padding: '12px' }}>
                                        Custom Outlet
                                      </Option>
                                    </Select>
                                  </FormItem>
                                </FormItem>
                              </Col>
                              <Col xs={12} md={6}>
                                <FormItem>
                                  <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>
                                    In Stock
                                  </label>
                                  <FormItem
                                    // name={['finalOutlets', 0, 'inStock']}
                                    name={'inStock'}
                                    rules={[{
                                      required: true,
                                      message: 'In Stock is required'
                                    }]}
                                  >
                                    <Input
                                      type="text"
                                      // onChange={(e) => { setInStock(e.target.value) }}
                                      style={{ padding: '16px' }}
                                    />
                                  </FormItem>
                                </FormItem>
                              </Col>
                              <Col xs={12} md={6}>
                                <FormItem>
                                  <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>Low Stock Alert</label>
                                  <FormItem
                                    // name={['finalOutlets', 0, 'lowStockAlert']}
                                    name={'lowStockAlert'}
                                    rules={[{
                                      required: true,
                                      message: 'Low Stock Alert is required'
                                    }]}
                                  >
                                    <Input
                                      type="text"
                                      // onChange={(e) => setLowStockAlert(e.target.value)}
                                      style={{ padding: '16px' }}
                                    />
                                  </FormItem>
                                </FormItem>
                              </Col>
                              <Col xs={12} md={6}>
                                <FormItem>
                                  <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>Price</label>
                                  <FormItem
                                    // name={['finalOutlets', 0, 'price']}
                                    name={'outletPrice'}
                                    rules={[{
                                      required: true,
                                      message: 'Price is required'
                                    }]}
                                  >
                                    <Input
                                      type="text"
                                      // onChange={(e) => setPrice(e.target.value)}
                                      style={{ padding: '16px' }}
                                      prefix="₦"
                                    />
                                  </FormItem>
                                </FormItem>
                              </Col>
                            </Row>
                          )}
                        </div>
                      ) : (
                        <div>
                          {outlets.length > 0 ? (
                            <div style={{ border: '1px dashed black', padding: '10px', marginTop: '10px' }}>
                              <p style={{ fontWeight: 600, display: 'inline' }}>Outlets</p>

                              <Row style={{ marginTop: '10px' }} justify={'space-between'}>
                                {outlets.map((outlet, index) => (
                                  <Fragment key={outlet.outletId}>
                                    <Col span={16}>
                                      <FormItem>
                                        <label style={{ padding: '5px 0 10px 20px', fontSize: '12px' }}>Outlet</label>
                                        <FormItem
                                          name={['finalOutlets', index, 'outletName']}
                                          initialValue={outlet.outletName}
                                        >
                                          <Input
                                            type="text"
                                            placeholder="Outlet Name"
                                            style={{ padding: '16px' }}
                                            readOnly
                                          />
                                        </FormItem>
                                      </FormItem>
                                    </Col>
                                    <Col span={7}>
                                      <FormItem>
                                        <label style={{ padding: '5px 0 10px 20px', fontSize: '12px' }}>Price</label>
                                        {/* outletId */}
                                        <FormItem
                                          name={['finalOutlets', index, 'outletId']}
                                          initialValue={outlet.outletId}
                                          hidden
                                        >
                                          <Input
                                            type="text"
                                          />
                                        </FormItem>

                                        {/* Outlet Name */}
                                        <FormItem
                                          name={['finalOutlets', index, 'outletPrice']}
                                          initialValue={Number(outlet.price)}
                                        >
                                          <Input
                                            type="number"
                                            prefix="₦"
                                            style={{ padding: '16px' }}
                                          // placeholder="5000"
                                          />
                                        </FormItem>
                                      </FormItem>
                                    </Col>
                                  </Fragment>
                                ))}
                              </Row>

                              <Button
                                type="text"
                                icon={<PlusOutlined />}
                                style={{ color: '#F45D01', marginBottom: '10px' }}
                                onClick={openSelectOutletModal}
                              >
                                Add item
                              </Button>
                            </div>
                          ) : (
                            <FormItem>
                              <label style={{ padding: '5px 0 10px 20px' }}>Outlets</label>
                              <FormItem name="outlet" noStyle>
                                <Select
                                  ref={outletSelectRef}
                                  transitionName=""
                                  dropdownStyle={{ animation: 'none !important' }}
                                  optionFilterProp="label"
                                  onSelect={handleOutletSelectBlur}
                                  placeholder="Select outlet"
                                  style={{ height: 56.5 }}
                                  onChange={handleSelectChange}
                                  open={isOutletSelectOpen}
                                  onDropdownVisibleChange={
                                    (open) => setIsOutletSelectOpen(open)
                                  }
                                >
                                  <Option value="All Outlets" style={{ padding: '12px' }}>
                                    All Outlet
                                  </Option>
                                  <Option value="Custom Outlets" style={{ padding: '12px' }} >
                                    Custom Outlet
                                  </Option>
                                </Select>
                              </FormItem>
                            </FormItem>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Add Image */}
                    <div style={{ margin: '10px 0' }}>
                      <p style={{ fontWeight: 600, padding: '10px 0' }}>Add Image</p>

                      <FormItem
                        name={`productImages`}
                        valuePropName='fileList'
                        getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                      >
                        {/* <FormItem name={`productImages`}> */}
                        <Upload
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={true}
                          beforeUpload={beforeUpload}
                          onChange={handleImageChange}
                          style={{ width: '200px' }}
                        >
                          {uploadButton}
                        </Upload>
                      </FormItem>

                      <div style={{ padding: '10px 0' }}>
                        <FormItem
                          name={'hasExpiryDate'}
                          valuePropName='checked'
                          noStyle
                          initialValue={hasExpiryDate}
                        >
                          <Checkbox
                            onClick={() => setHasExpiryDate(!hasExpiryDate)}
                          />
                        </FormItem>
                        {' '}
                        <span style={{ marginLeft: '10px' }}>Does this item have an expiry date</span>
                      </div>

                      {hasExpiryDate && (
                        <div style={{ border: '1px dashed black', padding: '10px', marginTop: '10px', marginBottom: '20px' }}>
                          <p style={{ fontWeight: 600, display: 'inline' }}>Expiry Date</p>
                          <Row gutter={20} style={{ margin: '10px 0' }}>
                            <Col xs={24} md={8}>
                              <FormItem>
                                <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>Day</label>
                                <FormItem name={`expiryDay`} noStyle>
                                  <Input
                                    type="text"
                                    value={expiryDay}
                                    onChange={(e) => setExpiryDay(e.target.value)}
                                    style={{ padding: '16px' }}
                                  />
                                  {/*<DatePicker format="DD" placeholder="Select Day" />*/}
                                </FormItem>
                              </FormItem>
                            </Col>
                            <Col xs={24} md={8}>
                              <FormItem>
                                <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>Month</label>
                                <FormItem name={`expiryMonth`} noStyle>
                                  <Input
                                    type="text"
                                    value={expiryMonth}
                                    onChange={(e) => setExpiryMonth(e.target.value)}
                                    style={{ padding: '16px' }}
                                  />
                                  {/*<DatePicker format="MM" placeholder="Select Day" picker="month" />*/}
                                </FormItem>
                              </FormItem>
                            </Col>
                            <Col xs={24} md={8}>
                              <FormItem>
                                <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>Year</label>
                                <FormItem name={`expiryYear`} noStyle>
                                  <Input
                                    type="text"
                                    value={expiryYear}
                                    onChange={(e) => setExpiryYear(e.target.value)}
                                    style={{ padding: '16px' }}
                                  />
                                  {/*<DatePicker placeholder="Select Day" picker="year" />*/}
                                </FormItem>
                              </FormItem>
                            </Col>
                          </Row>
                        </div>
                      )}

                      <div style={{ padding: '10px 0' }}>
                        <FormItem
                          name={'applyAllDiscount'}
                          valuePropName='checked'
                          noStyle
                        >
                          <Checkbox
                            // value={applyAllDiscount}
                            onChange={() => setApplyAllDiscount(!applyAllDiscount)}
                          />
                        </FormItem>
                        {' '}
                        <span style={{ marginLeft: '10px' }}>Apply discounts on this item</span>
                      </div>

                      {applyAllDiscount && (
                        <div style={{ border: '1px dashed black', padding: '10px', marginTop: '10px', marginBottom: '20px' }}>
                          <p style={{ fontWeight: 600, display: 'inline' }}>Discount</p>
                          <Row style={{ margin: '10px 0' }}>
                            <Col span={24}>
                              <FormItem>
                                <label style={{ padding: '5px 0 10px 20px' }}>Type</label>
                                <FormItem name={`discountId`} noStyle>
                                  <Select
                                    placeholder="Pick brand"
                                    style={{ height: 56.5 }}
                                    onChange={(value) => setSelectedDiscountId(value)}
                                  >
                                    {discounts.map((discount: DiscountT) => (
                                      <Option key={discount.id} value={discount.id} style={{ padding: '10px' }}>
                                        {discount.discountName}
                                      </Option>
                                    ))}
                                  </Select>
                                </FormItem>

                                <Button
                                  type="text"
                                  icon={<PlusOutlined />}
                                  style={{ color: '#F45D01', margin: '20px 0 0' }}
                                  onClick={addNewDiscount}
                                >
                                  Add Discount
                                </Button>
                              </FormItem>
                            </Col>
                          </Row>
                        </div>
                      )}

                      <div style={{ padding: '10px 0' }}>
                        <FormItem
                          name={'isTaxable'}
                          valuePropName='checked'
                          noStyle
                        >
                          <Checkbox
                            // value={isTaxable}
                            onChange={() => setIsTaxable(!isTaxable)}
                          />
                        </FormItem>
                        {' '}
                        <span style={{ marginLeft: '10px' }}>This Item is Taxable</span>
                      </div>

                      {isTaxable && (
                        <div style={{ border: '1px dashed black', padding: '10px', marginTop: '10px', marginBottom: '30px' }}>
                          <p style={{ fontWeight: 600, display: 'inline' }}>Tax</p>
                          <Row style={{ margin: '10px 0' }}>
                            <Col span={24}>
                              <FormItem style={{ margin: '0 10px 0 0' }}>
                                <label style={{ padding: '5px 0 10px 20px' }}>Tax Rate</label>
                                <FormItem name={`taxId`} noStyle>
                                  <Select
                                    placeholder="Pick brand"
                                    style={{ height: 56.5 }}
                                    onChange={(value) => setSelectedTaxId(value)}
                                  >
                                    {taxes.map((tax: any) => (
                                      <Option key={tax.id} value={tax.id} style={{ padding: '10px' }}>
                                        {tax.name}
                                      </Option>
                                    ))}
                                  </Select>
                                </FormItem>

                                <Button
                                  type="text"
                                  icon={<PlusOutlined />}
                                  style={{ color: '#F45D01', margin: '20px 0 0' }}
                                  onClick={addNewTax}
                                >
                                  Add Tax Rate
                                </Button>
                              </FormItem>
                            </Col>
                          </Row>
                        </div>
                      )}

                      {/* Save Template */}
                      <div style={{ padding: '10px 0' }}>
                        <FormItem
                          name={'saveAsTemplate'}
                          valuePropName='checked'
                          noStyle
                          initialValue={saveAsTemplate}
                        >
                          <Checkbox
                            // value={saveAsTemplate}
                            onChange={() => setSaveAsTemplate(!saveAsTemplate)}
                          />
                        </FormItem>
                        {' '}
                        <span style={{ marginLeft: '10px' }}>Save this item as a template</span>
                      </div>

                      {saveAsTemplate && (
                        <Row style={{ margin: '10px 0' }}>
                          <Col span={24}>
                            <FormItem>
                              <label style={{ padding: '5px 0 10px 20px' }}>Note</label>
                              <FormItem noStyle name={`templateNote`}>
                                <TextArea
                                  rows={3}
                                  maxLength={60}
                                />
                              </FormItem>
                              <p style={{ padding: '4px 0 10px 20px', fontSize: '12px', color: '#868B90' }}>
                                Add a note to describe this template
                              </p>
                            </FormItem>
                          </Col>
                        </Row>
                      )}
                    </div>

                    {/* Buttons */}
                    {/* <div style={{ padding: '10px 0' }}>
                    <Row style={{ margin: '10px 0' }}>
                      <Col xs={24} md={8}>
                        <Row style={{ margin: '10px 0' }} gutter={20}>
                          <Col span={12} style={{ paddingLeft: '0' }}>
                            <Button style={{ height: 56.5, width: '100%' }}>Save Template</Button>
                          </Col>
                          <Col span={12}>
                            <Button
                              style={{ marginLeft: '10px', height: 56.5, width: '100%' }}
                              type="primary"
                              htmlType="submit"
                              loading={isProductCreationLoading}
                            >
                              Proceed
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddStandardProduct;
