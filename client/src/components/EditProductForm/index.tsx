import React from 'react';
import ProductForm from '../ProductForm';
import { IEditProduct, IProductEditForm } from 'src/interfaces';
import { useFormik } from 'formik';

type IProductFormComponent = IProductEditForm & {
  updateHandler: (product: IEditProduct) => void;
};

const EditProductForm: React.FC<IProductFormComponent> = ({ product, updateHandler }) => {
  const onProductSubmit = (productValues: IEditProduct) => {
    updateHandler(productValues);
  };

  const formik = useFormik({
    initialValues: product,
    onSubmit: onProductSubmit,
  });

  return (
    <ProductForm changeHandler={formik.handleChange} submitHandler={formik.handleSubmit} product={formik.values} />
  );
};

export default EditProductForm;
