import { ReactElement } from 'react';

export interface IFlash {
  type: string;
  visible: boolean;
  message: string;
}

type SetFlash = Omit<IFlash, 'visible'> & { hidingTimeout?: number };
export interface IFlashContext {
  setFlash: (flash: SetFlash) => void;
}

export type IReactElement = ReactElement<any, any> | null;
export interface IComponentHolder {
  header?: string;
  component?: IReactElement;
}

export interface IGlobalModalContext {
  setModal: (modal: IComponentHolder) => void;
}
