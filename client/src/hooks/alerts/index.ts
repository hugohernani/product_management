import { useContext } from 'react';
import { FlashContext } from '../../context';

const useAlert = () => {
  const context = useContext(FlashContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within a FlashProvider');
  }
  return context;
};

export default useAlert;

// const context = React.useContext(ModalContext);
// if (context === undefined) {
//   throw new Error('useModal must be used within a ModelProvider');
// }
// return context;
