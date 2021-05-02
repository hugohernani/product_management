import React from 'react';
import { Container } from 'react-bootstrap';
import FlashProvider from 'src/providers/FlashProvider';
import GlobalModalProvider from 'src/providers/GlobalModalProvider';
import GeneralNavBar from '../../components/NavBar';
import ProductsInlineBulkUpload from '../../components/ProductsInlineBulkUpload';
import ProductsTableListing from '../../components/ProductsTableListing';
import Navbar from './components/NavBar';
import { HomepageContainer } from './styles';

const Homepage: React.FC = (): JSX.Element => {
  return (
    <HomepageContainer>
      <GlobalModalProvider>
        <GeneralNavBar></GeneralNavBar>
        <Navbar></Navbar>
        <Container>
          <FlashProvider>
            <ProductsInlineBulkUpload></ProductsInlineBulkUpload>
            <ProductsTableListing></ProductsTableListing>
          </FlashProvider>
        </Container>
      </GlobalModalProvider>
    </HomepageContainer>
  );
};

export default Homepage;
