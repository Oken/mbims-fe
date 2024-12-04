import { useEffect, useState, useRef, Fragment, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../common.scss';
// import './styles.scss';

import Composite from './composite.tsx';

import {
  // Queries
  useGetProductsQuery,
  useGetProductCategoriesQuery,
  useGetProductSubcategoriesQuery,
  useGetProductBrandsQuery,
  useGetProductDiscountsQuery,
  useGetStoresQuery,
  useGetOutletsQuery,
  useGetProductSuppliersQuery,
  useGetTaxesQuery,
  useGetProductUnitsQuery,

  // Mutations
  useAddNewProductMutation,
  useAddNewStoreMutation,
  useAddNewProductDiscountMutation,
  useAddNewTaxMutation,

  // Selectors
  selectAllProducts,
  selectAllCategories,
  selectCategoryById,
  selectAllSubcategories,
  selectAllBrands,
  selectAllDiscounts,
  selectAllStores,
  selectAllOutlets,
  selectAllSuppliers,
  selectAllTaxes,
  selectAllUnits,
} from '../../../../../../store/feature-slice/products';

import CustomModal, { CustomModalRef } from '../../../../../../custom-modal';
import SelectOutlet from '../../../../../components/button/forms/outlets/select-outlet.tsx';
import AddCategoryForm from '../../../../../components/button/forms/categories/add-category';
import AddSubcategoryForm from '../../../../../components/button/forms/subcategories/add-subcategory';
import AddDiscountForm from '../../../../../components/button/forms/discounts/add-discount';
import AddTaxForm from '../../../../../components/button/forms/taxes/add-tax';

import {
  ProductT,
  DiscountT,
  ProductBrandT,
  ProductCategoryT,
  ProductSubcategoryT,
  SelectOptionT,
  SupplierT,
  TaxesT,
  UnitType,
  ComponentT,
} from '../../../../../../types/product-types';

import { useSKUBarcodeGenerator } from '../../../../../../hooks/useSKUBarcodeGenerator';
import { useExpiryDate } from '../../../../../../hooks/useExpiryDate';
// import Algebra from '../../../../style/icons/site-icons-component/algebra.tsx';

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
  // Table,
  RefSelectProps,
  GetProp,
  // UploadProps,
  SelectProps,
  InputRef,
} from 'antd';
import FeatherIcon from 'feather-icons-react';
import type { RcFile, UploadProps, UploadFile } from 'antd/es/upload';
// import { ColumnsType } from 'antd/es/table';
import {
  CheckOutlined,
  CloseOutlined,
  UploadOutlined,
  LoadingOutlined,
  FileImageOutlined,
  PlusOutlined
} from '@ant-design/icons';

import {
  convertCategoriesToOptions,
  convertStoresToOptions,
  convertSubCategoriesToOptions,
  convertBrandsToOptions,
  convertDiscountsToOptions,
  convertTaxesToOptions,
  convertUnitsToOptions,
} from './converters';
import { OptionType } from './types';

import TagRender from '../../../../../components/button/utils/tag-render';
import CustomTagRenderProvider
  from '../../../../../components/button/utils/context/tagrender-context.tsx';

const { Item: FormItem } = Form;
const { TextArea } = Input;
const Option = Select.Option;

// Types
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

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

  // If this returns `true`, uploading becomes automatic
  // return isJpgOrPng && isLt2M;

  // Prevent automatic uploading (POST request if `action` attribute is used)
  return false;
};

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

