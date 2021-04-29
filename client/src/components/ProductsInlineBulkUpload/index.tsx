import React, { useCallback } from 'react';
import InlineForm from './InlineForm';
import useApi from '../../hooks/api';
import useAlert from '../../hooks/alerts';

export interface IInlineForm {
  submitHandler: (e: any) => void;
}

const ProductsInlineBulkUpload: React.FC = () => {
  const productsApi = useApi();
  const setAlert = useAlert();

  const successfulFileLoad = useCallback(
    (reader) => {
      return async (e: any) => {
        const rawStr = reader.result;
        const base64Content = Buffer.from(rawStr).toString('base64');
        const uploadBatchInstance = await productsApi.uploadBatch(base64Content);
        setAlert({ visible: true, message: `File uploaded. Current process status: ${uploadBatchInstance.status}` });
      };
    },
    [productsApi, setAlert],
  );

  const failedFileLoad = useCallback(
    (e) => {
      setAlert({ visible: true, message: 'Something went wrong' });
    },
    [setAlert],
  );

  const submitHandler = useCallback(
    ({ target: { form } }) => {
      const uploadableFile = form.querySelector('input').files[0];
      const reader = new FileReader();
      reader.onload = successfulFileLoad(reader);
      reader.onerror = failedFileLoad;
      reader.readAsText(uploadableFile);
    },
    [successfulFileLoad, failedFileLoad],
  );

  return <InlineForm submitHandler={submitHandler} />;
};

export default ProductsInlineBulkUpload;
