import React, { useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { IComponentHolder } from 'src/interfaces';

type IGlobalModal = {
  onHide: () => void;
  show: boolean;
} & IComponentHolder;

const GlobalModal: React.FC<IGlobalModal> = ({ component, header, ...props }) => {
  return useMemo(
    () => (
      <Modal {...props} show={true} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{header}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{component}</Modal.Body>
      </Modal>
    ),
    [header, component, props],
  );
};

export default GlobalModal;
