import React from 'react';
import { Container } from 'react-bootstrap';
import FlashContainer from 'src/components/FlashContainer';
import FlashProvider from 'src/providers/FlashProvider';
import GlobalModalProvider from 'src/providers/GlobalModalProvider';
import ProductManagementProvider from 'src/providers/ProductManagementProvider';
import GeneralNavBar from '../../components/NavBar';
import ProductsInlineBulkUpload from '../../components/ProductsInlineBulkUpload';
import ProductsTableListing from '../../components/ProductsTableListing';
import Navbar from './components/NavBar';
import { HomepageContainer } from './styles';

const Homepage: React.FC = (): JSX.Element => {
  return (
    <HomepageContainer>
      <FlashProvider>
        <GlobalModalProvider>
          <GeneralNavBar></GeneralNavBar>
          <Navbar></Navbar>
          <FlashContainer />
          <ProductManagementProvider>
            <Container>
              <ProductsInlineBulkUpload />
              <ProductsTableListing />
            </Container>
          </ProductManagementProvider>
        </GlobalModalProvider>
      </FlashProvider>
    </HomepageContainer>
  );
};

export default Homepage;
