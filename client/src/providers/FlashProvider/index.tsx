import React, { useCallback, useMemo, useState } from 'react';
import { IFlash } from '../../interfaces';
import { FlashContext } from '../../context';
import Flash from '../../components/Flash';
import ReactDOM from 'react-dom';

const FlashProvider: React.FC = (props) => {
  const [flash, setFlashState] = useState<IFlash>({
    message: '',
    type: 'info',
    visible: false,
  });

  const onFlashClose = useCallback(() => {
    setFlashState({
      ...flash,
      visible: false,
    });
  }, [flash]);

  const setFlashMessage = useCallback(
    ({ message, type, hidingTimeout }) => {
      setFlashState({
        ...flash,
        visible: true,
        message: message,
        type: type,
      });

      window.setTimeout(() => {
        setFlashState({ ...flash, visible: false });
      }, hidingTimeout || 10000);
    },
    [flash],
  );

  return useMemo(
    () => (
      <FlashContext.Provider value={{ setFlash: setFlashMessage }} {...props}>
        {flash.visible &&
          ReactDOM.createPortal(
            <Flash type={flash.type} message={flash.message} onClose={onFlashClose} />,
            document.getElementById('flash-container') as Element,
          )}
        {props.children}
      </FlashContext.Provider>
    ),
    [flash, setFlashMessage, onFlashClose, props],
  );
};

export default FlashProvider;
