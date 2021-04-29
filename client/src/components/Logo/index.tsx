import React from 'react';
import { Image } from 'react-bootstrap';

interface ILogo {
  src: string;
}

const Logo: React.FC<ILogo> = ({ src }) => {
  return <Image src={src} />;
};

export default Logo;
