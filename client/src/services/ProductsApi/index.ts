import { AxiosInstance } from 'axios';
import { ApiFactory } from '../ApiFactory';

import { IBatchUpload, IProduct } from '../../interfaces';

export class ProductsApi {
  private api: AxiosInstance;

  constructor(api_token: string) {
    this.api = ApiFactory.createAxiosInstance({
      baseURL: process.env.REACT_APP_SERVER_BASE_URL,
      responseType: 'json',
      headers: {
        Accept: 'application/vnd.product_management.v1+json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'X-API-Key': api_token,
      },
    });
  }

  async getAll(): Promise<IProduct[]> {
    const response = await this.api.get('/products');
    return response.data as IProduct[];
  }

  async uploadBatch(productsFile: any): Promise<IBatchUpload> {
    const response = await this.api.post('/products/batch', {
      file: productsFile,
    });
    return response.data as IBatchUpload;
  }
}
