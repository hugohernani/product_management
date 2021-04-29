import { AxiosInstance } from 'axios';
import { ApiFactory } from '../ApiFactory';
import { omit } from 'lodash';

import { IBatchUpload, IProduct } from '../../interfaces';

export class ProductsApi {
  private api: AxiosInstance;

  constructor(api_token: string) {
    this.api = ApiFactory.createAxiosInstance({
      baseURL: process.env.REACT_APP_SERVER_BASE_URL,
      responseType: 'json',
      headers: {
        Accept: 'application/vnd.product_management.v1+json',
        'Content-Type': 'application/json',
        'X-API-Key': api_token,
      },
    });
  }

  async getAll(): Promise<IProduct[]> {
    const response = await this.api.get('/products');
    return response.data as IProduct[];
  }

  async update(productId: number, attributes: Partial<IProduct>): Promise<boolean> {
    try {
      await this.api.put(`/product/${productId}`, omit(attributes, ['id', 'createdAt']));
      return true;
    } catch {
      return false;
    }
  }

  async remove(productId: number): Promise<boolean> {
    try {
      await this.api.delete(`/product/${productId}`);
      return true;
    } catch {
      return false;
    }
  }

  async uploadBatch(productsFile: any): Promise<IBatchUpload> {
    const response = await this.api.post('/products/batch', {
      file: productsFile,
    });
    console.log(response.data);
    return response.data as IBatchUpload;
  }
}
