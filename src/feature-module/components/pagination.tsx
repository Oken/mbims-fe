interface ItemRenderProps {
  current?: number;
  type: 'prev' | 'next';
  originalElement: React.ReactNode;
}

export const itemRender = (props: ItemRenderProps) => {
  const { type, originalElement } = props;
  if (type === 'prev') {
    return <a>Previous</a>;
  }
  if (type === 'next') {
    return <a>Next</a>;
  }
  return originalElement;
};

export const onShowSizeChange = (current: number, pageSize: number): void => {
  console.log(current, pageSize);
};
