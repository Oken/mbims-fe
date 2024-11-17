import { Category, Store, SubCategory, Brand, Discount, OptionType, Unit, Tax } from './types';

export function convertCategoriesToOptions(categories: Category[]): OptionType[] {
  return categories.map((category) => ({
    label: category.productCategoryName,
    value: category.id,
  }));
}

export function convertStoresToOptions(stores: Store[]): OptionType[] {
  return stores.map((store) => ({
    label: store.storeName,
    value: store.id,
  }));
}

export function convertSubCategoriesToOptions(subCategories: SubCategory[]): OptionType[] {
  return subCategories.map((subCategory) => ({
    label: subCategory.categoryName,
    value: subCategory.id,
  }));
}

export function convertBrandsToOptions(brands: Brand[]): OptionType[] {
  return brands.map((brand) => ({
    label: brand.brandName,
    value: brand.id,
  }));
}

export function convertDiscountsToOptions(discounts: Discount[]): OptionType[] {
  return discounts.map((discount) => ({
    label: `${discount.discountName} (${discount.discountType})`,
    value: discount.id,
  }));
}

export function convertTaxesToOptions(taxes: Tax[]): OptionType[] {
  return taxes.map((tax) => ({
    label: `${tax.name} (${tax.rate}%)`,
    value: tax.id,
  }));
}

export function convertUnitsToOptions(units: Unit[]): OptionType[] {
  return units.map((unit) => ({
    label: `${unit.unitName} (${unit.shortName})`,
    value: unit.id,
  }));
}
