import { AxiosInstance } from 'axios';
import { ISignInCredentials, ISignUpCredentials } from 'src/interfaces';
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

  async signUp({ email, password, passwordConfirmation }: ISignUpCredentials): Promise<void> {
    await this.api
      .post('/signup', { email, password, password_confirmation: passwordConfirmation })
      .then(({ data: { auth_token: apiToken } }) => {
        window.localStorage.setItem('token', apiToken);
      });
  }

  async signIn({ email, password }: ISignInCredentials): Promise<void> {
    await this.api.post('/signin', { email, password }).then(({ data: { auth_token: apiToken } }) => {
      window.localStorage.setItem('token', apiToken);
    });
  }
}
