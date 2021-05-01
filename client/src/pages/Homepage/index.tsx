import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import FlashProvider from 'src/providers/FlashProvider';
import GlobalModalProvider from 'src/providers/GlobalModalProvider';
import GeneralNavBar from '../../components/NavBar';
import ProductsInlineBulkUpload from '../../components/ProductsInlineBulkUpload';
import ProductsTableListing from '../../components/ProductsTableListing';
import useApi from '../../hooks/api';
import { IProduct } from '../../interfaces';
import Navbar from './components/NavBar';
import { HomepageContainer } from './styles';

const Homepage: React.FC = (): JSX.Element => {
  return (
    <HomepageContainer>
      <GeneralNavBar></GeneralNavBar>
      <Navbar></Navbar>
      <Container>
        <FlashProvider>
          <GlobalModalProvider>
            <ProductsInlineBulkUpload></ProductsInlineBulkUpload>
            <ProductsTableListing></ProductsTableListing>
          </GlobalModalProvider>
        </FlashProvider>
      </Container>
    </HomepageContainer>
  );
};

export default Homepage;
