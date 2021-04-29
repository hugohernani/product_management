import React, { useState } from 'react';
import { HomepageContainer } from './styles';
import { Container } from 'react-bootstrap';
import GeneralNavBar from '../../components/NavBar';
import Navbar from './components/NavBar';
import ProductsInlineBulkUpload from '../../components/ProductsInlineBulkUpload';
import ProductsTableListing from '../../components/ProductsTableListing';
import Flash from '../../components/Flash';

import { IProduct } from '../../interfaces';

const Homepage: React.FC = () => {
  const [flashMessage] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  );

  const [products] = useState([] as IProduct[]); // TODO: forcing it for now

  return (
    <HomepageContainer>
      <GeneralNavBar></GeneralNavBar>
      <Navbar></Navbar>
      <Container>
        <Flash message={flashMessage} type="primary" />
        {/* Render alert components */}

        <ProductsInlineBulkUpload></ProductsInlineBulkUpload>
        <ProductsTableListing products={products}></ProductsTableListing>
      </Container>
    </HomepageContainer>
  );
};

export default Homepage;
