import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiFactory } from '.';

describe('ApiFactory', () => {
  let factoryInstance: AxiosInstance;
  const options: AxiosRequestConfig = {
    baseURL: 'http://localhost:3000/',
  };

  it('returns axios wrapper function', () => {
    factoryInstance = ApiFactory.createAxiosInstance(options);
    expect(factoryInstance).toBeInstanceOf(Function);
  });
});
