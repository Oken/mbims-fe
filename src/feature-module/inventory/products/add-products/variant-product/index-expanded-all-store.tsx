import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Col,
  Form,
  Input,
  Table,
  Row,
  Select,
  Checkbox,
  Button,
  Space,
  Switch,
  Upload,
  GetProp,
  UploadProps,
  message,
  SelectProps,
  InputRef,
  RefSelectProps,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  CheckOutlined,
  CloseOutlined,
  LoadingOutlined,
  FileImageOutlined,
  PlusOutlined
} from '@ant-design/icons';
import './styles.scss';
import { Fragment, MouseEvent, useRef, useState, useEffect } from 'react';
import CustomModal, { CustomModalRef } from './modal';

import SelectStore from '../../../components/button/forms/select-outlet.tsx';
import AddCategoryForm from '../../../components/button/forms/add-category';
import AddDiscountForm from '../../../components/button/forms/add-discount';
import AddTaxForm from '../../../components/button/forms/add-tax';
import AddVariant from '../../../components/button/forms/add-variant';
import EditVariant from '../../../components/button/forms/edit-variant.tsx';

import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useSKUBarcodeGenerator } from '../../../../hooks/useSKUBarcodeGenerator';
import { useExpiryDate } from '../../../../hooks/useExpiryDate';
import Algebra from '../../../../style/icons/site-icons-component/algebra.tsx';

import {
  // Queries
  useGetProductsQuery,
  useGetProductCategoriesQuery,
  useGetProductBrandsQuery,
  useGetProductDiscountsQuery,
  useGetStoresQuery,
  useGetProductSuppliersQuery,
  useGetTaxesQuery,
  useGetProductUnitsQuery,

  // Mutations
  useAddNewProductMutation,
  useAddNewStoreMutation,
  useAddNewProductDiscountMutation,
  useAddNewTaxMutation,

  // Selectors
  selectAllCategories,
  selectCategoryById,
  selectAllBrands,
  selectAllDiscounts,
  selectAllStores,
  selectAllSuppliers,
  selectAllTaxes,
  selectAllUnits,
} from '../../../../store/feature-slice/products';
import {
  DiscountT,
  ProductBrandT,
  ProductCategoryT,
  SupplierT,
  TaxesT,
  UnitType,
  FilteredListT,
  CustomStoreFormDataT,
} from '../../../../types/product-types';

import { useImageUpload } from '../../../../hooks/useUploadImage';
import useFormItemStatus from 'antd/es/form/hooks/useFormItemStatus';

const { Item: FormItem } = Form;
const { TextArea } = Input;
const Option = Select.Option;

const uploadButton = (
  <button
    style={{ border: 0, background: 'none', width: '100%', height: '100%', position: 'relative' }}
    type="button"
  >
    {/* <FileImageOutlined /> */}
    {/* {loading ? <LoadingOutlined /> : <FileImageOutlined />} */}

    <span style={{ position: 'absolute', top: '25%', right: '50%', transform: 'translate(50%, 0)' }}>
      <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.33333 48C3.86667 48 2.61156 47.4782 1.568 46.4347C0.524445 45.3911 0.00177778 44.1351 0 42.6667V5.33333C0 3.86667 0.522667 2.61156 1.568 1.568C2.61333 0.524445 3.86844 0.00177778 5.33333 0H42.6667C44.1333 0 45.3893 0.522667 46.4347 1.568C47.48 2.61333 48.0018 3.86844 48 5.33333V42.6667C48 44.1333 47.4782 45.3893 46.4347 46.4347C45.3911 47.48 44.1351 48.0018 42.6667 48H5.33333ZM5.33333 42.6667H42.6667V5.33333H5.33333V42.6667ZM8 37.3333H40L30 24L22 34.6667L16 26.6667L8 37.3333Z"
          fill="#0D1821"
          fillOpacity="0.3"
        />
      </svg>
    </span>

    <p
      style={{
        position: 'absolute',
        bottom: '0',
        left: 0,
        right: 0,
        padding: '5px',
        fontSize: '12px',
        background: '#173F77',
        color: '#D5E5FC',
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px',
      }}
    >
      Choose Image
    </p>
  </button>
);

// Types
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

// Get the base 64 of the image
const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

// Upload the image
const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('Image must smaller than 5MB!');
  }
  return isJpgOrPng && isLt2M;
};

// data
const tagsOptions: SelectProps['options'] = [];

for (let i = 1; i < 5; i++) {
  tagsOptions.push({
    value: 'tag ' + i,
    label: 'tag ' + i,
  });
}

