import React, { useCallback, useMemo } from 'react';
import { Table } from 'react-bootstrap';
import useAlert from 'src/hooks/alerts';
import useModal from 'src/hooks/GlobalModal';
import useProductManagement from 'src/hooks/product-management';
import ProductTableRow from './ProductTableRow';

const ProductsTableListing: React.FC = (): JSX.Element => {
  const { products, updateProductsApiHandler, removeProductsApiHandler } = useProductManagement();
  const { onModalClose } = useModal();
  const { setFlash } = useAlert();

  const removeProductListHandler = useCallback(
    (product) => {
      removeProductsApiHandler(
        product,
        (api_response: any) => {
          setFlash({ message: 'Product sucessfully removed', type: 'info' });
        },
        (api_response: any) => {
          // TODO:
        },
      );
    },
    [removeProductsApiHandler, setFlash],
  );

  const updateProductListHandler = useCallback(
    (product) => {
      updateProductsApiHandler(
        product,
        (api_response: any) => {
          onModalClose();
          setFlash({ message: 'Product sucessfully updated', type: 'info' });
        },
        (api_response: any) => {
          // TODO:
        },
      );
    },
    [updateProductsApiHandler, setFlash, onModalClose],
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
