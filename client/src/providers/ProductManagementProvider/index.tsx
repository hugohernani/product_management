import React, { useCallback, useEffect, useState } from 'react';
import useProductsApi from 'src/hooks/products-api';
import { IProduct } from 'src/interfaces';
import { ProductContext } from '../../context';
import { omit as _omit } from 'lodash';
import useLoggedIn from 'src/hooks/logged-in';

const ProductManagementProvider: React.FC = (props) => {
  const productsApi = useProductsApi();
  const [products, setProducts] = useState<IProduct[]>([]);
  const { isLoggedIn } = useLoggedIn();

  const fetchProducts = useCallback(async () => {
    if (isLoggedIn) {
      const incomingProducts = await productsApi.getAll();
      setProducts(incomingProducts);
    }
  }, [isLoggedIn, productsApi]);

  useEffect(() => {
    fetchProducts();
  }, []); // eslint-disable-line

  const checkLastBatchStatus = useCallback(
    (refetchProducts = false): void => {
      // TODO: Create api feature to allow fetching batch status and reload products based on this
      setTimeout(() => {
        // simulating a paced check
        fetchProducts();
      }, 5000);
    },
    [fetchProducts],
  );

  const uploadProductsBatch = useCallback(
    async (base64Content, onSuccess: (api_response: any) => void, onFailure: (api_response: any) => void) => {
      try {
        const batchInstance = await productsApi.uploadBatch(base64Content);
        onSuccess(batchInstance);
      } catch {
        onFailure({});
      }
    },
    [productsApi],
  );

  const updateProductCall = useCallback(
    (product: IProduct, onSucess: (api_response: any) => void, onFailure: (api_response: any) => void) => {
      try {
        const params = { ...product, category: product.type };
        productsApi.update(product.id, _omit(params, 'created_at', 'type'));
        setProducts((productsList) => {
          return productsList.map((p) => (p.id == product.id ? product : p));
        });
        onSucess({});
      } catch {
        onFailure({});
      }
    },
    [productsApi],
  );

  const removeProductCall = useCallback(
    (product: IProduct, onSucess: (api_response: any) => void, onFailure: (api_response: any) => void) => {
      try {
        productsApi.remove(product.id);
        setProducts((productsList) => {
          return productsList.filter((p) => {
            return p.id !== product.id;
          });
        });
        onSucess({});
      } catch {
        onFailure({});
      }
    },
    [productsApi],
  );

  if (!isLoggedIn) {
    return <h1 className="text-center">You must be logged to see content</h1>;
  }

  return (
    <ProductContext.Provider
      value={{
        productsApi: productsApi,
        products: products,
        setProducts: setProducts,
        fetchProducts: fetchProducts,
        updateProductsApiHandler: updateProductCall,
        removeProductsApiHandler: removeProductCall,
        uploadProductsBatch: uploadProductsBatch,
        checkLastBatchStatus: checkLastBatchStatus,
      }}
      {...props}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductManagementProvider;
