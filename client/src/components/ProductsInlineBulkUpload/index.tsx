import React, { useCallback } from 'react';
import InlineForm from './InlineForm';
import useAlert from '../../hooks/alerts';
import useProductManagement from 'src/hooks/product-management';
import { IBatchUpload } from 'src/interfaces';

export interface IInlineForm {
  submitHandler: (e: any) => void;
}

const ProductsInlineBulkUpload: React.FC = () => {
  const { checkLastBatchStatus, uploadProductsBatch } = useProductManagement();
  const { setFlash: setAlert } = useAlert();

  const validJsonContent = useCallback((rawData): boolean => {
    return JSON.parse(rawData).every((incomingProduct: any) => {
      return ['title', 'type', 'price'].every((attr) => incomingProduct.hasOwnProperty(attr));
    });
  }, []);

  const successfulFileLoad = useCallback(
    (reader) => {
      return () => {
        const raw = reader.result;
        try {
          validJsonContent(raw);
          const base64Content = Buffer.from(raw).toString('base64');
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
        } catch {
          setAlert({
            message: `File does not fit expected product format`,
            type: 'danger',
          });
        }
      };
    },
    [uploadProductsBatch, validJsonContent, checkLastBatchStatus, setAlert],
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