const AddCompositeProduct = () => {
  let index = 0;
  const navigate = useNavigate();

  const inputRef = useRef<InputRef>(null);

  const categorySelectRef = useRef<RefSelectProps>(null);
  const subcategorySelectRef = useRef<RefSelectProps>(null);
  const outletSelectRef = useRef<RefSelectProps>(null);

  const handleCategoryBlur = () => {
    if (categorySelectRef.current) {
      categorySelectRef.current.blur();
      categorySelectRef.current.focus();
    }
  }

  const handleSubcategoryBlur = () => {
    if (subcategorySelectRef.current) {
      subcategorySelectRef.current.blur();
      subcategorySelectRef.current.focus();
    }
  }

  const handleOutletSelectBlur = () => {
    if (outletSelectRef.current) {
      outletSelectRef.current.blur();
      outletSelectRef.current.focus();
    }
  }

  // Modal References
  const selectOutletModalRef = useRef<CustomModalRef>(null);
  const subcategoryModalRef = useRef<CustomModalRef>(null);
  const categoryModalRef = useRef<CustomModalRef>(null);
  const discountModalRef = useRef<CustomModalRef>(null);
  const taxModalRef = useRef<CustomModalRef>(null);

  // Stores
  const [outletData, setOutletData] = useState<any[]>([]);
  const [outlets, setOutlets] = useState<any[]>([]);
  const [outletsIds, setOutletsIds] = useState<number[]>([]);
  const [brandItems, setBrandItems] = useState<ProductBrandT[]>([]);
  const [units, setUnits] = useState<UnitType[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierT[]>([]);

  // Products, Categories, Brands, Suppliers, Discounts, and Taxes
  const [products, setProducts] = useState<ProductT[]>([]);
  const [productSelectList, setProductSelectList] = useState<SelectOptionT[]>([]);
  const [searchProductText, setSearchProductText] = useState<string>('');
  const [searchedProductIds, setSearchedProductIds] = useState<number[]>([]);
  const [categoryItems, setCategoryItems] = useState<ProductCategoryT[]>([]);
  const [createdNewCategory, setCreatedNewCategory] = useState<boolean>(false);
  const [subcategoryItems, setSubcategoryItems] = useState<ProductSubcategoryT[]>([]);
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [subcategorySearchTerm, setSubcategorySearchTerm] = useState('');
  const [
    filteredCategoryList,
    setFilteredCategoryList
  ] = useState<SelectOptionT[]>([]);
  const [
    filteredSubcategoryList,
    setFilteredSubcategoryList
  ] = useState<SelectOptionT[]>([]);
  const [isCategorySelectOpen, setIsCategorySelectOpen] = useState(false);
  const [isSubcategorySelectOpen, setIsSubcategorySelectOpen] = useState(false);
  const [isOutletSelectOpen, setIsOutletSelectOpen] = useState(false);
  const [discounts, setDiscounts] = useState<DiscountT[]>([]);
  const [taxes, setTaxes] = useState<TaxesT[]>([]);

  // product info state
  const [productName, setProductName] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [allCategories, setAllCategories] = useState<OptionType[]>([]);
  const [productCategoryId, setProductCategoryId] = useState<number>(0);
  const [productSubcategoryId, setProductSubcategoryId] = useState<number>(0);
  const [allSubCategories, setAllSubCategories] = useState<OptionType[]>([]);
  const [allBrands, setAllBrands] = useState<OptionType[]>([]);
  const [allDiscounts, setAllDiscounts] = useState<OptionType[]>([]);
  const [allTaxes, setAllTaxes] = useState<OptionType[]>([]);
  const [allUnits, setAllUnits] = useState<OptionType[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [imageUrl, setImageUrl] = useState<string>();

  const [expiryItem, setExpiryItem] = useState(false);
  const [allowDiscount, setAllowDiscount] = useState(false);

  const [name, setName] = useState('');

  const [outlet, setOutlet] = useState<string | null>(null);

  const { productSKU, barcode } = useSKUBarcodeGenerator(
    productName,
    productCategoryId,
    categoryItems
  );
  // const { imageUrl, handleImageChange } = useImageUpload();
  const [imageList, setImageList] = useState<UploadFile[]>([]);

  const { expiryDate, updateExpiryComponent } = useExpiryDate();
  const [expiryDay, setExpiryDay] = useState<string>('');
  const [expiryMonth, setExpiryMonth] = useState<string>('');
  const [expiryYear, setExpiryYear] = useState<string>('');

  // temp states
  const [markUp, setMarkUp] = useState<string>('');
  const [margin, setMargin] = useState<string>('');
  const [hasExpiryDate, setHasExpiryDate] = useState<boolean>(false);
  const [applyAllDiscount, setApplyAllDiscount] = useState<boolean>(false);
  const [isTaxable, setIsTaxable] = useState<boolean>(false);
  const [saveAsTemplate, setSaveAsTemplate] = useState<boolean>(false);

  const [brandId, setBrandId] = useState<number | null>(null);
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);
  const [selectTaxId, setSelectedTaxId] = useState<number | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [soldOnPOS, setSoldOnPOS] = useState<boolean>(true);
  const [inventoryTracking, setInventoryTracking] = useState<boolean>(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);

  const [storeIds, setStoreIds] = useState<React.Key[]>([]);

  const [allOutlets, setAllOutlets] = useState<boolean>(false);
  const [price, setPrice] = useState<string>('');
  const [inStock, setInStock] = useState<string>('');
  const [lowStockAlert, setLowStockAlert] = useState<string>('');
  const [selectDiscountId, setSelectedDiscountId] = useState<number | null>(null);
  // const [allStore, setAllStore] = useState<boolean>(false);
  const [addAllStore, setAddAllStore] = useState(false);
  const [totalCompositePrice, setTotalCompositePrice] = useState(0);
  const [componentProducts, setComponentProducts] = useState<ComponentT[]>([]);
  const [costPrice, setCostPrice] = useState<number>(0);

  // Remove price from custom stores for variant products
  const [removeStoreModalPrice, setRemoveStoreModalPrice] = useState<boolean>(true);

  // Handle searching of product categories
  const handleCategorySearch = (e: any) => {
    const event = e.target as HTMLInputElement
    const val = event.value;
    setCategorySearchTerm(event.value);

    if (val == '') return;

    searchCategory(val);
  }

  const handleSubcategorySearch = (e: any) => {
    const event = e.target as HTMLInputElement
    const val = event.value;
    setSubcategorySearchTerm(event.value);

    console.log('subcategorySearchTerm', subcategorySearchTerm, '\nsubcategoryItems: ', subcategoryItems);

    if (val == '') return;

    const filtered = subcategoryItems.filter(
      option => option.categoryName.toLowerCase().startsWith(val.toLowerCase())
    )

    const filteredSubcategoryList = filtered.map((item: ProductSubcategoryT) => ({
      value: item.id,
      label: item.categoryName,
    }));

    setFilteredSubcategoryList(filteredSubcategoryList);

    // console.log('filteredSubcategoryList: ', filteredSubcategoryList);
  }

  // Add product
  const openCategoryModal = () => {
    categoryModalRef.current?.openModal();
  };

  const closeCategoryModal = () => {
    categoryModalRef.current?.closeModal();
  };

  // Add subcategory
  const openSubcategoryModal = () => {
    subcategoryModalRef.current?.openModal();
  };

  const closeSubcategoryModal = () => {
    subcategoryModalRef.current?.closeModal();
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

  // Expiry Date Calculation
  useEffect(() => {
    updateExpiryComponent('expiryDay', `${expiryDay}`);
    updateExpiryComponent('expiryMonth', `${expiryMonth}`);
    updateExpiryComponent('expiryYear', `${expiryYear}`);
  }, [expiryDay, expiryMonth, expiryYear]);

  // Fetch data for the app
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
    error: productSubcategoryError,
    isError: isProductSubcategoryFetchingError,
    isSuccess: isProductSubcategoryFetchingSuccess,
    isLoading: isProductSubcategoryFetching,
    refetch: refetchProductSubcategories,
  } = useGetProductSubcategoriesQuery([]);
  const fetchedProductSubcategories = useSelector(selectAllSubcategories);

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
          && isProductSubcategoryFetchingSuccess
          && isProductBrandFetchingSuccess
          && isProductDiscountFetchingSuccess
          && isStoreFetchingSuccess
          && isProductSupplierFetchingSuccess
          && isTaxFetchingSuccess
          && isProductUnitFetchingSuccess
        ) {
          setCategoryItems(fetchedProductCategories);
          setSubcategoryItems(fetchedProductSubcategories);
          setBrandItems(fetchedProductBrands);
          setSuppliers(fetchedProductSuppliers);
          setDiscounts(fetchedProductDiscounts);
          setTaxes(fetchedTaxes);
          setOutletData(fetchedStores);
          setUnits(fetchedProductUnits);

          console.log('We are here!', subcategoryItems);
        }

        if (
          isProductCategoryFetchingError
          || isProductSubcategoryFetchingError
          || isProductBrandFetchingError
          || isProductDiscountFetchingError
          || isStoreFetchingError
          || isProductSupplierFetchingError
          || isTaxFetchingError
          || isProductUnitFetchingError
        ) {
          console.log('productCategoryError', productSubcategoryError);
          throw productSubcategoryError;
        }
      } catch (error) {
        console.log('An error occurred!', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [
    isProductCategoryFetching,
    isProductSubcategoryFetching,
    isProductBrandFetching,
    isProductDiscountFetching,
    isStoreFetching,
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
    openCategoryModal();
    handleCategoryBlur();
  };

  const addNewSubcategory = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubcategorySelectOpen(false);
    openSubcategoryModal();
    handleSubcategoryBlur();
  };

  const addNewDiscount = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openDiscountModal();
  };

  const addNewTax = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openTaxModal();
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // // Get the base 64 of the image
      // const getBase64 = (img: FileType, callback: (url: string) => void) => {
      //   const reader = new FileReader();
      //   reader.addEventListener('load', () => callback(reader.result as string));
      //   reader.readAsDataURL(img);
      // };

      // // Get this url from response in real world.
      // getBase64(info.file.originFileObj as FileType, (url) => {
      //   setLoading(false);
      //   setImageUrl(url);
      // });

      const getBase64 = (img: Blob, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
      };

      getBase64(info.file.originFileObj as Blob, (url) => {
        setLoading(false);
        setImageUrl(url);
        form.setFieldsValue({ imageUrl: url });
      });
    }
  };

  // Handle Image Upload
  const handleImageChange: UploadProps['onChange'] = ({ fileList: newImageList}) => {
    console.log('Image List: ', newImageList);
    setImageList(newImageList);
  }

  // Form submission work up to create a product
  const [form] = Form.useForm();

  const [addNewProduct, {
    isLoading: isProductCreationLoading,
    isError: isProductCreationError,
    isSuccess: isProductCreationSuccess,
    error: productCreationError,
  }] = useAddNewProductMutation();

  const onFinish = async (values: any) => {
    console.log('form values: ', values, '\nselectedSupplierId: ', selectedSupplierId);
    console.log('Still here: ', componentProducts, '\ncostPrice: ', costPrice, 'totalCompositePrice: ', totalCompositePrice);

    // return;
    try {
      console.log('storeIds ooo: ', outletsIds);
      // Create a new FormData instance
      let data = new FormData();

      // Append the product data as a JSON string
      const productData = {
        productName: values.productName,
        sku: values.sku || productSKU,
        sellingType: values.sellingType || 'retail',
        barcode: values.barcode || barcode,
        productDescription: values.productDescription,
        composite: true,
        quantityOnHand: values.quantityOnHand,
        sellingPrice: totalCompositePrice ? totalCompositePrice : '5000',
        costPrice: costPrice ? costPrice : '3000',
        quantityAlert: values.quantityAlert || '0',
        type: 'COMPOSITE',
        productCategoryId: values.productCategoryId,
        subCategoryId: values.productSubcategoryId,
        brandId: values.brandId || null,
        unitId: values.unitId || null,
        tags: values.tags || [],
        enabled: values.isPointOfSale,
        inventoryTracking: values.inventoryTracking || true,
        storeIds: storeIds || [],
        addToAllStores: allOutlets || values.outlet === 'allOutlet' || false,
        componentProducts: [],
        ...(
          applyAllDiscount && values.discountId ?
          { discountId: values.discountId } : {}
        ),
        ...(
          isTaxable && values.taxId ?
            { taxId: values.taxId } : {}
        ),
        ...(
          hasExpiryDate && expiryDate ?
            { expiryDate } : {}
        ),
        // discountId: (applyAllDiscount && values.discountId) ? values.discountId : null,
        // taxId: (isTaxable && values.taxId) ? values.taxId : null,
        // expiryDate: (hasExpiryDate && expiryDate) ? expiryDate : null,
      };

      data.append('product', JSON.stringify(productData));

      // If there is an image, append it to FormData
      if (imageList.length !== 0) {
        imageList.forEach((image) => {
          data.append('productImages', image.originFileObj as RcFile);
        });
      }

      console.log('productData: ', productData);
      console.log('data here: ', [...data.entries()]);

      const resProduct = await addNewProduct(data);

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

  const {
    error: productError,
    isSuccess: isProductFetchingSuccess,
    isError: isProductFetchingError,
    isLoading: isProductFetching,
  } = useGetProductsQuery([]);
  const fetchedProducts = useSelector(selectAllProducts);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        if (isProductFetchingSuccess) {
          const productSelectList = fetchedProducts.map((product: ProductT) => ({
            value: product.id,
            label: product.productName,
          }));

          // Set values for the products
          setProducts(fetchedProducts);
          setProductSelectList(productSelectList);
          return;
        }

        if (isProductFetchingError) {
          console.log('productProductError', productError);
          throw productError;
        }
      } catch (err) {
        // setError('Failed to fetch products.');
        console.error('Failed to fetch products: ', err);
      }
    };

    loadProducts();
  }, [fetchedProducts]);

  // When a product is selected to be part of a composite, remove it from the search
  useEffect(() => {
    const filteredResult = productSelectList
                            .filter((selectedProduct: SelectOptionT, _: number) => {
                              !searchedProductIds.includes(selectedProduct.value)
                            });

    setProductSelectList(filteredResult);
  }, [searchedProductIds])

  // // Composite Item
  // const deleteCompositeItem = (id: number) => {
  //   const filteredProducts = products.filter((product, _) => product.id !== id);

  //   console.log('filteredProducts: ', filteredProducts);
  //   setProducts(filteredProducts);
  // }

  // const handleCompositeFormOnchange = () => {
  //   // console.log('onCompositeFormChangeRef: ', onCompositeFormChangeRef);
  //   // onCompositeFormChangeRef.current.click();
  // }

  // const handleCompositeForm = (compositeForm: any) => {
  //   console.log('compositeForm: ', compositeForm);
  // }

  // const columns: ColumnsType<ProductT> = [
  //   {
  //     title: 'Component',
  //     dataIndex: 'component',
  //     width: '50%',
  //     render: (_, product) => (
  //       <div>
  //         <p style={{ fontWeight: 600, marginBottom: 0 }}>
  //           {product.productName}
  //         </p>
  //         <small>
  //           {product.sku}
  //         </small>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: 'Quantity',
  //     dataIndex: 'quantity',
  //     render: (_, product) => (
  //       <>
  //         <FormItem name="productQuantity[]" noStyle>
  //           <Input type="text" style={{ padding: '16px', width: '150px' }} />
  //         </FormItem>
  //         <FormItem name="productId[]" noStyle>
  //           <Input type="text" hidden style={{ padding: '16px', width: '150px' }} />
  //         </FormItem>
  //       </>
  //     ),
  //   },
  //   {
  //     title: 'Cost Price',
  //     dataIndex: 'costPrice',
  //     render: (_, product) => (
  //       <FormItem name="productId[]" noStyle>
  //         <Input type="text" prefix="₦" style={{ padding: '16px', width: '150px' }} value={product.sellingPrice} />
  //       </FormItem>
  //     ),
  //   },
  //   {
  //     title: '',
  //     dataIndex: 'action',
  //     render: (_, product) => (
  //       <div className="action-table-data">
  //         <div className="edit-delete-action">
  //           <div className="input-block add-lists"></div>
  //           <Link
  //             className="confirm-text"
  //             style={{ border: '1px solid #173F77' }}
  //             to="#"
  //             onClick={() => deleteCompositeItem(product.id)}
  //           >
  //             <FeatherIcon icon="trash-2" className="feather-trash-2" />
  //           </Link>
  //         </div>
  //       </div>
  //     ),
  //   },
  // ];

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
            removeStoreModalPrice={removeStoreModalPrice}
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
        ref={categoryModalRef}
        width={'400px'}
        content={<AddCategoryForm
          closeAddCategoryModal={closeCategoryModal}
          categoryName={categorySearchTerm}
          setCreatedNewCategory={setCreatedNewCategory}
        />}
      />

      <CustomModal
        ref={subcategoryModalRef}
        width={'400px'}
        content={<AddSubcategoryForm
          closeSubcategoryModal={closeSubcategoryModal}
          subcategoryName={subcategorySearchTerm}
          refetchProductSubcategories={refetchProductSubcategories}
          setSubcategoryItems={setSubcategoryItems}
          setProductSubcategoryId={setProductSubcategoryId}
          productCategoryId={productCategoryId}
          selectAllSubcategories={selectAllSubcategories}
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
                            SKU <span style={{ color: 'red' }}>*</span>
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

                      {/* Subcategory */}
                      <Col xs={24} md={12}>
                        <FormItem>
                          <label style={{ padding: '5px 0 10px 20px' }}>
                            Subcategory
                          </label>
                          <FormItem
                            name="productSubcategoryId"
                            noStyle
                          >
                            <Select
                              ref={subcategorySelectRef}
                              style={{ height: 56.5 }}
                              placeholder="Choose sub-category"
                              transitionName=""
                              dropdownStyle={{ animation: 'none !important' }}
                              // value={productCategoryId}
                              // onChange={(value) => setProductCategoryId(value)}
                              optionFilterProp="label"
                              onSelect={handleSubcategoryBlur}
                              options={filteredSubcategoryList}
                              open={isSubcategorySelectOpen}
                              onDropdownVisibleChange={(open) => setIsSubcategorySelectOpen(open)}
                              dropdownRender={(menu) => (
                                <div style={{ padding: '5px' }}>
                                  <Input
                                    type="text"
                                    // value={barcode}
                                    placeholder="Search"
                                    style={{ padding: '10px' }}
                                    value={subcategorySearchTerm}
                                    onInput={handleSubcategorySearch}
                                  />
                                  {menu}
                                  {subcategorySearchTerm ? (
                                    <Button
                                      type="text"
                                      icon={<PlusOutlined />}
                                      style={{ color: '#2D7DEE', margin: '10px 0' }}
                                      onClick={addNewSubcategory}
                                    >
                                      Add "{subcategorySearchTerm}" as new category
                                    </Button>
                                  ) : ("")}
                                </div>
                              )}
                              notFoundContent={
                                subcategorySearchTerm ? (
                                  <div style={{ textAlign: 'center', margin: '5px' }} >
                                    <div>No results match "{subcategorySearchTerm}"</div>
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

                      {/* Tags */}
                      <Col xs={24} md={12}>
                        <FormItem>
                          <label style={{ padding: '5px 0 10px 20px' }}>Tags</label>
                          <FormItem name={`tags`} noStyle>
                            {/* A Context Provider for controlling tag delete icon */}
                            <CustomTagRenderProvider plainDelete={true}>
                              <Select
                                mode="tags"
                                style={{ width: '100%', height: 56.5 }}
                                tagRender={TagRender}
                                placeholder="Tags Mode"
                                onChange={handleTagsChange}
                                options={tags.map((tag) => ({ value: tag, label: tag }))}
                              />
                            </CustomTagRenderProvider>
                          </FormItem>
                        </FormItem>
                      </Col>

                      {/* Product Description */}
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

                    {/* Quantities Section */}
                    <div style={{ border: '1px dashed black', padding: '16px', marginTop: '10px' }}>
                      <p style={{ fontWeight: 600, display: 'inline' }}>Quantities</p>

                      <Row gutter={40}>
                        {/* Quantity at Hand */}
                        <Col xs={24} md={12}>
                          <FormItem>
                            <label style={{ padding: '5px 0 10px 20px' }}>
                              Quantity at Hand <span style={{ color: 'red' }}>*</span>
                            </label>
                            <FormItem
                              name="quantityOnHand"
                              rules={[{
                                required: true,
                                message: 'Number of product available is required'
                              }]}
                              noStyle
                            >
                              <Input
                                type="number"
                                placeholder="Number of product available"
                                style={{ padding: '16px' }}
                              />
                            </FormItem>
                          </FormItem>
                        </Col>

                        {/* Quantity Alert */}
                        <Col xs={24} md={12}>
                          <FormItem>
                            <label style={{ padding: '5px 0 10px 20px' }}>
                              Quantity for low Stock alert <span style={{ color: 'red' }}>*</span>
                            </label>
                            <FormItem
                              name="quantityAlert"
                              rules={[{
                                required: true,
                                message: 'Quantity alert is required'
                              }]}
                              noStyle
                            >
                              <Input
                                type="number"
                                placeholder="Lowest Quantity to raise alert"
                                style={{ padding: '16px' }}
                              />
                            </FormItem>
                          </FormItem>
                        </Col>
                      </Row>
                    </div>

                    {/* Point of Sale Section */}
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

                    {/* Composite Item */}
                    <div style={{ border: '1px dashed black', padding: '16px', marginTop: '10px' }}>
                      <p style={{ fontWeight: 600, display: 'inline' }}>Composite Products</p>
                      <p style={{ padding: '5px 0 10px 20px' }}>Select from existing products to be used as composite</p>
                      {searchedProductIds.length > 0 ? (
                        <div>
                          {/* Composite creation table */}
                          <div style={{ width: '100%', overflowX: 'scroll', boxShadow: '0px 4px 4px 0px #173F7733' }}>
                            <Composite
                              setTotalCompositePrice={setTotalCompositePrice}
                              setCostPrice={setCostPrice}
                              costPrice={costPrice}
                              searchedProductIds={searchedProductIds}
                              setSearchedProductIds={setSearchedProductIds}
                              products={products}
                            />
                          </div>
                          <Row justify={'end'} style={{ margin: '20px 0px' }}>
                            <span style={{ fontSize: '1.2em', fontWeight: 600 }}>
                              Total Cost #{totalCompositePrice}
                            </span>
                          </Row>
                        </div>
                      ) : ('')}
                      <Row>
                        <Col span={24}>
                          <FormItem name="standardProduct" noStyle>
                            <Select
                              showSearch
                              style={{ height: 56.5, width: '100%' }}
                              placeholder="Search to Select"
                              optionFilterProp="label"
                              filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                              }
                              onSearch={(value: string) => setSearchProductText(value)}
                              filterOption={(input: string, option?: SelectOptionT) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                              }
                              options={
                                searchProductText ? productSelectList
                                  .filter((option) => option.label.toLowerCase().includes(searchProductText.toLowerCase()))
                                  .slice(0, 5) : []
                              }
                              onChange={(value: number) => {
                                console.log('Product ID: ', value);
                                setSearchedProductIds((prev) => [...prev, value]);
                              }}
                            />
                            {/* <Select placeholder="Search for product" style={{ height: 56.5, width: '100%' }} onChange={handleSelectChange}>
                            <Option value="allStore" style={{ padding: '16px' }}>
                              All Store
                            </Option>
                            <Option value="Custom Store" style={{ padding: '16px' }}>
                              Custom Store
                            </Option>
                          </Select> */}
                          </FormItem>
                        </Col>
                      </Row>
                    </div>

                    {/* Inventory Tracking */}
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

                    {/* Store Section */}
                    <div>
                      {inventoryTracking ? (
                        <div>
                          {/* If at least a store is selected */}
                          {outlets.length > 0 ? (
                            <div style={{ border: '1px dashed black', padding: '10px', marginTop: '10px' }}>
                              <p style={{ fontWeight: 600, display: 'inline' }}>Stores</p>

                              <Row gutter={20} style={{ margin: '10px 0' }} justify={'space-between'}>
                                {outlets.map((outlet, index) => (
                                  <Fragment key={outlet.outletId}>
                                    <Col xs={12} md={6}>
                                      <FormItem>
                                        <label style={{ padding: '5px 0 10px 20px', fontSize: '12px' }}>Outlet</label>
                                        <FormItem
                                          name={['finalStores', index, 'storeName']}
                                          initialValue={outlet.outletName}
                                        >
                                          <Input
                                            type="text"
                                            placeholder="Outlet Name"
                                            style={{ padding: '16px' }}
                                          // disabled
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
                                          name={['finalStores', index, 'inStock']}
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
                                          name={['finalStores', index, 'lowStockAlert']}
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
                                          name={['finalStores', index, 'price']}
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
                                  <label style={{ padding: '5px 0 10px 20px' }}>Outlet</label>
                                  <FormItem
                                    // name={['finalStores', 0, 'selectType']}
                                    name={'selectType'}
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
                                        All Outlets
                                      </Option>
                                      <Option value="Custom Outlets" style={{ padding: '12px' }}>
                                        Custom Outlets
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
                          {outlets.length > 0 ? (
                            <div style={{ border: '1px dashed black', padding: '10px', marginTop: '10px' }}>
                              <p style={{ fontWeight: 600, display: 'inline' }}>Stores</p>

                              <Row style={{ marginTop: '10px' }} justify={'space-between'}>
                                {outlets.map((outlet, index) => (
                                  <Fragment key={outlet.outletId}>
                                    <Col span={16}>
                                      <FormItem>
                                        <label style={{ padding: '5px 0 10px 20px', fontSize: '12px' }}>Outlet</label>
                                        <FormItem
                                          name={['finalStores', index, 'storeName']}
                                          initialValue={outlet.outletName}
                                        >
                                          <Input
                                            type="text"
                                            placeholder="Outlet Name"
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
                                onClick={openSelectStoreModal}
                              >
                                Add item
                              </Button>
                            </div>
                          ) : (
                            <FormItem>
                              <label style={{ padding: '5px 0 10px 20px' }}>Outlet</label>
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
                                    All Outlets
                                  </Option>
                                  <Option value="Custom Outlets" style={{ padding: '12px' }} >
                                    Custom Outlets
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
                                    placeholder="Apply discount"
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
                                    placeholder="Pick tax"
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
                        >
                          <Checkbox
                            // value={saveAsTemplate}
                            onChange={() => setSaveAsTemplate(!saveAsTemplate)}
                          />
                        </FormItem>
                        {' '}
                        <span style={{ marginLeft: '10px' }}>Save this item as a template</span>
                      </div>
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

export default AddCompositeProduct;
