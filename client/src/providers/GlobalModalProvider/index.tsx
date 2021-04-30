import React, { useMemo, useState } from 'react';
import { GlobalModalContext } from '../../context';
import GlobalModal from '../../components/GlobalModal';
import { IComponentHolder } from '../../interfaces';

const GlobalModalProvider: React.FC = (props) => {
  const [componentHolder, setComponentHolder] = useState<IComponentHolder | undefined>(undefined);

  const showModal = useMemo(() => {
    return componentHolder !== undefined;
  }, [componentHolder]);

  return useMemo(
    () => (
      <GlobalModalContext.Provider value={{ setModal: setComponentHolder }} {...props}>
        {showModal && (
          <GlobalModal show={showModal} onHide={() => setComponentHolder(undefined)} {...componentHolder} />
        )}
        {props.children}
      </GlobalModalContext.Provider>
    ),
    [showModal, setComponentHolder, componentHolder, props],
  );
};

export default GlobalModalProvider;
