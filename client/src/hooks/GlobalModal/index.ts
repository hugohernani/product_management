import { useContext } from 'react';
import { GlobalModalContext } from '../../context';

const useModal = () => {
  const context = useContext(GlobalModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a GlobalModalProvider');
  }
  return context;
};

export default useModal;
