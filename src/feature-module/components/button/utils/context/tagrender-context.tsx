import React, { createContext, ReactNode, useState } from 'react';

interface CustomTagRenderContextType {
  customDelete: boolean;
  setCustomDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CustomTagRenderProviderProp {
  children: ReactNode;
  plainDelete: boolean;
}

export const CustomTagRenderContext = createContext<CustomTagRenderContextType | undefined>(undefined);

const CustomTagRenderProvider: React.FC<CustomTagRenderProviderProp> = ({
  plainDelete,
  children,
}) => {
  const [customDelete, setCustomDelete] = useState<boolean>(plainDelete);

  // console.log('children: ', children, 'plainDelete: ', plainDelete);

  return (
    <CustomTagRenderContext.Provider value={{ customDelete, setCustomDelete }}>
      {children}
    </CustomTagRenderContext.Provider>
  )
}

export default CustomTagRenderProvider;
