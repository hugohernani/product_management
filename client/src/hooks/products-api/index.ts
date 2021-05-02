import { useState } from 'react';
import { ProductsApi } from '../../services';

const useProductsApi = (): ProductsApi => {
  const [productsApi] = useState<ProductsApi>(() => {
    const apiToken = localStorage.getItem('token');
    return new ProductsApi(apiToken as string);
  });

  return productsApi;
};

export default useProductsApi;
