import React from 'react';
import { IFlash } from '../../interfaces';
import { Alert } from 'react-bootstrap';

type IFlashComponent = Omit<IFlash, 'visible'> & {
  onClose: () => void;
};

const Flash: React.FC<IFlashComponent> = ({ type, message, onClose }) => {
  return (
    <Alert variant={type} onClose={onClose} dismissible>
      <p>{message}</p>
    </Alert>
  );
};

export default Flash;