const AddVariantProduct = () => {
  const navigate = useNavigate();

  // Modal Eeferences
  const selectStoreModalRef = useRef<CustomModalRef>(null);
  const addVariantModalRef = useRef<CustomModalRef>(null);
  const editVariantModalRef = useRef<CustomModalRef>(null);
  const categoryModalRef = useRef<CustomModalRef>(null);
  const discountModalRef = useRef<CustomModalRef>(null);
  const taxModalRef = useRef<CustomModalRef>(null);

  const [loading, setLoading] = useState(false);
  const [expiryItem, setExpiryItem] = useState(false);

  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);

  const [trackInventory, setTrackInventory] = useState(false);

  const handleTrackInventory = (checked: boolean) => {
    if (checked) {
      setTrackInventory(true);
    } else {
      setTrackInventory(false);
    }
  }

  const selectRef = useRef<RefSelectProps>(null);
  const storeSelectRef = useRef<RefSelectProps>(null);

  const handleBlur = () => {
    if (selectRef.current) {
      selectRef.current.blur();
      selectRef.current.focus();
    }
  }

  const handleStoreSelectBlur = () => {
    if (storeSelectRef.current) {
      storeSelectRef.current.blur();
      storeSelectRef.current.focus();
    }
  }

  // Stores
  const [storeData, setStoreData] = useState<any[]>([]); // Fetched data
  const [
    stores,
    setStores,
  ] = useState<CustomStoreFormDataT[]>([]); // From select store modal

  const [storesIds, setStoresIds] = useState<number[]>([]); // From select store modal
  const [variantInStores, setVariantInStores] = useState<any[]>([]);
  const [brandItems, setBrandItems] = useState<ProductBrandT[]>([]);
  const [units, setUnits] = useState<UnitType[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierT[]>([]);

  // Categories, Brands, Suppliers, Discounts, and Taxes
  const [categoryItems, setCategoryItems] = useState<ProductCategoryT[]>([]);
  const [createdNewCategory, setCreatedNewCategory] = useState<boolean>(false);
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [
    filteredCategoryList,
    setFilteredCategoryList
  ] = useState<FilteredListT[]>([]);
  const [isCategorySelectOpen, setIsCategorySelectOpen] = useState(false);
  const [isStoreSelectOpen, setIsStoreSelectOpen] = useState(false);
  const [discounts, setDiscounts] = useState<DiscountT[]>([]);
  const [taxes, setTaxes] = useState<TaxesT[]>([]);
  const [expiryDay, setExpiryDay] = useState<string>('');
  const [expiryMonth, setExpiryMonth] = useState<string>('');
  const [expiryYear, setExpiryYear] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>();
  const [soldOnPOS, setSoldOnPOS] = useState<boolean>(true);

  // Product Info States
  const [productName, setProductName] = useState<string>('');
  // const [productSKU, setProductSKU] = useState<string>('');
  // const [barcode, setBarcode] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [sellingPrice, setSellingPrice] = useState<number>(0);
  const [costPrice, setCostPrice] = useState<number>(0);
  // const [, setExpiryDate] = useState<string>('');
  const [productCategoryId, setProductCategoryId] = useState<number>(0);
  const [brandId, setBrandId] = useState<number | null>(null);
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);
  const [selectTaxId, setSelectedTaxId] = useState<number | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  // const [imageUrl, setImageUrl] = useState<string>();
  const [inventoryTracking, setInventoryTracking] = useState<boolean>(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);

  const [allStores, setAllStores] = useState<boolean>(false);
  const [isCustomStore, setIsCustomStore] = useState<boolean>(false);
  const [price, setPrice] = useState<string>('');
  const [inStock, setInStock] = useState<string>('');
  const [lowStockAlert, setLowStockAlert] = useState<string>('');
  const [selectDiscountId, setSelectedDiscountId] = useState<number | null>(null);

  const { productSKU, barcode } = useSKUBarcodeGenerator(productName, productCategoryId, categoryItems);
  const [imageList, setImageList] = useState([]);
  // const { imageUrl, handleImageChange } = useImageUpload();

  const { expiryDate, updateExpiryComponent } = useExpiryDate();

  // temp states
  const [markUp, setMarkUp] = useState<string>('');
  const [margin, setMargin] = useState<number>(0);
  const [hasExpiryDate, setHasExpiryDate] = useState<boolean>(false);
  const [applyAllDiscount, setApplyAllDiscount] = useState<boolean>(false);
  const [isTaxable, setIsTaxable] = useState<boolean>(false);
  const [variantAttributes, setVariantAttributes] = useState<attributes[]>([])
  const [concatVariants, setConcatVariants] = useState<string[]>([]);
  const [variantProducts, setVariantProducts] = useState<any[]>([]);

  // Remove price from custom stores for variant products
  const [removeStoreModalPrice, _setRemoveStoreModalPrice] = useState<boolean>(true);

  type attributes = {
    attributeId: number,
    value: string,
  }

  const variantsArr = [{
    productId: 0,
    sku: productSKU,
    barcode,
    enabled: true,
    costPrice: 0,
    sellingPrice: 0,
    inventoryTracking: true,
    // attributes,
    storeIds: 0
  }]

  const handleImageChange = (info) => {
    console.log('File ListL: ', info.fileList);
    setImageList(info.fileList);
  }

  const [form] = Form.useForm();

  const [addNewProduct, {
    isLoading: isProductCreationLoading,
    isError: isProductCreationError,
    isSuccess: isProductCreationSuccess,
    error: productCreationError,
  }] = useAddNewProductMutation();

  const onFinish = async (values: any) => {
    try {
      // Create a new FormData instance
      let data = new FormData();

      // Append the product data as a JSON string
      const productData = {
        productName: values.productName,
        sku: values.sku,
        sellingType: 'retail',
        barcode: values.barcode,
        productDescription: values.productDescription,
        composite: false,
        quantityOnHand: 50,
        sellingPrice: values.sellingPrice,
        costPrice: values.costPrice,
        quantityAlert: 20,
        type: 'VARIANT',
        productCategoryId: values.productCategoryId,
        subCategoryId: 1,
        brandId: values.brandId,
        unitId: values.unitId,
        tags: values.tags || [],
        enabled: values.isPointOfSale,
        inventoryTracking: values.inventoryTracking || true,
        storeIds: storesIds || [],
        ...(!allStores && { storeIds: storesIds || [] }),
        addToAllStores: allStores || values.store === 'allStore' || false,
        discountId: (applyAllDiscount && values.discountId) ? values.discountId : null,
        taxId: (isTaxable && values.taxId) ? values.taxId : null,
        expiryDate: (hasExpiryDate && expiryDate) ? expiryDate : null,
        // componentProducts: values.componentProducts || [],
      };

      data.append('product', JSON.stringify(productData));

      // If there is an image, append it to FormData
      if (imageUrl) {
        data.append('productImages', imageUrl);
      }

      console.log('productData: ', productData);
      console.log('data: ', data);

      const resProduct = await addNewProduct(data);

      // Configure axios request
      // const config = {
      //   method: 'post',
      //   url: `${serverUrl}/products`,
      //   // headers: {
      //   //   ...data.getHeaders(), // This helps axios set the proper headers for multipart form data
      //   // },
      //   data: data,
      // };

      // Make the API request
      // const response = await axios.request(config);

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
      }
    }

    productCreated();
  }, [isProductCreationLoading]);

  const openCategoryModal = () => {
    categoryModalRef.current?.openModal();
  };

  const closeCategoryModal = () => {
    categoryModalRef.current?.closeModal();
  };

  const handleCategorySearch = (e: any) => {
    const event = e.target as HTMLInputElement
    const val = event.value;
    setCategorySearchTerm(event.value);

    if (val == '') return;

    const filtered = categoryItems.filter(
      option => option.productCategoryName.toLowerCase().startsWith(val.toLowerCase())
    )

    const filteredCategoryList = filtered.map((item: ProductCategoryT) => ({
      value: item.id,
      label: item.productCategoryName,
    }));

    setFilteredCategoryList(filteredCategoryList);
  }

  // Add discount
  const openDiscountModal = () => {
    discountModalRef.current?.openModal();
  };

  const openAddVariantModal = () => {
    addVariantModalRef.current?.openModal();
  };

  const closeVariantModal = () => {
    addVariantModalRef.current?.closeModal();
  };

  const openEditVariantModal = () => {
    editVariantModalRef.current?.openModal();
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
  }

  const handlePriceChange = () => {
    const { costPrice, sellingPrice } = form.getFieldsValue(['costPrice', 'sellingPrice']);

    if (costPrice && sellingPrice) {
      const markup = ((sellingPrice - costPrice) / costPrice) * 100;
      const margin = ((sellingPrice - costPrice) / sellingPrice) * 100;

      form.setFieldsValue({
        markUp: markup.toFixed(2), // Limit to 2 decimal places
        margin: margin.toFixed(2),
      });
    }
  };

  // Expiry Date Calculation
  useEffect(() => {
    updateExpiryComponent('expiryDay', `${expiryDay}`);
    updateExpiryComponent('expiryMonth', `${expiryMonth}`);
    updateExpiryComponent('expiryYear', `${expiryYear}`);
  }, [expiryDay, expiryMonth, expiryYear]);

  const {
    data: categoryData,
    error: productCategoryError,
    isError: isProductCategoryFetchingError,
    isSuccess: isProductCategoryFetchingSuccess,
    isLoading: isProductCategoryFetching,
    refetch: refetchProductCategories,
  } = useGetProductCategoriesQuery([]);
  const fetchedProductCategories = useSelector(selectAllCategories);

  const productCategory = useSelector((state) => {
    return selectCategoryById(state, 1);
  });
  console.log('categoryData: ', categoryData);
  console.log('RTK categories: ', fetchedProductCategories, '\nSingle category', productCategory);

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
    isError: isProductSupplierFetchingError,
    isSuccess: isProductSupplierFetchingSuccess,
    isLoading: isProductSupplierFetching,
  } = useGetProductSuppliersQuery([]);
  const fetchedProductSuppliers = useSelector(selectAllSuppliers);

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
          && isProductSupplierFetchingSuccess
          && isTaxFetchingSuccess
          && isProductUnitFetchingSuccess
        ) {
          console.log('We are here!');
          setCategoryItems(fetchedProductCategories);
          setBrandItems(fetchedProductBrands);
          setSuppliers(fetchedProductSuppliers);
          setDiscounts(fetchedProductDiscounts);
          setTaxes(fetchedTaxes);
          setStoreData(fetchedStores);
          setUnits(fetchedProductUnits);
        }

        if (
          isProductCategoryFetchingError
          || isProductBrandFetchingError
          || isProductDiscountFetchingError
          || isStoreFetchingError
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
    isProductSupplierFetching,
    isTaxFetching,
    isProductUnitFetching,
  ]);

  // Select Modal functions
  const openSelectStoreModal = () => {
    selectStoreModalRef.current?.openModal();
  };

  const closeSelectStore = () => {
    selectStoreModalRef.current?.closeModal();
  };

  // Select Change Handler
  const handleSelectChange = (value: string) => {
    setIsStoreSelectOpen(false);
    if (value === 'All Store') {
      setIsCustomStore(false);
      setAllStores(true);
      handleStoreSelectBlur();
      console.log('variantProducts: ', variantProducts);

      // const variantInStores: any[] = []
      // storeData.forEach((store, key) => {
      //   for (let item of variantProducts as any) {
      //     variantInStores.push({...item, storeId: store.id, storeName: store.storeName});
      //   }
      // });

      // console.log('variantInStores in All Store: ', variantInStores);

      // setVariantInStores(variantInStores);
      return;
    }

    if (value === 'Custom Store') {
      setAllStores(false);
      openSelectStoreModal();
      handleStoreSelectBlur();
      setIsCustomStore(true)
      return;
    }
  };

  useEffect(() => {
    if (isCustomStore) {
      const variantInStores: any[] = []

      stores.forEach((store, key) => {
        for (let item of variantProducts as any) {
          variantInStores.push({ ...item, storeId: store.storeId, storeName: store.storeName });
        }
      });

      console.log('variantInStores in Custom: ', variantInStores, stores);

      setVariantInStores(variantInStores);
    } else {
      const variantInStores: any[] = []
      storeData.forEach((store, key) => {
        for (let item of variantProducts as any) {
          variantInStores.push({ ...item, storeId: store.id, storeName: store.storeName });
        }
      });

      console.log('variantInStores in All Store: ', variantInStores);

      setVariantInStores(variantInStores);
    }
  }, [
    stores,
    isCustomStore,
    allStores
  ])

  const handleTagsChange = (value: string[]) => {
    setTags(value);
  };

  const addNewCategory = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsCategorySelectOpen(false);
    openCategoryModal();
    handleBlur();
  };

  const addNewDiscount = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openDiscountModal();
  };

  const addNewTax = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openTaxModal();
  };

  // Handles deletion of variants form variant table
  const deleteVariantItem = (variantItem: string) => {
    console.log('variantItem: ', variantItem);
    const afterDeletion = concatVariants.filter((variant: string, index: number) => {
      return variantItem !== variant;
    });

    console.log('afterDeletion: ', afterDeletion);

    setConcatVariants(afterDeletion);

    console.log('concatVariants: ', concatVariants);
  }

  // Handles deletion of variants attached to a store Already
  const deleteVariantStore = (variantStoreId: number) => {
    console.log('variantStoreId: ', variantStoreId, 'variantInStores: ', variantInStores);

    const afterDeletion = variantInStores.filter((variantInStore: any, index: number) => {
      return variantInStore.storeId !== variantStoreId;
    });

    console.log('afterDeletion: ', afterDeletion);

    setVariantInStores(afterDeletion);
    console.log('variantInStores after deletion: ', variantInStores);
  }

  // Handle variant products form
  const handleVariantForm = (_changedValues, allValues) => {
    console.log('allValues.variantProducts: ', allValues.variantProducts);
    setVariantProducts(allValues.variantProducts);
  }

  // Variant list table
  const variantColumns: ColumnsType<string> = [
    {
      title: 'Variant',
      dataIndex: 'variant',
      render: (_, variant, index) => (
        <Fragment key={index}>
          <span className="productimgname">
            {variant}
          </span>
          <FormItem
            name={['variantProducts', index, 'type']}
            noStyle
            initialValue={variant}
          >
            <Input type="text" hidden style={{ padding: '16px' }} />
          </FormItem>
        </Fragment>
      ),
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      render: (_, _variant, index) => (
        <Fragment key={index}>
          <FormItem
            name={['variantProducts', index, 'sku']}
            noStyle
          >
            <Input type="number" style={{ padding: '16px' }} />
          </FormItem>
        </Fragment>
      ),
    },
    {
      title: 'Cost Price',
      dataIndex: 'costPrice',
      render: (_, _variant, index) => (
        <Fragment key={index}>
          <FormItem
            name={['variantProducts', index, 'costPrice']}
            noStyle
          >
            <Input type="number" prefix="₦" style={{ padding: '16px' }} />
          </FormItem>
        </Fragment>
      ),
    },
    {
      title: 'Selling Price',
      dataIndex: 'sellingPrice',
      render: (_, _variant, index) => (
        <Fragment key={index}>
          <FormItem
            name={['variantProducts', index, 'sellingPrice']}
            noStyle
          >
            <Input type="number" prefix="₦" style={{ padding: '16px' }} />
          </FormItem>
        </Fragment>
      ),
    },
    // Add In Stock; if inventory tracking is enabled
    ...(inventoryTracking? [
      {
        title: 'In Stock',
        dataIndex: 'inStock',
        render: (_: any, _variant: string, index: number) => (
          <Fragment key={index}>
            <FormItem
              name={['variantProducts', index, 'inStock']}
              noStyle
            >
              <Input type="number" style={{ padding: '16px' }} />
            </FormItem>
          </Fragment>
        ),
      },
    ] : []),
    // Add Low Stock if inventory tracking is enabled
    ...(inventoryTracking ? [
      {
        title: 'Low Stock',
        dataIndex: 'lowStock',
        render: (_: any, _variant: string, index: number) => (
          <Fragment key={index}>
            <FormItem
              name={['variantProducts', index, 'lowStock']}
              noStyle
            >
              <Input type="number" style={{ padding: '16px' }} />
            </FormItem>
          </Fragment>
        ),
      },
    ] : []),
    {
      title: 'Enabled',
      dataIndex: 'status',
      render: (_, _variant, index) => (
        <Space direction="horizontal" style={{ margin: '20px 0' }} key={index}>
          <>
            <FormItem
              name={['variantProducts', index, 'enabled']}
              noStyle
            >
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
              />
            </FormItem>
          </>
        </Space>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, variant, index) => (
        <div className="action-table-data" key={index}>
          <div className="edit-delete-action">
            <div className="input-block add-lists"></div>
            <Link
              className="me-2"
              style={{ border: '1px solid #173F77' }}
              to="#"
              onClick={openEditVariantModal}
            >
              <FeatherIcon icon="edit" className="feather-edit" />
            </Link>
            <Link
              className="confirm-text"
              style={{ border: '1px solid #173F77' }}
              to="#"
              onClick={() => deleteVariantItem(variant)}
            >
              <FeatherIcon icon="trash-2" className="feather-trash-2" />
            </Link>
          </div>
        </div>
      ),
    },
  ];

  type StoreDataT = {
    id: number,
    storeName: string,
    variant: string,
    price: string,
    inStock: number,
    lowStock: number,
  }

  const storeColumns: ColumnsType<StoreDataT> = [
    {
      title: 'Store',
      dataIndex: 'store',
      render: (_: string, record: StoreDataT) => <a>{record.storeName}</a>,
    },
    {
      title: 'Variant',
      dataIndex: 'variant',
      render: (_: string, record: StoreDataT) => <a>{record.variant}</a>,
    },
    {
      title: 'price',
      dataIndex: 'price',
      render: (_: string, record: StoreDataT) => (
        <Input
          type="text"
          prefix="₦"
          value=""
          style={{ padding: '10px', width: '200px' }}
        />
      ),
    },
    {
      title: 'In Stock',
      dataIndex: 'inStock',
      render: (_: string, record: StoreDataT) => (
        <Input
          type="text"
          value=""
          style={{ padding: '10px', width: '200px' }}
        />
      ),
    },
    {
      title: 'Low Stock',
      dataIndex: 'lowStock',
      render: (_: string, record: StoreDataT) => (
        <Input
          type="text"
          value=""
          style={{ padding: '10px', width: '200px' }}
        />
      ),
    },
    {
      title: '',
      dataIndex: 'action',
      render: (_: string, record: StoreDataT) => (
        <Link
          className="confirm-text"
          style={{ color: '#000' }}
          to="#"
        // onClick={() => showConfirmationAlert(product.id)}
        >
          <FeatherIcon icon="trash-2" className="feather-trash-2" />
        </Link>
      ),
      width: '40px',
    },
  ];

  // Row selection logic
  const rowSelection = {
    onChange: (selectedRowKeys: Key[]) => {
      // add selected store IDs to setStoresIds state if allStores is false
      if (!allStores) {
        setStoresIds(selectedRowKeys as number[]);
      }
    },
    getCheckboxProps: (record: StoreDataT) => ({
      name: record.storeName,
    }),
  };

  const MySwal = withReactContent(Swal);

  const showConfirmationAlert = (id: string) => {
    MySwal.fire({
      title: "<h3 style={{ color: 'black' }}>Are you sure?</h3>",
      text: 'You won’t be able to revert this action',
      showCancelButton: true,
      confirmButtonColor: '#2D7DEE',
      cancelButtonColor: '#FF3B3B',
      padding: '20px 10px',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: 'Deleted!',
          text: 'Product has been deleted.',
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
    <Fragment>
      <CustomModal
        ref={selectStoreModalRef}
        width={'800px'}
        content={
          <SelectStore
            allStores={allStores}
            setAllStores={setAllStores}
            setStoresIds={(value: number[] | null) => setStoresIds(value ?? [])}
            setStores={setStores}
            closeSelectStore={closeSelectStore}
            trackInventory={inventoryTracking}
            removeStoreModalPrice={removeStoreModalPrice}
          />
        }
      />

      <CustomModal
        ref={addVariantModalRef}
        content={<AddVariant
          closeVariantModal={closeVariantModal}
          setConcatVariants={setConcatVariants}
          concatVariants={concatVariants}
        />}
      />
      <CustomModal
        ref={editVariantModalRef}
        content={<EditVariant tracking={trackInventory} />}
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
        ref={categoryModalRef}
        width={'400px'}
        content={<AddCategoryForm
          closeCategoryModal={closeCategoryModal}
          categoryName={categorySearchTerm}
          // setProductCategoryId={setProductCategoryId}
          // selectAllCategories={selectAllCategories}
          setCreatedNewCategory={setCreatedNewCategory}
          categoryItems={categoryItems}
        />}
      />
      <div className="page-wrapper" style={{ background: '#F6F9FE', height: '100%' }}>
        <div className="content" style={{ paddingBottom: '20px' }}>
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
                  <Link
                    to={''}
                    onClick={() => navigate(-1)}
                    style={{ background: '#353F46' }}
                    className="btn m-1 btn-secondary"
                  >
                    <FeatherIcon icon="arrow-left" className="me-3" />
                    Back
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          <Form
            form={form}
            onFinish={onFinish}
            className="_card"
            onValuesChange={handleVariantForm}
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
                          SKU <span style={{ color: 'red' }}>*</span>
                        </label>
                        <FormItem
                          name="sku"
                          noStyle
                          rules={[{
                            required: true,
                            message: 'SKU is required'
                          }]}
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
                            ref={selectRef}
                            style={{ height: 56.5 }}
                            placeholder="Select a category"
                            transitionName=""
                            dropdownStyle={{ animation: 'none !important' }}
                            // value={productCategoryId}
                            // onChange={(value) => setProductCategoryId(value)}
                            optionFilterProp="label"
                            onSelect={handleBlur}
                            options={filteredCategoryList}
                            open={isCategorySelectOpen}
                            onDropdownVisibleChange={(open) => setIsCategorySelectOpen(open)}
                            dropdownRender={(menu) => (
                              <div style={{ padding: '5px' }}>
                                <Input
                                  type="text"
                                  // value={barcode}
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
                        <FormItem name={`tags`} noStyle>
                          <Select
                            mode="tags"
                            style={{ width: '100%', height: 56.5 }}
                            placeholder="Tags Mode"
                            onChange={handleTagsChange}
                            options={tags.map((tag) => ({ value: tag, label: tag }))}
                          />
                        </FormItem>
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
                        <FormItem noStyle name={`suppliers`}></FormItem>
                        <Select
                          placeholder="Select a suppliers"
                          style={{ height: 56.5 }}
                          onChange={(value) => setSelectedSupplierId(value)}
                        >
                          {suppliers.map((supplier: SupplierT) => (
                            <Option key={supplier.id} value={supplier.id} style={{ padding: '10px' }}>
                              {supplier.name}
                            </Option>
                          ))}
                        </Select>
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
                          <FormItem name="isPointOfSale" valuePropName="checked" noStyle>
                            <Switch
                              checkedChildren={<CheckOutlined />}
                              value={soldOnPOS}
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
                    <FormItem name="inventoryTracking" noStyle valuePropName="checked">
                      <Switch
                        checkedChildren={<CheckOutlined />}
                        value={inventoryTracking}
                        onChange={(value) => setInventoryTracking(value)}
                        unCheckedChildren={<CloseOutlined />}
                      />
                    </FormItem>

                    <span>Track Inventory</span>
                  </Space>

                  {/* variant */}
                  <div className="variant-form-group">
                    <div className="top-form" style={{ width: '100%', }}>
                      <p>Variants</p>
                      <Button type="text" icon={<PlusOutlined />} onClick={openAddVariantModal}>
                        Add Variants
                      </Button>
                    </div>
                    {concatVariants.length !== 0 ? (
                      <div style={{ width: '100%', overflowX: 'scroll', boxShadow: '0px 4px 4px 0px #173F7733' }}>
                        {/* <Table
                          columns={
                            inventoryTracking ?
                              variantColumns :
                              variantColumns.filter((column: any) => {
                                if (column.dataIndex === 'inStock') return false;
                                if (column.dataIndex === 'lowStock') return false;
                                return true
                              })
                          }
                          dataSource={concatVariants}
                          pagination={false}
                        /> */}
                        <Table
                          columns={variantColumns}
                          dataSource={concatVariants}
                          pagination={false}
                        />
                      </div>
                    ) : ('')}
                  </div>

                  {/* Store */}
                  <div>
                    {inventoryTracking ? (
                      <div>
                        {/* If at least a store is selected */}
                        {variantInStores.length > 0 ? (
                          <div style={{ border: '1px dashed black', padding: '10px', marginTop: '10px' }}>
                            <p style={{ fontWeight: 600, display: 'inline' }}>Stores</p>

                            <div style={{ margin: '20px 0px 30px'}}>
                              <Checkbox
                                // value={applyAllDiscount}
                                // onChange={() => setApplyAllDiscount(!applyAllDiscount)}
                                defaultChecked
                              />
                              <span style={{ marginLeft: '10px' }}>All variants are available in all stores</span>
                            </div>

                            {variantInStores.map((store, index) => (
                              <div key={store.storeId}>
                                <Row
                                  gutter={10}
                                  style={{
                                    margin: '10px 0',
                                    width: '100%',
                                    paddingRight: 5,
                                  }}
                                  justify={'space-between'}
                                  align={'middle'}
                                >
                                  <Col xs={1} md={3}>
                                    <FormItem>
                                      {index === 0? (
                                        <label style={{ width: '100%' }}>Available</label>
                                      ) : ('')}
                                      <FormItem
                                        name={['finalStores', index, 'checked']}
                                        valuePropName="checked"
                                      >
                                        <Checkbox
                                          // onClick={() => setHasExpiryDate(!hasExpiryDate)}
                                          defaultChecked
                                          style={{
                                            padding: 16
                                          }}
                                        />
                                      </FormItem>
                                    </FormItem>
                                  </Col>
                                  <Col xs={12} md={4}>
                                    <FormItem>
                                      {index === 0 ? (
                                        <label style={{ width: '100%' }}>Store</label>
                                      ) : ('')}
                                      <FormItem
                                        name={['finalStores', index, 'storeId']}
                                        initialValue={store.storeId}
                                        noStyle
                                      >
                                        {/* <Input
                                          type="text"
                                          placeholder="Store Name"
                                          style={{ padding: '16px' }}
                                          hidden
                                        /> */}
                                      </FormItem>
                                      <FormItem
                                        name={['finalStores', index, 'storeName']}
                                        initialValue={store.storeName}
                                      >
                                        <input
                                          type="text"
                                          className='transformed-input'
                                          disabled
                                        />
                                      </FormItem>
                                      {/* <p>{store.storeName}</p> */}
                                    </FormItem>
                                  </Col>
                                  <Col xs={12} md={4}>
                                    <FormItem>
                                      {index === 0 ? (
                                        <label style={{ width: '100%' }}>Variant</label>
                                      ) : ('')}
                                      <FormItem
                                        name={['finalStores', index, 'variantType']}
                                        initialValue={store.type}
                                        noStyle
                                      >
                                        {/* <Input
                                          type="text"
                                          placeholder="Store Name"
                                          style={{ padding: '16px' }}
                                          hidden
                                        /> */}
                                      </FormItem>
                                      <FormItem
                                        name={['finalStores', index, 'type']}
                                        initialValue={store.type}
                                      >
                                        <input
                                          type="text"
                                          className='transformed-input'
                                          disabled
                                        />
                                      </FormItem>
                                      {/* <p>{store.type}</p> */}
                                    </FormItem>
                                  </Col>
                                  <Col xs={12} md={4}>
                                    <FormItem>
                                      {index === 0 ? (
                                        <label style={{ width: '100%' }}>Price</label>
                                      ) : ('')}
                                      <FormItem
                                        name={['finalStores', index, 'price']}
                                        initialValue={store.sellingPrice}
                                      >
                                        <Input
                                          type="number"
                                          style={{ padding: '16px' }}
                                          prefix="₦"
                                        />
                                      </FormItem>
                                    </FormItem>
                                  </Col>
                                  <Col xs={12} md={4}>
                                    <FormItem>
                                      {index === 0 ? (
                                        <label style={{ width: '100%' }}>
                                          In Stock
                                        </label>
                                      ) : ('')}
                                      <FormItem
                                        name={['finalStores', index, 'inStock']}
                                        initialValue={store.inStock}
                                      >
                                        <Input
                                          type="number"
                                          style={{ padding: '16px' }}
                                        />
                                      </FormItem>
                                    </FormItem>
                                  </Col>
                                  <Col xs={12} md={4}>
                                    <FormItem>
                                      {index === 0 ? (
                                        <label style={{ width: '100%' }}>Low Stock</label>
                                      ) : ('')}
                                      <FormItem
                                        name={['finalStores', index, 'lowStock']}
                                        initialValue={store.lowStock}
                                      >
                                        <Input
                                          type="number"
                                          style={{ padding: '16px' }}
                                        />
                                      </FormItem>
                                    </FormItem>
                                  </Col>
                                  <Col xs={12} md={1}>
                                    <FormItem>
                                      {index === 0 ? (
                                        <label style={{ width: '100%' }}></label>
                                      ) : ('')}
                                      <FormItem
                                        name={['finalStores', index, 'price']}
                                        initialValue={store.price}
                                      >
                                        <Row justify={'end'}>
                                          <Col>
                                            <Button
                                              style={{ color: '#000', border: 'none' }}
                                              onClick={() => deleteVariantStore(store.storeId)}
                                            >
                                              <FeatherIcon icon="trash-2" className="feather-trash-2" />
                                            </Button>
                                          </Col>
                                        </Row>
                                      </FormItem>
                                    </FormItem>
                                  </Col>
                                </Row>
                              </div>
                            ))}

                            <Button
                              type="text"
                              icon={<PlusOutlined />}
                              style={{ color: '#F45D01', marginBottom: '10px' }}
                              onClick={openSelectStoreModal}
                            >
                              Add item
                            </Button>
                          </div>
                        ) : (
                          <Row gutter={20} style={{ margin: '10px 0' }}>
                            <Col xs={12} md={6}>
                              <FormItem>
                                <label style={{ padding: '5px 0 10px 20px' }}>Store</label>
                                <FormItem
                                  // name={['finalStores', 0, 'selectType']}
                                  name={'selectType'}
                                >
                                  <Select
                                    ref={storeSelectRef}
                                    transitionName=""
                                    dropdownStyle={{ animation: 'none !important' }}
                                    optionFilterProp="label"
                                    onSelect={handleStoreSelectBlur}
                                    placeholder="Select store"
                                    style={{ height: 56.5 }}
                                    onChange={handleSelectChange}
                                    open={isStoreSelectOpen}
                                    onDropdownVisibleChange={
                                      (open) => setIsStoreSelectOpen(open)
                                    }
                                  >
                                    <Option value="All Store" style={{ padding: '12px' }}>
                                      All Store
                                    </Option>
                                    <Option value="Custom Store" style={{ padding: '12px' }}>
                                      Custom Store
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
                                  // name={['finalStores', 0, 'inStock']}
                                  name={'inStock'}
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
                                  // name={['finalStores', 0, 'lowStockAlert']}
                                  name={'lowStockAlert'}
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
                                  // name={['finalStores', 0, 'price']}
                                  name={'price'}
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
                        {variantInStores.length > 0 ? (
                          <div style={{ border: '1px dashed black', padding: '10px', marginTop: '10px' }}>
                            <p style={{ fontWeight: 600, display: 'inline' }}>Stores</p>

                            <Row style={{ marginTop: '10px' }} justify={'space-between'}>
                              {variantInStores.map((store, index) => (
                                <Fragment key={store.storeId}>
                                  <Col span={16}>
                                    <FormItem>
                                      <label style={{ padding: '5px 0 10px 20px', fontSize: '12px' }}>Store</label>
                                      <FormItem
                                        name={['finalStores', index, 'storeName']}
                                        initialValue={store.storeName}
                                      >
                                        <Input
                                          type="text"
                                          placeholder="Store Name"
                                          style={{ padding: '16px' }}
                                          // disabled
                                        />
                                      </FormItem>
                                    </FormItem>
                                  </Col>
                                  <Col span={7}>
                                    <FormItem>
                                      <label style={{ padding: '5px 0 10px 20px', fontSize: '12px' }}>Price</label>
                                      <FormItem
                                        name={['finalStores', index, 'price']}
                                        initialValue={Number(store.price)}
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
                              onClick={openSelectStoreModal}
                            >
                              Add item
                            </Button>
                          </div>
                        ) : (
                          <FormItem>
                            <label style={{ padding: '5px 0 10px 20px' }}>Store</label>
                            <FormItem name="store" noStyle>
                              <Select
                                ref={storeSelectRef}
                                transitionName=""
                                dropdownStyle={{ animation: 'none !important' }}
                                optionFilterProp="label"
                                onSelect={handleStoreSelectBlur}
                                placeholder="Select store"
                                style={{ height: 56.5 }}
                                onChange={handleSelectChange}
                                open={isStoreSelectOpen}
                                onDropdownVisibleChange={
                                  (open) => setIsStoreSelectOpen(open)
                                }
                              >
                                <Option value="All Store" style={{ padding: '12px' }}>
                                  All Store
                                </Option>
                                <Option value="Custom Store" style={{ padding: '12px' }} >
                                  Custom Store
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

                    <FormItem name={`productImages`} valuePropName='fileList'>
                      <Upload
                        // name="productImages"
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
                      >
                        <Checkbox
                          onClick={() => setHasExpiryDate(!hasExpiryDate)}
                          // value={hasExpiryDate}
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

                    <div style={{ padding: '10px 0', marginBottom: '20px' }}>
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
                  </div>

                  {/* Buttons */}
                  <div style={{ padding: '10px 0' }}>
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
                            // onClick={onFinish}
                            >
                              Proceed
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
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

export default AddVariantProduct;
