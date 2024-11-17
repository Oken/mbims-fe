/* eslint-disable @typescript-eslint/no-explicit-any */

export function itemRender(current: any, type: string, originalElement: any) {
  if (type === 'next') {
    return <a>Next</a>;
  }

  if (type === 'prev') return <a>Prev</a>;
  return originalElement;
}

export function onShowSizeChange(current: any, pageSize: any) {
  console.log(current, pageSize);
}
