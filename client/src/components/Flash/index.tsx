import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { IFlash } from '../../interfaces';

const Flash: React.FC<IFlash> = ({ type, message }) => {
  const [show, setShow] = useState(true);

  if (!show) return <></>;

  return (
    <Alert variant={type} onClose={() => setShow(false)} dismissible>
      <p>{message}</p>
    </Alert>
  );
};

export default Flash;
