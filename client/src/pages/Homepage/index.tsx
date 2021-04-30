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
  const productsApi = useApi();
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProducts = useCallback(async () => {
    const incomingProducts = await productsApi?.getAll();
    setProducts(incomingProducts);
  }, [productsApi]);

  useEffect(() => {
    fetchProducts();
  }, [setProducts, productsApi]); // eslint-disable-line

  return (
    <HomepageContainer>
      <GlobalModalProvider>
        <GeneralNavBar></GeneralNavBar>
        <Navbar></Navbar>
        <Container>
          <FlashProvider>
            <ProductsInlineBulkUpload></ProductsInlineBulkUpload>
            <ProductsTableListing products={products}></ProductsTableListing>
          </FlashProvider>
        </Container>
      </GlobalModalProvider>{' '}
    </HomepageContainer>
  );
};

export default Homepage;
