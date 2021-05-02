import React from 'react';
import { ProductContext } from '../../context';

const ProductManagementProvider: React.FC = (props) => {
  return (
    <ProductContext.Provider value={{}} {...props}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductManagementProvider;
