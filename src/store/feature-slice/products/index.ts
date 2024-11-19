// import { CustomerT } from '../../../types/users-types';
import { createEntityAdapter, EntityId } from '@reduxjs/toolkit';
import { mainAPISlice } from '../../RTK';
import {
  ProductT,
  ProductCategoryT,
  ProductSubcategoryT,
  ProductBrandT,
  DiscountT,
  StoreT,
  OutletT,
  SupplierT,
  TaxesT,
  UnitT,
  CountryT,
  StateT,
  VariantAttributeT,
} from '../../../types/product-types';

// Create an entity adapters

const productAdapter = createEntityAdapter<ProductT, EntityId>({
  // sort by product name
  selectId: (product: ProductT): number => product.id,
  sortComparer: (a, b) => a.productName.localeCompare(b.productName),
});

const productCategoryAdapter = createEntityAdapter<ProductCategoryT, EntityId>({
  // sort by product category name
  selectId: (category: ProductCategoryT): number => category.id,
  sortComparer: (a, b) => a.productCategoryName.localeCompare(b.productCategoryName),
});

const productSubcategoryAdapter = createEntityAdapter<ProductSubcategoryT, EntityId>({
  // sort by product category name
  selectId: (subcategory: ProductSubcategoryT): number => subcategory.id,
  sortComparer: (a, b) => a.categoryName.localeCompare(b.categoryName),
});

const productBrandAdapter = createEntityAdapter<ProductBrandT, EntityId>({
  // sort by product brand name
  selectId: (brand: ProductBrandT): number => brand.id,
  sortComparer: (a, b) => a.brandName.localeCompare(b.brandName),
});

const productDiscountAdapter = createEntityAdapter<DiscountT, EntityId>({
  // sort by product category name
  selectId: (discount: DiscountT): number => discount.id,
  sortComparer: (a, b) => a.discountName.localeCompare(b.discountName),
});

const storeAdapter = createEntityAdapter<StoreT, EntityId>({
  // sort by product category name
  selectId: (store: StoreT): number => store.id,
  sortComparer: (a, b) => a.storeName.localeCompare(b.storeName),
});

const outletAdapter = createEntityAdapter<OutletT, EntityId>({
  // sort by product category name
  selectId: (outlet: OutletT): number => outlet.id,
  sortComparer: (a, b) => a.outletName.localeCompare(b.outletName),
});

