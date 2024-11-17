/* eslint-disable @typescript-eslint/no-explicit-any */

interface ProductType {
  [id: string]: any;

  id: number;
  productName: string;
  addToAllStores: boolean;
  barcode: string;
  brandId: number;
  componentProducts: null;
  composite: boolean;
  costPrice: number;
  discountId: number;
  enabled: boolean;
  expiryDate: null | string; // assuming it might be a date string in the future
  images: string[]; // array of image paths (strings)
  inventoryTracking: boolean;
  productCategoryId: number;
  productDescription: string;
  productImages: null | string[]; // could be null or an array of strings
  quantityAlert: number;
  quantityOnHand: null | number;
  sellingPrice: number;
  sellingType: 'retail' | 'wholesale'; // assuming more specific types based on example
  sku: string;
  storeIds: null | number[]; // assuming store IDs might be an array of numbers
  subCategoryId: number;
  supplierIds: null | number[]; // assuming supplier IDs might be an array of numbers
  tags: string[]; // array of tags
  taxId: number;
  type: 'SINGLE' | 'BUNDLE'; // assuming only 'SINGLE' and 'BUNDLE' types exist
  unitId: number;
  variants: null | any[];

  lowStockAlert: number;
}

interface ExpiredProductType {
  id: number;
  img: string;
  product: string;
  sku: string;
  manufactured_date: string;
  expired_date: string;
}

interface CountryType {
  id: number;
  countryName: string;
  states?: string | null;
  enabled?: boolean | null;
}

interface StateType {
  id: number;
  stateName: string;
  enabled: boolean;
  countryId: number;
  stores: StoreT[];
}

interface StoreType {
  id: number;
  storeName: string;
  enabled: boolean;
  zipCode: string;
  state: string;
  country: string;
}

type TimeT = {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

type OutletWorkingHoursT = {
  id: number;
  outletId: number;
  workingHours: [
    {
      id: number;
      dayOfTheWeek: string;
      enabled: boolean;
      openingTime: TimeT;
      closingTime: TimeT;
    }
  ]
}

type AddressT = {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface OutletType {
    id: number;
    outletName: string;
    defaultTax: number;
    email: string;
    phone: string;
    outletWorkingHours: OutletWorkingHoursT;
    address: AddressT;
  }

interface VariantAttributeType {
  id: number;
  name: string;
}

interface CustomStoreFormDataType {
  storeId: number;
  storeName: string;
  inStock?: number;
  lowStockAlert?: number;
  price: number;
}

// src/types/productTypes.ts
export interface Product {
  name: string;
  sku: string;
  category: string;
  brand: string;
  tags: string[];
  barcode: string;
  unitOfMeasurement: string;
  suppliers: string[];
  description: string;
  pricing: {
    price: number;
    discount: number;
    tax: number;
  };
  inventory: {
    quantity: number;
    expiryDate: string;
  };
  stores: string[];
}
export interface UnitType {
  id: number;
  unitName: string;
  shortName?: string;
  unitStatus?: boolean;
}

export interface ComponentType {
  productId: number;
  quantity: number;
}

export type DiscountT = {
  id: number;
  discountName: string;
  discountType: string;
  discountValue: number;
};

export type ProductCategoryT = {
  id: number;
  productCategoryName: string;
  slug: string;
  categoryStatus: boolean;
};

export type ProductSubcategoryT = {
  id: number;
  categoryName: string;
  subCatCode: string;
  subCatDescription: string;
  subCatStatus: boolean;
  productCategoryId: number;
};

export type SelectOptionT = {
  value: number;
  label: string;
}

export type ProductBrandT = {
  id: number;
  brandName: string;
  logo: string | null;
  brandStatus: boolean;
};

export type SupplierT = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  description: string;
  imageUrl: string;
};

export type TaxesT = { id: number; name: string; rate: number };

export type CountryT = CountryType;

export type StateT = StateType;

export type ProductT = ProductType;

export type ExpiredProductT = ExpiredProductType;

export type StoreT = StoreType;

export type OutletT = OutletType;

export type UnitT = UnitType;

export type ComponentT = ComponentType;

export type CustomStoreFormDataT = CustomStoreFormDataType;

export type VariantAttributeT = VariantAttributeType;
