import { ReactElement } from 'react';
import { ProductsApi } from 'src/services';
import { IProduct, ISignInCredentials, ISignUpCredentials } from './domain.interface';

export interface IFlash {
  type: string;
  visible: boolean;
  message: string;
}

type SetFlash = Omit<IFlash, 'visible'> & { hidingTimeout?: number };
export interface IFlashContext {
  setFlash: (flash: SetFlash) => void;
}

export interface IAuthContext {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

type ProductApiCallHandler = (
  product: IProduct,
  onSucess: (api_response: any) => void,
  onFailure: (api_response: any) => void,
) => void;

export interface IProductContext {
  productsApi: ProductsApi;
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  fetchProducts: () => Promise<void>;
  updateProductsApiHandler: ProductApiCallHandler;
  removeProductsApiHandler: ProductApiCallHandler;
  uploadProductsBatch: (
    base64Content: string,
    onSucess: (api_response: any) => void,
    onFailure: (api_response: any) => void,
  ) => void;
  checkLastBatchStatus: (reFetchFlag: boolean) => void;
}

export type IReactElement = ReactElement<any, any> | null;
export interface IComponentHolder {
  header?: string;
  component?: IReactElement;
}

export type IModalCloseHandler = () => Promise<void> | void;

export interface IGlobalModalContext {
  setModal: (modal: IComponentHolder) => void;
  onModalClose: (handler?: IModalCloseHandler) => void;
}

interface IAuthSignUpComponent {
  submitHandler: (authFormValues: ISignUpCredentials, e: any) => void;
}

interface IAuthSignInComponent {
  submitHandler: (authFormValues: ISignInCredentials, e: any) => void;
}

export type IAuthSignComponent = React.FC<IAuthSignUpComponent | IAuthSignInComponent>;
