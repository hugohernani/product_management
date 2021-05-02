import React, { useCallback } from 'react';
import InlineForm from './InlineForm';
import useProductsApi from '../../hooks/products-api';
import useAlert from '../../hooks/alerts';

export interface IInlineForm {
  submitHandler: (e: any) => void;
}

const ProductsInlineBulkUpload: React.FC = () => {
  const productsApi = useProductsApi();
  const { setFlash: setAlert } = useAlert();

  const successfulFileLoad = useCallback(
    (reader) => {
      return async () => {
        const rawStr = reader.result;
        const base64Content = Buffer.from(rawStr).toString('base64');
        const uploadBatchInstance = await productsApi.uploadBatch(base64Content);
        setAlert({
          message: `File uploaded. Current process status: ${uploadBatchInstance.status}. Please for now refresh the page`,
          type: 'info',
        });
      };
    },
    [productsApi, setAlert],
  );

  const failedFileLoad = useCallback(() => {
    setAlert({ type: 'danger', message: 'Something went wrong' });
  }, [setAlert]);

  const submitHandler = useCallback(
    ({ target: { form } }) => {
      const uploadableFile = form.querySelector('input').files[0];
      if (uploadableFile == undefined) {
        setAlert({ type: 'danger', message: 'You must select a file' });
        return;
      }
      const reader = new FileReader();
      reader.onload = successfulFileLoad(reader);
      reader.onerror = failedFileLoad;
      reader.readAsText(uploadableFile);
    },
    [setAlert, successfulFileLoad, failedFileLoad],
  );

  return <InlineForm submitHandler={submitHandler} />;
};

export default ProductsInlineBulkUpload;
