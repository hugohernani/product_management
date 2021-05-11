import { AxiosInstance } from 'axios';
import { ISignInCredentials, ISignUpCredentials } from 'src/interfaces';
import { ISignInResponse, ISignUpResponse } from 'src/interfaces/responses.interface';
import { ApiFactory } from '../ApiFactory';

export class AuthApi {
  private api: AxiosInstance;

  constructor() {
    this.api = ApiFactory.createAxiosInstance({
      baseURL: `${process.env.REACT_APP_SERVER_BASE_URL as string}/auth`,
      responseType: 'json',
      headers: {
        Accept: 'application/vnd.product_management.v1+json',
        'Content-Type': 'application/json',
      },
    });
  }

  async signUp({ email, password, passwordConfirmation }: ISignUpCredentials): Promise<ISignUpResponse> {
    const response = await this.api.post('/signup', { email, password, password_confirmation: passwordConfirmation });
    return response.data;
  }

  async signIn({ email, password }: ISignInCredentials): Promise<ISignInResponse> {
    const response = await this.api.post('/login', { email, password });
    return response.data;
  }
}
