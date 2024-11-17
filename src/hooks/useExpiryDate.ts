import { useState, useEffect } from 'react';

export const useExpiryDate = () => {
  const [expiryDateComponents, setExpiryDateComponents] = useState({
    expiryDay: '',
    expiryMonth: '',
    expiryYear: '',
  });

  const [expiryDate, setExpiryDate] = useState<string>('');

  useEffect(() => {
    // console.log('expiryDateComponents: ', expiryDateComponents);
    const newExpiryDate = `${expiryDateComponents.expiryYear}-${expiryDateComponents.expiryMonth}-${expiryDateComponents.expiryDay}`;
    setExpiryDate(newExpiryDate);
  }, [expiryDateComponents]);

  const updateExpiryComponent = (key: string, value: string) => {
    setExpiryDateComponents((prev) => ({ ...prev, [key]: value }));
  };

  return { expiryDate, updateExpiryComponent };
};
