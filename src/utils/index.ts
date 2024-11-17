/* eslint-disable @typescript-eslint/no-explicit-any */
export const getBase64 = (file: any, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => callback(reader.result as string);
};

// generate SKU
export const generateSKU = (productName: string): string => {
  if (productName === '') {
    return productName;
  }
  // Split the product name into words and take the first letter of each word
  const namePart = productName
    .trim()
    .split(' ') // Split the name into an array of words
    .map((word) => word[0].toUpperCase()) // Take the first letter of each word and capitalize it
    .join(''); // Join them together

  // Generate a random 4-digit number
  const randomPart = Math.floor(1000 + Math.random() * 9000); // Ensures a 4-digit number

  // Combine the name part and the random part to form the SKU
  const sku = `${namePart}${randomPart}`;

  return sku;
};

// Generate Barcode
export const generateBarCode = (name: string, category: string): string => {
  if (!name || !category) {
    return '';
  }

  // Combine the product name and category to create a unique identifier
  const baseString = `${name}-${category}`;

  // Create a basic hash based on the name and category
  let hash = 0;
  for (let i = 0; i < baseString.length; i++) {
    const char = baseString.charCodeAt(i);
    hash = (hash << 5) - hash + char; // Bitwise manipulation to mix up the hash
    hash |= 0; // Convert to a 32-bit integer
  }

  // Convert the hash to a positive number and take the absolute value
  const positiveHash = Math.abs(hash).toString();

  // Ensure the result is a 13-digit number by padding or trimming the hash
  const barCode = positiveHash.padStart(13, '0').slice(0, 13);

  return barCode;
};
