/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

export const useFormState = (initialState: any) => {
  const [formState, setFormState] = useState(initialState);

  const updateFormState = (key: string, value: any) => {
    setFormState((prev: any) => ({ ...prev, [key]: value }));
  };

  return [formState, updateFormState] as const;
};

