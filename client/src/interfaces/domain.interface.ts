export interface ISignUpCredentials {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface ISignInCredentials {
  email: string;
  password: string;
}

export type ISignCredentials = ISignInCredentials | ISignUpCredentials;

export interface IProduct {
  id: number;
  title: string;
  type: string;
  rating: string;
  price: string;
  created_at: string;
}

export interface IBatchUpload {
  id: number;
  status: string;
  upload_type: string;
}
