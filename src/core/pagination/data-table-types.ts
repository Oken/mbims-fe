/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpiredProductT, ProductT } from '../../types/product-types';

export type ColumnsT = ProductT | ExpiredProductT | any;
export type DataSourceT = ProductT[] | ExpiredProductT[] | any[];
