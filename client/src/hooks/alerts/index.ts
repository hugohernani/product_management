import { useState, useEffect, Dispatch, SetStateAction } from 'react';

interface IAlert {
  visible: boolean;
  message: string;
}
const useAlert = (): Dispatch<SetStateAction<IAlert>> => {
  const [, setAlert] = useState<IAlert>({
    visible: false,
    message: '',
  });

  return setAlert;
};

export default useAlert;
