import React, { useCallback, useMemo, useState } from 'react';
import { GlobalModalContext } from '../../context';
import GlobalModal from '../../components/GlobalModal';
import { IComponentHolder, IModalCloseHandler } from '../../interfaces';

const GlobalModalProvider: React.FC = (props) => {
  const [componentHolder, setComponentHolder] = useState<IComponentHolder | undefined>(undefined);

  const showModal = useMemo(() => {
    return componentHolder !== undefined;
  }, [componentHolder]);

  const closeModal = useCallback((handler?: IModalCloseHandler) => {
    setComponentHolder(undefined);

    if (handler != undefined) {
      handler();
    }
  }, []);

  const setComponent = useCallback(({ header, component }) => {
    setComponentHolder({
      header: header,
      component: component,
    });
  }, []);

  return useMemo(
    () => (
      <GlobalModalContext.Provider value={{ setModal: setComponent, onModalClose: closeModal }} {...props}>
        {showModal && <GlobalModal show={showModal} onHide={closeModal} {...componentHolder} />}
        {props.children}
      </GlobalModalContext.Provider>
    ),
    [showModal, closeModal, setComponent, componentHolder, props],
  );
};

export default GlobalModalProvider;
