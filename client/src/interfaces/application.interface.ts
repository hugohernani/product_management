export interface IFlash {
  type: string;
  visible: boolean;
  message: string;
}

type SetFlash = Omit<IFlash, 'visible'> & { hidingTimeout?: number };

export interface IFlashContext {
  setFlash: (flash: SetFlash) => void;
}