const productSupplierAdapter = createEntityAdapter<SupplierT, EntityId>({
  // sort by product category name
  selectId: (supplier: SupplierT): number => supplier.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const taxAdapter = createEntityAdapter<TaxesT, EntityId>({
  // sort by product category name
  selectId: (tax: TaxesT): number => tax.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const productUnitAdapter = createEntityAdapter<UnitT, EntityId>({
  // sort by product category name
  selectId: (unit: UnitT): number => unit.id,
  sortComparer: (a, b) => a.unitName.localeCompare(b.unitName),
});

const countryAdapter = createEntityAdapter<CountryT, EntityId>({
  // sort by product category name
  selectId: (country: CountryT): number => country.id,
  sortComparer: (a, b) => a.countryName.localeCompare(b.countryName),
});

const stateAdapter = createEntityAdapter<StateT, EntityId>({
  // sort by product category name
  selectId: (state: StateT): number => state.id,
  sortComparer: (a, b) => a.stateName.localeCompare(b.stateName),
});

const variantAttributeAdapter = createEntityAdapter<VariantAttributeT, EntityId>({
  // sort by product category name
  selectId: (state: VariantAttributeT): number => state.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

// Define a type without id key
type AddProductCategoryT = Omit<ProductCategoryT, 'id'>;
type AddProductSubcategoryT = Omit<ProductSubcategoryT, 'id'>;
type AddStoreT = Omit<StoreT, 'id'>;
type AddOutletT = Omit<OutletT, 'id'>;
type AddDiscountT = Omit<DiscountT, 'id'>;
type AddTaxT = Omit<TaxesT, 'id'>;
type AddVariantAttributeT = Omit<VariantAttributeT, 'id'>;
type AddSupplierT = Omit<SupplierT, 'id'>;

const initialProductState = productAdapter.getInitialState();
const initialCategoryState = productCategoryAdapter.getInitialState();
const initialSubcategoryState = productSubcategoryAdapter.getInitialState();
const initialBrandState = productBrandAdapter.getInitialState();
const initialDiscountState = productDiscountAdapter.getInitialState();
const initialStoreState = storeAdapter.getInitialState();
const initialOutletState = outletAdapter.getInitialState();
const initialSupplierState = productSupplierAdapter.getInitialState();
const initialTaxState = taxAdapter.getInitialState();
const initialUnitState = productUnitAdapter.getInitialState();
const initialCountryState = countryAdapter.getInitialState();
const initialStateState = stateAdapter.getInitialState();
const initialVariantAttributeState = variantAttributeAdapter.getInitialState();

export const productExtendsmainAPISlice = mainAPISlice.injectEndpoints({
  endpoints: (builder) => ({
    // Products

    // Hosted locally
    // getProducts: builder.query({
    //   query: () => '/products',
    //   transformResponse: (responseData: any) => {
    //     console.log('initialState for a GET /products: ', initialProductState, responseData);
    //     return productAdapter.setAll(initialProductState, responseData);
    //   },
    //   providesTags: ['product'],
    // }),

    // Hosted on Render
    getProducts: builder.query({
      query: () => '/products',
      transformResponse: (responseData: any) => {
        console.log('initialState for a GET /products: ', initialProductState, responseData.content);
        return productAdapter.setAll(initialProductState, responseData.content);
      },
      providesTags: ['product'],
    }),

    addNewProduct: builder.mutation({
      query: (initialPost) => ({
        url: '/products',
        // header: {
        //   'Content-Type': 'multipart/form-data',
        //   // 'Content-Type': 'application/json',
        //   // Accept: '*/*',
        // },
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['product'],
    }),
    editProduct: builder.mutation({
      query: (product) => ({
        url: `/products/${product.id}`, // Hypothetical endpoint
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: ['product'],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`, // Hypothetical endpoint
        method: 'DELETE',
        body: productId,
      }),
      invalidatesTags: ['product'],
    }),

    // Product categories
    getProductCategories: builder.query({
      query: () => '/product-categories',
      transformResponse: (responseData: any) => {
        console.log('initialCategoryState: ', initialCategoryState, responseData);
        return productCategoryAdapter.setAll(initialCategoryState, responseData);
      },
      providesTags: ['productCategory'],
    }),
    addNewProductCategory: builder.mutation({
      query: (initialPost: AddProductCategoryT) => ({
        url: '/product-categories',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['productCategory'],
    }),

    // Product Subcategories
    getProductSubcategories: builder.query({
      query: () => '/sub-categories',
      transformResponse: (responseData: any) => {
        console.log('initialSubcategoryState: ', initialSubcategoryState, responseData);
        return productSubcategoryAdapter.setAll(initialSubcategoryState, responseData);
      },
      providesTags: ['subcategory'],
    }),
    addNewProductSubcategory: builder.mutation({
      query: (initialPost: AddProductSubcategoryT) => ({
        url: '/sub-categories',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['subcategory'],
    }),

    // Product Brands
    getProductBrands: builder.query({
      query: () => '/brands',
      transformResponse: (responseData: any) => {
        console.log('initialBrandState: ', initialBrandState, responseData);
        return productBrandAdapter.setAll(initialBrandState, responseData);
      },
      providesTags: ['productCategory'],
    }),

    // Product Discount
    getProductDiscounts: builder.query({
      query: () => '/discounts',
      transformResponse: (responseData: any) => {
        console.log('initialDiscountState: ', initialDiscountState, responseData);
        return productDiscountAdapter.setAll(initialDiscountState, responseData);
      },
      providesTags: ['discount'],
    }),
    addNewProductDiscount: builder.mutation({
      query: (initialPost: AddDiscountT) => ({
        url: '/discounts',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['discount'],
    }),

    // Stores
    getStores: builder.query({
      query: () => '/stores',
      transformResponse: (responseData: any) => {
        console.log('initialStoreState: ', initialStoreState, responseData);
        return storeAdapter.setAll(initialStoreState, responseData);
      },
      providesTags: ['store'],
    }),
    addNewStore: builder.mutation({
      query: (initialPost: AddStoreT) => ({
        url: '/stores',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['store'],
    }),

    // Outlets
    getOutlets: builder.query({
      query: () => '/outlets',
      transformResponse: (responseData: any) => {
        console.log('initialStoreState: ', initialOutletState, responseData);
        return outletAdapter.setAll(initialOutletState, responseData);
      },
      providesTags: ['outlet'],
    }),
    addNewOutlet: builder.mutation({
      query: (initialPost: AddOutletT) => ({
        url: '/outlets',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['outlet'],
    }),

    // Product Supplier
    getProductSuppliers: builder.query({
      query: () => '/suppliers',
      transformResponse: (responseData: any) => {
        console.log('initialSupplierState: ', initialSupplierState, responseData);
        return productSupplierAdapter.setAll(initialSupplierState, responseData);
      },
      providesTags: ['supplier'],
    }),
    addNewProductSupplier: builder.mutation({
      query: (initialPost: AddSupplierT) => ({
        url: '/suppliers',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['supplier'],
    }),

    // Taxes
    getTaxes: builder.query({
      query: () => '/taxes',
      transformResponse: (responseData: any) => {
        console.log('initialTaxState: ', initialTaxState, responseData);
        return taxAdapter.setAll(initialTaxState, responseData);
      },
      providesTags: ['tax'],
    }),
    addNewTax: builder.mutation({
      query: (initialPost: AddTaxT) => ({
        url: '/taxes',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['tax'],
    }),

    // Product Unit
    getProductUnits: builder.query({
      query: () => '/units',
      transformResponse: (responseData: any) => {
        console.log('initialUnitState: ', initialUnitState, responseData);
        return productUnitAdapter.setAll(initialUnitState, responseData);
      },
    }),

    // Countries
    getCountries: builder.query({
      query: () => '/countries',
      transformResponse: (responseData: any) => {
        console.log('initialCountryState: ', initialCountryState, responseData);
        return countryAdapter.setAll(initialCountryState, responseData);
      },
    }),

    // States
    getStates: builder.query({
      query: () => '/states',
      transformResponse: (responseData: any) => {
        console.log('initialStateState: ', initialStateState, responseData);
        return stateAdapter.setAll(initialStateState, responseData);
      },
    }),

    // Variant Attributes
    getVariantAttributes: builder.query({
      query: () => '/variant-attributes',
      transformResponse: (responseData: any) => {
        console.log('initialTaxState: ', initialVariantAttributeState, responseData);
        return variantAttributeAdapter.setAll(initialVariantAttributeState, responseData);
      },
      providesTags: ['variantAttribute'],
    }),
    addNewVariantAttribute: builder.mutation({
      query: (initialPost: AddVariantAttributeT) => ({
        url: '/variant-attributes',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['variantAttribute'],
    }),
  }),
});

export const {
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
  useGetCountriesQuery,
  useGetStatesQuery,
  useGetVariantAttributesQuery,

  // Mutations
  useAddNewProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useAddNewProductCategoryMutation,
  useAddNewProductSubcategoryMutation,
  useAddNewStoreMutation,
  useAddNewOutletMutation,
  useAddNewProductDiscountMutation,
  useAddNewTaxMutation,
  useAddNewVariantAttributeMutation,
  useAddNewProductSupplierMutation,
} = productExtendsmainAPISlice;

const selectProducts = productExtendsmainAPISlice.endpoints.getProducts.select([]);
const selectProductCategories = productExtendsmainAPISlice.endpoints.getProductCategories.select([]);
const selectProductSubcategories = productExtendsmainAPISlice.endpoints.getProductSubcategories.select([]);
const selectProductBrands = productExtendsmainAPISlice.endpoints.getProductBrands.select([]);
const selectProductDiscounts = productExtendsmainAPISlice.endpoints.getProductDiscounts.select([]);
const selectStores = productExtendsmainAPISlice.endpoints.getStores.select([]);
const selectOutlets = productExtendsmainAPISlice.endpoints.getOutlets.select([]);
const selectProductSuppliers = productExtendsmainAPISlice.endpoints.getProductSuppliers.select([]);
const selectTaxes = productExtendsmainAPISlice.endpoints.getTaxes.select([]);
const selectProductUnits = productExtendsmainAPISlice.endpoints.getProductUnits.select([]);
const selectCountries = productExtendsmainAPISlice.endpoints.getCountries.select([]);
const selectStates = productExtendsmainAPISlice.endpoints.getStates.select([]);
const selectVariantAttributes = productExtendsmainAPISlice.endpoints.getVariantAttributes.select([]);

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
} = productAdapter.getSelectors((state: any) => selectProducts(state)?.data || initialProductState);

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
} = productCategoryAdapter.getSelectors((state: any) => selectProductCategories(state)?.data || initialCategoryState);

export const {
  selectAll: selectAllSubcategories,
  selectById: selectSubcategoryById,
  selectIds: selectSubcategoryIds,
} = productSubcategoryAdapter.getSelectors((state: any) => selectProductSubcategories(state)?.data || initialSubcategoryState);

export const {
  selectAll: selectAllBrands,
  selectById: selectBrandById,
  selectIds: selectBrandIds,
} = productBrandAdapter.getSelectors((state: any) => selectProductBrands(state)?.data || initialBrandState);

export const {
  selectAll: selectAllDiscounts,
  selectById: selectDiscountById,
  selectIds: selectDiscountIds,
} = productDiscountAdapter.getSelectors((state: any) => selectProductDiscounts(state)?.data || initialDiscountState);

export const {
  selectAll: selectAllStores,
  selectById: selectStoreById,
  selectIds: selectStoretIds,
} = storeAdapter.getSelectors((state: any) => selectStores(state)?.data || initialStoreState);

export const {
  selectAll: selectAllOutlets,
  selectById: selectOutletById,
  selectIds: selectOutlettIds,
} = outletAdapter.getSelectors((state: any) => selectOutlets(state)?.data || initialOutletState);

export const {
  selectAll: selectAllSuppliers,
  selectById: selectSupplierById,
  selectIds: selectSupplierIds,
} = productSupplierAdapter.getSelectors((state: any) => selectProductSuppliers(state)?.data || initialSupplierState);

export const {
  selectAll: selectAllTaxes,
  selectById: selectTaxById,
  selectIds: selectTaxIds,
} = taxAdapter.getSelectors((state: any) => selectTaxes(state)?.data || initialTaxState);

export const {
  selectAll: selectAllUnits,
  selectById: selectUnitById,
  selectIds: selectUnitIds,
} = productUnitAdapter.getSelectors((state: any) => selectProductUnits(state)?.data || initialUnitState);

export const {
  selectAll: selectAllCountries,
  selectById: selectCountryById,
  selectIds: selectCountryIds,
} = countryAdapter.getSelectors((state: any) => selectCountries(state)?.data || initialCountryState);

export const {
  selectAll: selectAllStates,
  selectById: selectStateById,
  selectIds: selectStateIds,
} = stateAdapter.getSelectors((state: any) => selectStates(state)?.data || initialStateState);

export const {
  selectAll: selectAllVariantAttributes,
  selectById: selectVariantAttributeById,
  selectIds: selectVariantAttributeIds,
} = variantAttributeAdapter.getSelectors((state: any) => selectVariantAttributes(state)?.data || initialVariantAttributeState);
