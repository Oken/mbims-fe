/* eslint-disable @typescript-eslint/no-explicit-any */
// Note: This file is used to fetch products from the server
// http://192.168.43.112:9100/api/v1/products
// http://localhost:9100/api/v1/products
// https://ims-demo.onrender.com/api/v1

// Fetch Products
export const fetchProducts = async () => {
  const response = await fetch('http://192.168.43.112:9100/api/v1/products');
  return response.json();
};

// Fetch Product
export const fetchProduct = async (id: number) => {
  const response = await fetch(`http://192.168.43.112:9100/api/v1/products/${id}`);
  return response.json();
};

// createProduct Function
export const createProduct = async (product: any) => {
  try {
    const response = await fetch('http://192.168.43.112:9100/api/v1/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify(product),
    });

    console.log(response);
    return response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// createProduct Function
export const createProductCategory = async (category: any) => {
  const response = await fetch('http://192.168.43.112:9100/api/v1/product-categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
  return response.json();
};

// updateProduct Function
export const updateProduct = async (product: any) => {
  const response = await fetch(`http://192.168.43.112:9100/api/v1/products/${product.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  return response.json();
};

// deleteProduct Function
export const deleteProduct = async (id: string) => {
  const response = await fetch(`http://192.168.43.112:9100/api/v1/products/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
