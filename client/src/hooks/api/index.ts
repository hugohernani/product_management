import { useRef, useEffect } from 'react';
import { ProductsApi } from '../../services';

const useApi = (token?: string): ProductsApi => {
  const ref = useRef<ProductsApi>();

  useEffect(() => {
    const apiToken = localStorage.getItem('token');
    ref.current = new ProductsApi(apiToken as string);
    console.log(ref.current);
  }, []);

  return ref.current as ProductsApi;
};

export default useApi;
