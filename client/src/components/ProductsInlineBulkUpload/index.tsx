import React, { useCallback } from 'react';
import InlineForm from './InlineForm';

export interface IInlineForm {
  submitHandler: (e: any) => void;
}

const ProductsInlineBulkUpload: React.FC = () => {
  const submitHandler = useCallback((e) => {
    console.log('Processing file...');
  }, []);
  return <InlineForm submitHandler={submitHandler} />;
};

export default ProductsInlineBulkUpload;
