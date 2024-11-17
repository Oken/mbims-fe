/* eslint-disable @typescript-eslint/no-explicit-any */
// const API_URL = `http://192.168.43.112:9100/api/v1`;
// const API_URL = `http://localhost/api/v1`;
const API_URL = `https://ims-demo.onrender.com/api/v1`;

// Fetch product Categories
export const fetchProductCategories = async () => {
  const response = await fetch(`${API_URL}/product-categories`);

  return response.json();
};

// Fetch Brand
export const fetchBrand = async () => {
  const response = await fetch(`${API_URL}/brands`);

  return response.json();
};

// Fetch Suppliers
export const fetchSuppliers = async () => {
  const response = await fetch(`${API_URL}/suppliers`);

  return response.json();
};

// Fetch Stores
export const fetchStores = async () => {
  const response = await fetch(`${API_URL}/stores`);

  return response.json();
};

// Fetch Discount
export const fetchDiscount = async () => {
  const response = await fetch(`${API_URL}/discounts`);

  return response.json();
};

// Fetch Discount
export const fetchTaxes = async () => {
  const response = await fetch(`${API_URL}/taxes`);

  return response.json();
};

// Fetch Countries
export const fetchCountries = async () => {
  const response = await fetch(`${API_URL}/countries`);
  return response.json();
};

// Fetch States
export const fetchStates = async () => {
  const response = await fetch(`${API_URL}/states`);

  return response.json();
};

// Fetch States
export const fetchUnits = async () => {
  const response = await fetch(`${API_URL}/units`);

  return response.json();
};

// Create Stores
export const createStores = async (store: any) => {
  const response = await fetch(`${API_URL}/stores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(store),
  });

  return response.json();
};
