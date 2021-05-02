import { useContext } from 'react';
import { ProductContext } from '../../context';

const useProductManagement = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductManagement must be used within a ProductManagementProvider');
  }
  return context;
};

export default useProductManagement;
