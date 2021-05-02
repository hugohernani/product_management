import { IProduct } from './domain.interface';

export type IEditProduct = Required<Pick<IProduct, 'id'>> & Partial<Omit<IProduct, 'id'>>;
export type IProductEditForm = Required<Record<'product', IEditProduct>>;

export interface ApiResponse {
  message?: string;
  status?: number;
}

export interface ISignUpResponse extends ApiResponse {
  auth_token: string;
}

export interface ISignInResponse extends ApiResponse {
  auth_token: string;
}
