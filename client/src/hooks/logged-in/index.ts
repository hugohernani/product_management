import { useContext } from 'react';
import { AuthContext } from 'src/context/AuthContext';

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthContext');
  }
  return context;
};

export default useAuthContext;
