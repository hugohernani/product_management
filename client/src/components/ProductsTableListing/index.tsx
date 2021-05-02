import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IProduct } from '../../interfaces';
import { Table } from 'react-bootstrap';
import ProductTableRow from './ProductTableRow';
import useProductsApi from 'src/hooks/products-api';
import { omit as _omit } from 'lodash';
import useModal from 'src/hooks/GlobalModal';
import useAlert from 'src/hooks/alerts';

const ProductsTableListing: React.FC = (): JSX.Element => {
  const productsApi = useProductsApi();
  const { onModalClose } = useModal();
  const { setFlash } = useAlert();
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProducts = useCallback(async () => {
    const incomingProducts = await productsApi?.getAll();
    setProducts(incomingProducts);
  }, [productsApi]);

  useEffect(() => {
    fetchProducts();
  }, [setProducts, productsApi]); // eslint-disable-line

  const removeProductListHandler = useCallback(
    (product) => {
      try {
        productsApi.remove(product.id);
        setProducts((productsList) => {
          return productsList.filter((p) => {
            return p.id !== product.id;
          });
        });
        setFlash({ message: 'Product sucessfully removed', type: 'info' });
      } catch {
        // TODO:
      }
    },
    [productsApi, setFlash],
  );

  const updateProductListHandler = useCallback(
    (product) => {
      try {
        onModalClose(() => {
          const params = { ...product, category: product.type };
          productsApi.update(product.id, _omit(params, 'created_at', 'type'));
        });
        setProducts((productsList) => {
          return productsList.map((p) => (p.id == product.id ? product : p));
        });
        setFlash({ message: 'Product sucessfully updated', type: 'info' });
      } catch {
        // TODO:
      }
    },
    [productsApi, setFlash, setProducts, onModalClose],
  );

  return useMemo(
    () => (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Rating</th>
            <th>Price</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <ProductTableRow
                key={product.id}
                product={product}
                onUpdate={updateProductListHandler}
                onRemove={removeProductListHandler}
              />
            ))}
        </tbody>
      </Table>
    ),
    [products, updateProductListHandler, removeProductListHandler],
  );
};

export default ProductsTableListing;
