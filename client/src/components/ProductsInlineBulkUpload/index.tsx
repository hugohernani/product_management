import React, { useCallback } from 'react';
import InlineForm from './InlineForm';
import useAlert from '../../hooks/alerts';
import useProductManagement from 'src/hooks/product-management';
import { IBatchUpload } from 'src/interfaces';

export interface IInlineForm {
  submitHandler: (e: any) => void;
}

const ProductsInlineBulkUpload: React.FC = () => {
  const { productsApi, checkLastBatchStatus, uploadProductsBatch } = useProductManagement();
  const { setFlash: setAlert } = useAlert();

  const successfulFileLoad = useCallback(
    (reader) => {
      return () => {
        const rawStr = reader.result;
        const base64Content = Buffer.from(rawStr).toString('base64');
        uploadProductsBatch(
          base64Content,
          (uploadBatchInstance: IBatchUpload) => {
            setAlert({
              message: `File uploaded. Current process status: ${uploadBatchInstance.status}. New Products will be listed soon`,
              type: 'info',
            });
            checkLastBatchStatus(true);
          },
          () => {
            // TODO:
          },
        );
      };
    },
    [uploadProductsBatch, checkLastBatchStatus, setAlert],
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
