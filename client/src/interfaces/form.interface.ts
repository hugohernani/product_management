import { IProduct } from './domain.interface';

export type IEditProduct = Required<Pick<IProduct, 'id'>> & Partial<Omit<IProduct, 'id'>>;
export type IProductEditForm = Required<Record<'product', IEditProduct>>;
