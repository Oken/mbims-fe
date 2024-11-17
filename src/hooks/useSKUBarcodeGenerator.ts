/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { generateBarCode, generateSKU } from '../utils';

export const useSKUBarcodeGenerator = (productName: string, productCategoryId: number, categoryItems: any[]) => {
  const [productSKU, setProductSKU] = useState<string>('');
  const [barcode, setBarcode] = useState<string>('');

  // console.log('productName: ', productName, '\n:productCategoryId ', productCategoryId, '\ncategoryItems: ', categoryItems);

  useEffect(() => {
    setProductSKU(generateSKU(productName));

    if (productCategoryId > 0) {
      const selectedCategory = categoryItems[productCategoryId - 1]?.productCategoryName || '';
      setBarcode(generateBarCode(productName, selectedCategory));
    }
  }, [productName, productCategoryId, categoryItems]);

  return { productSKU, barcode };
};
