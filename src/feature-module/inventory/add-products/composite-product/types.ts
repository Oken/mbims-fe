// Type definitions for the fetched data

export interface Category {
  id: number;
  productCategoryName: string;
  slug: string;
  categoryStatus: boolean;
}

export interface Store {
  id: number;
  storeName: string;
  country: string;
  state: string;
  zipCode: string;
  enabled: boolean;
}

export interface SubCategory {
  id: number;
  categoryName: string;
  subCatCode: string;
  subCatDescription: string;
  subCatStatus: boolean;
  productCategoryId: number;
}

export interface Brand {
  id: number;
  brandName: string;
  brandStatus: boolean;
  logo: string | null;
}

export interface Discount {
  id: number;
  discountName: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
}

export interface Tax {
  id: number;
  name: string;
  rate: number;
}

export interface Unit {
  id: number;
  unitName: string;
  shortName: string;
  unitStatus: boolean;
}

export interface OptionType {
  label: string;
  value: string | number;
}
