import { useState } from 'react';
import { AuthApi } from '../../services';

const useAuthApi = (): AuthApi => {
  const [authApi] = useState<AuthApi>(() => {
    return new AuthApi();
  });

  return authApi;
};

export default useAuthApi;
